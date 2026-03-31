<template>
    <div class="user-management">
        <el-button type="default" @click="handleAddUser" style="margin-bottom: 10px;">新增用户</el-button>

        <DxTable :data="userList" :loading="loading">
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="realName" label="姓名" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="status" label="状态">
                <template #default="{ row }">
                    <el-tag :type="row.status === 1 ? 'success' : 'danger'">
                        {{ row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300" fixed="right">
                <template #default="{ row }">
                    <DxLinkButton @click="handleEditUser(row)">编辑</DxLinkButton>
                    <DxLinkButton @click="handleAssignRole(row)">分配角色</DxLinkButton>
                    <DxLinkButton @click="handleDeleteUser(row)">删除</DxLinkButton>
                </template>
            </el-table-column>
        </DxTable>

        <DxPagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="total"
        />

        <!-- 编辑用户对话框 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
            <el-form :model="currentUser" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="currentUser.username" :disabled="!!currentUser.id" />
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="currentUser.realName" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="currentUser.email" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="currentUser.phone" />
                </el-form-item>
                <el-form-item label="密码" v-if="!currentUser.id">
                    <el-input v-model="currentUser.password" type="password" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="currentUser.status">
                        <el-radio :value="1">启用</el-radio>
                        <el-radio :value="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSaveUser">保存</el-button>
            </template>
        </el-dialog>

        <!-- 分配角色 Drawer -->
        <el-drawer v-model="drawerVisible" title="分配角色" direction="rtl" size="700px" :before-close="handleDrawerClose">
            <div class="drawer-content">
                <div class="current-user">当前用户：{{ currentUser?.realName }} ({{ currentUser?.username }})</div>
                <DxTable
                    ref="roleTable"
                    :data="roleList"
                    @selection-change="handleRoleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="roleName" label="角色名称" />
                    <el-table-column prop="roleCode" label="角色编码" />
                    <el-table-column prop="remark" label="备注" />
                </DxTable>
                <div class="drawer-footer">
                    <el-button @click="drawerVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSaveUserRole">保存</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: 'user'
}
</script>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'
import DxTable from '@/components/DxTable.vue'
import DxPagination from '@/components/DxPagination.vue'
import DxLinkButton from '@/components/DxLinkButton.vue'

// 响应式数据
const loading = ref(false)
const userList = ref([])
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const drawerVisible = ref(false)
const currentUser = ref({})
const roleList = ref([])
const selectedRoles = ref([])
const roleTable = ref(null)

// 获取用户列表（服务端分页）
const initUserList = async () => {
    try {
        loading.value = true
        const res = await request.post('/User/command-sys-user/list', {
            pageIndex: currentPage.value,
            pageSize: pageSize.value
        })
        if (res.data?.items) {
            userList.value = res.data.items
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
    initUserList()
})

// 新增用户
const handleAddUser = () => {
    dialogTitle.value = '新增用户'
    currentUser.value = {
        username: '',
        realName: '',
        email: '',
        phone: '',
        password: '',
        status: 1
    }
    dialogVisible.value = true
}

// 编辑用户
const handleEditUser = (row) => {
    dialogTitle.value = '编辑用户'
    currentUser.value = { ...row }
    dialogVisible.value = true
}

// 保存用户
const handleSaveUser = async () => {
    try {
        loading.value = true
        if (currentUser.value.id) {
            // 编辑
            const res = await request.put(`/User/command-sys-user/${currentUser.value.id}`, currentUser.value)
            ElMessage.success(res.message || '修改成功')
        } else {
            // 新增
            const res = await request.post('/User/command-sys-user', currentUser.value)
            ElMessage.success(res.message || '新增成功')
        }
        dialogVisible.value = false
        initUserList()
    } catch (e) {
        console.log(e)
        ElMessage.error('操作失败')
    } finally {
        loading.value = false
    }
}

// 删除用户
const handleDeleteUser = async (row) => {
    try {
        await ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })

        const res = await request.delete(`/User/command-sys-user/${row.id}`)
        ElMessage.success(res.message || '删除成功')

        // 如果当前页只有一条数据且不是第一页，则跳转到上一页
        if (userList.value.length === 1 && currentPage.value > 1) {
            currentPage.value--
        } else {
            initUserList()
        }
    } catch (e) {
        if (e !== 'cancel') {
            console.log(e)
        }
    }
}

// 获取所有角色列表
const initRoleList = async () => {
    try {
        const res = await request.post('/Role/command-sys-role/list', {
            pageIndex: 1,
            pageSize: 1000 // 获取所有角色
        })
        if (res.data?.items) {
            roleList.value = res.data.items
        }
    } catch (e) {
        console.log(e)
    }
}

// 打开分配角色
const handleAssignRole = async (row) => {
    currentUser.value = row
    await initRoleList()

    // 获取当前用户已有的角色
    try {
        const res = await request.get(`/User/command-sys-user/${currentUser.value.id}/roles`)
        if (res.data?.items) {
            selectedRoles.value = res.data.items.map(item => item.id)
            // 设置选中状态
            await nextTick()
            if (roleTable.value) {
                roleList.value.forEach(role => {
                    if (selectedRoles.value.includes(role.id)) {
                        roleTable.value.toggleRowSelection(role, true)
                    }
                })
            }
        }
    } catch (e) {
        console.log(e)
    }

    drawerVisible.value = true
}

// 角色选择变化
const handleRoleSelectionChange = (selection) => {
    selectedRoles.value = selection.map(item => item.id)
}

// 保存用户角色
const handleSaveUserRole = async () => {
    try {
        loading.value = true
        const res = await request.post(`/User/command-sys-user/${currentUser.value.id}/roles`, {
            roleIds: selectedRoles.value
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
    currentUser.value = {}
    selectedRoles.value = []
    done()
}

// 初始化
initUserList()
</script>

<style lang="less" scoped>
.user-management {
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

.current-user {
    font-size: 14px;
    color: #606266;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f5f7fa;
    border-radius: 4px;
}

.drawer-footer {
    margin-top: auto;
    padding: 20px 0;
    text-align: right;
    border-top: 1px solid #e4e7ed;
}
</style>
