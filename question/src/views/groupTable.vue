<template>
  <div>
    <div v-for="(item, index) in tableData" :key="index" class="groupTable">
      <h1>年级：{{ item.grade }} 班级：{{ item.class }}</h1>
      <el-table :data="item.classGroup" style="width: 100%; margin-top: 8px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="getTableData(props.row.student)"
              style="width: 100%"
              border
            >
              <el-table-column prop="sname" label="学生姓名"></el-table-column>
              <el-table-column prop="sno" label="学号"></el-table-column>
              <el-table-column prop="sScore" label="学号"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="groupId" label="组号"> </el-table-column>
        <el-table-column prop="rank" label="所属分级"> </el-table-column>
        <el-table-column label="薄弱知识点信息">
          <template slot-scope="scope">
            <div>
              {{ getKnowledgeInfo(scope.row.weakKnowledgeInfo) }}
              <!-- <el-table :data="scope.row.weakKnowledgeInfo" border>
                <el-table-column prop="weakKnowledge" label="知识点">
                </el-table-column>
                <el-table-column prop="rate" label="得分率"> </el-table-column>
              </el-table> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "group-table",
  props: ["studentMap", "tableData"],
  data() {
    return {
      stuMap: {},
    };
  },
  watch: {
    studentMap(n, o) {
      //n为新值,o为旧值;
      this.stuMap = n;
    },
  },
  mounted() {},
  methods: {
    getTableData(snos) {
      return snos.map((item) => {
        return {
          sno: item[0],
          sname: this.stuMap[item[0]] ? this.stuMap[item]["sname"] : "",
          sScore: item[1],
        };
      });
    },
    getKnowledgeInfo(info) {
      // 功_0.5||
      let str = "";
      for (let i = 0; i < info.length; i++) {
        str += info[i].weakKnowledge + "_" + info[i].rate;
        if (i != info.length - 1) {
          str += "||";
        }
      }
      return str;
    },
  },
};
</script>

<style scoped>
.groupTable {
  margin-bottom: 20px;
}
</style>
