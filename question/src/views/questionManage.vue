<template>
  <div class="ques">
    <div
      class="container"
      :style="{
        display: $store.getters.questionLevel === 'list' ? 'flex' : 'none',
      }"
    >
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
            :data="tData"
            :load="loadNode"
            lazy
            highlight-current
            @node-click="handleClickNode"
            ref="my-tree"
            node-key="tree_id"
          ></el-tree>
        </div>
      </div>
      <div class="right" v-loading.lock="fullscreenLoading">
        <div class="tools">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="题库类型">
              <el-radio-group v-model="form.libType" @change="changeLibType">
                <el-radio :label="1">公共题库</el-radio>
                <el-radio :label="2">推荐题库</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="试题文本">
              <el-input v-model="form.text" size="medium"></el-input>
            </el-form-item>
          </el-form>
          <!-- <el-radio-group v-model="libType" @change="changeLibType">
            <el-radio :label="1">公共题库</el-radio>
            <el-radio :label="2">推荐题库</el-radio>
          </el-radio-group>-->
          <div class="btns">
            <el-button size="medium" @click="search()">查询</el-button>
            <el-button
              v-if="$store.getters.info.role === 'superAdmin'"
              size="medium"
              @click="toEdit('add')"
              >新建试题</el-button
            >
          </div>
        </div>
        <el-card class="box-card" v-for="item in questionList" :key="item.id">
          <div slot="header" class="clearfix">
            <div>
              <span>{{
                item.qtype.indexOf("题型") !== -1
                  ? item.qtype
                  : "题型：" + item.qtype
              }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.source }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>
                {{
                  item.difficulty.indexOf("难度") !== -1
                    ? item.difficulty
                    : "难度：" + item.difficulty
                }}
              </span>
              <el-divider direction="vertical"></el-divider>
              <span>
                {{
                  item.nums.indexOf("引用次数") !== -1
                    ? item.nums
                    : "引用次数：" + item.nums
                }}
              </span>
              <el-divider direction="vertical"></el-divider>
              <span>
                {{
                  item.update_time.indexOf("更新时间") !== -1
                    ? item.update_time
                    : "更新时间：" + item.update_time
                }}
              </span>
            </div>
            <div
              class="toolBtn"
              v-if="$store.getters.info.role === 'superAdmin'"
            >
              <el-button
                class="addBtn"
                size="mini"
                @click="toEdit('update', item)"
                >更新</el-button
              >
              <el-popconfirm
                title="确定删除这道题吗？"
                @confirm="deleteQues(item.id)"
              >
                <el-button slot="reference" size="mini" type="danger"
                  >删除</el-button
                >
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
              <span v-html="HtmlUtil.htmlDecodeByRegExp(item.stem)"></span>
            </div>
            <img
              v-if="isImage(item.answer)"
              :src="
                url +
                'exam/download?filename=' +
                item.qno.substring(3) +
                '.png' +
                '&answerpic=1&stempic='
              "
              alt
            />
            <span
              v-else
              v-html="HtmlUtil.htmlDecodeByRegExp(item.answer)"
            ></span>
          </div>
        </el-card>
      </div>
    </div>
    <AddQuestion
      v-if="$store.getters.questionLevel !== 'list'"
      :updateData="curQues"
    ></AddQuestion>
  </div>
</template>

<script>
import addQuestion from "./addQuestion";
import { HtmlUtil } from "../utils/htmlEncode";
import { url } from "../api/urls/api";
export default {
  name: "question",
  components: {
    AddQuestion: addQuestion,
  },
  data() {
    return {
      url: url,
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
        },
      },
      tData: [],
      resolve: null,
      root: null,
      keyword: "",
      form: {
        libType: 1,
        text: "",
      },
      curQues: null,
      parentNodes: [],
    };
  },
  computed: {
    questionLevel() {
      return this.$store.getters.questionLevel;
    },
  },
  watch: {
    questionLevel(n, m) {
      console.log(n);

      if (n === "list") {
        this.getQuestion();
      }
    },
  },
  mounted() {
    this.getSubjectList();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("setQuestionLevel", "list");
    next();
  },
  methods: {
    getKnowledgeNode(id) {
      this.$request
        .fetchKnowledgeNode({
          parentid: id,
          subjectid: this.subject_id,
        })
        .then((res) => {
          this.resolve(res.data);
          if (id === 0) {
            this.tData = res.data;
            if (res.data.length == 0) {
              this.questionList = [];
              return;
            }
            let tree = this.$refs["my-tree"];
            this.keyword = res.data[0].name;
            this.$nextTick(() => {
              tree.setCurrentKey(res.data[0].tree_id);
            });
            this.getTreeNode(tree.getNode(res.data[0].tree_id));
            this.getQuestion();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getQuestion() {
      if (!this.keyword) return;
      this.fullscreenLoading = true;
      this.$request
        .fetchQuestion({
          libtype: this.form.libType,
          keyword: this.keyword,
          subject_id: this.subject_id,
        })
        .then((res) => {
          this.questionList = res.data;
          this.fullscreenLoading = false;
        });
    },
    getSubjectList() {
      this.$request.fetchSelectSubject({}).then((res) => {
        this.allSubjectList = res.data;
      });
    },
    loadNode(node, resolve) {
      console.log(node, "node");

      if (node.level === 0) {
        this.root = node;
        this.getKnowledgeNode(0);
      } else {
        if (node.data.is_have_childe === 0) return;
        this.getKnowledgeNode(node.data.tree_id);
      }

      this.resolve = resolve;
    },
    changeSubject(val) {
      this.subject_id = val;
      this.loadNode(this.root, this.resolve);
    },
    handleClickNode(data, node, vue) {
      this.parentNodes.length = 0;
      this.form.text = "";
      this.getTreeNode(node);
      this.keyword = data.name;
      this.getQuestion();
    },
    getTreeNode(node) {
      //获取当前树节点和其父级节点
      if (node) {
        if (node.data.parent_id !== undefined) {
          this.parentNodes.unshift(node.data.name); //在数组头部添加元素
          if (node.data.parent_id !== 0) {
            this.getTreeNode(node.parent); //递归
          }
        }
      }
    },
    changeLibType(val) {
      this.form.libType = val;
      this.getQuestion();
    },
    isImage(str) {
      if (!str) return;
      return str.indexOf("http") == 0 ? true : false;
    },
    deleteQues(id) {
      this.$request
        .fetchDelQuestion({ id: id, libtype: this.form.libType })
        .then((res) => {
          this.getQuestion();
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
    toEdit(type, data) {
      this.curQues = null;
      if (type === "update") {
        this.curQues = {
          ...data,
          libType: this.form.libType,
          subject_id: this.subject_id,
          parentNodes: this.parentNodes,
        };
      }
      this.$store.dispatch("setQuestionLevel", type);
    },
    search() {
      //搜索
      this.fullscreenLoading = true;
      this.$request
        .fetchMatchingQuestion({
          libtype: this.form.libType,
          text: this.form.text,
          subject_id: this.subject_id,
        })
        .then((res) => {
          this.$refs["my-tree"].setCurrentKey(null);
          this.questionList = res.data;
          this.fullscreenLoading = false;
        });
    },
  },
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
