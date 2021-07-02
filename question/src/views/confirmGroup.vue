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
    <div v-for="item in groupData" :key="item.id" class="list">
      <h3>{{ item.level }}-{{ item.cno }}-{{ item.groupid }}组</h3>
      <el-button size="mini" class="btn" @click="add(item.id)"
        >添加到当前分组</el-button
      >
      <el-button size="mini" class="btn" @click="del(item.id)"
        >从当前分组删除</el-button
      >
      <el-checkbox-group v-model="group['group' + item.id]">
        <el-checkbox
          v-for="stu in getStuList(item.snos)"
          :key="stu.sno"
          :label="stu.sno"
          >{{ stu.sname }}</el-checkbox
        >
      </el-checkbox-group>
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
  props: ["groupData", "form"],
  data() {
    const getGroupMap = () => {
      const obj = {};
      for (let i = 0; i < this.groupData.length; i++) {
        obj["group" + this.groupData[i]["id"]] = [];
      }
      return obj;
    };
    return {
      checkList: [],
      group: getGroupMap(),
      studentList: {},
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
            const stuList = this.getStuList(this.groupData[i]["snos"]);
            arr.push(...stuList);
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
      const check = this.group["group" + id];
      for (let i = 0; i < check.length; i++) {
        this.studentList[check[i]] = {
          ...this.studentList[check[i]],
          isGroup: true,
        };
      }
      for (let i = 0; i < this.groupData.length; i++) {
        if (this.groupData[i]["id"] === id && this.checkList.length > 0) {
          this.groupData[i]["snos"] += `${
            this.groupData[i]["snos"] ? "," : ""
          }${this.checkList.join(",")}`;
        }
      }
      this.checkList = [];
    },
    del(id) {
      const check = this.group["group" + id];
      for (let i = 0; i < check.length; i++) {
        this.studentList[check[i]] = {
          ...this.studentList[check[i]],
          isGroup: false,
        };
      }
      for (let i = 0; i < this.groupData.length; i++) {
        if (this.groupData[i]["id"] === id) {
          const arr = this.getStuList(this.groupData[i]["snos"]);
          const filterArr = arr.filter((item) => !check.includes(item["sno"]));
          const newArr = filterArr.map((item) => {
            return item["sno"];
          });
          this.groupData[i]["snos"] = newArr.join(",");
        }
      }
      this.group["group" + id] = [];
    },
    getStuList(snos) {
      if (!snos) {
        return [];
      }
      const data = snos.split(",");
      return data.map((item) => {
        return {
          sno: item,
          sname: this.studentList[item]
            ? this.studentList[item]["sname"]
            : "未知",
        };
      });
    },
    confirmBtn() {
      const arr = [];
      for (let i = 0; i < this.groupData.length; i++) {
        arr.push(
          this.confirmUpdate(
            this.groupData[i]["id"],
            this.groupData[i]["is_sure_question"],
            this.groupData[i]["groupid"],
            this.groupData[i]["snos"]
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
    confirmUpdate(id, is_sure_question, groupid, snos) {
      this.$request
        .fetchUpdategroup({
          id: id,
          is_sure_student: 1,
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
</style>
