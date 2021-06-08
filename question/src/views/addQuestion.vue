<template>
  <div class="addQues">
    <el-button size="medium" @click="confirmBack">返回上一级</el-button>
    <div class="formContainer">
      <h1 class="quesTitle">
        {{ $store.getters.questionLevel === "add" ? "创建试题" : "更新试题" }}
      </h1>
      <el-form :model="form" label-width="80px">
        <el-form-item label="题库类型">
          <el-radio-group v-model="form.libType" @change="changeLibType">
            <el-radio :label="1">公共题库</el-radio>
            <el-radio :label="2">推荐题库</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="试题类型">
          <el-input v-model="form.qtype" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="难度">
          <el-input-number
            v-model="form.difficulty"
            size="medium"
            :precision="2"
            :step="0.1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="form.source" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="科目">
          <el-select
            v-model="form.subject_id"
            size="medium"
            placeholder="请选择考试科目"
            filterable
            @change="changeSubject"
            :disabled="$store.getters.questionLevel === 'update' ? true : false"
          >
            <el-option
              v-for="item in allSubjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="知识点">
          <el-cascader
            :props="props"
            v-model="form.points"
            :show-all-levels="false"
            @change="changePoint"
            size="medium"
            :key="form.subject_id"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题干">
          <TEditor ref="editor" v-model="form.stem" editType="stem" />
        </el-form-item>
        <el-form-item label="答案">
          <TEditor ref="editor" v-model="form.answer" editType="answer" />
        </el-form-item>
        <el-form-item label="考试题">
          <el-radio-group v-model="form.isExam" @change="changeIsExam">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          <div>
            <el-cascader
              v-if="form.isExam === 1"
              :props="examProps"
              v-model="form.exam_detail_id"
              :show-all-levels="false"
              @change="changeExamId"
              size="medium"
            ></el-cascader>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$store.getters.questionLevel === 'add'"
            type="primary"
            @click="onSubmit"
            >立即创建</el-button
          >
          <el-button v-else type="primary" @click="onSubmitUpdate"
            >更新</el-button
          >
          <el-button @click="confirmBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { HtmlUtil } from "../utils/htmlEncode";
