<template>
  <div>
    <template>
      <el-table :data="tableData">
        <el-table-column
          property="exam_name"
          label="考试名称"
        ></el-table-column>
        <el-table-column property="subject_name" label="科目"></el-table-column>
        <el-table-column
          property="start_time"
          label="开始时间"
        ></el-table-column>
        <el-table-column
          property="question_file_path"
          label="试题文件名"
        ></el-table-column>
        <el-table-column
          property="answer_file_path"
          label="答案文件名"
        ></el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "noUpload",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$request
        .fetchSelectExamNoUpload({})
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>
