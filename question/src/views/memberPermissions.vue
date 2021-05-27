<template>
  <div>
    <el-button class="addBtn" size="medium" @click="showDialog('create')"
      >新建账号</el-button
    >
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column prop="realname" label="用户名"> </el-table-column>
      <el-table-column prop="account" label="账户名"> </el-table-column>
      <el-table-column
        prop="rid"
        label="角色"
        :filters="[
          { text: '管理员', value: '2' },
          { text: '老师', value: '3' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.rid === '1'
                ? 'danger'
                : scope.row.rid === '2'
                ? 'success'
                : 'primary'
            "
            disable-transitions
            >{{ roleMap[scope.row.rid] }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDialog('edit', scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除此账号吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-button slot="reference" size="mini" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="337px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.realname"></el-input>
        </el-form-item>
        <el-form-item label="账号名" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="rid">
          <el-select v-model="ruleForm.rid" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
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
  name: "memberPermissions",
  data() {
    return {
      roleMap: {
        1: "root",
        2: "管理员",
        3: "老师",
      },
      dialogVisible: false,
      dialogTitle: "新建账户",
      dialogType: "create",
      ruleForm: {
        realname: "",
        account: "",
        pwd: "",
        rid: "2",
      },
      rules: {
        account: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      tableData5: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let type = 0;
      if (this.$store.getters.info.role === "admin") {
        type = 1;
      }
      this.$request
        .fetchSearchAccount({ type: type })
        .then((res) => {
          this.tableData5 = res.data.result;
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
        .fetchCreateAccount({
          account: this.ruleForm.account,
          pwd: this.ruleForm.pwd,
          realname: this.ruleForm.realname,
          rid: this.ruleForm.rid,
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
        .fetchDelAccount({ id: id })
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
        .fetchUpdateAccount({
          id: this.ruleForm.id,
          account: this.ruleForm.account,
          pwd: this.ruleForm.pwd,
          realname: this.ruleForm.realname,
          rid: this.ruleForm.rid,
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
    handleDelete(row) {
      this.delete(row.id);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    showDialog(type, row) {
      this.dialogVisible = true;
      this.dialogType = type;
      if (type === "create") {
        this.dialogTitle = "新建账户";
        this.ruleForm = {
          realname: "",
          account: "",
          pwd: "",
          rid: "2",
        };
        return;
      }
      this.dialogTitle = "修改账户";
      this.ruleForm = { ...row, pwd: ""};
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogType === "create" ? this.create() : this.update();
        } else {
          return false;
        }
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