export default {
  name: "add-question",
  props: ["updateData"],
  data() {
    let that = this;
    return {
      HtmlUtil: HtmlUtil,
      allSubjectList: [],
      resolve: null,
      resolve_exam: null,
      form: {
        libType: 1,
        qtype: "",
        difficulty: 0,
        source: "",
        isExam: 0,
        points: "",
        exam_detail_id: "",
        stem: "",
        answer: "",
        subject_id: "4",
      },
      props: {
        lazy: true,
        checkStrictly: true,
        lazyLoad(node, resolve) {
          that.resolve = resolve;
          if (node.level === 0) {
            that.getKnowledgeNode(0);
          } else {
            if (node.data.is_have_childe === 0) return;
            that.getKnowledgeNode(node.data.tree_id);
          }
        },
      },
      examProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          that.resolve_exam = resolve;
          if (node.level === 0) {
            that.getExamList();
          } else {
            that.getExam_subjectList(node.data.value);
          }
        },
      },
    };
  },
  mounted() {
    if (this.updateData) {
      this.form = {
        ...this.updateData,
        points: this.updateData.parentNodes,
        isExam: this.updateData.exam_detail_id ? 1 : 0,
        stem: HtmlUtil.htmlDecodeByRegExp(this.updateData.stem),
        answer: this.isImage(this.updateData.answer)
          ? `<img src=${this.updateData.answer} alt />`
          : HtmlUtil.htmlDecodeByRegExp(this.updateData.answer),
      };
    }
    this.getSubjectList();
  },
  methods: {
    getKnowledgeNode(id) {
      this.$request
        .fetchKnowledgeNode({
          parentid: id,
          subjectid: this.form.subject_id,
        })
        .then((res) => {
          const nodes = res.data.map((item) => ({
            value: item.name,
            tree_id: item.tree_id,
            label: item.name,
            leaf: item.is_have_childe === 0 ? true : false,
          }));
          this.resolve(nodes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSubjectList() {
      this.$request.fetchSelectSubject({}).then((res) => {
        this.allSubjectList = res.data;
      });
    },
    getExamList() {
      this.$request
        .fetchSelectExam({})
        .then((res) => {
          console.log(res.data.result);
          const nodes = res.data.result.map((item) => ({
            value: item.exam_id,
            label: item.name,
          }));
          console.log(nodes);
          this.resolve_exam(nodes);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getExam_subjectList(id) {
      this.$request
        .fetchSelectExamsubject({ exam_id: id })
        .then((res) => {
          const nodes = res.data.map((item) => ({
            value: item.exam_detail_id,
            label: item.subject_name,
            leaf: true,
          }));
          this.resolve_exam(nodes);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeSubject(val) {
      this.form.subject_id = val;
    },
    changeLibType(val) {
      this.form.libType = val;
    },
    changeIsExam(val) {
      this.form.isExam = val;
    },
    changePoint(val) {
      this.form.points = val;
    },
    changeExamId(val) {
      this.form.exam_detail_id = val[val.length - 1];
    },
    onSubmit() {
      //创建
      console.log(this.form);
      if (this.form.isExam === 1 && !this.form.exam_detail_id) {
        return this.$message.error("请为考试题选择考试科目");
      }
      if (!this.form.points) {
        return this.$message.error("请选择知识点");
      }
      if (!this.form.qtype) {
        return this.$message.error("请添加试题类型");
      }
      if (!this.form.stem) {
        return this.$message.error("请添加题干");
      }
      if (!this.form.answer) {
        return this.$message.error("请为试题添加答案");
      }
      const len = this.form.points.length;
      this.$request
        .fetchAddQuestion({
          libtype: this.form.libType,
          qtype: this.form.qtype,
          difficulty: this.form.difficulty,
          nums: "0",
          qno: new Date().getTime(),
          stem: HtmlUtil.htmlEncodeByRegExp(this.form.stem),
          source: this.form.source,
          points: len > 1 ? this.form.points[len - 1] : this.form.points[0],
          answer: HtmlUtil.htmlEncodeByRegExp(this.form.answer),
          exam_detail_id:
            this.form.isExam === 1 ? this.form.exam_detail_id : "",
          subject_id: this.form.subject_id,
        })
        .then((res) => {
          if (res.data.result) {
            this.$store.dispatch("setQuestionLevel", "list");
            this.$message({
              showClose: true,
              message: "创建成功！",
              type: "success",
            });
            return;
          }
          if (res.data.desc) {
            this.confirmBack();
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
    onSubmitUpdate() {
      //更新
      const len = this.form.points.length;
      this.$request
        .fetchUpdateQuestion({
          libtype: this.form.libType,
          qtype: this.form.qtype,
          difficulty: this.form.difficulty,
          nums: "0",
          qno: this.form.qno,
          stem: HtmlUtil.htmlEncodeByRegExp(this.form.stem),
          source: this.form.source,
          points: len > 1 ? this.form.points[len - 1] : this.form.points[0],
          answer: HtmlUtil.htmlEncodeByRegExp(this.form.answer),
          exam_detail_id:
            this.form.isExam === 1 ? this.form.exam_detail_id : "",
          id: this.form.id,
        })
        .then((res) => {
          if (res.data.result) {
            this.$message({
              showClose: true,
              message: "更新成功！",
              type: "success",
            });
            return;
          }
          if (res.data.desc) {
            this.confirmBack();
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
    confirmBack() {
      this.$store.dispatch("setQuestionLevel", "list");
    },
    isImage(str) {
      if (!str) return;
      return str.indexOf("http") == 0 ? true : false;
    },
  },
};
</script>

<style scoped>
.addQues {
  width: 100%;
}

.formContainer {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  margin-top: 20px;
  padding: 20px 10px;
  box-sizing: border-box;
}

.quesTitle {
  color: #56a9ff;
  margin-bottom: 10px;
}
.addQues .el-input--medium {
  width: 217px;
}
</style>
