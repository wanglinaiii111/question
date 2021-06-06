<template>
  <div class="ques">
    <div class="container" v-if="$store.getters.questionLevel === 'list'">
      <div class="left">
        <el-select
          v-model="subject_id"
          size="medium"
          placeholder="请选择考试科目"
          filterable
          @change="changeSubject"
          class="select"
        >
          <el-option
            v-for="item in allSubjectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="tree">
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            highlight-current
            @node-click="handleClickNode"
          ></el-tree>
        </div>
      </div>
      <div class="right" v-loading.lock="fullscreenLoading">
        <div class="tools">
          <el-radio-group v-model="libType" @change="changeLibType">
            <el-radio :label="1">公共题库</el-radio>
            <el-radio :label="2">推荐题库</el-radio>
          </el-radio-group>
          <div class="btns">
            <el-button size="medium" @click="toEdit('add')">新建试题</el-button>
          </div>
        </div>
        <el-card class="box-card" v-for="item in questionList" :key="item.id">
          <div slot="header" class="clearfix">
            <div>
              <span>{{ item.qtype }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.source }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.difficulty }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.nums }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.update_time }}</span>
            </div>
            <div class="toolBtn">
              <el-button class="addBtn" size="mini" @click="toEdit('update',item)">更新</el-button>
              <el-popconfirm title="确定删除这道题吗？" @confirm="deleteQues(item.id)">
                <el-button slot="reference" size="mini" type="danger">删除</el-button>
              </el-popconfirm>
            </div>
          </div>
          <div>
            <div class="title">
              {{ item.qno }}
              <!-- <div class="toolBtn">
                <el-button class="addBtn" size="mini" @click="this.curQues = item">更新</el-button>
                <el-popconfirm title="确定删除这道题吗？" @confirm="deleteQues(item.id)">
                  <el-button slot="reference" size="mini" type="danger">删除</el-button>
                </el-popconfirm>
              </div>-->
              <span v-html=" HtmlUtil.htmlDecodeByRegExp(item.stem)"></span>
            </div>
            <img v-if="isImage(item.answer)" :src="item.answer" alt />
            <span v-else v-html=" HtmlUtil.htmlDecodeByRegExp(item.answer)"></span>
          </div>
        </el-card>
      </div>
    </div>
    <AddQuestion v-else :updateData="curQues"></AddQuestion>
  </div>
</template>

<script>
import addQuestion from "./addQuestion";
import { HtmlUtil } from "../utils/htmlEncode";
export default {
  name: "question",
  components: {
    AddQuestion: addQuestion
  },
  data() {
    return {
      fullscreenLoading: false,
      HtmlUtil: HtmlUtil,
      subject_id: "4",
      allSubjectList: [],
      questionList: [],
      props: {
        label: "name",
        isLeaf: (data, node) => {
          // is_have_childe 1有子节点 0没有子节点
          return data.is_have_childe === 0 ? true : false;
        }
      },
      resolve: null,
      keyword: "",
      libType: 1,
      curQues: null
    };
  },
  mounted() {
    this.getSubjectList();
  },
  methods: {
    getKnowledgeNode(id) {
      this.$request
        .fetchKnowledgeNode({
          parentid: id,
          subjectid: this.subject_id
        })
        .then(res => {
          this.resolve(res.data);
          if (id === 0) {
            this.keyword = res.data[0].name;
            this.getQuestion();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getQuestion() {
      if (!this.keyword) return;
      this.fullscreenLoading = true;
      this.$request
        .fetchQuestion({
          libtype: this.libType,
          keyword: this.keyword,
          subject_id: this.subject_id
        })
        .then(res => {
          this.questionList = res.data;
          this.fullscreenLoading = false;
        });
    },
    getSubjectList() {
      this.$request.fetchSelectSubject({}).then(res => {
        this.allSubjectList = res.data;
      });
    },
    loadNode(node, resolve) {
      console.log(node, "node");

      if (node.level === 0) {
        this.getKnowledgeNode(0);
      } else {
        if (node.data.is_have_childe === 0) return;
        this.getKnowledgeNode(node.data.tree_id);
      }

      this.resolve = resolve;
    },
    changeSubject(val) {
      this.subject_id = val;
      this.getKnowledgeNode(0);
    },
    handleClickNode(data, node, vue) {
      console.log(data, node);
      this.keyword = data.name;
      this.getQuestion();
    },
    changeLibType(val) {
      this.libType = val;
      this.getQuestion();
    },
    isImage(str) {
      if (!str) return;
      return str.indexOf("http") == 0 ? true : false;
    },
    deleteQues(id) {
      this.$request
        .fetchDelQuestion({ id: id, libtype: this.libType })
        .then(res => {
          this.getQuestion();
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
          this.$message({
            showClose: true,
            message: "删除失败！",
            type: "error"
          });
        });
    },
    toEdit(type, data) {
      this.curQues = null;
      if (type === "update") {
        this.curQues = {
          ...data,
          libType: this.libType,
          subject_id: this.subject_id
        };
      }
      this.$store.dispatch("setQuestionLevel", type);
    }
  }
};
</script>

<style scoped>
@import url("./css/questionManage.css");
</style>
<style>
.tree .el-tree-node__content {
  display: block !important;
}

.tree .el-tree-node__children {
  overflow: visible !important;
}
</style>
