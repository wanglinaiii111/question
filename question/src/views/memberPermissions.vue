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
          { text: 'root', value: '1' },
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
            @confirm="handleDelete(scope.$index, scope.row)"
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
            <el-option label="root" value="1"></el-option>
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
      ruleForm: {
        realname: "",
        account: "",
        pwd: "",
        rid: "2",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        account: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      tableData5: [
        {
          id: "1",
          account: "wangxiaohu123",
          realname: "王小虎",
          rid: "1",
        },
        {
          id: "2",
          account: "wangxiaohu456",
          realname: "王小虎",
          rid: "2",
        },
        {
          id: "3",
          account: "wangxiaohu789",
          realname: "王小虎",
          rid: "3",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    handleDelete(index, row) {
      this.$message({
        showClose: true,
        message: "删除成功！",
        type: "success",
      });
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    showDialog(type, row) {
      this.dialogVisible = true;
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
      this.ruleForm = { ...row, pwd: "" };
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.$message({
            showClose: true,
            message: "创建成功！",
            type: "success",
          });
        } else {
          // this.$message({
          //   showClose: true,
          //   message: "创建失败，请稍后重试！",
          //   type: "error",
          // });
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
