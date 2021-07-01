import axios from "../axios";
import apiUrls from "../urls/api";

export default {
  // 登录post
  fetchLogin(data) {
    return axios.post(apiUrls.login, data);
  },
  fetchUser(data) {
    return axios.get(apiUrls.fetchUser, data);
  },
  fetchLoginOut(data) {
    return axios.get(apiUrls.fetchLoginOut, data);
  },
  // 创建账号post
  fetchCreateAccount(data) {
    return axios.post(apiUrls.createAccount, data);
  },
  // 删除账号get
  fetchDelAccount(data) {
    return axios.get(apiUrls.delAccount, {
      params: data
    });
  },
  // 查询所有账号get
  fetchSearchAccount(data) {
    return axios.get(apiUrls.searchAccount, {
      params: data
    });
  },
  // 修改账号post
  fetchUpdateAccount(data) {
    return axios.post(apiUrls.updateAccount, data);
  },
  //创建班级post
  fetchCreateClass(data) {
    return axios.post(apiUrls.createClass, data);
  },
  //删除班级 GET
  fetchDelClass(data) {
    return axios.get(apiUrls.delClass, {
      params: data
    });
  },
  //修改班级 POST
  fetchUpdateClass(data) {
    return axios.post(apiUrls.updateClass, data);
  },
  //查询班级 GET
  fetchSearchClass(data) {
    return axios.get(apiUrls.searchClass, {
      params: data
    });
  },
  //往班级中添加学生 POST
  fetchAddStu(data) {
    return axios.post(apiUrls.addStu, data);
  },
  //删除学生  GET
  fetchDelStu(data) {
    return axios.get(apiUrls.delStu, {
      params: data
    });
  },
  //查询学生 get
  fetchSearchStu(data) {
    return axios.get(apiUrls.searchStu, {
      params: data
    });
  },
  //查询所有科目 GET
  fetchSelectSubject(data) {
    return axios.get(apiUrls.selectSubject, {
      params: data
    });
  },
  //创建考试 GET
  fetchCreateExam(data) {
    return axios.get(apiUrls.createExam, {
      params: data
    });
  },
  //考试查询列表 GET
  fetchSelectExam(data) {
    return axios.get(apiUrls.selectExam, {
      params: data
    });
  },
  //删除考试 GET
  fetchDelExam(data) {
    return axios.get(apiUrls.delExam, {
      params: data
    });
  },
  //创建考试科目 GET
  fetchCreateExamsubject(data) {
    return axios.get(apiUrls.createExamsubject, {
      params: data
    });
  },
  //查询某次考试所有考试科目 GET
  fetchSelectExamsubject(data) {
    return axios.get(apiUrls.selectExamsubject, {
      params: data
    });
  },
  //查询还没有上传到公共题库的考试记录(题库录入模块) get
  fetchSelectExamNoUpload(data) {
    return axios.get(apiUrls.selectExamNoUpload, {
      params: data
    });
  },
  //上传考试 班级成绩单 GET （上传的是某个班级的考试成绩表格）
  fetchCreateGradereport(data) {
    return axios.get(apiUrls.createGradereport, {
      params: data
    });
  },
  fetchDelGradereport(data) {
    return axios.get(apiUrls.delGradereport, {
      params: data
    });
  },
  //查询某场考试某个科目下所有班级成绩单 GET
  fetchSelectGradereport(data) {
    return axios.get(apiUrls.selectGradereport, {
      params: data
    });
  },
  //文件上传接口(表单提交) POST
  fetchExamUpload(data) {
    return axios.post(apiUrls.examUpload, data);
  },
  fetchDownload(data) {
    return axios.get(apiUrls.download, {
      params: data,
      responseType: "blob"
    });
  },
  //查询知识点图谱 get
  fetchKnowledgeNode(data) {
    return axios.get(apiUrls.getKnowledge, {
      params: data
    });
  },
  //查询题库中的试题 POST
  fetchQuestion(data) {
    return axios.post(apiUrls.selectQuestion, data);
  },
  //.试题添加 POST
  fetchAddQuestion(data) {
    return axios.post(apiUrls.addQuestion, data);
  },
  //.试题删除  GET
  fetchDelQuestion(data) {
    return axios.get(apiUrls.delQuestion, {
      params: data
    });
  },
  //试题匹配
  fetchMatchingQuestion(data) {
    return axios.post(apiUrls.matchingQuestion, data);
  },
  //试题修改更新  POST JSON
  fetchUpdateQuestion(data) {
    return axios.post(apiUrls.updateQuestion, data);
  },
  //试题修改更新  POST JSON
  fetchQtype(data) {
    return axios.get(apiUrls.qtype, {
      params: data
    });
  },
  //推送成绩单(年组成绩单)到获取班级分组接口前先检测成绩单上传情况
  fetchCheckreport(data) {
    return axios.post(apiUrls.checkreport, data);
  },
  //合并班级成绩单
  fetchPushreport(data) {
    return axios.post(apiUrls.pushreport, data);
  },
  //获取分组
  fetchGetgroup(data) {
    return axios.post(apiUrls.getgroup, data);
  },
  //添加分组数据POST JSON
  fetchAddgroup(data) {
    return axios.post(apiUrls.addgroup, data);
  },
  //查询分组 GET（复合条件查询）
  fetchSearchgroup(data) {
    return axios.get(apiUrls.searchgroup, {
      params: data
    });
  },
  //删除某次考试下的所有分组。GET
  fetchDelgroup(data) {
    return axios.get(apiUrls.delgroup, {
      params: data
    });
  },
  //分组修改: POST JSON
  fetchUpdategroup(data) {
    return axios.post(apiUrls.updategroup, data);
  },
  //获取推荐试题
  fetchGetProblem(data) {
    return axios.post(apiUrls.getProblem, data);
  },
  //添加小组试题。POST JSON
  fetchAddquestion(data) {
    return axios.post(apiUrls.addquestion, data);
  },
  //删除小组推荐试题中的某个试题
  fetchDelquestion(data) {
    return axios.get(apiUrls.delquestion, {
      params: data
    });
  },
  //查询小组试题 GET
  fetchSelectquestion(data) {
    return axios.get(apiUrls.selectquestion, {
      params: data
    });
  },
  //录入试卷试题
  fetchExamQuesInsert(data) {
    return axios.post(apiUrls.examQuesInsert, data);
  },
  //获取考试试题列表 GET
  fetchExamQuesSelect(data) {
    return axios.get(apiUrls.examQuesSelect, {
      params: data
    });
  },
  //删除考试试题
  fetchExamQuesDelete(data) {
    return axios.get(apiUrls.examQuesDelete, {
      params: data
    });
  },
  //将考试试题生成到excel    GET
  fetchExamQuesToExcel(data) {
    return axios.get(apiUrls.examQuesToExcel, {
      params: data
    });
  }
};
