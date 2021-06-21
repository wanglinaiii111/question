<template>
  <div>
    <el-button class="back" size="medium" @click="back">返回上一级</el-button>
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
        <div class="toolBtn">
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
export default {
  name: "recommend-ques",
  props: ["curGroupData"],
  data() {
    return {
      HtmlUtil: HtmlUtil,
      questionList: [
        {
          id: 35,
          qtype: "单选题",
          difficulty: "0.85",
          nums: "0",
          update_time: "2021-06-11 16:29:22",
          qno: "1623387873145",
          stem: "&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;lt;div&amp;nbsp;class=&amp;quot;quest-cnt&amp;quot;&amp;gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;关于热现象，下列说法正确的是（&amp;nbsp;&amp;nbsp;）&amp;lt;table&amp;nbsp;name=&amp;quot;optionsTable&amp;quot;&amp;nbsp;cellpadding=&amp;quot;0&amp;quot;&amp;nbsp;cellspacing=&amp;quot;0&amp;quot;&amp;nbsp;width=&amp;quot;100%&amp;quot;&amp;gt;&amp;lt;tr&amp;gt;&amp;lt;td&amp;nbsp;width=&amp;quot;100%&amp;quot;&amp;gt;A．分子间的相互作用力总是随分子间距离的增大而减小&amp;lt;/td&amp;gt;&amp;lt;/tr&amp;gt;&amp;lt;tr&amp;gt;&amp;lt;td&amp;nbsp;width=&amp;quot;100%&amp;quot;&amp;gt;B．温度升高时，物体中每个分子的运动速率都将增大&amp;lt;/td&amp;gt;&amp;lt;/tr&amp;gt;&amp;lt;tr&amp;gt;&amp;lt;td&amp;nbsp;width=&amp;quot;100%&amp;quot;&amp;gt;C．在一定温度下，气体分子的密集程度越大，压强越大&amp;lt;/td&amp;gt;&amp;lt;/tr&amp;gt;&amp;lt;tr&amp;gt;&amp;lt;td&amp;nbsp;width=&amp;quot;100%&amp;quot;&amp;gt;D．内能可以全部转化为机械能，而不引起其他变化&amp;lt;/td&amp;gt;&amp;lt;/tr&amp;gt;&amp;lt;/table&amp;gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;",
          source: "2021·北京朝阳区·高三一模",
          points: "力学",
          answer: "&lt;p&gt;A&lt;/p&gt;",
          weburl: "http://zujuan.xkw.com/13q12932998.html",
          isdownload: "1",
          exam_detail_id: "",
        },
        {
          id: 122,
          qtype: "单选题",
          difficulty: "0.94",
          nums: "0",
          update_time: "2021-06-11 15:11:30",
          qno: "1623387885945",
          stem: "&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;lt;div&amp;nbsp;class=&amp;quot;quest-cnt&amp;quot;&amp;gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;下列说法正确的是（&amp;nbsp;&amp;nbsp;）&amp;lt;table&amp;nbsp;name=&amp;quot;optionsTable&amp;quot;&amp;nbsp;cellpadding=&amp;quot;0&amp;quot;&amp;nbsp;cellspacing=&amp;quot;0&amp;quot;&amp;nbsp;width=&amp;quot;100%&amp;quot;&amp;gt;&amp;lt;tr&amp;gt;&amp;lt;td&amp;nbsp;width=&amp;quot;100%&amp;quot;&amp;gt;A．气体的压强是由于大量气体分子对器壁的持续频繁的撞击而形成的&amp;lt;/td&amp;gt;&amp;lt;/tr&amp;gt;&amp;lt;tr&amp;gt;&amp;lt;td&amp;nbsp;width=&amp;quot;100%&amp;quot;&amp;gt;B．若减小分子间距离，分子引力会减小，分子斥力会增大&amp;lt;/td&amp;gt;&amp;lt;/tr&amp;gt;&amp;lt;tr&amp;gt;&amp;lt;td&amp;nbsp;width=&amp;quot;100%&amp;quot;&amp;gt;C．如果气体吸收热量，气体的内能一定增大&amp;lt;/td&amp;gt;&amp;lt;/tr&amp;gt;&amp;lt;tr&amp;gt;&amp;lt;td&amp;nbsp;width=&amp;quot;100%&amp;quot;&amp;gt;D．布朗运动就是分子的无规则运动&amp;lt;/td&amp;gt;&amp;lt;/tr&amp;gt;&amp;lt;/table&amp;gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;",
          source: "2021·北京顺义区·高三二模",
          points: "力学",
          answer:
            "&lt;img&nbsp;src=http://localhost:8002/exam/download?filename=12886557.png&amp;answerpic=1&amp;stempic=&nbsp;alt&nbsp;/&gt;",
          weburl: "http://zujuan.xkw.com/13q12886557.html",
          isdownload: "1",
          exam_detail_id: "",
        },
      ],
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
    this.getQuestion();
  },
  methods: {
    getQuestion() {},
    deleteQues(id) {
      this.$request.fetchDelquestion({ id: id }).then((res) => {
        this.getQuestion();
        this.$message({
          showClose: true,
          message: "删除成功！",
          type: "success",
        });
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
