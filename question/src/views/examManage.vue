<template>
  <div>
    <template v-if="$store.getters.examLevel === 'exam'">
      <el-button class="addBtn" size="medium" @click="dialogVisible = true"
        >创建考试</el-button
      >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="考试名称"></el-table-column>
        <el-table-column
          prop="start_time"
          label="开始时间"
          sortable
        ></el-table-column>
        <el-table-column
          prop="end_time"
          label="结束时间"
          sortable
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="createSubject(scope.row)"
              >添加科目</el-button
            > -->
            <el-button size="mini" @click="showSubject(scope.row)"
              >查看科目</el-button
            >
            <el-popconfirm
              title="确定删除这次考试吗？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="创建考试" :visible.sync="dialogVisible" width="337px">
        <el-form :model="ruleForm" label-width="80px">
          <el-form-item label="考试名称">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="ruleForm.start_time"
              type="datetime"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="ruleForm.end_time"
              type="datetime"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="create">确 定</el-button>
        </span>
      </el-dialog>
      <!-- <el-dialog title="添加科目" :visible.sync="dialogSubVisible" width="357px">
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
            :http-request="param => upload(param, 'questions')"
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
            :http-request="param => upload(param, 'answers')"
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
    </el-dialog> -->
    </template>
    <SubjectList
      v-else-if="$store.getters.examLevel === 'subject'"
      :param="curRow"
      @func="getMsg"
    ></SubjectList>
    <ClassReport
      v-else-if="$store.getters.examLevel === 'grade'"
      :param="gradeParam"
      @func="getGradeMsg"
    ></ClassReport>
  </div>
</template>

<script>
import SubjectList from "./subjectList";
import ClassReport from "./classReport";
export default {
  name: "student",
  components: {
    SubjectList: SubjectList,
    ClassReport: ClassReport,
  },
  data() {
    return {
      dialogVisible: false,
      dialogSubVisible: false,
      ruleForm: {
        name: "",
        start_time: "",
        end_time: "",
      },
      formAddSub: {
        subject_id: "1",
        question_file_path: "",
        answer_file_path: "",
      },
      tableData: [],
      allSubjectList: [],
      // fileList: [],
      // answersFileList: [],
      // fileName: "",
      // answersFileName: ""
      curRow: {},
      gradeParam: {},
    };
  },
  mounted() {
    this.getList();
    this.getSubjectList();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("setExamLevel", "exam");
    next();
  },
  methods: {
    // upload(param, type) {
    //   const fileType = param.file.name.split(".").pop();
    //   const filename = `${this.formAddSub.exam_id}_${this.formAddSub.subject_id}_${type}.${fileType}`;
    //   if (type === "questions") {
    //     this.fileName = filename;
    //   } else {
    //     this.answersFileName = filename;
    //   }
    //   let formData = new FormData();
    //   formData.append("files", param.file);
    //   formData.append("filename", filename);
    //   console.log(formData);
    //   this.$request.fetchExamUpload(formData).then(res => {
    //     // console.log(res);
    //     if (res.IsSuccess) {
    //       this.imgList.push(res.Data.Data);
    //     }
    //   });
    // },
    getList() {
      this.$request
        .fetchSelectExam({})
        .then((res) => {
          this.tableData = res.data.result;
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
    create() {
      this.$request
        .fetchCreateExam({
          name: this.ruleForm.name,
          start_time: this.ruleForm.start_time,
          end_time: this.ruleForm.end_time,
        })
        .then((res) => {
          if (res.data.result) {
            this.dialogVisible = false;
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
    delete(id) {
      this.$request
        .fetchDelExam({ exam_id: id })
        .then((res) => {
          this.getList();
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(row) {
      this.delete(row.exam_id);
    },
    createSubject(row) {
      this.dialogSubVisible = true;
      this.formAddSub = { ...this.formAddSub, exam_id: row.exam_id };
    },
    // submitAddSubject() {
    //   if(!this.fileName){
    //     this.$message.error(`试卷未上传，请上传试卷`);
    //     return
    //   }
    //   if(!this.answersFileName){
    //     this.$message.error(`答案未上传，请上传答案`);
    //     return
    //   }
    //   this.$request
    //     .fetchCreateExamsubject({
    //       ...this.formAddSub,
    //       question_file_path: this.fileName,
    //       answer_file_path: this.answersFileName
    //     })
    //     .then(res => {
    //       if (res.data.result) {
    //         this.dialogSubVisible = false;
    //         this.getList();
    //         this.$message({
    //           showClose: true,
    //           message: "创建成功！",
    //           type: "success"
    //         });
    //         return;
    //       }
    //       if (res.data.desc) {
    //         this.$message({
    //           showClose: true,
    //           message: res.data.desc,
    //           type: "error"
    //         });
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    showSubject(row) {
      // this.$router.push({
      //   path: "/subjectList",
      //   query: {
      //     exam_id: row.exam_id,
      //     exam_name: row.name,
      //   },
      // });
      this.curRow = {
        exam_id: row.exam_id,
        exam_name: row.name,
      };
      this.$store.dispatch("setExamLevel", "subject");
    },
    handleExceed(type) {
      this.$message.warning(`您已上传${type}，请将已上传的文件删除后重新上传`);
    },
    changeSubject() {
      this.fileList = [];
      this.answersFileList = [];
    },
    getMsg(p) {
      this.gradeParam = p;
    },
    getGradeMsg(p) {
      this.curRow = p;
    },
  },
};
</script>

<style scoped>
.addBtn {
  float: right;
  margin-bottom: 20px;
}
</style>
