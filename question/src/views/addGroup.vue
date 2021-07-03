<template>
  <div class="card">
    <el-form ref="form" :model="form" label-width="80px" class="myForm">
      <el-form-item label="年级">
        <el-date-picker
          v-model="form.level"
          type="year"
          value-format="yyyy"
          placeholder="选择年级"
          size="medium"
          @change="changeLevel"
          format='yyyy届'
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="班号">
        <el-select v-model="form.cno">
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.cno"
            :value="item.cno"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试科目">
        <el-cascader
          :options="options"
          v-model="form.examSub"
          :show-all-levels="true"
          @change="changeExamId"
          size="medium"
        ></el-cascader>
      </el-form-item>
      <!-- <el-form-item label="考试名称" size="medium">
        <el-select v-model="form.exam">
          <el-option
            v-for="item in examList"
            :key="item.exam_id"
            :label="item.name"
            :value="item.exam_id"
            @change="changeExam"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科目名称" size="medium">
        <el-select v-model="form.examSub">
          <el-option
            v-for="item in examsubjectList"
            :key="item.subject_id"
            :label="item.subject_name"
            :value="item.subject_id"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="getGroupBtn">获取分组</el-button>
      </el-form-item>
    </el-form>
    <!-- <GroupTable
      v-if="isGetGroup"
      :studentMap="studentMap"
      :tableData="tableData"
    ></GroupTable> -->
    <el-dialog
      title="以下班级没有上传成绩单，是否确认获取分组？"
      :visible.sync="dialogTableVisible"
    >
      <el-table :data="no_upload_grade_cno">
        <el-table-column property="level" label="年级"></el-table-column>
        <el-table-column property="cno" label="班号"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import GroupTable from "./groupTable.vue";
export default {
  name: "addgroup",
  // components: {
  //   GroupTable: GroupTable,
  // },
  data() {
    return {
      form: {
        examSub: [],
        level: new Date().getFullYear() + "",
        cno: "",
      },
      dialogTableVisible: false,
      classList: [],
      no_upload_grade_cno: [],
      // studentMap: {},
      // tableData: [],
      // isGetGroup: false,
      examSubMap: {},
      options: [],
    };
  },
  mounted() {
    this.getExamList();
    this.getClassList();
  },
  methods: {
    getExamList() {
      this.$request
        .fetchSelectExam({})
        .then((res) => {
          this.options = [];
          const result = res.data.result;
          result.map(async (item, index) => {
            const sub = await this.getExam_subjectList(item.exam_id);
            this.options.push({
              value: item.exam_id,
              label: item.name,
              children: [],
            });
            sub.map((subItem) => {
              this.options[index].children.push({
                value: subItem.exam_detail_id,
                label: subItem.subject_name,
              });
            });
            return item;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getExam_subjectList(id) {
      return this.$request
        .fetchSelectExamsubject({ exam_id: id })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.examSubMap[res.data[i]["exam_detail_id"]] =
              res.data[i]["subject_id"];
          }
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getClassList() {
      this.$request
        .fetchSearchClass({
          level: this.form.level,
          headteacher: "",
        })
        .then((res) => {
          const result = res.data.result;
          this.classList = result;
          if (result.length > 0) {
            this.form.cno = result[0].cno;
          }
        });
    },
    getGroupBtn() {
      if (this.form.examSub.length === 0) {
        return this.$message.error("请选择考试科目");
      }
      this.getGroupList();
    },
    getGroupList() {
      // this.isConfirmGroup = true;
      this.$request
        .fetchSearchgroup({
          level: this.form.level,
          cno: this.form.cno,
          exam_detail_id: this.examSub[1],
        })
        .then((res) => {
          if (res.data.result.length > 0) {
            return this.$confirm(
              "当前考试已获取过分组，请去分组查询页面查看！",
              "提示",
              {
                confirmButtonText: "确定",
                type: "success",
                showCancelButton: false,
              }
            );
          }
          this.checkGrade();
          // this.getStudentList();

          // this.tableData = res.data.result;
          // for (let i = 0; i < this.tableData.length; i++) {
          //   if (+this.tableData[i]["is_sure_student"] === 0) {
          //     this.isConfirmGroup = false;
          //   }
          // }
        });
    },
    checkGrade() {
      this.$request
        .fetchCheckreport({
          exam_detail_id: this.form.examSub[1],
        })
        .then((res) => {
          if (res.data.examid === "" || res.data.examid === null) {
            return this.$message.error("当前年级没有班级上传成绩单");
          }
          const cnos = res.data.no_upload_grade_cno;
          this.dialogTableVisible = true;
          this.no_upload_grade_cno = cnos.map((item) => {
            return { cno: item, level: res.data.level };
          });
        });
    },
    pushreport() {
      this.$request
        .fetchPushreport({
          grade_file_name_list: this.getGrade(),
          exam_detail_id: this.form.examSub[1],
          subject_id: this.examSubMap[this.form.examSub[1]],
          level: this.form.level,
        })
        .then((res) => {
          if (res.data.desc !== "推送成功!") {
            this.$message.error(res.data.desc);
            return;
          }
          this.getGroup();
        });
    },
    getGroup() {
      this.$request
        .fetchGetgroup({
          examName: this.form.examSub[1] + "",
        })
        .then((res) => {
          this.saveGroup(res.data.data);
        });
    },
    saveGroup(data) {
      this.$request
        .fetchAddgroup({
          exam_detail_id: this.form.examSub[1],
          glist: data,
        })
        .then((res) => {
          if (res.data.desc) {
            this.$message.error(res.data.desc);
            return;
          }
          return this.$confirm("分组获取成功，请去分组查询页面查看！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            showCancelButton: false,
          });
        });
    },
    getGrade() {
      const obj = {};
      this.no_upload_grade_cno.map((item) => {
        obj[item.cno] = item;
        return item;
      });
      const arr = [];
      for (let i = 0; i < this.classList.length; i++) {
        if (!obj[this.classList[i].cno]) {
          const xlsx = `${this.form.exam}_${this.form.examSub}_${this.form.level}_${this.classList[i].cno}_grade.xlsx`;
          arr.push(xlsx);
        }
      }
      return arr;
    },
    // getStudentList() {
    //   // 查询某一个年级的所有学生
    //   this.$request
    //     .fetchSearchStu({
    //       level: this.form.level,
    //       cno: this.form.cno,
    //     })
    //     .then((res) => {
    //       const result = res.data.result;
    //       const obj = {};
    //       for (let i = 0; i < result.length; i++) {
    //         obj[result[i].sno] = result[i];
    //       }
    //       this.studentMap = obj;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    confirm() {
      this.dialogTableVisible = false;
      this.pushreport();
    },
    changeLevel(val) {
      this.form.level = val;
      this.getClassList();
    },
    changeExamId(val) {
      this.examSub = val;
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  height: 100%;
  padding: 40px 50px 0;
  box-sizing: border-box;
  background-color: #ffffff;
  float: right;
  overflow: auto;
}

.myForm {
  margin-bottom: 30px;
}
</style>
