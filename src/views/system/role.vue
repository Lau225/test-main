<template>
    <div class="role-management">
        <el-button type="default" @click="handleAddRole" style="margin-bottom: 10px;">新增角色</el-button>

        <DxTable :data="roleList" :loading="loading" @sort-change="handleSortChange">
            <el-table-column prop="roleName" label="角色名称" sortable="custom" />
            <el-table-column prop="roleCode" label="角色编码" sortable="custom" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column label="操作" width="250" fixed="right">
                <template #default="{ row }">
                    <DxLinkButton @click="handleEditRole(row)">编辑</DxLinkButton>
                    <DxLinkButton @click="handleSetPermission(row)">编辑权限</DxLinkButton>
                    <DxLinkButton @click="handleDeleteRole(row)">删除</DxLinkButton>
                </template>
            </el-table-column>
        </DxTable>

        <DxPagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total" />

        <!-- 编辑角色对话框 -->
        <FormDialog ref="formDialogRef" :title="dialogTitle" :fields="roleFields" @save="handleSaveRole" />

        <!-- 权限设置 Drawer -->
        <el-drawer v-model="drawerVisible" title="权限设置" direction="rtl" size="500px" :before-close="handleDrawerClose">
            <div class="drawer-content">
                <div class="current-role">当前角色：{{ currentRole?.roleName }}</div>
                <div class="tree-actions">
                    <el-checkbox v-model="isAllChecked" @change="handleCheckAll">全选/取消全选</el-checkbox>
                </div>
                <el-tree ref="permissionTree" :data="permissionTreeData" show-checkbox node-key="id"
                    :props="{ children: 'children', label: 'menuTitle' }" default-expand-all class="permission-tree"
                    check-strictly @check="handleTreeCheck">
                    <template #default="{ node, data }">
                        <span class="tree-node">
                            <span class="node-label">{{ data.menuTitle }}</span>
                        </span>
                    </template>
                </el-tree>
                <div class="drawer-footer">
                    <el-button @click="drawerVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSavePermission">保存</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: 'role'
}
</script>

