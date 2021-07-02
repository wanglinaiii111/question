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
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="考试名称" size="medium">
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkGrade">获取分组</el-button>
      </el-form-item>
    </el-form>
    <GroupTable v-if="isGetGroup" :studentMap="studentMap" :tableData="tableData"></GroupTable>
    <el-dialog title="以下班级没有上传成绩单，是否确认获取分组？" :visible.sync="dialogTableVisible">
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
import GroupTable from "./groupTable.vue";
export default {
  name: "addgroup",
  components: {
    GroupTable: GroupTable
  },
  data() {
    return {
      form: {
        exam: "",
        examSub: "",
        level: new Date().getFullYear() + ""
      },
      dialogTableVisible: false,
      examList: [],
      examsubjectList: [],
      classList: [],
      no_upload_grade_cno: [],
      studentMap: {},
      tableData: [],
      isGetGroup: false,
      examDetailIdMap: {}
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
        .then(res => {
          this.examList = res.data.result;
          if (res.data.result.length > 0) {
            const id = res.data.result[0].exam_id;
            this.getExamSubList(id);
            this.form.exam = id;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getExamSubList(id) {
      this.$request
        .fetchSelectExamsubject({ exam_id: id })
        .then(res => {
          this.examsubjectList = res.data;
          for (let i = 0; i < res.data.length; i++) {
            this.examDetailIdMap[
              `${res.data[i]["exam_id"]}-${res.data[i]["subject_id"]}`
            ] = res.data[i]["exam_detail_id"];
          }
          if (res.data.length > 0) {
            const id = res.data[0].subject_id;
            this.form.examSub = id;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getClassList() {
      this.$request
        .fetchSearchClass({
          level: this.form.level,
          headteacher: ""
        })
        .then(res => {
          this.classList = res.data.result;
        });
    },
    checkGrade() {
      const examDetailId = this.examDetailIdMap[
        `${this.form.exam}-${this.form.examSub}`
      ];
      this.getStudentList();
      this.$request
        .fetchCheckreport({
          exam_detail_id: examDetailId
        })
        .then(res => {
          if (res.data.examid === "" || res.data.examid === null) {
            return this.$message.error("当前年级没有班级上传成绩单");
          }
          const cnos = res.data.no_upload_grade_cno;
          this.dialogTableVisible = true;
          this.no_upload_grade_cno = cnos.map(item => {
            return { cno: item, level: res.data.level };
          });
          console.log(this.no_upload_grade_cno);
        });
    },
    pushreport() {
      const examDetailId = this.examDetailIdMap[
        `${this.form.exam}-${this.form.examSub}`
      ];
      this.$request
        .fetchPushreport({
          grade_file_name_list: this.getGrade(),
          exam_detail_id: examDetailId,
          subject_id: this.form.examSub,
          level: this.form.level
        })
        .then(res => {
          if (res.data.desc !== "推送成功!") {
            this.$message.error(res.data.desc);
            return;
          }
        });
    },
    getGroup() {
      const examDetailId = this.examDetailIdMap[
        `${this.form.exam}-${this.form.examSub}`
      ];
      this.$request
        .fetchGetgroup({
          examName: examDetailId + ""
        })
        .then(res => {
          this.isGetGroup = true;
          this.tableData = res.data.data;
          this.saveGroup(res.data.data);
        });
    },
    saveGroup(data) {
      const examDetailId = this.examDetailIdMap[
        `${this.form.exam}-${this.form.examSub}`
      ];
      this.$request
        .fetchAddgroup({
          exam_detail_id: examDetailId,
          glist: data
        })
        .then(res => {
          if (res.data.desc) {
            this.$message.error(res.data.desc);
            return;
          }
          this.$message.success("获取成功");
        });
    },
    getGrade() {
      const obj = {};
      this.no_upload_grade_cno.map(item => {
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
    getStudentList() {
      // 查询某一个年级的所有学生
      this.$request
        .fetchSearchStu({
          level: this.form.level,
          // cno: this.form.cno,
          cno: ""
        })
        .then(res => {
          const result = res.data.result;
          const obj = {};
          for (let i = 0; i < result.length; i++) {
            obj[result[i].sno] = result[i];
          }
          this.studentMap = obj;
        })
        .catch(error => {
          console.log(error);
        });
    },
    confirm() {
      this.dialogTableVisible = false;
      this.pushreport();
      this.getGroup();
    },
    changeLevel(val) {
      this.form.level = val;
      this.getClassList();
    },
    changeExam(val) {
      this.form.exam = val;
      this.getExamSubList(val);
    }
  }
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
