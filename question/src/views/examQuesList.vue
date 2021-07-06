<template>
  <div>
    <el-button class="back" size="medium" @click="back">返回上一级</el-button>
    <el-button class="addBtn" size="medium" @click="handleClickAdd"
      >添加试题</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="t_number" label="题号"> </el-table-column>
      <el-table-column prop="points" label="知识点"> </el-table-column>
      <el-table-column prop="scores" label="分数"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除这条记录吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-button slot="reference" size="mini" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加试题" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="题号">
          <el-input v-model="form.t_number"></el-input>
        </el-form-item>
        <el-form-item label="知识点">
          <el-cascader
            :props="props"
            v-model="form.points"
            @change="changePoint"
            size="medium"
            :key="form.subject_id"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="分数">
          <el-input v-model="form.scores"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "exam-ques-list",
  props: ["param"],
  data() {
    let that = this;
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        t_number: 1,
        points: [],
        scores: 0,
      },
      resolve: null,
      props: {
        lazy: true,
        checkStrictly: true,
        multiple: true,
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
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$request
        .fetchExamQuesSelect({ exam_detail_id: this.param.exam_detail_id })
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getKnowledgeNode(id) {
      this.$request
        .fetchKnowledgeNode({
          parentid: id,
          subjectid: this.param.subject_id,
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
    changePoint(val) {
      this.form.points = val;
    },
    confirm() {
      this.dialogFormVisible = false;
      const arr = [];
      for (let i = 0; i < this.form.points.length; i++) {
        const e = this.form.points[i];
        arr.push(e[e.length - 1]);
      }
      this.$request
        .fetchExamQuesInsert({
          exam_detail_id: this.param.exam_detail_id,
          dataList: [
            {
              t_number: this.form.t_number,
              points: arr.join(";"),
              scores: this.form.scores,
            },
          ],
        })
        .then((res) => {
          if (res.data.desc) {
            this.$message.error("添加失败");
          }
          this.getList();
          this.$message.error("添加成功");
        });
    },
    handleClickAdd() {
      this.dialogFormVisible = true;
      this.form.points = [];
    },
    handleDelete(row) {
      this.$request
        .fetchExamQuesDelete({
          id: row.id,
        })
        .then((res) => {
          if (res.data.desc) {
            this.$message.error("删除失败");
          }
          this.getList();
          this.$message.error("删除成功");
        });
    },
    back() {
      this.$store.dispatch("setExamLevel", "subject");
    },
  },
};
</script>

<style scoped>
.addBtn {
  float: right;
  margin-bottom: 20px;
}

.back {
  margin-bottom: 20px;
}
</style>