<script setup>
import { ref, watch, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'
import DxTable from '@/components/DxTable.vue'
import DxPagination from '@/components/DxPagination.vue'
import DxLinkButton from '@/components/DxLinkButton.vue'
import FormDialog from '@/components/FormDialog.vue'

// 响应式数据
const loading = ref(false)
const roleList = ref([])
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const dialogTitle = ref('')
const permissionList = ref([])
const drawerVisible = ref(false)
const currentRole = ref({})
const selectedPermissions = ref([])
const permissionTree = ref(null)
const isAllChecked = ref(false)
const formDialogRef = ref()
// 排序状态
const sortProp = ref('roleName')
const sortOrder = ref('ascending')

// 表单字段配置
const roleFields = [
    { name: 'roleName', label: '角色名称', rules: [{ required: true, message: '请输入角色名称' }] },
    { name: 'roleCode', label: '角色编码', rules: [{ required: true, message: '请输入角色编码' }] },
    { name: 'remark', label: '备注', type: 'textarea' }
]

// 将扁平的权限列表转换为树形结构
const permissionTreeData = ref()

// 获取角色列表（服务端分页和排序）
const initRoleList = async () => {
    try {
        loading.value = true
        const res = await request.post('/Role/command-sys-role/list', {
            pageIndex: currentPage.value,
            pageSize: pageSize.value,
            sortField: sortProp.value,
            sortOrder: sortOrder.value === 'ascending' ? 'asc' : 'desc'
        })
        if (res.data?.items) {
            roleList.value = res.data.items
            total.value = res.data.totalCount || 0
        }
    } catch (e) {
        console.log(e)
    } finally {
        loading.value = false
    }
}

// 监听分页变化
watch([currentPage, pageSize], () => {
    initRoleList()
})

// 获取权限菜单列表
const initPermissionList = async () => {
    try {
        const res = await request.post('/Menu/permission-list')
        if (res.data?.items) {
            permissionList.value = res.data.items
        }
    } catch (e) {
        console.log(e)
    }
}

// 新增角色
const handleAddRole = () => {
    dialogTitle.value = '新增角色'
    currentRole.value = {}
    formDialogRef.value.open()
}

// 编辑角色
const handleEditRole = (row) => {
    dialogTitle.value = '编辑角色'
    currentRole.value = { ...row }
    formDialogRef.value.open(row)
}

// 保存角色
const handleSaveRole = async (formData) => {
    try {
        loading.value = true
        if (currentRole.value.id) {
            // 编辑
            const res = await request.put(`/Role/command-sys-role/${currentRole.value.id}`, formData)
            ElMessage.success(res.message || '修改成功')
        } else {
            // 新增
            const res = await request.post('/Role/command-sys-role', formData)
            ElMessage.success(res.message || '新增成功')
        }
        initRoleList()
    } catch (e) {
        console.log(e)
        ElMessage.error('操作失败')
    } finally {
        loading.value = false
    }
}

// 删除角色
const handleDeleteRole = async (row) => {
    try {
        await ElMessageBox.confirm('确定要删除该角色吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })

        const res = await request.delete(`/Role/command-sys-role/${row.id}`)
        ElMessage.success(res.message || '删除成功')

        // 如果当前页只有一条数据且不是第一页，则跳转到上一页
        if (roleList.value.length === 1 && currentPage.value > 1) {
            currentPage.value--
        } else {
            initRoleList()
        }
    } catch (e) {
        if (e !== 'cancel') {
            console.log(e)
        }
    }
}

// 打开权限设置
const handleSetPermission = async (row) => {
    currentRole.value = row
    await initPermissionList()

    drawerVisible.value = true

    // 等待 drawer 打开后设置选中状态
    setTimeout(async () => {
        // 获取当前角色已有的权限
        try {
            const res = await request.get(`/Role/command-sys-role/${currentRole.value.id}/permissions`)
            if (res.data?.items) {
                const permissionIds = [
                    "08de3945-2576-481c-8f51-8b528a5b7ab4",
                    "08de3945-81f5-4ce0-8f5c-068aa77a437e",
                    "08de3945-81f5-4ce0-8f5c-068aa77a437e_08de41e9-b451-45e1-8839-6a9028a2e78c"
                ]

                // check-strictly 模式下，直接设置所有返回的权限ID
                permissionTree.value?.setCheckedKeys(permissionIds)
                // 更新全选状态
                updateAllCheckedState()
            }
        } catch (e) {
            console.log(e)
        }
    }, 100)
}

// 过滤出叶子节点ID：从权限ID列表中过滤掉所有父节点，只保留叶子节点
const filterLeafNodes = (permissionIds, treeData) => {
    // 创建一个 Set 来存储所有父节点的 ID
    const parentNodeIds = new Set()

    // 递归遍历树，收集所有父节点的 ID
    const collectParentNodes = (nodes) => {
        nodes.forEach(node => {
            // 如果节点有子节点，说明它是父节点
            if (node.children && node.children.length > 0) {
                parentNodeIds.add(node.id)
                // 递归处理子节点
                collectParentNodes(node.children)
            }
        })
    }

    collectParentNodes(treeData)

    // 过滤：只保留不在父节点集合中的 ID（即叶子节点）
    return permissionIds.filter(id => !parentNodeIds.has(id))
}

// 获取所有节点的 ID
const getAllNodeIds = (nodes) => {
    let ids = []
    nodes.forEach(node => {
        ids.push(node.id)
        if (node.children && node.children.length > 0) {
            ids = ids.concat(getAllNodeIds(node.children))
        }
    })
    return ids
}

// 全选/取消全选
const handleCheckAll = (checked) => {
    if (checked) {
        // 全选：获取所有节点的 ID
        const allIds = getAllNodeIds(permissionTreeData.value)
        permissionTree.value?.setCheckedKeys(allIds)
    } else {
        // 取消全选：需要同时清除选中和半选状态
        permissionTree.value?.setCheckedKeys([], false)
    }
}

// 树节点选中状态变化
const handleTreeCheck = () => {
    updateAllCheckedState()
}

// 更新全选状态
const updateAllCheckedState = () => {
    const allIds = getAllNodeIds(permissionTreeData.value)
    const checkedKeys = permissionTree.value?.getCheckedKeys() || []
    // 如果所有节点都被选中，则全选框为选中状态
    isAllChecked.value = allIds.length > 0 && allIds.length === checkedKeys.length
}

// 保存权限设置
const handleSavePermission = async () => {
    try {
        loading.value = true
        // 获取选中的节点（包括半选状态的父节点）
        const checkedKeys = permissionTree.value?.getCheckedKeys() || []
        const halfCheckedKeys = permissionTree.value?.getHalfCheckedKeys() || []
        const allSelectedIds = [...checkedKeys, ...halfCheckedKeys]

        // 获取所有选中的节点对象，用于转换按钮节点的ID
        const checkedNodes = permissionTree.value?.getCheckedNodes() || []
        const halfCheckedNodes = permissionTree.value?.getHalfCheckedNodes() || []
        const allNodes = [...checkedNodes, ...halfCheckedNodes]

        // 将按钮节点的唯一ID转换为原始的 originalButtonId
        const permissionIds = allSelectedIds.map(id => {
            const node = allNodes.find(n => n.id === id)
            // 如果是按钮节点（有 originalButtonId），使用原始ID；否则使用当前ID
            return node?.originalButtonId || id
        })

        const res = await request.post(`/Role/command-sys-role/${currentRole.value.id}/permissions`, {
            permissionIds: permissionIds
        })
        ElMessage.success(res.message || '保存成功')
        drawerVisible.value = false
    } catch (e) {
        console.log(e)
        ElMessage.error('保存失败')
    } finally {
        loading.value = false
    }
}

// 关闭 Drawer
const handleDrawerClose = (done) => {
    currentRole.value = {}
    selectedPermissions.value = []
    isAllChecked.value = false
    // 清空树选中状态
    if (permissionTree.value) {
        permissionTree.value.setCheckedKeys([], false)
    }
    done()
}

// 处理排序变化
const handleSortChange = ({ prop, order }) => {
    console.log('排序变化:', { prop, order })
    // 更新排序状态
    sortProp.value = prop || 'roleName'
    sortOrder.value = order || 'ascending'
    // 重置到第一页并重新请求数据
    currentPage.value = 1
    initRoleList()
}
function processMenuButtons(menuData) {
    // 递归处理每个菜单节点
    function processNode(node) {
        // 先递归处理子节点
        if (node.children && Array.isArray(node.children)) {
            node.children.forEach(child => processNode(child));
        }

        // 如果当前节点有buttons数组且有内容
        if (node.buttons && Array.isArray(node.buttons) && node.buttons.length > 0) {
            // 确保children数组存在
            if (!node.children) {
                node.children = [];
            }

            // 记录当前children的数量，以便保持原有children在前
            const originalChildrenCount = node.children.length;

            // 将buttons中的每个按钮转换为子节点并添加到children末尾
            node.buttons.forEach((button, index) => {
                // 直接使用后端返回的 concatButtonId 作为节点ID
                const uniqueId = button.concatButtonId || button.id

                // 创建新的子节点
                const childNode = {
                    id: uniqueId, // 使用 concatButtonId 作为节点ID
                    originalButtonId: button.concatButtonId || button.id, // 保存原始按钮ID用于提交
                    parentId: node.id,
                    componentName: '',
                    componentPath: '',
                    menuIcon: '',
                    menuUrl: '',
                    permissionUrl: '',
                    orderId: originalChildrenCount + index + 1, // 设置orderId，将按钮放在原有children之后
                    menuType: 'button',
                    menuTitle: button.buttonName || '', // 添加menuTitle字段，值为buttonName
                    selectedButton: '',
                    remark: button.remark || '',
                    children: [],
                    buttons: [],
                    buttonList: [],
                    // 保留按钮的原始信息
                    buttonValue: button.buttonValue,
                    buttonName: button.buttonName // 也可以保留原始buttonName
                };

                // 添加到children数组
                node.children.push(childNode);
            });

            // 清空原始buttons数组，避免重复处理
            node.buttons = [];
        }
    }

    // 处理整个菜单数据
    if (Array.isArray(menuData)) {
        menuData.forEach(menu => processNode(menu));
    } else if (menuData) {
        processNode(menuData);
    }

    return menuData;
}

let arr = ref([
    {
        "id": "08de3945-2576-481c-8f51-8b528a5b7ab4",
        "parentId": "",
        "componentName": "",
        "componentPath": "",
        "menuIcon": "Cpu",
        "menuUrl": "",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "",
        "menuTitle": "态势监控",
        "selectedButton": "",
        "remark": "",
        "children": [
            {
                "id": "08de3945-624a-4338-8f27-ac233e71620a",
                "parentId": "08de3945-2576-481c-8f51-8b528a5b7ab4",
                "componentName": "",
                "componentPath": "",
                "menuIcon": "",
                "menuUrl": "",
                "permissionUrl": "",
                "orderId": 0,
                "menuType": "children",
                "menuTitle": "ADP",
                "selectedButton": "",
                "remark": "",
                "children": [
                    {
                        "id": "08de435c-c689-40de-803a-90934c3312b3",
                        "parentId": "08de3945-624a-4338-8f27-ac233e71620a",
                        "componentName": "list",
                        "componentPath": "views/adp/list/index",
                        "menuIcon": "",
                        "menuUrl": "/ygw/list",
                        "permissionUrl": "",
                        "orderId": 0,
                        "menuType": "",
                        "menuTitle": "ADP录入",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "08de435c-def3-49f3-8c1f-cd0f527d7ecc",
                        "parentId": "08de3945-624a-4338-8f27-ac233e71620a",
                        "componentName": "query",
                        "componentPath": "views/adp/query/index",
                        "menuIcon": "",
                        "menuUrl": "/ygw/query",
                        "permissionUrl": "",
                        "orderId": 0,
                        "menuType": "",
                        "menuTitle": "ADP查询",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    }
                ],
                "buttons": [],
                "buttonList": []
            },
            {
                "id": "08de3945-81f5-4ce0-8f5c-068aa77a437e",
                "parentId": "08de3945-2576-481c-8f51-8b528a5b7ab4",
                "componentName": "map",
                "componentPath": "view/map/index",
                "menuIcon": "Avatar",
                "menuUrl": "/ygw/map",
                "permissionUrl": "",
                "orderId": 0,
                "menuType": "children",
                "menuTitle": "场监",
                "selectedButton": "",
                "remark": "",
                "children": [],
                "buttons": [
                    {
                        "id": "08de41e9-b451-45e1-8839-6a9028a2e78c",
                        "concatButtonId": "08de3945-81f5-4ce0-8f5c-068aa77a437e_08de41e9-b451-45e1-8839-6a9028a2e78c",
                        "buttonName": "保存1",
                        "buttonValue": "save",
                        "remark": "保存功能"
                    },
                    {
                        "id": "08de41eb-1095-4d3a-8ac8-4cbd9e7a4eb4",
                        "concatButtonId": "02611b67-9e19-11ee-be15-fefcfe485cc3_08de41eb-1095-4d3a-8ac8-4cbd9e7a4eb4",
                        "buttonName": "新增",
                        "buttonValue": "add",
                        "remark": "新增的按钮"
                    },
                    {
                        "id": "08de41f6-ae37-43b1-8108-b613cb94063a",
                        "concatButtonId": "08de3945-81f5-4ce0-8f5c-068aa77a437e_08de41f6-ae37-43b1-8108-b613cb94063a",
                        "buttonName": "string",
                        "buttonValue": "string",
                        "remark": "string"
                    }
                ],
                "buttonList": []
            },
            {
                "id": "08de3946-1a7c-4b12-83e4-ea8d5f23756c",
                "parentId": "08de3945-2576-481c-8f51-8b528a5b7ab4",
                "componentName": "",
                "componentPath": "",
                "menuIcon": "",
                "menuUrl": "/oms/track",
                "permissionUrl": "",
                "orderId": 0,
                "menuType": "children",
                "menuTitle": "空中",
                "selectedButton": "",
                "remark": "",
                "children": [],
                "buttons": [],
                "buttonList": []
            },
            {
                "id": "08de3946-3147-4d3a-8413-b3164668d785",
                "parentId": "08de3945-2576-481c-8f51-8b528a5b7ab4",
                "componentName": "",
                "componentPath": "",
                "menuIcon": "",
                "menuUrl": "/oms/display/flightInfo?kind=normal",
                "permissionUrl": "",
                "orderId": 0,
                "menuType": "children",
                "menuTitle": "航班动态",
                "selectedButton": "",
                "remark": "",
                "children": [],
                "buttons": [],
                "buttonList": []
            },
            {
                "id": "08de444f-7b10-4a7c-83a2-69349b01a476",
                "parentId": "08de3945-2576-481c-8f51-8b528a5b7ab4",
                "componentName": "home",
                "componentPath": "ygw/home",
                "menuIcon": "",
                "menuUrl": "/ygw/home",
                "permissionUrl": "",
                "orderId": 0,
                "menuType": "children",
                "menuTitle": "首页",
                "selectedButton": "",
                "remark": "",
                "children": [],
                "buttons": [],
                "buttonList": []
            }
        ],
        "buttons": [],
        "buttonList": []
    },
    {
        "id": "08de3946-5e20-4768-8795-7b14ab38f7a9",
        "parentId": "",
        "componentName": "",
        "componentPath": "",
        "menuIcon": "",
        "menuUrl": "",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "main",
        "menuTitle": "系统设置",
        "selectedButton": "",
        "remark": "",
        "children": [
            {
                "id": "08de3946-987e-41c2-8511-0a66598f8bc4",
                "parentId": "08de3946-5e20-4768-8795-7b14ab38f7a9",
                "componentName": "permission",
                "componentPath": "",
                "menuIcon": "",
                "menuUrl": "/system/permission",
                "permissionUrl": "",
                "orderId": 0,
                "menuType": "children",
                "menuTitle": "菜单管理",
                "selectedButton": "",
                "remark": "",
                "children": [],
                "buttons": [],
                "buttonList": []
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
                "selectedButton": "",
                "remark": "",
                "children": [],
                "buttons": [],
                "buttonList": []
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
                "selectedButton": "",
                "remark": "",
                "children": [],
                "buttons": [],
                "buttonList": []
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
                "selectedButton": "",
                "remark": "",
                "children": [],
                "buttons": [],
                "buttonList": []
            }
        ],
        "buttons": [],
        "buttonList": []
    },
    {
        "id": "08de3ec2-58aa-4a0e-8812-265838d91e37",
        "parentId": "",
        "componentName": "",
        "componentPath": "",
        "menuIcon": "",
        "menuUrl": "",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "",
        "menuTitle": "值班管理",
        "selectedButton": "",
        "remark": "",
        "children": [
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
                "selectedButton": "",
                "remark": "",
                "children": [
                    {
                        "id": "10a0a499-2441-11ed-b770-fefcfe485cc3",
                        "parentId": "08de3ec2-6a97-4453-8131-669e703453ed",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/changeShift",
                        "permissionUrl": "",
                        "orderId": 1,
                        "menuType": "",
                        "menuTitle": "席位交接班",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "563bbb37-2441-11ed-b770-fefcfe485cc3",
                        "parentId": "08de3ec2-6a97-4453-8131-669e703453ed",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/dutyQuery",
                        "permissionUrl": "",
                        "orderId": 6,
                        "menuType": "",
                        "menuTitle": "值班信息查询统计",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    }
                ],
                "buttons": [],
                "buttonList": []
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
                "selectedButton": "",
                "remark": "",
                "children": [
                    {
                        "id": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
                        "parentId": "8ceb6413-243b-11ed-b770-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "",
                        "permissionUrl": "",
                        "orderId": 1,
                        "menuType": "",
                        "menuTitle": "基础数据",
                        "selectedButton": "",
                        "remark": "",
                        "children": [
                            {
                                "id": "d4c11c40-2ce3-11ed-b770-fefcfe485cc3",
                                "parentId": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
                                "componentName": "",
                                "componentPath": "",
                                "menuIcon": "",
                                "menuUrl": "/oms/scheduleTeam",
                                "permissionUrl": "",
                                "orderId": 1,
                                "menuType": "",
                                "menuTitle": "人员分组模板",
                                "selectedButton": "",
                                "remark": "",
                                "children": [],
                                "buttons": [],
                                "buttonList": []
                            },
                            {
                                "id": "166a679e-2ce4-11ed-b770-fefcfe485cc3",
                                "parentId": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
                                "componentName": "",
                                "componentPath": "",
                                "menuIcon": "",
                                "menuUrl": "/oms/scheduleRole",
                                "permissionUrl": "",
                                "orderId": 2,
                                "menuType": "",
                                "menuTitle": "角色模板",
                                "selectedButton": "",
                                "remark": "",
                                "children": [],
                                "buttons": [],
                                "buttonList": []
                            },
                            {
                                "id": "acda4c74-2ce4-11ed-b770-fefcfe485cc3",
                                "parentId": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
                                "componentName": "",
                                "componentPath": "",
                                "menuIcon": "",
                                "menuUrl": "/oms/scheduleSeat",
                                "permissionUrl": "",
                                "orderId": 3,
                                "menuType": "",
                                "menuTitle": "席位模板",
                                "selectedButton": "",
                                "remark": "",
                                "children": [],
                                "buttons": [],
                                "buttonList": []
                            },
                            {
                                "id": "cbbae6f3-2ce4-11ed-b770-fefcfe485cc3",
                                "parentId": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
                                "componentName": "",
                                "componentPath": "",
                                "menuIcon": "",
                                "menuUrl": "/oms/scheduleShift",
                                "permissionUrl": "",
                                "orderId": 4,
                                "menuType": "",
                                "menuTitle": "班次模板",
                                "selectedButton": "",
                                "remark": "",
                                "children": [],
                                "buttons": [],
                                "buttonList": []
                            }
                        ],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "31ebd558-34bf-11ed-b770-fefcfe485cc3",
                        "parentId": "8ceb6413-243b-11ed-b770-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/scheduleTemplate",
                        "permissionUrl": "",
                        "orderId": 2,
                        "menuType": "",
                        "menuTitle": "排班模板配置",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "5ab7f66b-34bf-11ed-b770-fefcfe485cc3",
                        "parentId": "8ceb6413-243b-11ed-b770-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/schedule",
                        "permissionUrl": "",
                        "orderId": 3,
                        "menuType": "",
                        "menuTitle": "排班",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "9ab7fe01-37c6-11ed-b770-fefcfe485cc3",
                        "parentId": "8ceb6413-243b-11ed-b770-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "",
                        "permissionUrl": "",
                        "orderId": 6,
                        "menuType": "",
                        "menuTitle": "替换班管理",
                        "selectedButton": "",
                        "remark": "",
                        "children": [
                            {
                                "id": "733ceb4c-37c9-11ed-b770-fefcfe485cc3",
                                "parentId": "9ab7fe01-37c6-11ed-b770-fefcfe485cc3",
                                "componentName": "",
                                "componentPath": "",
                                "menuIcon": "",
                                "menuUrl": "/oms/replacementApply",
                                "permissionUrl": "",
                                "orderId": 1,
                                "menuType": "",
                                "menuTitle": "替换班申请",
                                "selectedButton": "",
                                "remark": "",
                                "children": [],
                                "buttons": [],
                                "buttonList": []
                            },
                            {
                                "id": "99d9b056-37c9-11ed-b770-fefcfe485cc3",
                                "parentId": "9ab7fe01-37c6-11ed-b770-fefcfe485cc3",
                                "componentName": "",
                                "componentPath": "",
                                "menuIcon": "",
                                "menuUrl": "/oms/replacementAudit",
                                "permissionUrl": "",
                                "orderId": 2,
                                "menuType": "",
                                "menuTitle": "替换班审批",
                                "selectedButton": "",
                                "remark": "",
                                "children": [],
                                "buttons": [],
                                "buttonList": []
                            }
                        ],
                        "buttons": [],
                        "buttonList": []
                    }
                ],
                "buttons": [],
                "buttonList": []
            }
        ],
        "buttons": [],
        "buttonList": []
    },
    {
        "id": "08de3ec3-acf2-4b9c-8771-2a1452a592d5",
        "parentId": "",
        "componentName": "",
        "componentPath": "",
        "menuIcon": "",
        "menuUrl": "",
        "permissionUrl": "",
        "orderId": 0,
        "menuType": "",
        "menuTitle": "文档管理",
        "selectedButton": "",
        "remark": "",
        "children": [
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
                "selectedButton": "",
                "remark": "",
                "children": [],
                "buttons": [],
                "buttonList": []
            }
        ],
        "buttons": [],
        "buttonList": []
    },
    {
        "id": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
        "parentId": "",
        "componentName": "",
        "componentPath": "",
        "menuIcon": "",
        "menuUrl": "",
        "permissionUrl": "",
        "orderId": 4,
        "menuType": "",
        "menuTitle": "气象信息显示",
        "selectedButton": "",
        "remark": "",
        "children": [
            {
                "id": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
                "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
                "componentName": "",
                "componentPath": "",
                "menuIcon": "",
                "menuUrl": "",
                "permissionUrl": "",
                "orderId": 2,
                "menuType": "",
                "menuTitle": "天气形势",
                "selectedButton": "",
                "remark": "",
                "children": [
                    {
                        "id": "02873480-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FWeatherForecast%2FMR.aspx",
                        "permissionUrl": "",
                        "orderId": 1,
                        "menuType": "",
                        "menuTitle": "MDRS天气概率",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "02826d88-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FZGGG%2Fzggg_forecast.asp",
                        "permissionUrl": "",
                        "orderId": 2,
                        "menuType": "",
                        "menuTitle": "中南天气形势",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "027ed29d-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FWeatherForecast%2FWT.aspx",
                        "permissionUrl": "",
                        "orderId": 3,
                        "menuType": "",
                        "menuTitle": "天气通报",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "027c06b0-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FWeatherForecast%2FKB.aspx",
                        "permissionUrl": "",
                        "orderId": 4,
                        "menuType": "",
                        "menuTitle": "天气快报",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "607af644-c374-11ef-a793-fefcfe485cc3",
                        "parentId": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Fforecast%2Fgetdata.aspx%3Ffn%3Dweek_fcst.html",
                        "permissionUrl": "",
                        "orderId": 5,
                        "menuType": "",
                        "menuTitle": "白云机场一周天气预报",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    }
                ],
                "buttons": [],
                "buttonList": []
            },
            {
                "id": "39587c02-9e13-11ee-be15-fefcfe485cc3",
                "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
                "componentName": "",
                "componentPath": "",
                "menuIcon": "",
                "menuUrl": "",
                "permissionUrl": "",
                "orderId": 2,
                "menuType": "",
                "menuTitle": "图形产品",
                "selectedButton": "",
                "remark": "",
                "children": [
                    {
                        "id": "b16cdd5d-9e12-11ee-be15-fefcfe485cc3",
                        "parentId": "39587c02-9e13-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FAWOS%2Fawos_all.aspx",
                        "permissionUrl": "",
                        "orderId": 1,
                        "menuType": "",
                        "menuTitle": "AWOS",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "02552213-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "39587c02-9e13-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FRadar%2FRadarZN.aspx?",
                        "permissionUrl": "",
                        "orderId": 2,
                        "menuType": "",
                        "menuTitle": "中南地区雷达",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "025852f1-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "39587c02-9e13-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FRadar%2FRadar.aspx",
                        "permissionUrl": "",
                        "orderId": 3,
                        "menuType": "",
                        "menuTitle": "全国雷达拼图",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "0fb326c9-9e15-11ee-be15-fefcfe485cc3",
                        "parentId": "39587c02-9e13-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FZGGGFY2E%2FFY2H.aspx",
                        "permissionUrl": "",
                        "orderId": 4,
                        "menuType": "",
                        "menuTitle": "FY2H卫星",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "0fc3753b-9e15-11ee-be15-fefcfe485cc3",
                        "parentId": "39587c02-9e13-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Ftyphoon%2Findex.html",
                        "permissionUrl": "",
                        "orderId": 5,
                        "menuType": "",
                        "menuTitle": "台风路径图",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    }
                ],
                "buttons": [],
                "buttonList": []
            },
            {
                "id": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
                "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
                "componentName": "",
                "componentPath": "",
                "menuIcon": "",
                "menuUrl": "",
                "permissionUrl": "",
                "orderId": 4,
                "menuType": "",
                "menuTitle": "预告图",
                "selectedButton": "",
                "remark": "",
                "children": [
                    {
                        "id": "025b662c-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FSigWxCharts_FL100%2Findex.htm",
                        "permissionUrl": "",
                        "orderId": 1,
                        "menuType": "",
                        "menuTitle": "低空天气预告图",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "025e44d0-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FSigWxCharts%2Findex.htm",
                        "permissionUrl": "",
                        "orderId": 2,
                        "menuType": "",
                        "menuTitle": "中高空天气预告图",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "02611b67-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FWindTempCharts_Low%2Findex.htm",
                        "permissionUrl": "",
                        "orderId": 3,
                        "menuType": "",
                        "menuTitle": "低层风温预告图",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [
                            {
                                "id": "08de41eb-1095-4d3a-8ac8-4cbd9e7a4eb4",
                                "concatButtonId": "02611b67-9e19-11ee-be15-fefcfe485cc3_08de41eb-1095-4d3a-8ac8-4cbd9e7a4eb4",
                                "buttonName": "新增",
                                "buttonValue": "add",
                                "remark": "新增的按钮"
                            }
                        ],
                        "buttonList": []
                    },
                    {
                        "id": "0263def0-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FWindTempCharts%2Findex.htm",
                        "permissionUrl": "",
                        "orderId": 4,
                        "menuType": "",
                        "menuTitle": "中高层风温预告图",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    }
                ],
                "buttons": [],
                "buttonList": []
            },
            {
                "id": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
                "parentId": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
                "componentName": "",
                "componentPath": "",
                "menuIcon": "",
                "menuUrl": "",
                "permissionUrl": "",
                "orderId": 6,
                "menuType": "",
                "menuTitle": "气象情报",
                "selectedButton": "",
                "remark": "",
                "children": [
                    {
                        "id": "9225f5e9-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FHistory%2Fsigmet%2FSIGMET.aspx",
                        "permissionUrl": "",
                        "orderId": 1,
                        "menuType": "",
                        "menuTitle": "境内重要天气情报",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "9228ed03-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FHistory%2Fsigmet%2FSIGMET_FOREIGN.aspx",
                        "permissionUrl": "",
                        "orderId": 2,
                        "menuType": "",
                        "menuTitle": "境外重要天气情报",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "0269ee87-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FQueryMetInfo%2FReportByArea.aspx",
                        "permissionUrl": "",
                        "orderId": 3,
                        "menuType": "",
                        "menuTitle": "机场报文",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "0fbfac3b-9e15-11ee-be15-fefcfe485cc3",
                        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2FNoticePrd%2FNoticePrd.aspx",
                        "permissionUrl": "",
                        "orderId": 7,
                        "menuType": "",
                        "menuTitle": "预警预报",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "026d7ce8-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_sp.aspx",
                        "permissionUrl": "",
                        "orderId": 11,
                        "menuType": "",
                        "menuTitle": "Sp告警",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "0271275b-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_sigmet.aspx",
                        "permissionUrl": "",
                        "orderId": 12,
                        "menuType": "",
                        "menuTitle": "Sigmet告警",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "02742270-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_bbb.aspx",
                        "permissionUrl": "",
                        "orderId": 13,
                        "menuType": "",
                        "menuTitle": "修订报告警",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    },
                    {
                        "id": "027793be-9e19-11ee-be15-fefcfe485cc3",
                        "parentId": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
                        "componentName": "",
                        "componentPath": "",
                        "menuIcon": "",
                        "menuUrl": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_sigwx.aspx",
                        "permissionUrl": "",
                        "orderId": 14,
                        "menuType": "",
                        "menuTitle": "修订图告警",
                        "selectedButton": "",
                        "remark": "",
                        "children": [],
                        "buttons": [],
                        "buttonList": []
                    }
                ],
                "buttons": [],
                "buttonList": []
            }
        ],
        "buttons": [],
        "buttonList": []
    }
])
// 初始化
initRoleList()
permissionTreeData.value = processMenuButtons(arr.value)

