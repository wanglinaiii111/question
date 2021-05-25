<template>
  <div>
    <el-button class="addBtn" size="medium" @click="showDialog('create')"
      >新建班级</el-button
    >
    <template>
      <div class="card">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="年级">
            <el-input
              v-model="formInline.level"
              size="medium"
              placeholder="年级"
            ></el-input>
          </el-form-item>
          <el-form-item label="班主任">
            <el-input
              v-model="formInline.teacher"
              size="medium"
              placeholder="班主任"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="onSubmit"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="level" label="年级" sortable> </el-table-column>
        <el-table-column prop="cno" label="班号"> </el-table-column>
        <el-table-column prop="headteacher" label="班主任"> </el-table-column>
        <el-table-column label="操作" width='250px'>
          <template slot-scope="scope">
            <el-button size="mini" @click="showDialog('edit', scope.row)"
              >添加学生</el-button
            >
            <el-button size="mini" @click="showDialog('edit', scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定删除此班级吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
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
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="年级" prop="level">
          <el-date-picker
            v-model="ruleForm.level"
            type="year"
            value-format="yyyy"
            placeholder="选择年级"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班号" prop="cno" placeholder="请输入班号">
          <el-input v-model="ruleForm.cno"></el-input>
        </el-form-item>
        <el-form-item label="班主任" prop="headteacher">
          <el-select v-model="ruleForm.headteacher" placeholder="请选择班主任">
            <el-option label="班主任1" value="1"></el-option>
            <el-option label="班主任2" value="2"></el-option>
            <el-option label="班主任3" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
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
      ruleForm: {
        level: [],
        cno: "",
        headteacher: "",
      },
      formInline: {
        level: "",
        teacher: "",
      },
      tableData: [
        { level: "2021", cno: "3", headteacher: "秀儿" },
        { level: "2023", cno: "3", headteacher: "秀儿" },
        { level: "2020", cno: "3", headteacher: "秀儿" },
      ],
    };
  },
  methods: {
    onSubmit() {},
    showDialog(type, row) {
      this.dialogVisible = true;
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
    handleDelete(index, row) {
      console.log(index, row);
      this.$message({
        showClose: true,
        message: "删除成功！",
        type: "success",
      });
    },
    submitForm() {
      console.log(this.ruleForm);
      this.$message({
        showClose: true,
        message: "创建成功！",
        type: "success",
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
