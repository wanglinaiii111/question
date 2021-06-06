/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/10
 * Description: 文件描述
 */
import { addRouter, defaultRouter } from "../../../router/index";
export default {
  state: {
    isCollapse: false,
    logoShow: false,
    uniquerouter: true,
    rightNav: {},
    tabnavBox: JSON.parse(sessionStorage.getItem("addTab")) || [
      {
        title: "examManage",
        path: "/examManage"
      }
    ],
    examLevel: "exam",
    questionLevel: 'list'
  },
  mutations: {
    addTab(state, arg) {
      let curR = [...addRouter, ...defaultRouter].find(
        item => item.name === arg.title
      );
      if (!curR.meta || !curR.meta.isShowTabNav) {
        return;
      }
      state.isActive = arg.path;
      if (state.tabnavBox[0] && state.tabnavBox[0].title !== "examManage") {
        state.tabnavBox.unshift({
          title: "examManage",
          path: "/examManage"
        });
      }

      for (let i = 0; i < state.tabnavBox.length; i++) {
        if (state.tabnavBox[i].path === arg.path) {
          return false;
        }
      }
      state.tabnavBox.push({
        title: arg.title,
        path: arg.path
      });

      sessionStorage.setItem("addTab", JSON.stringify(state.tabnavBox));
    },
    openMenu(state, arg) {
      state.rightNav = arg;
    },
    removeTab(state, arg) {
      let index = state.tabnavBox.findIndex(function (value, key) {
        return value.path === arg.tabItem.path;
      });
      state.tabnavBox.splice(index, 1);
      if (arg.tabItem.path === arg.fullPath) {
        let tabActive = state.tabnavBox[index] || state.tabnavBox[index - 1];
        arg.router.push(tabActive.path);
      }
      sessionStorage.setItem("addTab", JSON.stringify(state.tabnavBox));
    },
    removeOtherTab(state, arg) {
      state.tabnavBox = [
        {
          title: "examManage",
          path: "/examManage"
        }
      ];
      if (arg.all) {
        arg.router.push("/examManage");
        return false;
      }
      state.tabnavBox.push(arg.tabItem);
      arg.router.push(arg.tabItem.path);
      sessionStorage.setItem("addTab", JSON.stringify(state.tabnavBox));
    },
    collapse(state, arg) {
      state.isCollapse = !state.isCollapse;
      if (state.logoShow) {
        setTimeout(function () {
          state.logoShow = false;
        }, 300);
      } else {
        state.logoShow = true;
      }
    },
    setExamLevel(state, type) {
      state.examLevel = type;
    },
    setQuestionLevel(state, type) {
      state.questionLevel = type;
    }
  },
  actions: {
    addTab({ commit }, arg) {
      commit("addTab", arg);
    },
    openMenu({ commit }, arg) {
      commit("openMenu", arg);
    },
    removeTab({ commit }, arg) {
      commit("removeTab", arg);
    },
    removeOtherTab({ commit }, arg) {
      commit("removeOtherTab", arg);
    },
    collapse({ commit }, arg) {
      commit("collapse", arg);
    },
    setExamLevel({ commit }, type) {
      commit("setExamLevel", type);
    },
    setQuestionLevel({ commit }, type) {
      commit("setQuestionLevel", type);
    }
  }
};
