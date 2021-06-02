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
  }
};
