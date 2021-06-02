<template>
  <div class="container">
    <div>
      <el-select
        v-model="subject_id"
        size="medium"
        placeholder="请选择考试科目"
        filterable
        @change="changeSubject"
      >
        <el-option
          v-for="item in allSubjectList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-tree :props="props" :load="loadNode" lazy show-checkbox> </el-tree>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      subject_id: "1",
      allSubjectList: [],
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      knowledgeNode: [],
    };
  },
  mounted() {
    this.getSubjectList();
    this.getKnowledgeNode(0);
  },
  methods: {
    getKnowledgeNode(id) {
      this.$request
        .fetchKnowledgeNode({
          parentid: id,
          subjectid: this.subject_id,
        })
        .then((res) => {
          console.log(res);
          this.knowledgeNode = rea.data;
        });
    },
    getSubjectList() {
      this.$request
        .fetchSelectSubject({})
        .then((res) => {
          this.allSubjectList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadNode(node, resolve) {
        console.log(node,'node');
      if (node.level === 0) {
        return resolve(this.knowledgeNode);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [
          {
            name: "leaf",
            leaf: true,
          },
          {
            name: "zone",
          },
        ];

        resolve(data);
      }, 500);
    },
    changeSubject(val) {
      this.subject_id = val;
      this.getKnowledgeNode(0);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #ffffff;
}

.tree {
  width: 200px;
}
</style>
