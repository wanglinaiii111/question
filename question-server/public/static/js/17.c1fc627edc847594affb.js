(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{Et6m:function(e,t,a){},dBoV:function(e,t,a){"use strict";a.r(t);var l={name:"dataTables",data:function(){return{tableData4:[{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-08",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-06",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-07",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"}],multipleSelection:[]}},methods:{toggleSelection:function(e){var t=this;e?e.forEach((function(e){t.$refs.multipleTable.toggleRowSelection(e)})):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e}}},n=(a("wTeJ"),a("KHd+")),o=Object(n.a)(l,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",[e._v("多选")]),e._v(" "),a("p",[e._v("选择多行数据时使用 Checkbox。")]),e._v(" "),[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData4,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{label:"日期",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.date))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"地址","show-overflow-tooltip":""}})],1),e._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("el-button",{on:{click:function(t){return e.toggleSelection([e.tableData4[1],e.tableData4[2]])}}},[e._v("切换第二、第三行的选中状态")]),e._v(" "),a("el-button",{on:{click:function(t){return e.toggleSelection()}}},[e._v("取消选择")])],1)]],2)}),[],!1,null,"bb48ac6e",null);t.default=o.exports},wTeJ:function(e,t,a){"use strict";a("Et6m")}}]);
//# sourceMappingURL=17.c1fc627edc847594affb.js.map