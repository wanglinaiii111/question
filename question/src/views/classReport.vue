<template>
  <div>
    <el-button class="addBtn" size="medium" @click="clickUpload"
      >上传成绩单</el-button
    >
    <template>
      <div class="card">
        <h1>{{ exam_name }}-{{ subject_name }} 成绩单</h1>
      </div>
      <el-table :data="tableData">
        <el-table-column property="level" label="年级"></el-table-column>
        <el-table-column property="cno" label="班级"></el-table-column>
        <el-table-column
          property="header_teacher_name"
          label="班主任"
        ></el-table-column>
        <el-table-column
          property="grade_file_path"
          label="成绩单"
        ></el-table-column>
      </el-table>
    </template>
    <el-dialog title="上传成绩单" :visible.sync="dialogGrade" width="347px">
      <el-form :model="gradeForm" label-width="90px">
        <el-form-item label="班级">
          <el-cascader
            v-model="gradeForm.class"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="上传成绩单">
          <el-upload
            action=""
            :with-credentials="true"
            :limit="1"
            :file-list="gradeFileList"
            :http-request="param => upload(param, 'grade')"
            :on-exceed="() => handleExceed('成绩单')"
          >
            <el-button size="small" type="primary">上传成绩单</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddStu = false">取 消</el-button>
        <el-button type="primary" @click="submitGradeForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "student",
  data() {
    return {
      dialogGrade: false,
      tableData: [],
      exam_detail_id: "",
      subject_name: "",
      exam_name: "",
      exam_id: "",
      subject_id: "",
      gradeFileList: [],
      gradeFileName: "",
      gradeForm: {
        class: ""
      },
      options: []
    };
  },
  mounted() {
    this.subject_name = this.$route.query.subject_name || "";
    this.exam_name = this.$route.query.exam_name || "";
    this.exam_detail_id = this.$route.query.exam_detail_id || "";
    this.exam_id = this.$route.query.exam_id || "";
    this.subject_id = this.$route.query.subject_id || "";

    this.getList();
    this.getClassList();
  },
  methods: {
    getList() {
      this.$request
        .fetchSelectGradereport({ exam_detail_id: this.exam_detail_id })
        .then(res => {
          this.tableData = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    upload(param, type) {
      const fileType = param.file.name.split(".").pop();
      const filename = `${this.exam_id}_${this.subject_id}_${type}.${fileType}`;
      this.gradeFileName = filename;
      let formData = new FormData();
      formData.append("files", param.file);
      formData.append("filename", filename);
      this.$request.fetchExamUpload(formData).then(res => {
        // console.log(res);
        if (res.IsSuccess) {
          this.imgList.push(res.Data.Data);
        }
      });
    },
    getClassList() {
      this.$request
        .fetchSearchClass({
          level: "",
          headteacher: ""
        })
        .then(res => {
          const result = res.data.result;
          let data = [];
          for (let i = 0; i < result.length; i++) {
            const curClass = result[i];
            let curLevel = data.find(v => v.value === curClass.level);
            if (!curLevel) {
              curLevel = {
                value: curClass.level,
                label: curClass.level,
                children: []
              };
              data.push(curLevel);
            }
            curLevel.children.push({
              value: curClass.id,
              label: curClass.cno
            });
          }
          this.options = data;
        })
        .catch(error => {
          console.log(error);
          this.$message({
            showClose: true,
            message: "班级列表数据获取失败！",
            type: "error"
          });
        });
    },
    submitGradeForm() {
      if (!this.gradeFileName) {
        this.$message.error(`成绩单未上传，请上传成绩单`);
        return;
      }
      this.$request
        .fetchCreateGradereport({
          exam_id: this.exam_id,
          exam_detail_id: this.exam_detail_id,
          class_id: this.gradeForm.class,
          grade_file_path: this.gradeFileName
        })
        .then(res => {
          if (res.data.result) {
            this.dialogGrade = false;
            this.getList();
            this.$message({
              showClose: true,
              message: "上传成功！",
              type: "success"
            });
            return;
          }
          if (res.data.desc) {
            this.$message({
              showClose: true,
              message: res.data.desc,
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickUpload() {
      this.dialogGrade = true;
      this.gradeForm.class = "";
      this.gradeFileList = [];
    },
    handleExceed(type) {
      this.$message.warning(`您已上传${type}，请将已上传的文件删除后重新上传`);
    },
    handleChange(value) {
      this.gradeForm.class = value[1];
    }
  }
};
</script>

<style scoped>
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
  margin: 0 auto;
}

.addBtn {
  float: right;
  margin-bottom: 20px;
}
</style>