</script>

<style lang="less" scoped>
.role-management {
    padding: 10px;
    background-color: var(--page-bg-color);
    min-height: calc(100vh - 6.5rem);
}

.drawer-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 10px;
}

.current-role {
    font-size: 14px;
    color: var(--text-color-secondary);
    margin-bottom: 15px;
    padding: 10px;
    background-color: var(--info-bg-color);
    border-radius: 4px;
}

.tree-actions {
    margin-bottom: 12px;
    padding: 8px 10px;
    background-color: var(--info-bg-color);
    border-radius: 4px;
    border: 1px solid var(--border-color);

    :deep(.el-checkbox) {
        font-weight: 500;
    }
}

.drawer-footer {
    margin-top: auto;
    padding: 20px 0;
    text-align: right;
    border-top: 1px solid var(--border-color);
}

/* 权限树样式 */
.permission-tree {
    flex: 1;
    overflow-y: auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    :deep(.el-tree-node__content) {
        height: 36px;
        padding: 4px 0;

        &:hover {
            background-color: var(--table-hover-bg);
        }
    }

    .tree-node {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 16px;

        .node-label {
            font-weight: 500;
            color: var(--text-color-primary);
            min-width: 150px;
        }

        .node-url {
            color: var(--text-color-secondary);
            font-size: 13px;
        }
    }
}
</style>
