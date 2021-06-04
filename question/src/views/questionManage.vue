<template>
  <div class="container">
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
        >
        </el-tree>
      </div>
    </div>
    <div class="right">
      <div class="tools">
        <el-radio-group v-model="libType" @change="changeLibType">
          <el-radio :label="1">公共题库</el-radio>
          <el-radio :label="2">推荐题库</el-radio>
        </el-radio-group>
      </div>
      <el-card class="box-card" v-for="item in questionList" :key="item.id">
        <div slot="header" class="clearfix">
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
        <div>
          <div class="title">{{ item.qno }}{{ item.stem }}</div>
          <img :src="item.answer" alt="" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
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
      resolve: null,
      keyword: "牛顿第二定律的同向性||平衡状态的定义及条件",
      libType: 1,
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
          subjectid: this.subject_id,
        })
        .then((res) => {
          this.resolve(res.data);
          if (id === 0) {
            this.getQuestion();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getQuestion() {
      this.$request
        .fetchQuestion({
          libtype: this.libType,
          keyword: this.keyword,
          subject_id: this.subject_id,
        })
        .then((res) => {
          this.questionList = res.data;
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
