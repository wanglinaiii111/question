import axios from "../axios";
import apiUrls from "../urls/api";

export default {
  // 登录post
  fetchLogin(data) {
    return axios.post(apiUrls.login, data);
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
  }
};
