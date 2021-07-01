<template>
  <div>
    <h3>学生列表</h3>
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="item in Object.values(studentMap)"
        :key="item.id"
        :label="item.sno"
        >{{ item.sname }}</el-checkbox
      >
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
  </div>
</template>

<script>
export default {
  name: "confirm-group",
  props: ["studentMap", "groupData"],
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
    };
  },
  mounted() {
    // console.log(this.studentMap);
    // console.log(this.groupData);
    // console.log(this.group);
  },
  methods: {
    add(id) {
      console.log(this.checkList);
      console.log(this.group["group" + id]);
      for (let i = 0; i < this.groupData.length; i++) {
        if (this.groupData[i]["id"] === id) {
          this.groupData[i]["snos"] = this.checkList.join(",");
        }
      }
      console.log(this.groupData);
    },
    del(id) {
      for (let i = 0; i < this.groupData.length; i++) {
        if (this.groupData[i]["id"] === id) {
          const arr = this.getStuList(this.groupData[i]["snos"]);
          const newArr = arr.filter((item) => {
            for (let k = 0; k < this.group["group" + id].length; k++) {
              if (item["sno"] === this.group["group" + id][k]) {
                return false;
              }
              return true;
            }
          });
          console.log(newArr);
          // for(let j =0;j<arr.length;j++){
          //     for(let k=0;k<this.group["group" + id].length;k++){
          //         if(arr[j]['sno'] === this.group["group" + id][k]){

          //         }
          //     }
          // }
        //   this.groupData[i]["snos"] = this.checkList.join(",");
        }
      }
    },
    getStuList(snos) {
      if (!snos) {
        return [];
      }
      const data = snos.split(",");
      return data.map((item) => {
        return {
          sno: item,
          sname: this.studentMap[item]
            ? this.studentMap[item]["sname"]
            : "未知",
        };
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
