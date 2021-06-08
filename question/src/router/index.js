import en from "../i18n/lang/en";
import Vue from "vue";
import Router from "vue-router";
import CommerViews from "@/views/commerViews";
import Login from "@/views/login/index";
import Layout from "@/views/layout/layout";
import HomeMain from "@/views/index/mainIndex";

// 不是必须加载的组件使用懒加载
// const Icon = () => import("@/views/icon/index");
// const Erji = () => import("@/views/duoji/erji");
// const Erji2 = () => import("@/views/duoji/erji2");
// const Sanji = () => import("@/views/duoji/sanji");
// const Sanji2 = () => import("@/views/duoji/sanji2");
// const Siji = () => import("@/views/duoji/siji");
// const Wuji = () => import("@/views/duoji/wuji");
// const Transfer = () => import("@/views/transfer/transfer");
// const DataTable = () => import("@/views/table/dataTables");
// const FilterTable = () => import("@/views/table/filterTable");
// const DragTable = () => import("@/views/table/dragTabe");
// const Upload = () => import("@/views/upload/upload");
// const Markdown = () => import("@/views/editor/markdownView");
// const WangeditorView = () => import("@/views/editor/wangeditorView");
const NotFound = () => import("@/views/page404");
// const AddArticle = () => import("@/views/article/addArticle");
// const AddArticleEditor = () => import("@/views/article/addArticleEditor");
// const NavClassify = () => import("@/views/syssetting/navClassify");
// const pagePermissions = () => import("@/views/permissions/pagePermissions");
// const btnPermissions = () => import("@/views/permissions/btnPermissions");

const memberPermissions = () => import("@/views/memberPermissions");
const studentManage = () => import("@/views/studentManage");
const classManage = () => import("@/views/classManage");
const examManage = () => import("@/views/examManage");
const subjectList = () => import("@/views/subjectList");
const classReport = () => import("@/views/classReport");
const download = () => import("@/views/download");
const questionManage = () => import("@/views/questionManage");
const nouploadExam = () => import("@/views/nouploadExam");

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
Vue.use(Router);
let routeName = en.routeName;
let defaultRouter = [
  { path: "/", redirect: "/examManage", hidden: true, children: [] },
  {
    path: "/login",
    component: Login,
    name: "",
    hidden: true,
    children: []
  },
  {
    path: "/examManage",
    iconCls: "fa fa-th-large", // 图标样式class
    name: routeName.examManage,
    component: Layout,
    alone: true,
    children: [
      {
        path: "/examManage",
        iconCls: "fa fa-th-large", // 图标样式class
        name: "examManage",
        component: examManage,
        children: []
      }
    ]
  },
  {
    path: "/404",
    component: NotFound,
    name: "404",
    hidden: true,
    children: []
  }
];

let addRouter = [
  // {
  //   path: "/questionManage",
  //   iconCls: "fa fa-book", // 图标样式class
  //   name: routeName.questionManage,
  //   meta: { role: ["superAdmin", "admin"], isShowTabNav: true },
  //   component: Layout,
  //   alone: true,
  //   children: [
  //     {
  //       path: "/questionManage",
  //       iconCls: "fa fa-book", // 图标样式class
  //       name: "questionManage",
  //       component: questionManage,
  //       children: []
  //     }
  //   ]
  // },
  // {
  //   path: "/nouploadExam",
  //   iconCls: "fa fa-list-ul", // 图标样式class
  //   name: routeName.nouploadExam,
  //   meta: { role: ["superAdmin", "admin", "ordinary"], isShowTabNav: true },
  //   component: Layout,
  //   alone: true,
  //   children: [
  //     {
  //       path: "/nouploadExam",
  //       iconCls: "fa fa-list-ul", // 图标样式class
  //       name: "nouploadExam",
  //       component: nouploadExam,
  //       children: []
  //     }
  //   ]
  // },
  {
    path: "/",
    iconCls: "fa fa-book", // 图标样式class
    name: routeName.question,
    meta: { role: ["superAdmin", "admin"], isShowTabNav: true },
    component: Layout,
    children: [
      {
        path: "/questionManage",
        iconCls: "fa fa-list-alt", // 图标样式class
        name: routeName.questionManage,
        component: questionManage,
        children: [],
        meta: { role: ["superAdmin", "admin"], isShowTabNav: true }
      },
      {
        path: "/nouploadExam",
        iconCls: "fa fa-list-ul", // 图标样式class
        name: routeName.nouploadExam,
        component: nouploadExam,
        children: [],
        meta: { role: ["superAdmin", "admin"], isShowTabNav: true }
      }
    ]
  },
  {
    path: "/studentManage",
    iconCls: "fa fa-id-card-o", // 图标样式class
    name: routeName.studentManage,
    meta: { role: ["superAdmin", "admin"], isShowTabNav: true },
    component: Layout,
    alone: true,
    children: [
      {
        path: "/studentManage",
        iconCls: "fa fa-id-card-o", // 图标样式class
        name: "studentManage",
        component: studentManage,
        children: []
      }
    ]
  },
  {
    path: "/classManage",
    iconCls: "fa fa-newspaper-o", // 图标样式class
    name: routeName.classManage,
    meta: { role: ["superAdmin", "admin"], isShowTabNav: true },
    component: Layout,
    alone: true,
    children: [
      {
        path: "/classManage",
        iconCls: "fa fa-newspaper-o", // 图标样式class
        name: "classManage",
        component: classManage,
        children: []
      }
    ]
  },
  {
    path: "/download",
    iconCls: "fa fa-download", // 图标样式class
    name: routeName.download,
    meta: { role: ["superAdmin", "admin", "ordinary"], isShowTabNav: true },
    component: Layout,
    alone: true,
    children: [
      {
        path: "/download",
        iconCls: "fa fa-download", // 图标样式class
        name: "download",
        component: download,
        children: []
      }
    ]
  },
  {
    path: "/memberPermissions",
    iconCls: "fa fa-user-circle-o", // 图标样式class
    name: routeName.memberPermissions,
    meta: { role: ["superAdmin", "admin"], isShowTabNav: true },
    component: Layout,
    alone: true,
    children: [
      {
        path: "/memberPermissions",
        iconCls: "fa fa-user-circle-o", // 图标样式class
        name: "memberPermissions",
        component: memberPermissions,
        children: []
      }
    ]
  },
  {
    path: "/subjectList",
    name: "subjectList",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/subjectList",
        name: "subjectList",
        component: subjectList,
        children: []
      }
    ]
  },
  {
    path: "/classReport",
    name: "classReport",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/classReport",
        name: "classReport",
        component: classReport,
        children: []
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true, children: [] }
];
export default new Router({
  routes: defaultRouter
});
export { defaultRouter, addRouter };
