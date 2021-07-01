<template>
  <div>
    <el-button class="back" size="medium" @click="back">返回上一级</el-button>
    <el-popconfirm
      title="确定确认试题吗？确认后将不再可修改！"
      @confirm="confirmUpdate()"
    >
      <el-button
        class="addBtn"
        size="medium"
        slot="reference"
        v-if="+curGroupData.is_sure_question === 0"
        >确认试题</el-button
      >
    </el-popconfirm>
    <el-card class="box-card" v-for="item in questionList" :key="item.id">
      <div slot="header" class="clearfix">
        <div>
          <span>题号：{{ item.qno }}</span>
          <el-divider direction="vertical"></el-divider>
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
                ? diffMap[item.difficulty]
                : "难度：" + diffMap[item.difficulty]
            }}
          </span>
        </div>
        <div
          class="toolBtn"
          v-if="
            $store.getters.info.role === 'superAdmin' &&
            +curGroupData.is_sure_question === 0
          "
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
          <span v-html="HtmlUtil.htmlDecodeByRegExp(item.stem)"></span>
        </div>
        <img
          v-if="isImage(item.answer)"
          :src="
            url +
            'exam/download?filename=' +
            getNo(item.weburl) +
            '.png' +
            '&answerpic=1&stempic='
          "
          alt
        />
        <span v-else v-html="HtmlUtil.htmlDecodeByRegExp(item.answer)"></span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { HtmlUtil } from "../utils/htmlEncode";
import { url } from "../api/urls/api";
export default {
  name: "recommend-ques",
  props: ["curGroupData"],
  data() {
    return {
      url: url,
      HtmlUtil: HtmlUtil,
      questionList: [],
      diffMap: {
        0.94: "容易",
        0.85: "较易",
        0.65: "中等",
        0.64: "中等",
        0.4: "较难",
        0.15: "困难",
        0: "困难",
      },
    };
  },
  mounted() {
    console.log(this.curGroupData);
    this.getList();
  },
  methods: {
    getList() {
      this.$request
        .fetchSelectquestion({
          id: this.curGroupData.id,
        })
        .then((res) => {
          if (res.data.length === 0) {
            return this.getQuestion();
          }
          this.questionList = res.data;
        });
    },
    getQuestion() {
      this.$request
        .fetchGetProblem({
          rank: this.curGroupData.rank,
          weakKnowledge: this.getWeakKnowledge(
            this.curGroupData.weakpoints_and_rate
          ),
          subjectId: this.curGroupData.subjectId[1],
        })
        .then((res) => {
          if (res.data.length === 0) {
            return this.$message.error("该分组没有获取到推荐试题");
          }
          this.addQuestion(res.data.data);
        });
    },
    addQuestion(data) {
      this.$request
        .fetchAddquestion({
          id: this.curGroupData.id,
          qid_list: data,
        })
        .then((res) => {
          if (!res.data.result) {
            return this.$message.error("推荐试题添加失败");
          }
          this.getList();
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
    deleteQues(id) {
      this.$request.fetchDelquestion({ id: id }).then((res) => {
        if (res.data.desc) {
          return this.$message.error(res.data.desc);
        }
        this.getList();
        this.$message({
          showClose: true,
          message: "删除成功！",
          type: "success",
        });
      });
    },
    confirmUpdate() {
      this.$request
        .fetchUpdategroup({
          id: this.curGroupData.id,
          is_sure_student: this.curGroupData.is_sure_student,
          is_sure_question: 1,
          groupid: this.curGroupData.groupid,
          snos: this.curGroupData.snos,
        })
        .then((res) => {
          if (res.data.desc) {
            return this.$message.error(res.data.desc);
          }
          this.$message.success("确定成功");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    isImage(str) {
      if (!str) return;
      return str.indexOf("http") == 0 ? true : false;
    },
    getNo(url) {
      return url ? url.split("13q")[1].split(".html")[0] : "";
    },
    back() {
      this.$store.dispatch("setGroupLevel", "group");
    },
  },
};
</script>

<style scoped>
.addBtn {
  float: right;
  margin-bottom: 20px;
}

.box-card {
  width: 100%;
  margin-bottom: 15px;
}

.clearfix {
  color: #666666;
  font-size: 12px;
}
.title {
  padding-bottom: 20px;
  line-height: 24px;
  color: #333;
  font-size: 14px;
}
.toolBtn {
  text-align: right;
  margin-top: 10px;
}

.back {
  margin-bottom: 20px;
}
</style>
