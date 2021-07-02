<template>
  <div>
    <div v-if="groupLevel === 'group'">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        class="myForm"
        size="medium"
        label-position="left"
      >
        <el-form-item label="年级">
          <el-date-picker
            v-model="form.level"
            type="year"
            value-format="yyyy"
            placeholder="选择年级"
            @change="changeLevel"
          >
          </el-date-picker>
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
            v-model="examSub"
            :show-all-levels="true"
            @change="changeExamId"
            size="medium"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="是否确认学生">
          <el-radio-group v-model="form.is_sure_student">
            <el-radio label="0">未确认</el-radio>
            <el-radio label="1">已确认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否确认题目">
          <el-radio-group v-model="form.is_sure_question">
            <el-radio label="0">未确认</el-radio>
            <el-radio label="1">已确认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="myFooter">
          <el-button type="primary" @click="search">查询</el-button>
          <el-popconfirm
            title="确定删除当前考试下的所有分组吗？"
            @confirm="delGroup"
            v-if="$store.getters.info.role === 'superAdmin'"
          >
            <el-button slot="reference" type="danger">删除分组</el-button>
          </el-popconfirm>
          <el-button
            type="primary"
            size="medium"
            @click="confirmCurGroup"
            v-if="!isConfirmGroup"
            >确认分组</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="getTableData(props.row.snos)"
              style="width: 100%"
              border
            >
              <el-table-column prop="sname" label="学生姓名"></el-table-column>
              <el-table-column prop="sno" label="学号"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="年级"></el-table-column>
        <el-table-column prop="cno" label="班号"></el-table-column>
        <el-table-column prop="groupid" label="组号"> </el-table-column>
        <el-table-column prop="rank" label="所属分级"> </el-table-column>
        <el-table-column prop="weakpoints_and_rate" label="薄弱知识点信息">
        </el-table-column>
        <!-- <el-table-column prop="snos" label="学生学号"> </el-table-column> -->
        <el-table-column label="是否确认学生">
          <template slot-scope="scope">
            <div>
              {{ +scope.row.is_sure_student === 0 ? "未确认" : "已确认" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否确认题目">
          <template slot-scope="scope">
            <div>
              {{ +scope.row.is_sure_question === 0 ? "未确认" : "已确认" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              v-if="
                $store.getters.info.role === 'superAdmin' &&
                !(
                  +scope.row.is_sure_student === 1 &&
                  +scope.row.is_sure_question === 1
                )
              "
              size="mini"
              @click="handleEdit(scope.row)"
              >更新</el-button
            > -->
            <el-button size="mini" @click="handleShowQues(scope.row)"
              >查看推荐试题</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="确认分组"
        :visible.sync="dialogFormVisible"
        width="650px"
      >
        <ConfirmGroup
          :form="form"
          :groupData="tableData"
          @getConfirmStatus="getConfirmStatus"
        ></ConfirmGroup>
      </el-dialog>
    </div>
    <RecommendQues v-else :curGroupData="curGroupData"></RecommendQues>
  </div>
</template>

<script>
import RecommendQues from "./recommendQues.vue";
import ConfirmGroup from "./confirmGroup.vue";
export default {
  name: "group-table",
  components: {
    RecommendQues: RecommendQues,
    ConfirmGroup: ConfirmGroup,
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        level: new Date().getFullYear() + "",
        cno: "",
        exam_detail_id: "",
        is_sure_student: "0",
        is_sure_question: "0",
      },
      formDialog: {},
      updateDate: {},
      examSub: [],
      options: [],
      tableData: [],
      classList: [],
      studentMap: {},
      curGroupData: null,
      isConfirmGroup: true,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("setGroupLevel", "group");
    next();
  },
  mounted() {
    this.getClassList();
    this.getExamList();
  },
  computed: {
    groupLevel() {
      return this.$store.getters.groupLevel;
    },
  },
  watch: {
    groupLevel(n, m) {
      if (n === "group") {
        this.search();
      }
    },
  },
  methods: {
    getList() {
      if (this.examSub.length === 0) {
        return this.$message.error("请选择考试科目");
      }
      this.isConfirmGroup = true;
      this.$request
        .fetchSearchgroup({
          ...this.form,
          exam_detail_id: this.examSub[1],
        })
        .then((res) => {
          this.tableData = res.data.result;
          for (let i = 0; i < this.tableData.length; i++) {
            console.log(this.tableData[i]["is_sure_student"]);
            if (+this.tableData[i]["is_sure_student"] === 0) {
              this.isConfirmGroup = false;
            }
          }
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
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getStudentList() {
      // 查询某一个年级的所有学生
      this.$request
        .fetchSearchStu({
          level: this.form.level,
          // cno: this.form.cno,
          cno: "",
        })
        .then((res) => {
          const result = res.data.result;
          const obj = {};
          for (let i = 0; i < result.length; i++) {
            obj[result[i].sno] = result[i];
          }
          this.studentMap = obj;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeLevel(val) {
      this.form.level = val;
      this.getClassList();
    },
    changeExamId(val) {
      this.examSub = val;
    },
    async search() {
      await this.getList();
      await this.getStudentList();
    },
    getTableData(snos) {
      if (!snos) {
        return [];
      }
      const data = snos.split(",");
      return data.map((item) => {
        return {
          sno: item,
          sname: this.studentMap[item] ? this.studentMap[item]["sname"] : "",
        };
      });
    },
    confirmUpdate() {
      this.$request
        .fetchUpdategroup({
          id: this.formDialog.id,
          is_sure_student: this.formDialog.is_sure_student,
          is_sure_question: this.formDialog.is_sure_question,
          groupid: this.formDialog.groupid,
          snos: this.formDialog.snos,
        })
        .then((res) => {
          this.dialogFormVisible = false;
          if (res.data.desc) {
            this.$message.error(res.data.desc);
          }
          this.search();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    confirmCurGroup() {
      if (this.tableData.length === 0) {
        return this.$message.error("请先查询要确认的分组");
      }
      this.dialogFormVisible = true;
    },
    delGroup() {
      if (this.examSub.length === 0) {
        return this.$message.error("请选择要删除分组的考试科目");
      }
      this.$request
        .fetchDelgroup({ exam_detail_id: this.examSub[1] })
        .then((res) => {
          this.search();
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success",
          });
        });
    },
    handleShowQues(row) {
      this.curGroupData = { ...row, subjectId: this.examSub };
      this.$store.dispatch("setGroupLevel", "ques");
    },
    getConfirmStatus(status) {
      this.getList();
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style scoped>
.groupTable {
  margin-bottom: 20px;
}

.myForm {
  position: relative;
}

.myFooter {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 0;
}
</style>
