(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"4wlU":function(e,t,i){"use strict";i.r(t);var s=i("QbLZ"),o=i.n(s),a=i("14Xm"),n=i.n(a),r=i("D3Ub"),l=i.n(r),c={htmlEncodeByRegExp:function(e){return 0==e.length?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\s/g,"&nbsp;").replace(/\'/g,"&#39;").replace(/\"/g,"&quot;")},htmlDecodeByRegExp:function(e){return 0==e.length?"":e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/&#39;/g,"'").replace(/&quot;/g,'"')}},d=i("jWbq"),u={name:"add-question",props:["updateData"],data:function(){var e=this;return{HtmlUtil:c,allSubjectList:[],resolve:null,resolve_exam:null,time:(new Date).getTime(),form:{libType:1,qtype:"",difficulty:0,source:"",isExam:0,points:"",exam_detail_id:"",stem:"",answer:"",subject_id:"4"},props:{lazy:!0,checkStrictly:!0,lazyLoad:function(t,i){if(e.resolve=i,0===t.level)e.getKnowledgeNode(0);else{if(0===t.data.is_have_childe)return;e.getKnowledgeNode(t.data.tree_id)}}},options:[]}},mounted:function(){console.log(this.updateData),this.updateData&&(this.form=o()({},this.updateData,{points:this.updateData.parentNodes,isExam:this.updateData.exam_detail_id?1:0,stem:c.htmlDecodeByRegExp(this.updateData.stem),answer:this.isImage(this.updateData.answer)?"<img src="+d.b+"exam/download?filename="+this.updateData.qno.substring(3)+".png&answerpic=1&stempic= alt />":c.htmlDecodeByRegExp(this.updateData.answer)})),this.getSubjectList(),this.getExamList()},methods:{getKnowledgeNode:function(e){var t=this;this.$request.fetchKnowledgeNode({parentid:e,subjectid:this.form.subject_id}).then((function(e){var i=e.data.map((function(e){return{value:e.name,tree_id:e.tree_id,label:e.name,leaf:0===e.is_have_childe}}));t.resolve(i)})).catch((function(e){console.log(e)}))},getSubjectList:function(){var e=this;this.$request.fetchSelectSubject({}).then((function(t){e.allSubjectList=t.data}))},getExamList:function(){var e=this;this.$request.fetchSelectExam({}).then((function(t){var i;e.options=[],t.data.result.map((i=l()(n.a.mark((function t(i,s){var o;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getExam_subjectList(i.exam_id);case 2:return o=t.sent,e.options.push({value:i.exam_id,label:i.name,children:[]}),o.map((function(t){e.updateData&&+e.updateData.exam_detail_id==+t.exam_detail_id&&(e.form.exam_detail_id=[i.exam_id,t.exam_detail_id]),e.options[s].children.push({value:t.exam_detail_id,label:t.subject_name})})),t.abrupt("return",i);case 6:case"end":return t.stop()}}),t,e)}))),function(e,t){return i.apply(this,arguments)})),console.log(e.options)})).catch((function(e){console.log(e)}))},getExam_subjectList:function(e){return this.$request.fetchSelectExamsubject({exam_id:e}).then((function(e){return e.data})).catch((function(e){console.log(e)}))},changeSubject:function(e){this.form.subject_id=e},changeLibType:function(e){this.form.libType=e},changeIsExam:function(e){this.form.isExam=e},changePoint:function(e){this.form.points=e},changeExamId:function(e){console.log(e),this.form.exam_detail_id=e},onSubmit:function(){var e=this;if(console.log(this.form),1===this.form.isExam&&!this.form.exam_detail_id)return this.$message.error("请为考试题选择考试科目");if(!this.form.points)return this.$message.error("请选择知识点");if(!this.form.qtype)return this.$message.error("请添加试题类型");if(!this.form.stem)return this.$message.error("请添加题干");if(!this.form.answer)return this.$message.error("请为试题添加答案");var t=this.form.points.length,i=this.form.exam_detail_id.length;this.$request.fetchAddQuestion({libtype:this.form.libType,qtype:this.form.qtype,difficulty:this.form.difficulty,nums:"0",qno:this.time,stem:c.htmlEncodeByRegExp(this.form.stem),source:this.form.source,points:t>1?this.form.points[t-1]:this.form.points[0],answer:c.htmlEncodeByRegExp(this.form.answer),exam_detail_id:1===this.form.isExam?this.form.exam_detail_id[i-1]:"",subject_id:this.form.subject_id}).then((function(t){if(t.data.result)return e.$store.dispatch("setQuestionLevel","list"),void e.$message({showClose:!0,message:"创建成功！",type:"success"});t.data.desc&&(e.confirmBack(),e.$message({showClose:!0,message:t.data.desc,type:"error"}))})).catch((function(e){console.log(e)}))},onSubmitUpdate:function(){var e=this,t=this.form.points.length,i=this.form.exam_detail_id;this.form.exam_detail_id&&this.form.exam_detail_id.length>0&&(i=this.form.exam_detail_id[this.form.exam_detail_id.length-1]),this.$request.fetchUpdateQuestion({libtype:this.form.libType,qtype:this.form.qtype,difficulty:this.form.difficulty,nums:"0",qno:this.form.qno,stem:c.htmlEncodeByRegExp(this.form.stem),source:this.form.source,points:t>1?this.form.points[t-1]:this.form.points[0],answer:c.htmlEncodeByRegExp(this.form.answer),exam_detail_id:1===this.form.isExam?i:"",id:this.form.id}).then((function(t){t.data.result?e.$message({showClose:!0,message:"更新成功！",type:"success"}):t.data.desc&&(e.confirmBack(),e.$message({showClose:!0,message:t.data.desc,type:"error"}))})).catch((function(e){console.log(e)}))},confirmBack:function(){this.$store.dispatch("setQuestionLevel","list")},isImage:function(e){if(e)return 0==e.indexOf("http")}}},m=(i("yk6z"),i("KHd+")),f={name:"question",components:{AddQuestion:Object(m.a)(u,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"addQues"},[i("el-button",{attrs:{size:"medium"},on:{click:e.confirmBack}},[e._v("返回上一级")]),e._v(" "),i("div",{staticClass:"formContainer"},[i("h1",{staticClass:"quesTitle"},[e._v("\n      "+e._s("add"===e.$store.getters.questionLevel?"创建试题":"更新试题")+"\n    ")]),e._v(" "),i("el-form",{attrs:{model:e.form,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"题库类型"}},[i("el-radio-group",{on:{change:e.changeLibType},model:{value:e.form.libType,callback:function(t){e.$set(e.form,"libType",t)},expression:"form.libType"}},[i("el-radio",{attrs:{label:1}},[e._v("公共题库")]),e._v(" "),i("el-radio",{attrs:{label:2}},[e._v("推荐题库")])],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"试题类型"}},[i("el-input",{attrs:{size:"medium"},model:{value:e.form.qtype,callback:function(t){e.$set(e.form,"qtype",t)},expression:"form.qtype"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"难度"}},[i("el-input-number",{attrs:{size:"medium",precision:2,step:.1},model:{value:e.form.difficulty,callback:function(t){e.$set(e.form,"difficulty",t)},expression:"form.difficulty"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"来源"}},[i("el-input",{attrs:{size:"medium"},model:{value:e.form.source,callback:function(t){e.$set(e.form,"source",t)},expression:"form.source"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"科目"}},[i("el-select",{attrs:{size:"medium",placeholder:"请选择考试科目",filterable:"",disabled:"update"===e.$store.getters.questionLevel},on:{change:e.changeSubject},model:{value:e.form.subject_id,callback:function(t){e.$set(e.form,"subject_id",t)},expression:"form.subject_id"}},e._l(e.allSubjectList,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"知识点"}},[i("el-cascader",{key:e.form.subject_id,attrs:{props:e.props,"show-all-levels":!1,size:"medium"},on:{change:e.changePoint},model:{value:e.form.points,callback:function(t){e.$set(e.form,"points",t)},expression:"form.points"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"题干"}},[i("TEditor",{ref:"editor",attrs:{editType:"stem"},model:{value:e.form.stem,callback:function(t){e.$set(e.form,"stem",t)},expression:"form.stem"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"答案"}},[i("TEditor",{ref:"editor",attrs:{editType:"answer",time:e.time},model:{value:e.form.answer,callback:function(t){e.$set(e.form,"answer",t)},expression:"form.answer"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"考试题"}},[i("el-radio-group",{on:{change:e.changeIsExam},model:{value:e.form.isExam,callback:function(t){e.$set(e.form,"isExam",t)},expression:"form.isExam"}},[i("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:0}},[e._v("否")])],1),e._v(" "),i("div",[1===e.form.isExam?i("el-cascader",{attrs:{options:e.options,"show-all-levels":!1,size:"medium"},on:{change:e.changeExamId},model:{value:e.form.exam_detail_id,callback:function(t){e.$set(e.form,"exam_detail_id",t)},expression:"form.exam_detail_id"}}):e._e()],1)],1),e._v(" "),i("el-form-item",["add"===e.$store.getters.questionLevel?i("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("立即创建")]):i("el-button",{attrs:{type:"primary"},on:{click:e.onSubmitUpdate}},[e._v("更新")]),e._v(" "),i("el-button",{on:{click:e.confirmBack}},[e._v("取消")])],1)],1)],1)],1)}),[],!1,null,"1979c455",null).exports},data:function(){return{url:d.b,fullscreenLoading:!1,HtmlUtil:c,subject_id:"4",allSubjectList:[],questionList:[],props:{label:"name",isLeaf:function(e,t){return 0===e.is_have_childe}},tData:[],resolve:null,root:null,keyword:"",form:{libType:1,text:""},curQues:null,parentNodes:[]}},computed:{questionLevel:function(){return this.$store.getters.questionLevel}},watch:{questionLevel:function(e,t){console.log(e),"list"===e&&this.getQuestion()}},mounted:function(){this.getSubjectList()},beforeRouteLeave:function(e,t,i){this.$store.dispatch("setQuestionLevel","list"),i()},methods:{getKnowledgeNode:function(e){var t=this;this.$request.fetchKnowledgeNode({parentid:e,subjectid:this.subject_id}).then((function(i){if(t.resolve(i.data),0===e){if(t.tData=i.data,0==i.data.length)return void(t.questionList=[]);var s=t.$refs["my-tree"];t.keyword=i.data[0].name,t.$nextTick((function(){s.setCurrentKey(i.data[0].tree_id)})),t.getTreeNode(s.getNode(i.data[0].tree_id)),t.getQuestion()}})).catch((function(e){console.log(e)}))},getQuestion:function(){var e=this;this.keyword&&(this.fullscreenLoading=!0,this.$request.fetchQuestion({libtype:this.form.libType,keyword:this.keyword,subject_id:this.subject_id}).then((function(t){e.questionList=t.data,e.fullscreenLoading=!1})))},getSubjectList:function(){var e=this;this.$request.fetchSelectSubject({}).then((function(t){e.allSubjectList=t.data}))},loadNode:function(e,t){if(console.log(e,"node"),0===e.level)this.root=e,this.getKnowledgeNode(0);else{if(0===e.data.is_have_childe)return;this.getKnowledgeNode(e.data.tree_id)}this.resolve=t},changeSubject:function(e){this.subject_id=e,this.loadNode(this.root,this.resolve)},handleClickNode:function(e,t,i){this.parentNodes.length=0,this.form.text="",this.getTreeNode(t),this.keyword=e.name,this.getQuestion()},getTreeNode:function(e){e&&void 0!==e.data.parent_id&&(this.parentNodes.unshift(e.data.name),0!==e.data.parent_id&&this.getTreeNode(e.parent))},changeLibType:function(e){this.form.libType=e,this.getQuestion()},isImage:function(e){if(e)return 0==e.indexOf("http")},deleteQues:function(e){var t=this;this.$request.fetchDelQuestion({id:e,libtype:this.form.libType}).then((function(e){t.getQuestion(),t.$message({showClose:!0,message:"删除成功！",type:"success"})})).catch((function(e){console.log(e),t.$message({showClose:!0,message:"删除失败！",type:"error"})}))},toEdit:function(e,t){this.curQues=null,"update"===e&&(this.curQues=o()({},t,{libType:this.form.libType,subject_id:this.subject_id,parentNodes:this.parentNodes})),this.$store.dispatch("setQuestionLevel",e)},search:function(){var e=this;this.fullscreenLoading=!0,this.$request.fetchMatchingQuestion({libtype:this.form.libType,text:this.form.text,subject_id:this.subject_id}).then((function(t){e.$refs["my-tree"].setCurrentKey(null),e.questionList=t.data,e.fullscreenLoading=!1}))}}},h=(i("i6lI"),i("SI6d"),Object(m.a)(f,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"ques"},[i("div",{staticClass:"container",style:{display:"list"===e.$store.getters.questionLevel?"flex":"none"}},[i("div",{staticClass:"left"},[i("el-select",{staticClass:"select",attrs:{size:"medium",placeholder:"请选择考试科目",filterable:""},on:{change:e.changeSubject},model:{value:e.subject_id,callback:function(t){e.subject_id=t},expression:"subject_id"}},e._l(e.allSubjectList,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),e._v(" "),i("div",{staticClass:"tree"},[i("el-tree",{ref:"my-tree",attrs:{props:e.props,data:e.tData,load:e.loadNode,lazy:"","highlight-current":"","node-key":"tree_id"},on:{"node-click":e.handleClickNode}})],1)],1),e._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{lock:!0}}],staticClass:"right"},[i("div",{staticClass:"tools"},[i("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"题库类型"}},[i("el-radio-group",{on:{change:e.changeLibType},model:{value:e.form.libType,callback:function(t){e.$set(e.form,"libType",t)},expression:"form.libType"}},[i("el-radio",{attrs:{label:1}},[e._v("公共题库")]),e._v(" "),i("el-radio",{attrs:{label:2}},[e._v("推荐题库")])],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"试题文本"}},[i("el-input",{attrs:{size:"medium"},model:{value:e.form.text,callback:function(t){e.$set(e.form,"text",t)},expression:"form.text"}})],1)],1),e._v(" "),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"medium"},on:{click:function(t){return e.search()}}},[e._v("查询")]),e._v(" "),"superAdmin"===e.$store.getters.info.role?i("el-button",{attrs:{size:"medium"},on:{click:function(t){return e.toEdit("add")}}},[e._v("新建试题")]):e._e()],1)],1),e._v(" "),e._l(e.questionList,(function(t){return i("el-card",{key:t.id,staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("div",[i("span",[e._v(e._s(-1!==t.qtype.indexOf("题型")?t.qtype:"题型："+t.qtype))]),e._v(" "),i("el-divider",{attrs:{direction:"vertical"}}),e._v(" "),i("span",[e._v(e._s(t.source))]),e._v(" "),i("el-divider",{attrs:{direction:"vertical"}}),e._v(" "),i("span",[e._v("\n              "+e._s(-1!==t.difficulty.indexOf("难度")?t.difficulty:"难度："+t.difficulty)+"\n            ")]),e._v(" "),i("el-divider",{attrs:{direction:"vertical"}}),e._v(" "),i("span",[e._v("\n              "+e._s(-1!==t.nums.indexOf("引用次数")?t.nums:"引用次数："+t.nums)+"\n            ")]),e._v(" "),i("el-divider",{attrs:{direction:"vertical"}}),e._v(" "),i("span",[e._v("\n              "+e._s(-1!==t.update_time.indexOf("更新时间")?t.update_time:"更新时间："+t.update_time)+"\n            ")])],1),e._v(" "),"superAdmin"===e.$store.getters.info.role?i("div",{staticClass:"toolBtn"},[i("el-button",{staticClass:"addBtn",attrs:{size:"mini"},on:{click:function(i){return e.toEdit("update",t)}}},[e._v("更新")]),e._v(" "),i("el-popconfirm",{attrs:{title:"确定删除这道题吗？"},on:{confirm:function(i){return e.deleteQues(t.id)}}},[i("el-button",{attrs:{slot:"reference",size:"mini",type:"danger"},slot:"reference"},[e._v("删除")])],1)],1):e._e()]),e._v(" "),i("div",[i("div",{staticClass:"title"},[e._v("\n            "+e._s(t.qno)+"\n            "),e._v(" "),i("span",{domProps:{innerHTML:e._s(e.HtmlUtil.htmlDecodeByRegExp(t.stem))}})]),e._v(" "),e.isImage(t.answer)?i("img",{attrs:{src:e.url+"exam/download?filename="+t.qno.substring(3)+".png&answerpic=1&stempic=",alt:""}}):i("span",{domProps:{innerHTML:e._s(e.HtmlUtil.htmlDecodeByRegExp(t.answer))}})])])}))],2)]),e._v(" "),"list"!==e.$store.getters.questionLevel?i("AddQuestion",{attrs:{updateData:e.curQues}}):e._e()],1)}),[],!1,null,"0cacd03b",null));t.default=h.exports},SI6d:function(e,t,i){"use strict";i("wF6j")},i6lI:function(e,t,i){"use strict";i("j/tA")},iJbM:function(e,t,i){},"j/tA":function(e,t,i){},wF6j:function(e,t,i){},yk6z:function(e,t,i){"use strict";i("iJbM")}}]);
//# sourceMappingURL=2.2a5185b1e30a05077201.js.map