<template>
  <div>
    <el-button class="addBtn" size="medium" @click="showDialog"
      >添加学生</el-button
    >
    <template>
      <div class="card">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="年级">
            <el-date-picker
              v-model="formInline.level"
              type="year"
              value-format="yyyy"
              placeholder="选择年级"
              size="medium"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="班号">
            <el-input
              v-model="formInline.cno"
              size="medium"
              placeholder="班号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="onSubmit"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="sname" label="学生姓名"></el-table-column>
        <el-table-column prop="sno" label="学号"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="level" label="年级"></el-table-column>
        <el-table-column prop="cno" label="班级"> </el-table-column>
        <el-table-column prop="headteacher" label="班主任"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            > -->
            <el-popconfirm
              title="确定删除该名学生吗？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog title="添加学生" :visible.sync="dialogAddStu" width="337px">
      <el-form :model="stuForm" label-width="80px">
        <el-form-item label="学生姓名" placeholder="请输入学生姓名">
          <el-input v-model="stuForm.sname"></el-input>
        </el-form-item>
        <el-form-item label="学号" placeholder="请输入学生学号">
          <el-input v-model="stuForm.sno"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="stuForm.sex"
            size="medium"
            placeholder="请选择性别"
            filterable
          >
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-cascader
            v-model="stuForm.class"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddStu = false">取 消</el-button>
        <el-button type="primary" @click="submitAddStuForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "student",
  data() {
    return {
      dialogAddStu: false,
      formInline: {
        level: "",
        cno: ""
      },
      stuForm: {
        sname: "",
        sno: "",
        sex: "男",
        class: ""
      },
      options: [],
      tableData: []
    };
  },
  mounted() {
    if (this.$route.query.level || this.$route.query.cno) {
      this.formInline = {
        level: this.$route.query.level,
        cno: this.$route.query.cno
      };
    }
    this.getList();
    this.getClassList();
  },
  methods: {
    getList() {
      let p = { all: 1 };
      if (this.formInline.level || this.formInline.cno) {
        p = {
          level: this.formInline.level,
          cno: this.formInline.cno
        };
      }
      this.$request
        .fetchSearchStu(p)
        .then(res => {
          this.tableData = res.data.result;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getClassList() {
      this.$request
        .fetchSearchClass({
          level: "",
          headteacher: ""
        })
        .then(res => {
          const result = res.data.result;
          let data = [];
          for (let i = 0; i < result.length; i++) {
            const curClass = result[i];
            let curLevel = data.find(v => v.value === curClass.level);
            if (!curLevel) {
              curLevel = {
                value: curClass.level,
                label: curClass.level,
                children: []
              };
              data.push(curLevel);
            }
            curLevel.children.push({
              value: curClass.id,
              label: curClass.cno
            });
          }
          this.options = data;
        })
        .catch(error => {
          console.log(error);
          this.$message({
            showClose: true,
            message: "班级列表数据获取失败！",
            type: "error"
          });
        });
    },
    delete(id) {
      this.$request
        .fetchDelStu({ id: id })
        .then(res => {
          this.getList();
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
    onSubmit() {
      this.getList();
    },
    // handleEdit(index, row) {
    //   console.log(index, row);
    //   this.$message({
    //     showClose: true,
    //     message: index,
    //     row,
    //     type: "success",
    //   });
    // },
    handleDelete(row) {
      this.delete(row.id);
    },
    showDialog() {
      this.dialogAddStu = true;
    },
    submitAddStuForm() {
      this.$request
        .fetchAddStu({
          sname: this.stuForm.sname,
          sno: this.stuForm.sno,
          sex: this.stuForm.sex,
          classid: this.stuForm.class
        })
        .then(res => {
          if (res.data.result) {
            this.dialogAddStu = false;
            this.getList();
            this.$message({
              showClose: true,
              message: "添加成功！",
              type: "success"
            });
            return;
          }
          if (res.data.desc) {
            this.$message({
              showClose: true,
              message: res.data.desc,
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            showClose: true,
            message: "添加失败！",
            type: "error"
          });
        });
    },
    handleChange(value) {
      console.log(value);
      this.stuForm.class = value[1];
    }
  }
};
</script>

<style scoped>
.addBtn {
  float: right;
  margin-bottom: 20px;
}
.card {
  width: 100%;
  padding: 20px 10px 0;
  box-sizing: border-box;
  background-color: #ffffff;
  float: right;
}
</style>
