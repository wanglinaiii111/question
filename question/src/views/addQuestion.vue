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
          <!-- <el-input v-model="form.qtype" size="medium"></el-input> -->
          <el-select v-model="form.qtype" size="medium">
            <el-option
              v-for="item in qtypeOption"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度">
          <!-- <el-input-number
            v-model="form.difficulty"
            size="medium"
            :precision="2"
            :step="0.1"
          ></el-input-number> -->
          <el-select v-model="form.difficulty" size="medium">
            <el-option
              v-for="item in diffOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
          <TEditor
            ref="editor"
            v-model="form.answer"
            editType="answer"
            :time="time"
          />
        </el-form-item>
        <el-form-item label="考试题">
          <el-radio-group v-model="form.isExam" @change="changeIsExam">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          <div>
            <!-- <el-cascader
              v-if="form.isExam === 1"
              :props="examProps"
              v-model="form.exam_detail_id"
              :show-all-levels="false"
              @change="changeExamId"
              size="medium"
            ></el-cascader> -->
            <el-cascader
              v-if="form.isExam === 1"
              :options="options"
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
import { url } from "../api/urls/api";
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
      time: new Date().getTime(),
      form: {
        libType: 1,
        qtype: "选择题",
        difficulty: 0.94,
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
      // examProps: {
      //   lazy: true,
      //   lazyLoad(node, resolve) {
      //     that.resolve_exam = resolve;
      //     if (node.level === 0) {
      //       that.getExamList();
      //     } else {
      //       that.getExam_subjectList(node.data.value);
      //     }
      //   },
      // },
      options: [],
      diffOptions: [
        {
          value: 0.94,
          label: "容易",
        },
        {
          value: 0.85,
          label: "较易",
        },
        {
          value: 0.65,
          label: "中等",
        },
        {
          value: 0.4,
          label: "较难",
        },
        {
          value: 0,
          label: "困难",
        },
      ],
      qtypeOption: [],
    };
  },
  mounted() {
    console.log(this.updateData);
    if (this.updateData) {
      this.form = {
        ...this.updateData,
        points: this.updateData.parentNodes,
        isExam: this.updateData.exam_detail_id ? 1 : 0,
        stem: HtmlUtil.htmlDecodeByRegExp(this.updateData.stem),
        answer: this.isImage(this.updateData.answer)
          ? `<img src=${
              url +
              "exam/download?filename=" +
              this.getNo(this.updateData.weburl) +
              ".png&answerpic=1&stempic="
            } alt />`
          : HtmlUtil.htmlDecodeByRegExp(this.updateData.answer),
        difficulty: this.getDiff(this.updateData.difficulty),
      };
    }
    this.getSubjectList();
    this.getExamList();
    this.getQtype();
  },
  methods: {
    getQtype() {
      this.$request.fetchQtype({}).then((res) => {
        if (res.data.desc) {
          if (res.data.desc) {
            this.$message({
              showClose: true,
              message: res.data.desc,
              type: "error",
            });
          }
          return;
        }
        this.qtypeOption = res.data.qtype_name_list;
      });
    },
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
          // const nodes = res.data.result.map((item) => ({
          //   value: item.exam_id,
          //   label: item.name,
          // }));
          // this.resolve_exam(nodes);
          this.options = [];
          const result = res.data.result;
          result.map(async (item, index) => {
            const sub = await this.getExam_subjectList(item.exam_id);
            this.options.push({
              value: item.exam_id,
              label: item.name,
              children: [],
            });
            sub.map((subItem) => {
              if (
                this.updateData &&
                +this.updateData.exam_detail_id === +subItem.exam_detail_id
              ) {
                this.form.exam_detail_id = [
                  item.exam_id,
                  subItem.exam_detail_id,
                ];
              }
              this.options[index].children.push({
                value: subItem.exam_detail_id,
                label: subItem.subject_name,
              });
            });
            return item;
          });
          console.log(this.options);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getExam_subjectList(id) {
      return this.$request
        .fetchSelectExamsubject({ exam_id: id })
        .then((res) => {
          // const nodes = res.data.map((item) => ({
          //   value: item.exam_detail_id,
          //   label: item.subject_name,
          //   leaf: true,
          // }));
          // this.resolve_exam(nodes);
          return res.data;
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
      console.log(val);
      this.form.exam_detail_id = val;
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
      const len_id = this.form.exam_detail_id.length;
      this.$request
        .fetchAddQuestion({
          libtype: this.form.libType,
          qtype: this.form.qtype,
          difficulty: this.form.difficulty,
          nums: "0",
          qno: this.time,
          stem: HtmlUtil.htmlEncodeByRegExp(this.form.stem),
          source: this.form.source,
          points: len > 1 ? this.form.points[len - 1] : this.form.points[0],
          answer: HtmlUtil.htmlEncodeByRegExp(this.form.answer),
          exam_detail_id:
            this.form.isExam === 1 ? this.form.exam_detail_id[len_id - 1] : "",
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
      let id = this.form.exam_detail_id;
      if (this.form.exam_detail_id && this.form.exam_detail_id.length > 0) {
        id = this.form.exam_detail_id[this.form.exam_detail_id.length - 1];
      }
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
          exam_detail_id: this.form.isExam === 1 ? id : "",
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
    getDiff(val) {
      if (+val === 0.64) return 0.65;
      if (+val === 0.15) return 0;
      return +val;
    },
    getNo(url) {
      return url ? url.split("13q")[1].split(".html")[0] : "";
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
