<template>
  <div class="card">
    <el-form :inline="true" :model="formInline" size="medium">
      <el-form-item label="文件名称">
        <el-input v-model="formInline.file" placeholder="文件名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">下载文件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "student",
  data() {
    return {
      formInline: {
        file: "",
        // file: "4_5_2021_1_grade.docx"
      }
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      if (!this.formInline.file) {
        this.$message.error("请输入文件名");
        return;
      }

      this.$request
        .fetchDownload({
          filename: this.formInline.file
        })
        .then(res => {
          let that = this;
          var reader = new FileReader();
          reader.onload = function(event) {
            var content = reader.result; //内容就在这里
            if (content.includes('"desc":')) {
              that.$message.error(JSON.parse(content).desc);
            } else {
              let url = window.URL.createObjectURL(res.data);
              let aLink = document.createElement("a");
              aLink.style.display = "none";
              aLink.href = url;
              aLink.setAttribute("download", that.formInline.file); // 下载的文件
              document.body.appendChild(aLink);
              aLink.click();
              document.body.removeChild(aLink);
              window.URL.revokeObjectURL(url);
            }
          };
          reader.readAsText(res.data);
        });
    }
  }
};
</script>

<style scoped>
.card {
  width: 100%;
  height: 100%;
  padding: 40px 50px 0;
  box-sizing: border-box;
  background-color: #ffffff;
  float: right;
}
</style>
