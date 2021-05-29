<template>
  <div>
    <template>
      <div class="card">
        <h1>考试名称:{{ exam_name }} 科目名称:{{ subject_name }} 成绩单</h1>
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
  </div>
</template>

<script>
export default {
  name: "student",
  data() {
    return {
      tableData: [],
      exam_detail_id: "",
      subject_name: "",
      exam_name: "",
    };
  },
  mounted() {
    this.subject_name = this.$route.query.subject_name || "";
    this.exam_name = this.$route.query.exam_name || "";
    this.exam_detail_id = this.$route.query.exam_detail_id || "";
    this.getList();
  },
  methods: {
    getList() {
      this.$request
        .fetchSelectGradereport({ exam_detail_id: this.exam_detail_id })
        .then((res) => {
          this.curSubjectList = res.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
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

h1 {
  margin-bottom: 10px;
  color: #56a9ff;
  margin: 0 auto;
}
</style>
