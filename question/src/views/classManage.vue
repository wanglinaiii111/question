<template>
  <div>
    <el-button class="addBtn" size="medium" @click="showDialog('create')"
      >新建班级</el-button
    >
    <template>
      <div class="card">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="年级">
            <el-date-picker
              v-model="formInline.level"
              type="year"
              value-format="yyyy"
              placeholder="选择年级"
              size="medium"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="班主任">
            <el-select
              v-model="formInline.teacher"
              size="medium"
              placeholder="请选择班主任"
              filterable
            >
              <el-option key="all" label="全部" value=""></el-option>
              <el-option
                v-for="item in teacherList"
                :key="item.id"
                :label="item.account"
                :value="item.account"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getList"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="level" label="年级" sortable> </el-table-column>
        <el-table-column prop="cno" label="班号"> </el-table-column>
        <el-table-column prop="headteacher" label="班主任"> </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <el-button size="mini" @click="addStudentBtn(scope.row)"
              >添加学生</el-button
            >
            <el-button size="mini" @click="showStudent(scope.row)"
              >查看学生</el-button
            >
            <el-button size="mini" @click="showDialog('edit', scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定删除此班级吗？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button size="mini" type="danger" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="337px">
      <el-form :model="ruleForm" label-width="80px">
        <el-form-item label="年级">
          <el-date-picker
            v-model="ruleForm.level"
            type="year"
            value-format="yyyy"
            placeholder="选择年级"
            :disabled="dialogType === 'edit'"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班号" placeholder="请输入班号">
          <el-input
            v-model="ruleForm.cno"
            :disabled="dialogType === 'edit'"
          ></el-input>
        </el-form-item>
        <el-form-item label="班主任">
          <el-select
            v-model="ruleForm.headteacher"
            size="medium"
            placeholder="请选择班主任"
            filterable
          >
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.account"
              :value="item.account"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加学生" :visible.sync="dialogAddStu" width="337px">
      <el-form :model="stuForm" label-width="80px">
        <el-form-item label="学生姓名" placeholder="请输入学生姓名">
          <el-input v-model="stuForm.sname"></el-input>
        </el-form-item>
        <el-form-item label="学号" placeholder="请输入学生学号">
          <el-input v-model="stuForm.sno"></el-input>
        </el-form-item>
        <el-form-item label="性别" placeholder="请输入学生性别">
          <el-input v-model="stuForm.sex"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddStu = false">取 消</el-button>
        <el-button type="primary" @click="submitAddStuForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "filterTable",
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "新建班级",
      dialogType: "create",
      dialogAddStu: false,
      stuForm: {
        sname: "",
        sno: "",
        sex: "",
      },
      ruleForm: {
        level: [],
        cno: "",
        headteacher: "",
      },
      formInline: {
        level: "",
        teacher: "",
      },
      tableData: [],
      teacherList: [],
      classId: null,
    };
  },
  mounted() {
    this.getTeacherList();
    this.getList();
  },
  methods: {
    getTeacherList() {
      this.$request
        .fetchSearchAccount({ type: 1 })
        .then((res) => {
          this.teacherList = res.data.result;
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            showClose: true,
            message: "老师数据获取失败！",
            type: "error",
          });
        });
    },
    getList() {
      this.$request
        .fetchSearchClass({
          level: this.formInline.level,
          headteacher: this.formInline.teacher,
        })
        .then((res) => {
          this.tableData = res.data.result;
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            showClose: true,
            message: "列表数据获取失败！",
            type: "error",
          });
        });
    },
    create() {
      this.$request
        .fetchCreateClass({
          level: this.ruleForm.level,
          cno: this.ruleForm.cno,
          headteacher: this.ruleForm.headteacher,
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
          this.$message({
            showClose: true,
            message: "创建失败！",
            type: "error",
          });
        });
    },
    delete(id) {
      this.$request
        .fetchDelClass({ id: id })
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
          this.$message({
            showClose: true,
            message: "删除失败！",
            type: "error",
          });
        });
    },
    update() {
      this.$request
        .fetchUpdateClass({
          id: this.ruleForm.id,
          headteacher: this.ruleForm.headteacher,
        })
        .then((res) => {
          if (res.data.result) {
            this.dialogVisible = false;
            this.getList();
            this.$message({
              showClose: true,
              message: "修改成功！",
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
          this.$message({
            showClose: true,
            message: "修改失败！",
            type: "error",
          });
        });
    },
    showStudent(data) {
      this.$router.push({
        path: "/studentManage",
        query: {
          level: data.level,
          cno: data.cno,
        },
      });
    },
    showDialog(type, row) {
      this.dialogVisible = true;
      this.dialogType = type;
      if (type === "create") {
        this.dialogTitle = "新建班级";
        this.ruleForm = {
          level: [],
          cno: "",
          headteacher: "",
        };
        return;
      }
      this.dialogTitle = "修改班级";
      this.ruleForm = row;
    },
    handleDelete(row) {
      this.delete(row.id);
    },
    submitForm() {
      if (this.dialogType === "create") {
        this.create();
      } else {
        this.update();
      }
    },
    addStudentBtn(row) {
      this.dialogAddStu = true;
      this.classId = row.id;
    },
    submitAddStuForm() {
      this.$request
        .fetchAddStu({
          sname: this.stuForm.sname,
          sno: this.stuForm.sno,
          sex: this.stuForm.sex,
          classid: this.classId,
        })
        .then((res) => {
          if (res.data.result) {
            this.dialogAddStu = false;
            this.$message({
              showClose: true,
              message: "添加成功！",
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
          this.$message({
            showClose: true,
            message: "添加失败！",
            type: "error",
          });
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
</style>
