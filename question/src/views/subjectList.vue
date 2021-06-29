<template>
  <div>
    <template>
      <el-button class="back" size="medium" @click="back">返回上一级</el-button>
      <el-button
        class="addBtn"
        size="medium"
        @click="createSubject"
        v-if="$store.getters.info.role !== 'ordinary'"
        >添加科目</el-button
      >
      <div class="card">
        <h1>{{ exam_name }}</h1>
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
            <el-button size="mini" @click="showReport(scope.row)"
              >查看各班级成绩单</el-button
            >
            <el-button size="mini" @click="showQues(scope.row)"
              >查看试题</el-button
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
            @change="changeSubject"
          >
            <el-option
              v-for="item in allSubjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传试卷">
          <el-upload
            action=""
            :with-credentials="true"
            :limit="1"
            :file-list="fileList"
            :http-request="(param) => upload(param, 'questions')"
            :on-exceed="() => handleExceed('试卷')"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传答案">
          <el-upload
            action=""
            :with-credentials="true"
            :limit="1"
            :file-list="answersFileList"
            :http-request="(param) => upload(param, 'answers')"
            :on-exceed="() => handleExceed('答案')"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSubVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddSubject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "subject",
  props: ["param"],
  data() {
    return {
      dialogSubVisible: false,
      formAddSub: {
        subject_id: "1",
        question_file_path: "",
        answer_file_path: "",
      },
      allSubjectList: [],
      curSubjectList: [],
      exam_id: "",
      exam_name: "",
      fileList: [],
      answersFileList: [],
      fileName: "",
      answersFileName: "",
    };
  },
  mounted() {
    this.exam_id = this.param.exam_id || "";
    this.exam_name = this.param.exam_name || "";
    this.getList();
    this.getSubjectList();
  },
  methods: {
    upload(param, type) {
      const fileType = param.file.name.split(".").pop();
      const filename = `${this.formAddSub.exam_id}_${this.formAddSub.subject_id}_${type}.${fileType}`;
      if (type === "questions") {
        this.fileName = filename;
      } else if (type === "answers") {
        this.answersFileName = filename;
      } else {
        this.gradeFileName = filename;
      }
      let formData = new FormData();
      formData.append("files", param.file);
      formData.append("filename", filename);
      console.log(formData);
      this.$request.fetchExamUpload(formData).then((res) => {
        if (res.IsSuccess) {
          this.imgList.push(res.Data.Data);
        }
      });
    },
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
      this.fileList = [];
      this.answersFileList = [];
      this.formAddSub = { ...this.formAddSub, exam_id: this.exam_id };
    },
    submitAddSubject() {
      if (!this.fileName) {
        this.$message.error(`试卷未上传，请上传试卷`);
        return;
      }
      if (!this.answersFileName) {
        this.$message.error(`答案未上传，请上传答案`);
        return;
      }
      this.$request
        .fetchCreateExamsubject({
          ...this.formAddSub,
          question_file_path: this.fileName,
          answer_file_path: this.answersFileName,
        })
        .then((res) => {
          if (res.data.result) {
            this.dialogSubVisible = false;
            this.getList();
            this.$message({
              showClose: true,
              message: "上传成功！",
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
    showReport(row) {
      this.$emit("func", {
        exam_detail_id: row.exam_detail_id,
        subject_name: row.subject_name,
        exam_name: this.exam_name,
        exam_id: row.exam_id,
        subject_id: row.subject_id,
      });
      this.$store.dispatch("setExamLevel", "grade");
    },
    handleExceed(type) {
      this.$message.warning(`您已上传${type}，请将已上传的文件删除后重新上传`);
    },
    changeSubject() {
      this.fileList = [];
      this.answersFileList = [];
    },
    back() {
      this.$store.dispatch("setExamLevel", "exam");
    },
    showQues(row) {
      this.$emit("func", {
        exam_detail_id: row.exam_detail_id,
        subject_name: row.subject_name,
        exam_name: this.exam_name,
        exam_id: row.exam_id,
        subject_id: row.subject_id,
      });
      this.$store.dispatch("setExamLevel", "quesList");
    },
  },
};
</script>

<style scoped>
.addBtn {
  float: right;
  margin-bottom: 20px;
}

.back {
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
