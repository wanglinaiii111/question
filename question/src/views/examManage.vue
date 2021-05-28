<template>
  <div>
    <template>
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
            <el-button size="mini" @click="createSubject(scope.row)"
              >添加科目</el-button
            >
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
    </template>
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
        <el-button @click="dialogSubVisible = false">取 消</el-button>
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
      dialogVisible: false,
      dialogSubVisible: false,
      ruleForm: {
        name: "",
        start_time: "",
        end_time: "",
      },
      formAddSub: {
        subject_id: "",
        question_file_path: "",
        answer_file_path: "",
      },
      tableData: [],
      allSubjectList: [],
    };
  },
  mounted() {
    this.getList();
    this.getSubjectList();
  },
  methods: {
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
    submitAddSubject() {
      this.$request
        .fetchCreateExamsubject(this.formAddSub)
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
    showSubject(row) {
      this.$router.push({
        path: "/subjectList",
        query: {
          exam_id: row.exam_id,
          exam_name: row.name,
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
</style>
