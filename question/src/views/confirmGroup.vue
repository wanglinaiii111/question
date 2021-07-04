<template>
  <div>
    <h3>未分组学生列表</h3>
    <el-checkbox-group v-model="checkList">
      <template v-for="item in Object.values(studentList)">
        <el-checkbox :key="item.id" :label="item.sno" v-if="!item.isGroup">{{
          item.sname
        }}</el-checkbox>
      </template>
    </el-checkbox-group>
    <el-divider></el-divider>
    <div v-for="item in groupData" :key="item.id" class="list">
      <div class="title">
        <h3
          :style="{
            color: +item.id === +curGroupData.id ? '#409EFF' : '#606266',
          }"
        >
          {{ item.level }}届-{{ item.cno }}班-{{ item.groupid }}组<Span
            v-if="+item.id === +curGroupData.id"
            >(当前修改的分组)</Span
          >
        </h3>
        <div v-if="+item.is_sure_student === 0">
          <el-button size="mini" class="btn" @click="add(item.id)"
            >添加到当前分组</el-button
          >
          <el-button size="mini" class="btn" @click="del(item.id)"
            >从当前分组删除</el-button
          >
        </div>
        <div v-else>
          <el-button size="mini" class="btn" disabled>已确认</el-button>
        </div>
      </div>
      <h5>薄弱知识点</h5>
      <div class="point">
        {{ getWeakKnowledge(item.weakpoints_and_rate).join("、") }}
      </div>
      <el-checkbox-group
        v-model="group['group' + item.id]"
        :disabled="+item.is_sure_student === 1"
      >
        <el-checkbox
          v-for="stu in getStuList(item.snos)"
          :key="stu.sno"
          :label="stu.sno"
          >{{ stu.sname }}</el-checkbox
        >
      </el-checkbox-group>
      <el-divider></el-divider>
    </div>
    <el-popconfirm
      title="确定确认分组吗？确认后将不再可修改！"
      @confirm="confirmBtn()"
    >
      <el-button type="primary" size="medium" slot="reference"
        >确认分组</el-button
      >
    </el-popconfirm>
  </div>
</template>

<script>
export default {
  name: "confirm-group",
  props: ["groupTableData", "form", "curGroupData"],
  data() {
    const getGroupMap = () => {
      const obj = {};
      const newArr = []
      for (let i = 0; i < this.groupTableData.length; i++) {
        obj["group" + this.groupTableData[i]["id"]] = [];
        newArr.push({...this.groupTableData[i]})
      }
      return {obj,list:newArr};
    };
    return {
      checkList: [],
      group: getGroupMap()['obj'],
      studentList: {},
      groupData:getGroupMap()['list'],
    };
  },
  mounted() {
    this.getStudentList();
  },
  methods: {
    getStudentList() {
      // 查询某一个年级的所有学生
      this.$request
        .fetchSearchStu({
          level: this.form.level,
          cno: this.form.cno,
        })
        .then((res) => {
          const result = res.data.result;
          const obj = {};
          for (let i = 0; i < result.length; i++) {
            obj[result[i].sno] = result[i];
          }
          this.studentList = obj;
          const arr = [];
          for (let i = 0; i < this.groupData.length; i++) {
            const snos = this.groupData[i]["snos"]
            const stuList = this.getStuList(snos);
            arr.push(...stuList);
            for(let j=0;j<snos.length;j++){
              this.studentList[snos[j][0]] = {...this.studentList[snos[j][0]],score:snos[j][1]}
            }
          }
          for (let j = 0; j < arr.length; j++) {
            if (this.studentList[arr[j]["sno"]]) {
              this.studentList[arr[j]["sno"]] = {
                ...this.studentList[arr[j]["sno"]],
                isGroup: true,
              };
            }
          }
        });
    },
    add(id) {
      let check = this.checkList;
      for (let i = 0; i < check.length; i++) {
        this.studentList[check[i]] = {
          ...this.studentList[check[i]],
          isGroup: true,
        };
      }
      const cl = [];
      for (var key in this.group) {
        cl.push(...this.group[key]);
        if (this.group[key].length > 0) {
          const id = key.split("group")[1];
          this.del(id, "delOther");
        }
      }
      check = [...check, ...cl];
      for (let i = 0; i < this.groupData.length; i++) {
        if (this.groupData[i]["id"] === id && check.length > 0) {
          const newSnos = []
          for(let j=0;j<check.length;j++){
            newSnos.push([check[j]+'',this.studentList[check[j]].score])
          }
          this.groupData[i]["snos"] = [...this.groupData[i]["snos"],...newSnos]
        }
      }
      this.checkList = [];
    },
    del(id, type) {
      const check = this.group["group" + id];
      for (let i = 0; i < check.length; i++) {
        this.studentList[check[i]] = {
          ...this.studentList[check[i]],
          isGroup: type === "delOther" ? true : false,
        };
      }
      for (let i = 0; i < this.groupData.length; i++) {
        if (+this.groupData[i]["id"] === +id) {
          const arr = this.getStuList(this.groupData[i]["snos"]);
          const filterArr = arr.filter((item) => !check.includes(item["sno"]));
          const newArr = filterArr.map((item) => {
            return [item["sno"],item["score"]];
          });
          this.groupData[i]["snos"] = newArr;
        }
      }
      this.group["group" + id] = [];
    },
    getStuList(snos) {
      if (!snos) {
        return [];
      }
      return snos.map((item) => {
        return {
          sno: item[0],
          score:item[1],
          sname: this.studentList[item[0]]
            ? this.studentList[item[0]]["sname"]
            : "未知",
        };
      });
    },
    confirmBtn() {
      const arr = [];
      for (let i = 0; i < this.groupData.length; i++) {
        const snos = this.groupData[i]["snos"];
        let arr = []
        for(let j=0;j<snos.length;j++){
          arr.push(`(${snos[j][0]},${snos[j][1]})`)
        }
        arr.push(
          this.confirmUpdate(
            this.groupData[i]["id"],
            this.groupData[i]["is_sure_student"],
            this.groupData[i]["is_sure_question"],
            this.groupData[i]["groupid"],
            `[${arr.join()}]`
          )
        );
      }
      Promise.all(arr)
        .then(() => {
          this.$emit("getConfirmStatus", true);
        })
        .catch(() => {
          this.$message.error("确认失败");
        });
    },
    confirmUpdate(id, is_sure_student, is_sure_question, groupid, snos) {
      this.$request
        .fetchUpdategroup({
          id: id,
          is_sure_student: +id === +this.curGroupData.id ? 1 : is_sure_student,
          is_sure_question: is_sure_question,
          groupid: groupid,
          snos: snos,
        })
        .then((res) => {
          if (res.data.desc) {
            this.$message.error(res.data.desc);
          }
        });
    },
    getWeakKnowledge(data) {
      const arr = data.split("||");
      const newArr = [];
      for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i].split("_")[0]);
      }
      return newArr;
    },
  },
};
</script>

<style scoped>
.addBtn {
  float: right;
  margin-bottom: 20px;
}

.btn {
  margin-bottom: 10px;
}

.card {
  width: 100%;
  padding: 20px 10px 0;
  box-sizing: border-box;
  background-color: #ffffff;
  float: right;
}

h1 {
  margin-bottom: 10px;
  color: #56a9ff;
}

h3 {
  margin-bottom: 10px;
}

.list {
  margin-top: 20px;
  margin-bottom: 20px;
}

.point {
  margin: 5px 0 10px 0;
  font-size: 12px;
}

.title {
  display: flex;
  justify-content: space-between;
}
</style>
