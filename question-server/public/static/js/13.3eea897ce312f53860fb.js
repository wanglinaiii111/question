(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"+EPK":function(s,i,e){},"2a0D":function(s,i,e){"use strict";e("+EPK")},KvKp:function(s,i,e){"use strict";e.r(i);var o={name:"pagePermissions",data:function(){return{permissions:this.$store.getters.info.role,options:{role:this.$store.getters.info.role,permissions:this.$store.getters.info.permissions}}},mounted:function(){this.$store.dispatch("setRole",this.options)},watch:{permissions:function(s,i){switch(s){case"superAdmin":this.options={role:"superAdmin",permissions:"超级管理员"};break;case"admin":this.options={role:"admin",permissions:"管理员"};break;case"ordinary":this.options={role:"ordinary",permissions:"普通用户"}}this.$store.dispatch("setRole",this.options),this.$store.dispatch("removeOtherTab",{tabItem:{title:"pageControl",path:"/pagePermissions"},router:this.$router})}}},t=(e("2a0D"),e("KHd+")),r=Object(t.a)(o,(function(){var s=this,i=s.$createElement,e=s._self._c||i;return e("div",[e("el-radio",{attrs:{label:"superAdmin",border:""},model:{value:s.permissions,callback:function(i){s.permissions=i},expression:"permissions"}},[s._v("超级管理员")]),s._v(" "),e("el-radio",{attrs:{label:"admin",border:""},model:{value:s.permissions,callback:function(i){s.permissions=i},expression:"permissions"}},[s._v("管理员")]),s._v(" "),e("el-radio",{attrs:{label:"ordinary",border:""},model:{value:s.permissions,callback:function(i){s.permissions=i},expression:"permissions"}},[s._v("普通用户")]),s._v(" "),e("div",{staticStyle:{margin:"50px 0px"}},[s._v('\n    [权限:  "'+s._s(s.options.permissions)+'",    角色:   "'+s._s(s.options.role)+'"]\n  ')]),s._v(" "),e("h3",[s._v("需要权限的目录：")]),s._v(" "),e("p",[s._v('“上传”：["超级管理员"]')]),s._v(" "),e("p",[s._v('“编辑器”：["超级管理员", “管理员”’]')]),s._v(" "),e("p",[s._v('“系统设置”：["超级管理员"]')])],1)}),[],!1,null,"652cd637",null);i.default=r.exports}}]);
//# sourceMappingURL=13.3eea897ce312f53860fb.js.map