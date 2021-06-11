let url = "http://localhost:8002/";
url = "./"; // 打包时配置

let api = {
  // 登录post
  login: "user/login",
  fetchUser: "user/userInfo",
  fetchLoginOut: "user/loginOut",
  // 创建账号post
  createAccount: "user/create",
  // 删除账号get
  delAccount: "user/delete",
  // 查询所有账号get
  searchAccount: "user/select",
  // 修改账号post
  updateAccount: "user/update",
  //创建班级post
  createClass: "class/create",
  //删除班级 GET
  delClass: "class/delete",
  //修改班级 POST
  updateClass: "class/update",
  //查询班级 GET
  searchClass: "class/select",
  //往班级中添加学生 POST
  addStu: "student/create",
  //删除学生  GET
  delStu: "student/delete",
  //查询学生 POST
  searchStu: "student/select",
  //查询所有科目 GET
  selectSubject: "subject/select",
  //创建考试 GET
  createExam: "exam/create",
  //考试查询列表 GET
  selectExam: "exam/select",
  //删除考试 GET
  delExam: "exam/delete",
  //创建考试科目 GET
  createExamsubject: "exam/createExamsubject",
  //查询某次考试所有考试科目 GET
  selectExamsubject: "exam/select/examsubject",
  //查询还没有上传到公共题库的考试记录(题库录入模块) get
  selectExamNoUpload: "exam/select/noupload",
  //上传考试 班级成绩单 GET （上传的是某个班级的考试成绩表格）
  createGradereport: "exam/create/gradereport",
  delGradereport: "exam/delete/gradereport",
  //查询某场考试某个科目下所有班级成绩单 GET
  selectGradereport: "exam/select/gradereport",
  //文件上传接口(表单提交) POST
  examUpload: "exam/file/upload",
  download: "exam/download",
  getKnowledge: "question/getKnowledge",
  selectQuestion: "question/select",
  addQuestion: "question/add",
  delQuestion: "question/del",
  updateQuestion: "question/update",
  matchingQuestion: "question/matching",
  qtype: "question/qtype"
};
for (const key in api) {
  api[key] = url + api[key];
}
export default api;
export { url };
