<template>
  <div>
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
          <el-form-item label="班号">
            <el-input
              v-model="formInline.cno"
              size="medium"
              placeholder="班号"
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
        <el-table-column prop="sname" label="学生姓名"></el-table-column>
        <el-table-column prop="sno" label="学号"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="level" label="年级"></el-table-column>
        <el-table-column prop="cno" label="班级"> </el-table-column>
        <el-table-column prop="headteacher" label="班主任"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            > -->
            <el-popconfirm
              title="确定删除该名学生吗？"
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
  </div>
</template>

<script>
export default {
  name: "student",
  data() {
    return {
      formInline: {
        level: "",
        cno: "",
      },
      tableData: [
      ],
    };
  },
  mounted() {
    if (this.$route.query.level || this.$route.query.cno) {
      this.formInline = {
        level: this.$route.query.level,
        cno: this.$route.query.cno,
      };
    }
    this.getList();
  },
  methods: {
    getList() {
      let p = { all: 1 };
      if (this.formInline.level || this.formInline.cno) {
        p = {
          level: this.formInline.level,
          cno: this.formInline.cno,
        };
      }
      this.$request
        .fetchSearchStu(p)
        .then((res) => {
          this.tableData = res.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delete(id) {
      this.$request
        .fetchDelStu({ id: id })
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
    onSubmit() {},
    // handleEdit(index, row) {
    //   console.log(index, row);
    //   this.$message({
    //     showClose: true,
    //     message: index,
    //     row,
    //     type: "success",
    //   });
    // },
    handleDelete(row) {
      this.delete(row.id);
    },
  },
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
</style>
