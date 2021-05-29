<template>
  <div>
    <template>
      <el-button class="addBtn" size="medium" @click="createSubject"
        >添加科目</el-button
      >
      <div class="card">
        <h1>考试名称：{{ exam_name }}</h1>
      </div>
      <el-table :data="curSubjectList">
        <el-table-column
          property="subject_name"
          label="科目名称"
        ></el-table-column>
        <el-table-column
          property="question_file_path"
          label="试卷文件名"
        ></el-table-column>
        <el-table-column
          property="answer_file_path"
          label="答案文件名"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="upload(scope.row)"
              >上传成绩单</el-button
            >
            <el-button size="mini" @click="showReport(scope.row)"
              >查看各班级成绩单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog title="添加科目" :visible.sync="dialogSubVisible" width="357px">
      <el-form :model="formAddSub" label-width="100px">
        <el-form-item label="考试科目">
          <el-select
            v-model="formAddSub.subject_id"
            size="medium"
            placeholder="请选择考试科目"
            filterable
          >
            <el-option
              v-for="item in allSubjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷存储路径">
          <el-input
            v-model="formAddSub.question_file_path"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item label="答案存储路径">
          <el-input
            v-model="formAddSub.answer_file_path"
            size="medium"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddSubject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "student",
  data() {
    return {
      dialogSubVisible: false,
      formAddSub: {
        subject_id: "",
        question_file_path: "",
        answer_file_path: "",
      },
      allSubjectList: [],
      curSubjectList: [],
      exam_id: "",
      exam_name: "",
    };
  },
  mounted() {
    this.exam_id = this.$route.query.exam_id || "";
    this.exam_name = this.$route.query.exam_name || "";
    this.getList();
    this.getSubjectList();
  },
  methods: {
    getList() {
      this.$request
        .fetchSelectExamsubject({ exam_id: this.exam_id })
        .then((res) => {
          this.curSubjectList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSubjectList() {
      this.$request
        .fetchSelectSubject({})
        .then((res) => {
          this.allSubjectList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createSubject() {
      this.dialogSubVisible = true;
      this.formAddSub = { ...this.formAddSub, exam_id: this.exam_id };
    },
    submitAddSubject() {
      this.$request
        .fetchCreateExamsubject(this.formAddSub)
        .then((res) => {
          if (res.data.result) {
            this.dialogSubVisible = false;
            this.getList();
            this.$message({
              showClose: true,
              message: "创建成功！",
              type: "success",
            });
            return;
          }
          if (res.data.desc) {
            this.$message({
              showClose: true,
              message: res.data.desc,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    upload(row) {},
    showReport(row) {
      this.$router.push({
        path: "/classReport",
        query: {
          exam_detail_id: row.exam_detail_id,
          subject_name: row.subject_name,
          exam_name: this.exam_name,
        },
      });
    },
  },
};
</script>

<style scoped>
.addBtn {
  float: right;
  margin-bottom: 20px;
}

.card {
  width: 100%;
  padding: 20px 10px 0;
  box-sizing: border-box;
  background-color: #ffffff;
  float: right;
}

h1 {
  margin-bottom: 10px;
  color: #56a9ff;
}
</style>
