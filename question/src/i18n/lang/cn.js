/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
const cn = {
  routeName: {
    memberPermissions: "用户管理",
    studentManage: "学生管理",
    classManage: "班级管理",
    examManage: "考试管理",
    subjectList: "科目列表",
    classReport: "成绩单",
    download: "文件下载",
    questionManage: "题库管理"
  },
  rightMenu: {
    close: "关闭",
    closeOther: "关闭其他",
    closeAll: "全部关闭"
  },
  role: {
    superAdmin: "root",
    admin: "管理员",
    ordinary: "教师"
  },
  userDropdownMenu: {
    basicInfor: "基本资料",
    changePassword: "修改密码",
    logout: "退出"
  },

  ...zhLocale //  合并element-ui内置翻译
};

export default cn;
