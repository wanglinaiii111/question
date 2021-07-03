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
            v-model="examSub"
            :show-all-levels="true"
            @change="changeExamId"
            size="medium"
          ></el-cascader>
        </el-form-item>
        <el-form-item class="myFooter">
          <el-button type="primary" @click="search">查询</el-button>
          <el-popconfirm
            title="确定删除当前考试下的所有分组吗？"
            @confirm="delGroup"
          >
            <el-button slot="reference" type="danger">删除分组</el-button>
          </el-popconfirm>
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
        <el-table-column prop="groupid" label="组号"></el-table-column>
        <el-table-column prop="rank" label="所属分级"></el-table-column>
        <el-table-column prop="weakpoints_and_rate" label="薄弱知识点信息">
          <template slot-scope="scope">
            <div>
              <el-button size="mini" @click="showPoint(scope.row)"
                >查看</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否确认学生">
          <template slot-scope="scope">
            <div>
              <el-button
                v-if="+scope.row.is_sure_student === 0"
                size="mini"
                type="primary"
                @click="confirmCurGroup(scope.row)"
                >确认分组</el-button
              >
              <span v-else>已确认</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否确认题目">
          <template slot-scope="scope">
            <div>
              <el-button
                v-if="+scope.row.is_sure_question === 0"
                size="mini"
                @click="handleShowQues(scope.row)"
                type="primary"
                >确认试题</el-button
              >
              <el-button v-else size="mini" @click="handleShowQues(scope.row)"
                >查看推荐试题</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="确认当前分组"
        :visible.sync="dialogFormVisible"
        width="650px"
      >
        <ConfirmGroup
          :form="form"
          :groupData="tableData"
          @getConfirmStatus="getConfirmStatus"
          :curGroupData="curGroupData"
        ></ConfirmGroup>
      </el-dialog>
      <el-dialog
        title="薄弱知识点信息"
        :visible.sync="dialogPoint"
        width="650px"
      >
        <el-table :data="gridData">
          <el-table-column property="weakpoint" label="薄弱知识点"></el-table-column>
          <el-table-column property="rate" label="正确率"></el-table-column>
        </el-table>
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
      dialogPoint: false,
      form: {
        level: new Date().getFullYear() + "",
        cno: "",
      },
      formDialog: {},
      updateDate: {},
      examSub: [],
      options: [],
      tableData: [],
      classList: [],
      studentMap: {},
      curGroupData: null,
      gridData: [],
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
      this.$request
        .fetchSearchgroup({
          level: this.form.level,
          cno: this.form.cno,
          exam_detail_id: this.examSub[1],
        })
        .then((res) => {
          this.tableData = res.data.result;
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
    confirmCurGroup(row) {
      this.dialogFormVisible = true;
      this.curGroupData = row;
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
    showPoint(row) {
      this.dialogPoint = true;
      this.gridData = this.getWeakKnowledge(row.weakpoints_and_rate);
    },
    getWeakKnowledge(data) {
      const arr = data.split("||");
      const newArr = [];
      for (let i = 0; i < arr.length; i++) {
        newArr.push({
          weakpoint: arr[i].split("_")[0],
          rate: arr[i].split("_")[1] * 100 + "%",
        });
      }
      return newArr;
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
