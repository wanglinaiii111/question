(window.webpackJsonp=window.webpackJsonp||[]).push([[2,6],{"+zyR":function(t,e,s){},"1G53":function(t,e,s){"use strict";s("b6z+")},"2Gyg":function(t,e,s){"use strict";s("DqlY")},DqlY:function(t,e,s){},TTmx:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var r={htmlEncodeByRegExp:function(t){return 0==t.length?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\s/g,"&nbsp;").replace(/\'/g,"&#39;").replace(/\"/g,"&quot;")},htmlDecodeByRegExp:function(t){return 0==t.length?"":t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/&#39;/g,"'").replace(/&quot;/g,'"')}}},Zndv:function(t,e,s){"use strict";s.r(e);var r=s("14Xm"),n=s.n(r),i=s("D3Ub"),a=s.n(i),o=s("QbLZ"),u=s.n(o),l=s("rqBn"),c=s("4d7F"),d=s.n(c),f=s("m1cH"),p=s.n(f),h={name:"confirm-group",props:["groupData","form"],data:function(){var t=this;return{checkList:[],group:function(){for(var e={},s=0;s<t.groupData.length;s++)e["group"+t.groupData[s].id]=[];return e}(),studentList:{}}},mounted:function(){this.getStudentList()},methods:{getStudentList:function(){var t=this;this.$request.fetchSearchStu({level:this.form.level,cno:this.form.cno}).then((function(e){for(var s=e.data.result,r={},n=0;n<s.length;n++)r[s[n].sno]=s[n];t.studentList=r;for(var i=[],a=0;a<t.groupData.length;a++){var o=t.getStuList(t.groupData[a].snos);i.push.apply(i,p()(o))}for(var l=0;l<i.length;l++)t.studentList[i[l].sno]&&(t.studentList[i[l].sno]=u()({},t.studentList[i[l].sno],{isGroup:!0}))}))},add:function(t){for(var e=this.group["group"+t],s=0;s<e.length;s++)this.studentList[e[s]]=u()({},this.studentList[e[s]],{isGroup:!0});for(var r=0;r<this.groupData.length;r++)this.groupData[r].id===t&&this.checkList.length>0&&(this.groupData[r].snos+=(this.groupData[r].snos?",":"")+this.checkList.join(","));this.checkList=[]},del:function(t){for(var e=this.group["group"+t],s=0;s<e.length;s++)this.studentList[e[s]]=u()({},this.studentList[e[s]],{isGroup:!1});for(var r=0;r<this.groupData.length;r++)if(this.groupData[r].id===t){var n=this.getStuList(this.groupData[r].snos).filter((function(t){return!e.includes(t.sno)})).map((function(t){return t.sno}));this.groupData[r].snos=n.join(",")}this.group["group"+t]=[]},getStuList:function(t){var e=this;return t?t.split(",").map((function(t){return{sno:t,sname:e.studentList[t]?e.studentList[t].sname:"未知"}})):[]},confirmBtn:function(){for(var t=this,e=[],s=0;s<this.groupData.length;s++)e.push(this.confirmUpdate(this.groupData[s].id,this.groupData[s].is_sure_question,this.groupData[s].groupid,this.groupData[s].snos));d.a.all(e).then((function(){t.$emit("getConfirmStatus",!0)})).catch((function(){t.$message.error("确认失败")}))},confirmUpdate:function(t,e,s,r){var n=this;this.$request.fetchUpdategroup({id:t,is_sure_student:1,is_sure_question:e,groupid:s,snos:r}).then((function(t){t.data.desc&&n.$message.error(t.data.desc)}))}}},m=(s("2Gyg"),s("KHd+")),g=Object(m.a)(h,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h3",[t._v("未分组学生列表")]),t._v(" "),s("el-checkbox-group",{model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},[t._l(Object.values(t.studentList),(function(e){return[e.isGroup?t._e():s("el-checkbox",{key:e.id,attrs:{label:e.sno}},[t._v(t._s(e.sname))])]}))],2),t._v(" "),t._l(t.groupData,(function(e){return s("div",{key:e.id,staticClass:"list"},[s("h3",[t._v(t._s(e.level)+"-"+t._s(e.cno)+"-"+t._s(e.groupid)+"组")]),t._v(" "),s("el-button",{staticClass:"btn",attrs:{size:"mini"},on:{click:function(s){return t.add(e.id)}}},[t._v("添加到当前分组")]),t._v(" "),s("el-button",{staticClass:"btn",attrs:{size:"mini"},on:{click:function(s){return t.del(e.id)}}},[t._v("从当前分组删除")]),t._v(" "),s("el-checkbox-group",{model:{value:t.group["group"+e.id],callback:function(s){t.$set(t.group,"group"+e.id,s)},expression:"group['group' + item.id]"}},t._l(t.getStuList(e.snos),(function(e){return s("el-checkbox",{key:e.sno,attrs:{label:e.sno}},[t._v(t._s(e.sname))])})),1)],1)})),t._v(" "),s("el-popconfirm",{attrs:{title:"确定确认分组吗？确认后将不再可修改！"},on:{confirm:function(e){return t.confirmBtn()}}},[s("el-button",{attrs:{slot:"reference",type:"primary",size:"medium"},slot:"reference"},[t._v("确认分组")])],1)],2)}),[],!1,null,"70785c1a",null).exports,_={name:"group-table",components:{RecommendQues:l.default,ConfirmGroup:g},data:function(){return{dialogFormVisible:!1,form:{level:(new Date).getFullYear()+"",cno:"",exam_detail_id:"",is_sure_student:"0",is_sure_question:"0"},formDialog:{},updateDate:{},examSub:[],options:[],tableData:[],classList:[],studentMap:{},curGroupData:null,isConfirmGroup:!0}},beforeRouteLeave:function(t,e,s){this.$store.dispatch("setGroupLevel","group"),s()},mounted:function(){this.getClassList(),this.getExamList()},methods:{getList:function(){var t=this;if(0===this.examSub.length)return this.$message.error("请选择考试科目");this.isConfirmGroup=!0,this.$request.fetchSearchgroup(u()({},this.form,{exam_detail_id:this.examSub[1]})).then((function(e){t.tableData=e.data.result;for(var s=0;s<t.tableData.length;s++)console.log(t.tableData[s].is_sure_student),0==+t.tableData[s].is_sure_student&&(t.isConfirmGroup=!1)}))},getClassList:function(){var t=this;this.$request.fetchSearchClass({level:this.form.level,headteacher:""}).then((function(e){var s=e.data.result;t.classList=s,s.length>0&&(t.form.cno=s[0].cno)}))},getExamList:function(){var t=this;this.$request.fetchSelectExam({}).then((function(e){var s;t.options=[],e.data.result.map((s=a()(n.a.mark((function e(s,r){var i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getExam_subjectList(s.exam_id);case 2:return i=e.sent,t.options.push({value:s.exam_id,label:s.name,children:[]}),i.map((function(e){t.options[r].children.push({value:e.exam_detail_id,label:e.subject_name})})),e.abrupt("return",s);case 6:case"end":return e.stop()}}),e,t)}))),function(t,e){return s.apply(this,arguments)}))})).catch((function(t){console.log(t)}))},getExam_subjectList:function(t){return this.$request.fetchSelectExamsubject({exam_id:t}).then((function(t){return t.data})).catch((function(t){console.log(t)}))},getStudentList:function(){var t=this;this.$request.fetchSearchStu({level:this.form.level,cno:""}).then((function(e){for(var s=e.data.result,r={},n=0;n<s.length;n++)r[s[n].sno]=s[n];t.studentMap=r})).catch((function(t){console.log(t)}))},changeLevel:function(t){this.form.level=t,this.getClassList()},changeExamId:function(t){this.examSub=t},search:function(){var t=this;return a()(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getList();case 2:return e.next=4,t.getStudentList();case 4:case"end":return e.stop()}}),e,t)})))()},getTableData:function(t){var e=this;return t?t.split(",").map((function(t){return{sno:t,sname:e.studentMap[t]?e.studentMap[t].sname:""}})):[]},confirmUpdate:function(){var t=this;this.$request.fetchUpdategroup({id:this.formDialog.id,is_sure_student:this.formDialog.is_sure_student,is_sure_question:this.formDialog.is_sure_question,groupid:this.formDialog.groupid,snos:this.formDialog.snos}).then((function(e){t.dialogFormVisible=!1,e.data.desc&&t.$message.error(e.data.desc),t.search()})).catch((function(t){console.log(t)}))},confirmCurGroup:function(){if(0===this.tableData.length)return this.$message.error("请先查询要确认的分组");this.dialogFormVisible=!0},delGroup:function(){var t=this;if(0===this.examSub.length)return this.$message.error("请选择要删除分组的考试科目");this.$request.fetchDelgroup({exam_detail_id:this.examSub[1]}).then((function(e){t.search(),t.$message({showClose:!0,message:"删除成功！",type:"success"})}))},handleShowQues:function(t){this.curGroupData=u()({},t,{subjectId:this.examSub}),this.$store.dispatch("setGroupLevel","ques")},getConfirmStatus:function(t){this.getList(),this.dialogFormVisible=!1}}},v=(s("1G53"),Object(m.a)(_,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",["group"===t.$store.getters.groupLevel?s("div",[s("el-form",{ref:"form",staticClass:"myForm",attrs:{model:t.form,"label-width":"100px",size:"medium","label-position":"left"}},[s("el-form-item",{attrs:{label:"年级"}},[s("el-date-picker",{attrs:{type:"year","value-format":"yyyy",placeholder:"选择年级"},on:{change:t.changeLevel},model:{value:t.form.level,callback:function(e){t.$set(t.form,"level",e)},expression:"form.level"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"班号"}},[s("el-select",{model:{value:t.form.cno,callback:function(e){t.$set(t.form,"cno",e)},expression:"form.cno"}},t._l(t.classList,(function(t){return s("el-option",{key:t.id,attrs:{label:t.cno,value:t.cno}})})),1)],1),t._v(" "),s("el-form-item",{attrs:{label:"考试科目"}},[s("el-cascader",{attrs:{options:t.options,"show-all-levels":!0,size:"medium"},on:{change:t.changeExamId},model:{value:t.examSub,callback:function(e){t.examSub=e},expression:"examSub"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"是否确认学生"}},[s("el-radio-group",{model:{value:t.form.is_sure_student,callback:function(e){t.$set(t.form,"is_sure_student",e)},expression:"form.is_sure_student"}},[s("el-radio",{attrs:{label:"0"}},[t._v("未确认")]),t._v(" "),s("el-radio",{attrs:{label:"1"}},[t._v("已确认")])],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"是否确认题目"}},[s("el-radio-group",{model:{value:t.form.is_sure_question,callback:function(e){t.$set(t.form,"is_sure_question",e)},expression:"form.is_sure_question"}},[s("el-radio",{attrs:{label:"0"}},[t._v("未确认")]),t._v(" "),s("el-radio",{attrs:{label:"1"}},[t._v("已确认")])],1)],1),t._v(" "),s("el-form-item",{staticClass:"myFooter"},[s("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查询")]),t._v(" "),"superAdmin"===t.$store.getters.info.role?s("el-popconfirm",{attrs:{title:"确定删除当前考试下的所有分组吗？"},on:{confirm:t.delGroup}},[s("el-button",{attrs:{slot:"reference",type:"danger"},slot:"reference"},[t._v("删除分组")])],1):t._e(),t._v(" "),t.isConfirmGroup?t._e():s("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.confirmCurGroup}},[t._v("确认分组")])],1)],1),t._v(" "),s("el-table",{attrs:{data:t.tableData}},[s("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.getTableData(e.row.snos),border:""}},[s("el-table-column",{attrs:{prop:"sname",label:"学生姓名"}}),t._v(" "),s("el-table-column",{attrs:{prop:"sno",label:"学号"}})],1)]}}],null,!1,4077188697)}),t._v(" "),s("el-table-column",{attrs:{prop:"level",label:"年级"}}),t._v(" "),s("el-table-column",{attrs:{prop:"cno",label:"班号"}}),t._v(" "),s("el-table-column",{attrs:{prop:"groupid",label:"组号"}}),t._v(" "),s("el-table-column",{attrs:{prop:"rank",label:"所属分级"}}),t._v(" "),s("el-table-column",{attrs:{prop:"weakpoints_and_rate",label:"薄弱知识点信息"}}),t._v(" "),s("el-table-column",{attrs:{label:"是否确认学生"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",[t._v("\n            "+t._s(0==+e.row.is_sure_student?"未确认":"已确认")+"\n          ")])]}}],null,!1,2485223080)}),t._v(" "),s("el-table-column",{attrs:{label:"是否确认题目"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",[t._v("\n            "+t._s(0==+e.row.is_sure_question?"未确认":"已确认")+"\n          ")])]}}],null,!1,800950735)}),t._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"mini"},on:{click:function(s){return t.handleShowQues(e.row)}}},[t._v("查看推荐试题")])]}}],null,!1,3901078930)})],1),t._v(" "),s("el-dialog",{attrs:{title:"确认分组",visible:t.dialogFormVisible,width:"650px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[s("ConfirmGroup",{attrs:{form:t.form,groupData:t.tableData},on:{getConfirmStatus:t.getConfirmStatus}})],1)],1):s("RecommendQues",{attrs:{curGroupData:t.curGroupData}})],1)}),[],!1,null,"95513146",null));e.default=v.exports},"b6z+":function(t,e,s){},cfE7:function(t,e,s){"use strict";s("+zyR")},rqBn:function(t,e,s){"use strict";s.r(e);var r=s("TTmx"),n=s("jWbq"),i={name:"recommend-ques",props:["curGroupData"],data:function(){return{url:n.b,HtmlUtil:r.a,questionList:[],diffMap:{.94:"容易",.85:"较易",.65:"中等",.64:"中等",.4:"较难",.15:"困难",0:"困难"}}},mounted:function(){console.log(this.curGroupData),this.getList()},methods:{getList:function(){var t=this;this.$request.fetchSelectquestion({id:this.curGroupData.id}).then((function(e){if(0===e.data.length)return t.getQuestion();t.questionList=e.data}))},getQuestion:function(){var t=this;this.$request.fetchGetProblem({rank:this.curGroupData.rank,weakKnowledge:this.getWeakKnowledge(this.curGroupData.weakpoints_and_rate),subjectId:this.curGroupData.subjectId[1]}).then((function(e){if(0===e.data.length)return t.$message.error("该分组没有获取到推荐试题");t.addQuestion(e.data.data)}))},addQuestion:function(t){var e=this;this.$request.fetchAddquestion({id:this.curGroupData.id,qid_list:t}).then((function(t){if(!t.data.result)return e.$message.error("推荐试题添加失败");e.getList()}))},getWeakKnowledge:function(t){for(var e=t.split("||"),s=[],r=0;r<e.length;r++)s.push(e[r].split("_")[0]);return s},deleteQues:function(t){var e=this;this.$request.fetchDelquestion({id:t}).then((function(t){if(t.data.desc)return e.$message.error(t.data.desc);e.getList(),e.$message({showClose:!0,message:"删除成功！",type:"success"})}))},confirmUpdate:function(){var t=this;this.$request.fetchUpdategroup({id:this.curGroupData.id,is_sure_student:this.curGroupData.is_sure_student,is_sure_question:1,groupid:this.curGroupData.groupid,snos:this.curGroupData.snos}).then((function(e){if(e.data.desc)return t.$message.error(e.data.desc);t.$message.success("确定成功")})).catch((function(t){console.log(t)}))},isImage:function(t){if(t)return 0==t.indexOf("http")},getNo:function(t){return t?t.split("13q")[1].split(".html")[0]:""},back:function(){this.$store.dispatch("setGroupLevel","group")}}},a=(s("cfE7"),s("KHd+")),o=Object(a.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-button",{staticClass:"back",attrs:{size:"medium"},on:{click:t.back}},[t._v("返回上一级")]),t._v(" "),s("el-popconfirm",{attrs:{title:"确定确认试题吗？确认后将不再可修改！"},on:{confirm:function(e){return t.confirmUpdate()}}},[0==+t.curGroupData.is_sure_question?s("el-button",{staticClass:"addBtn",attrs:{slot:"reference",size:"medium"},slot:"reference"},[t._v("确认试题")]):t._e()],1),t._v(" "),t._l(t.questionList,(function(e){return s("el-card",{key:e.id,staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("div",[s("span",[t._v("题号："+t._s(e.qno))]),t._v(" "),s("el-divider",{attrs:{direction:"vertical"}}),t._v(" "),s("span",[t._v(t._s(-1!==e.qtype.indexOf("题型")?e.qtype:"题型："+e.qtype))]),t._v(" "),s("el-divider",{attrs:{direction:"vertical"}}),t._v(" "),s("span",[t._v(t._s(e.source))]),t._v(" "),s("el-divider",{attrs:{direction:"vertical"}}),t._v(" "),s("span",[t._v("\n          "+t._s(-1!==e.difficulty.indexOf("难度")?t.diffMap[e.difficulty]:"难度："+t.diffMap[e.difficulty])+"\n        ")])],1),t._v(" "),"superAdmin"===t.$store.getters.info.role&&0==+t.curGroupData.is_sure_question?s("div",{staticClass:"toolBtn"},[s("el-popconfirm",{attrs:{title:"确定删除这道题吗？"},on:{confirm:function(s){return t.deleteQues(e.id)}}},[s("el-button",{attrs:{slot:"reference",size:"mini",type:"danger"},slot:"reference"},[t._v("删除")])],1)],1):t._e()]),t._v(" "),s("div",[s("div",{staticClass:"title"},[s("span",{domProps:{innerHTML:t._s(t.HtmlUtil.htmlDecodeByRegExp(e.stem))}})]),t._v(" "),t.isImage(e.answer)?s("img",{attrs:{src:t.url+"exam/download?filename="+t.getNo(e.weburl)+".png&answerpic=1&stempic=",alt:""}}):s("span",{domProps:{innerHTML:t._s(t.HtmlUtil.htmlDecodeByRegExp(e.answer))}})])])}))],2)}),[],!1,null,"04653fd4",null);e.default=o.exports}}]);
//# sourceMappingURL=2.a482f28edcb022bb0c57.js.map