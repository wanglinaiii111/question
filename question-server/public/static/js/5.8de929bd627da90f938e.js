(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Vlst:function(e,n,t){"use strict";t.r(n);var i={name:"student",data:function(){return{formInline:{file:""}}},mounted:function(){},methods:{onSubmit:function(){var e=this;this.formInline.file?this.$request.fetchDownload({filename:this.formInline.file}).then((function(n){var t=e,i=new FileReader;i.onload=function(e){var l=i.result;if(l.includes('"desc":'))t.$message.error(JSON.parse(l).desc);else{var o=window.URL.createObjectURL(n.data),r=document.createElement("a");r.style.display="none",r.href=o,r.setAttribute("download",t.formInline.file),document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(o)}},i.readAsText(n.data)})):this.$message.error("请输入文件名")}}},l=(t("dJy2"),t("KHd+")),o=Object(l.a)(i,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"card"},[t("el-form",{attrs:{inline:!0,model:e.formInline,size:"medium"}},[t("el-form-item",{attrs:{label:"文件名称"}},[t("el-input",{attrs:{placeholder:"文件名称"},model:{value:e.formInline.file,callback:function(n){e.$set(e.formInline,"file",n)},expression:"formInline.file"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("下载文件")])],1)],1)],1)}),[],!1,null,"78a2b8d6",null);n.default=o.exports},dJy2:function(e,n,t){"use strict";t("y6IU")},y6IU:function(e,n,t){}}]);
//# sourceMappingURL=5.8de929bd627da90f938e.js.map