<template>
  <div>
    <div
      v-for="item in tableData"
      :key="item.grade + item.class"
      class="groupTable"
    >
      <h1>年级：{{ item.grade }} 班级：{{ item.class }}</h1>
      <el-table
        :data="item.classGroup"
        style="width: 100%; margin-top: 8px"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="getTableData(props.row.student)"
              style="width: 100%"
              border
            >
              <el-table-column prop="sname" label="学生姓名"></el-table-column>
              <el-table-column prop="sno" label="学号"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="groupId" label="组号">
        </el-table-column>
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
        <!-- <el-table-column label="学生学号">
          <template slot-scope="scope">
            <div>
              {{ scope.row.student.join(",") }}
            </div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "group-table",
  props: ["studentMap"],
  data() {
    return {
      stuMap: {},
      tableData: [
        {
          grade: "2019",
          class: "1班",
          classGroup: [
            {
              groupId: 1,
              rank: "王者",
              weakKnowledgeInfo: [
                {
                  weakKnowledge: "重力",
                  rate: 0.75,
                },
                {
                  weakKnowledge: "牛顿第一定律",
                  rate: 0.75,
                },
              ],
              student: ["101", "102", "103"],
            },
            {
              groupId: 2,
              rank: "黄金",
              weakKnowledgeInfo: [
                {
                  weakKnowledge: "功",
                  rate: 0.5,
                },
                {
                  weakKnowledge: "万有引力定律",
                  rate: 0.4,
                },
                {
                  weakKnowledge: "动能定理",
                  rate: 0.3,
                },
                {
                  weakKnowledge: "磁场",
                  rate: 0.6,
                },
              ],
              student: ["104", "105", "106"],
            },
          ],
        },
        {
          grade: "2019",
          class: "2班",
          classGroup: [
            {
              groupId: 1,
              rank: "白金",
              weakKnowledgeInfo: [
                {
                  weakKnowledge: "重力",
                  rate: 0.5,
                },
                {
                  weakKnowledge: "牛顿第一定律",
                  rate: 0.4,
                },
                {
                  weakKnowledge: "磁场",
                  rate: 0.6,
                },
              ],
              student: ["201", "202", "203"],
            },
            {
              groupId: 2,
              rank: "白金",
              weakKnowledgeInfo: [
                {
                  weakKnowledge: "功",
                  rate: 0.5,
                },
                {
                  weakKnowledge: "万有引力定律",
                  rate: 0.4,
                },
                {
                  weakKnowledge: "动能定理",
                  rate: 0.3,
                },
              ],
              student: ["204", "205", "206"],
            },
          ],
        },
      ],
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
          sno: item,
          sname: this.stuMap[item] ? this.stuMap[item]["sname"] : "",
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
      return str
    },
  },
};
</script>

<style scoped>
.groupTable {
  margin-bottom: 20px;
}
</style>
