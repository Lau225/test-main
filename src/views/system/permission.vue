<template>
    <div class="permission-management">
        <button @click="$router.push('/ygw/monitor?name=111')">111</button>
        <button @click="$router.push('/ygw/monitor?name=222')">2222</button>
        <DxLoadPanel :visible="loading" message="加载中...." shading-color="rgba(0,0,0,0.4)" />
        <TreeListDemo v-if="list.length > 0" :list="list" @edit="handleEdit" @add="handleAdd" @del="handleDelete" />
    </div>
</template>
<script>
export default {
    name: 'permission'
}
</script>
<script setup>
import TreeListDemo from '@/components/TreeListDemo.vue';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import request from '@/utils/request'
import { ref } from 'vue'
import notify from 'devextreme/ui/notify'

const list = ref([
    {
        "id": "02552213-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "39587c02-9e13-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FRadar%2FRadarZN.aspx?",
        "permissionUrl": null,
        "orderId": 1,
        "menuType": "",
        "menuTitle": "中南地区雷达",
        "remark": null,
        "children": []
    },
    {
        "id": "025852f1-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "39587c02-9e13-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FRadar%2FRadar.aspx",
        "permissionUrl": null,
        "orderId": 2,
        "menuType": "",
        "menuTitle": "全国雷达拼图",
        "remark": null,
        "children": []
    },
    {
        "id": "025b662c-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FSigWxCharts_FL100%2Findex.htm",
        "permissionUrl": null,
        "orderId": 1,
        "menuType": "",
        "menuTitle": "低空天气预告图",
        "remark": null,
        "children": []
    },
    {
        "id": "025e44d0-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FSigWxCharts%2Findex.htm",
        "permissionUrl": null,
        "orderId": 2,
        "menuType": "",
        "menuTitle": "中高空天气预告图",
        "remark": null,
        "children": []
    },
    {
        "id": "02611b67-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FWindTempCharts_Low%2Findex.htm",
        "permissionUrl": null,
        "orderId": 3,
        "menuType": "",
        "menuTitle": "低层风温预告图",
        "remark": null,
        "children": []
    },
    {
        "id": "0263def0-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FWindTempCharts%2Findex.htm",
        "permissionUrl": null,
        "orderId": 4,
        "menuType": "",
        "menuTitle": "中高层风温预告图",
        "remark": null,
        "children": []
    },
    {
        "id": "0266e9a1-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fba9a71-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "",
        "permissionUrl": null,
        "orderId": 1,
        "menuType": "",
        "menuTitle": "天气情报",
        "remark": null,
        "children": []
    },
    {
        "id": "0269ee87-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fba9a71-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FQueryMetInfo%2FReportByArea.aspx",
        "permissionUrl": null,
        "orderId": 2,
        "menuType": "",
        "menuTitle": "机场报文",
        "remark": null,
        "children": []
    },
    {
        "id": "026d7ce8-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_sp.aspx",
        "permissionUrl": null,
        "orderId": 1,
        "menuType": "",
        "menuTitle": "Sp告警",
        "remark": null,
        "children": []
    },
    {
        "id": "0271275b-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_sigmet.aspx",
        "permissionUrl": null,
        "orderId": 2,
        "menuType": "",
        "menuTitle": "Sigmet告警",
        "remark": null,
        "children": []
    },
    {
        "id": "02742270-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_bbb.aspx",
        "permissionUrl": null,
        "orderId": 3,
        "menuType": "",
        "menuTitle": "修订报告警",
        "remark": null,
        "children": []
    },
    {
        "id": "027793be-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_sigwx.aspx",
        "permissionUrl": null,
        "orderId": 4,
        "menuType": "",
        "menuTitle": "修订图告警",
        "remark": null,
        "children": []
    },
    {
        "id": "027c06b0-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FWeatherForecast%2FKB.aspx",
        "permissionUrl": null,
        "orderId": 1,
        "menuType": "",
        "menuTitle": "天气快报",
        "remark": null,
        "children": []
    },
    {
        "id": "027ed29d-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FWeatherForecast%2FWT.aspx",
        "permissionUrl": null,
        "orderId": 2,
        "menuType": "",
        "menuTitle": "天气通报",
        "remark": null,
        "children": []
    },
    {
        "id": "02826d88-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FZGGG%2Fzggg_forecast.asp",
        "permissionUrl": null,
        "orderId": 3,
        "menuType": "",
        "menuTitle": "中南天气形势",
        "remark": null,
        "children": []
    },
    {
        "id": "02873480-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FWeatherForecast%2FMR.aspx",
        "permissionUrl": null,
        "orderId": 4,
        "menuType": "",
        "menuTitle": "MDRS天气概率",
        "remark": null,
        "children": []
    },
    {
        "id": "08de3945-2576-481c-8f51-8b528a5b7ab4",
        "parentId": null,
        "componentName": "",
        "componentPath": "",
        "menuIcon": "Back",
        "menuUrl": "",
        "permissionUrl": null,
        "orderId": 0,
        "menuType": "",
        "menuTitle": "态势监控",
        "remark": null,
        "children": []
    },
    {
        "id": "08de3945-624a-4338-8f27-ac233e71620a",
        "parentId": "08de3945-2576-481c-8f51-8b528a5b7ab4",
        "componentName": "list",
        "componentPath": "view/list/index",
        "menuIcon": null,
        "menuUrl": "/ygw/list",
        "permissionUrl": null,
        "orderId": 0,
        "menuType": "children",
        "menuTitle": "ADP",
        "remark": null,
        "children": []
    },
    {
        "id": "08de3945-81f5-4ce0-8f5c-068aa77a437e",
        "parentId": "08de3945-2576-481c-8f51-8b528a5b7ab4",
        "componentName": "map",
        "componentPath": "view/map/index",
        "menuIcon": null,
        "menuUrl": "/ygw/map",
        "permissionUrl": null,
        "orderId": 0,
        "menuType": "children",
        "menuTitle": "场监",
        "remark": null,
        "children": []
    },
    {
        "id": "08de3946-1a7c-4b12-83e4-ea8d5f23756c",
        "parentId": "08de3945-2576-481c-8f51-8b528a5b7ab4",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/track",
        "permissionUrl": null,
        "orderId": 0,
        "menuType": "children",
        "menuTitle": "空中",
        "remark": null,
        "children": []
    },
    {
        "id": "08de3946-3147-4d3a-8413-b3164668d785",
        "parentId": "08de3945-2576-481c-8f51-8b528a5b7ab4",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/flightInfo?kind=normal",
        "permissionUrl": null,
        "orderId": 0,
        "menuType": "children",
        "menuTitle": "航班动态",
        "remark": null,
        "children": []
    },
    {
        "id": "08de3946-5e20-4768-8795-7b14ab38f7a9",
        "parentId": null,
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "",
        "permissionUrl": null,
        "orderId": 0,
        "menuType": "main",
        "menuTitle": "系统设置",
        "remark": null,
        "children": []
    },
    {
        "id": "08de3946-987e-41c2-8511-0a66598f8bc4",
        "parentId": "08de3946-5e20-4768-8795-7b14ab38f7a9",
        "componentName": "permission",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/system/permission",
        "permissionUrl": null,
        "orderId": 0,
        "menuType": "children",
        "menuTitle": "菜单管理",
        "remark": null,
        "children": []
    },
    {
        "id": "08de3ec2-58aa-4a0e-8812-265838d91e37",
        "parentId": null,
        "componentName": "",
        "componentPath": "",
        "menuIcon": "",
        "menuUrl": "",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "",
        "menuTitle": "值班管理",
        "remark": "",
        "children": []
    },
    {
        "id": "08de3ec2-6a97-4453-8131-669e703453ed",
        "parentId": "08de3ec2-58aa-4a0e-8812-265838d91e37",
        "componentName": "",
        "componentPath": "",
        "menuIcon": "",
        "menuUrl": "",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "",
        "menuTitle": "值班管理",
        "remark": "",
        "children": []
    },
    {
        "id": "08de3ec3-acf2-4b9c-8771-2a1452a592d5",
        "parentId": null,
        "componentName": "",
        "componentPath": "",
        "menuIcon": "",
        "menuUrl": "",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "",
        "menuTitle": "文档管理",
        "remark": "",
        "children": []
    },
    {
        "id": "08de3ec3-bbba-484d-8242-40f8919ab430",
        "parentId": "08de3ec3-acf2-4b9c-8771-2a1452a592d5",
        "componentName": "DutyLog",
        "componentPath": "view/DutyLog/index",
        "menuIcon": "",
        "menuUrl": "/ygw/DutyLog",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "children",
        "menuTitle": "工作日志",
        "remark": "",
        "children": []
    },
    {
        "id": "08de3ece-3a53-4cbc-8d2a-9a2956376f9e",
        "parentId": "08de3ec3-acf2-4b9c-8771-2a1452a592d5",
        "componentName": "test",
        "componentPath": "view/test/index",
        "menuIcon": "",
        "menuUrl": "/ygw/test",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "children",
        "menuTitle": "测试",
        "remark": "",
        "children": []
    },
    {
        "id": "08de41ca-1962-4b56-8fea-cb520576ddbe",
        "parentId": "08de3946-5e20-4768-8795-7b14ab38f7a9",
        "componentName": "role",
        "componentPath": "system/role",
        "menuIcon": "",
        "menuUrl": "/system/role",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "children",
        "menuTitle": "角色管理",
        "remark": "",
        "children": []
    },
    {
        "id": "08de41ca-27cd-4ae0-83ba-57042cd1cd7d",
        "parentId": "08de3946-5e20-4768-8795-7b14ab38f7a9",
        "componentName": "user",
        "componentPath": "system/user",
        "menuIcon": "",
        "menuUrl": "/system/user",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "children",
        "menuTitle": "用户管理",
        "remark": "",
        "children": []
    },
    {
        "id": "08de41ee-799d-4fa4-8936-77b0c0018824",
        "parentId": "08de3946-5e20-4768-8795-7b14ab38f7a9",
        "componentName": "button",
        "componentPath": "system/button",
        "menuIcon": "",
        "menuUrl": "/system/button",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "children",
        "menuTitle": "按钮管理",
        "remark": "",
        "children": []
    },
    {
        "id": "0fb326c9-9e15-11ee-be15-fefcfe485cc3",
        "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FZGGGFY2E%2FFY2H.aspx",
        "permissionUrl": null,
        "orderId": 3,
        "menuType": "",
        "menuTitle": "FY2H卫星",
        "remark": null,
        "children": []
    },
    {
        "id": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
        "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "",
        "permissionUrl": null,
        "orderId": 4,
        "menuType": "",
        "menuTitle": "预告图",
        "remark": null,
        "children": []
    },
    {
        "id": "0fba9a71-9e15-11ee-be15-fefcfe485cc3",
        "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "",
        "permissionUrl": null,
        "orderId": 5,
        "menuType": "",
        "menuTitle": "报文查询",
        "remark": null,
        "children": []
    },
    {
        "id": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
        "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "",
        "permissionUrl": null,
        "orderId": 6,
        "menuType": "",
        "menuTitle": "气象情报",
        "remark": null,
        "children": []
    },
    {
        "id": "0fbfac3b-9e15-11ee-be15-fefcfe485cc3",
        "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FNoticePrd%2FNoticePrd.aspx",
        "permissionUrl": null,
        "orderId": 7,
        "menuType": "",
        "menuTitle": "预警预报",
        "remark": null,
        "children": []
    },
    {
        "id": "0fc3753b-9e15-11ee-be15-fefcfe485cc3",
        "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Ftyphoon%2Findex.html",
        "permissionUrl": null,
        "orderId": 8,
        "menuType": "",
        "menuTitle": "台风路径图",
        "remark": null,
        "children": []
    },
    {
        "id": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
        "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "",
        "permissionUrl": null,
        "orderId": 9,
        "menuType": "",
        "menuTitle": "天气形势",
        "remark": null,
        "children": []
    },
    {
        "id": "10a0a499-2441-11ed-b770-fefcfe485cc3",
        "parentId": "08de3ec2-6a97-4453-8131-669e703453ed",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/changeShift",
        "permissionUrl": null,
        "orderId": 1,
        "menuType": "",
        "menuTitle": "席位交接班",
        "remark": null,
        "children": []
    },
    {
        "id": "166a679e-2ce4-11ed-b770-fefcfe485cc3",
        "parentId": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/scheduleRole",
        "permissionUrl": null,
        "orderId": 2,
        "menuType": "",
        "menuTitle": "角色模板",
        "remark": null,
        "children": []
    },
    {
        "id": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "parentId": null,
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "",
        "permissionUrl": null,
        "orderId": 4,
        "menuType": "",
        "menuTitle": "气象信息显示",
        "remark": null,
        "children": []
    },
    {
        "id": "31ebd558-34bf-11ed-b770-fefcfe485cc3",
        "parentId": "8ceb6413-243b-11ed-b770-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/scheduleTemplate",
        "permissionUrl": null,
        "orderId": 2,
        "menuType": "",
        "menuTitle": "排班模板配置",
        "remark": null,
        "children": []
    },
    {
        "id": "39587c02-9e13-11ee-be15-fefcfe485cc3",
        "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "",
        "permissionUrl": null,
        "orderId": 2,
        "menuType": "",
        "menuTitle": "天气雷达",
        "remark": null,
        "children": []
    },
    {
        "id": "563bbb37-2441-11ed-b770-fefcfe485cc3",
        "parentId": "08de3ec2-6a97-4453-8131-669e703453ed",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/dutyQuery",
        "permissionUrl": null,
        "orderId": 6,
        "menuType": "",
        "menuTitle": "值班信息查询统计",
        "remark": null,
        "children": []
    },
    {
        "id": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
        "parentId": "8ceb6413-243b-11ed-b770-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": null,
        "permissionUrl": null,
        "orderId": 1,
        "menuType": "",
        "menuTitle": "基础数据",
        "remark": null,
        "children": []
    },
    {
        "id": "5ab7f66b-34bf-11ed-b770-fefcfe485cc3",
        "parentId": "8ceb6413-243b-11ed-b770-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/schedule",
        "permissionUrl": null,
        "orderId": 3,
        "menuType": "",
        "menuTitle": "排班",
        "remark": null,
        "children": []
    },
    {
        "id": "607af644-c374-11ef-a793-fefcfe485cc3",
        "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Fforecast%2Fgetdata.aspx%3Ffn%3Dweek_fcst.html",
        "permissionUrl": null,
        "orderId": 12,
        "menuType": "",
        "menuTitle": "白云机场一周天气预报",
        "remark": null,
        "children": []
    },
    {
        "id": "733ceb4c-37c9-11ed-b770-fefcfe485cc3",
        "parentId": "9ab7fe01-37c6-11ed-b770-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/replacementApply",
        "permissionUrl": null,
        "orderId": 1,
        "menuType": "",
        "menuTitle": "替换班申请",
        "remark": null,
        "children": []
    },
    {
        "id": "8ceb6413-243b-11ed-b770-fefcfe485cc3",
        "parentId": "08de3ec2-58aa-4a0e-8812-265838d91e37",
        "componentName": "",
        "componentPath": "",
        "menuIcon": "",
        "menuUrl": "",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "",
        "menuTitle": "岗前排班",
        "remark": "",
        "children": []
    },
    {
        "id": "9225f5e9-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0266e9a1-9e19-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FHistory%2Fsigmet%2FSIGMET.aspx",
        "permissionUrl": null,
        "orderId": 1,
        "menuType": "",
        "menuTitle": "境内重要天气情报",
        "remark": null,
        "children": []
    },
    {
        "id": "9228ed03-9e19-11ee-be15-fefcfe485cc3",
        "parentId": "0266e9a1-9e19-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FHistory%2Fsigmet%2FSIGMET_FOREIGN.aspx",
        "permissionUrl": null,
        "orderId": 2,
        "menuType": "",
        "menuTitle": "境外重要天气情报",
        "remark": null,
        "children": []
    },
    {
        "id": "99d9b056-37c9-11ed-b770-fefcfe485cc3",
        "parentId": "9ab7fe01-37c6-11ed-b770-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/replacementAudit",
        "permissionUrl": null,
        "orderId": 2,
        "menuType": "",
        "menuTitle": "替换班审批",
        "remark": null,
        "children": []
    },
    {
        "id": "9ab7fe01-37c6-11ed-b770-fefcfe485cc3",
        "parentId": "8ceb6413-243b-11ed-b770-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": null,
        "permissionUrl": null,
        "orderId": 6,
        "menuType": "",
        "menuTitle": "替换班管理",
        "remark": null,
        "children": []
    },
    {
        "id": "acda4c74-2ce4-11ed-b770-fefcfe485cc3",
        "parentId": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/scheduleSeat",
        "permissionUrl": null,
        "orderId": 3,
        "menuType": "",
        "menuTitle": "席位模板",
        "remark": null,
        "children": []
    },
    {
        "id": "b6ae6118-3cee-11ef-a793-fefcfe485cc3",
        "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FSingleAirportCheck%2FAirportSelect.aspx",
        "permissionUrl": null,
        "orderId": 11,
        "menuType": "",
        "menuTitle": "本场风向变化预报",
        "remark": null,
        "children": []
    },
    {
        "id": "cbbae6f3-2ce4-11ed-b770-fefcfe485cc3",
        "parentId": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/scheduleShift",
        "permissionUrl": null,
        "orderId": 4,
        "menuType": "",
        "menuTitle": "班次模板",
        "remark": null,
        "children": []
    },
    {
        "id": "d4c11c40-2ce3-11ed-b770-fefcfe485cc3",
        "parentId": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
        "componentName": "",
        "componentPath": "",
        "menuIcon": null,
        "menuUrl": "/oms/scheduleTeam",
        "permissionUrl": null,
        "orderId": 1,
        "menuType": "",
        "menuTitle": "人员分组模板",
        "remark": null,
        "children": []
    }
])
// 操作函数
const handleEdit = async (rowData) => {
    try {
        console.log(rowData);

        const res = await request.put(`/Menu/command-sys-menu/${rowData.id}`, rowData)
        console.log(res);
        notify(
            {
                message: res.message,
                height: 45,
                width: 50,
                minWidth: 100,
                position: {
                    at: "top",
                    my: "top",
                    of: "#container"
                }
            },
            'success',
            1000
        );
    } catch (e) {
        console.log(e);

    } finally {
        initList()
    }
};
const loading = ref(false)
const handleAdd = async (rowData, type) => {
    try {
        if (type === 'main') {
            delete rowData["parentId"]
        }
        const res = await request.post('/Menu/command-sys-menu', rowData)
        notify(
            {
                message: res.message,
                height: 45,
                width: 50,
                minWidth: 100,
                position: {
                    at: "top",
                    my: "top",
                    of: "#container"
                }
            },
            'success',
            1000
        );
    } catch (e) {
        console.log(e);
    } finally {
        initList()
    }
}

const handleDelete = async (rowData) => {
    try {
        const res = await request.delete(`/Menu/command-sys-menu/${rowData.id}`, rowData)
        notify(
            {
                message: res.message,
                height: 45,
                width: 50,
                minWidth: 100,
                position: {
                    at: "top",
                    my: "top",
                    of: "#container"
                }
            },
            'success',
            1000
        );
    } catch (e) {
        console.log(e);

    } finally {
        initList()
    }
};

// const initList = async () => {
//     try {
//         loading.value = true
//         const res = await request.post('/Menu/command-sys-menu/list')
//         console.log(res);
//         if (res.data.items) {
//             list.value = res.data.items
//         }
//     } catch (e) {
//         console.log(e);
//     } finally {
//         loading.value = false
//     }
// }


</script>
<style lang="less" scoped>
.permission-management {
    background-color: var(--page-bg-color);
    min-height: calc(100vh - 6.5rem);
}
</style>