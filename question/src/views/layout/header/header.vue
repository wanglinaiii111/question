<template>
  <div>
    <el-header id="header">
      <span class="hideAside" @click="collapse"
        ><i class="fa fa-indent fa-lg"></i
      ></span>
      <ul class="personal">
        <li class="fullScreen" @click="fullScreen">
          <el-tooltip
            class="item"
            effect="dark"
            content="全屏"
            placement="bottom"
            ><i class="fa fa-arrows-alt fa-lg"></i
          ></el-tooltip>
        </li>
        <li>{{ $t(`role.${this.$store.getters.info.role}`) }}</li>
        <li>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ this.$store.getters.info.account
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="info">{{
                $t("userDropdownMenu.basicInfor")
              }}</el-dropdown-item>
              <el-dropdown-item command="editPassword">{{
                $t("userDropdownMenu.changePassword")
              }}</el-dropdown-item> -->
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <!-- <li class="icon"><img :src="avatar" /></li> -->
      </ul>
    </el-header>
    <tabNav></tabNav>
    <user-info
      v-if="dialogInfoVisible"
      :title="title"
      :dialogVisible="dialogInfoVisible"
      :userId="userId"
      @successCallback="successCallback"
    />
    <edit-password
      v-if="dialogPassVisible"
      :dialogVisible="dialogPassVisible"
      @editPwdCallback="editPwdCallback"
    />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import tabNav from "./tabNav";
import UserInfo from "../../../components/userForm/userInfo";
import EditPassword from "../../../components/userForm/editPassword";

export default {
  name: "Header",
  components: { EditPassword, tabNav, UserInfo },
  data() {
    return {
      isfullScreen: true,
      avatar: "./static/images/icon.jpg",
      dialogInfoVisible: false,
      dialogPassVisible: false,
      title: "",
      userId: ""
    };
  },
  methods: {
    collapse() {
      this.$store.dispatch("collapse");
    },
    successCallback() {
      this.dialogInfoVisible = false;
    },
    editPwdCallback() {
      this.dialogPassVisible = false;
    },
    fullScreen() {
      if (this.isfullScreen) {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
        this.isfullScreen = false;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        this.isfullScreen = true;
      }
    },
    handleCommand(command) {
      if (command === "info") {
        this.dialogInfoVisible = true;
        this.title = "编辑信息";
        // this.userId = this.$store.getters.info.uid
      } else if (command === "editPassword") {
        this.dialogPassVisible = true;
      } else if (command === "logout") {
        this.$request
          .fetchLoginOut({})
          .then(res => {
            if (res.data.err) {
              this.$message({
                showClose: true,
                message: res.data.err,
                type: "error"
              });
              return;
            }
            sessionStorage.clear()
            location.reload();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

html,
body,
#app,
.el-container,
#asideNav,
ul.el-menu {
  @extend %h100;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

#header {
  max-height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  .hideAside {
    @extend %cursor;
  }
  .personal {
    display: flex;
    flex-direction: row;
    li {
      @include set-value(margin, 13px);
      font-size: 12px;
    }
    .fullScreen {
      @extend %cursor;
    }
    .el-dropdown-link {
      @extend %cursor;
    }
    .icon img {
      margin-#{$top}: 7px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
