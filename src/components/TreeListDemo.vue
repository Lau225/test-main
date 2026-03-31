<template>
  <div class="treelist-demo">
    <div class="demo-section">
      <el-button type="default" @click="addRowMenu">新增顶级菜单</el-button>
      <DxTable ref="treeTable" :data="tableData" border row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" style="width: 100%; margin-top: 10px"
        class="dx-style-table">
        <el-table-column prop="menuTitle" label="菜单名" />
        <el-table-column label="图标" align="center" width="80">
          <template #default="{ row }">
            <el-icon v-if="row.menuIcon" :size="20">
              <component :is="getIconComponent(row.menuIcon)" />
            </el-icon>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="componentName" label="组件名" />
        <el-table-column prop="menuUrl" label="菜单URL" align="center" />
        <el-table-column prop="componentPath" label="前端组件" align="center" />
        <el-table-column prop="menuType" label="应用类型" align="center" />
        <el-table-column label="操作" align="center" width="250">
          <template #default="{ row }">
            <div class="action-buttons">
              <template v-if="editingRowId === row.id">
                <el-button link type="primary" @click="saveRow(row)">保存</el-button>
                <el-button link @click="cancelEdit">取消</el-button>
              </template>
              <template v-else>
                <el-button link type="primary" @click="editRow(row)">编辑</el-button>
                <el-button v-if="row.canAdd !== false" link type="primary" @click="addChildRow(row)">
                  新增
                </el-button>
                <el-popconfirm title="确定要删除该菜单吗？" confirm-button-text="删除" cancel-button-text="取消"
                  @confirm="deleteRow(row)">
                  <template #reference>
                    <el-button link type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </div>
          </template>
        </el-table-column>
      </DxTable>

      <!-- 编辑对话框 -->
      <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" @close="resetForm">
        <el-form :model="editForm" label-width="100px">
          <el-form-item label="菜单名">
            <el-input v-model="editForm.menuTitle" />
          </el-form-item>
          <el-form-item label="菜单图标">
            <IconSelector v-model="editForm.menuIcon" />
          </el-form-item>
          <el-form-item label="组件名">
            <el-input v-model="editForm.componentName" />
          </el-form-item>
          <el-form-item label="菜单URL">
            <el-input v-model="editForm.menuUrl" />
          </el-form-item>
          <el-form-item label="前端组件">
            <el-input v-model="editForm.componentPath" />
          </el-form-item>
          <el-form-item label="应用类型">
            <el-input v-model="editForm.menuType" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import IconSelector from './IconSelector.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import DxTable from './DxTable.vue';
const props = defineProps({
  list: Array
})

const emit = defineEmits(['add', 'edit', 'del'])

// 获取图标组件
const getIconComponent = (iconName) => {
  return ElementPlusIconsVue[iconName]
}

// 响应式数据
const treeTable = ref(null)
const type = ref("sub")
const dialogVisible = ref(false)
const dialogTitle = ref('')
const editingRowId = ref(null)
const editForm = ref({
  id: null,
  menuTitle: '',
  menuIcon: '',
  componentName: '',
  menuUrl: '',
  componentPath: '',
  menuType: '',
  parentId: null
})
const originalData = ref(null)
const isAddingNew = ref(false)
const currentParentRow = ref(null)

// 将扁平数据转换为树形结构
const buildTree = (flatData, parentId = null) => {
  const result = []
  flatData.forEach(item => {
    if (item.parentId === parentId) {
      const children = buildTree(flatData, item.id)
      const node = { ...item }
      if (children.length > 0) {
        node.children = children
      }
      result.push(node)
    }
  })
  return result
}

// 计算树形数据
const tableData = computed(() => {
  if (!props.list || props.list.length === 0) return []
  return buildTree(props.list)
})

// 新增顶级菜单
const addRowMenu = () => {
  type.value = "main"
  dialogTitle.value = '新增顶级菜单'
  isAddingNew.value = true
  currentParentRow.value = null
  resetForm()
  dialogVisible.value = true
}

// 新增子菜单
const addChildRow = (row) => {
  type.value = "sub"
  dialogTitle.value = '新增子菜单'
  isAddingNew.value = true
  currentParentRow.value = row
  resetForm()
  editForm.value.parentId = row.id
  dialogVisible.value = true
}

// 编辑行
const editRow = (row) => {
  dialogTitle.value = '编辑菜单'
  isAddingNew.value = false
  editingRowId.value = row.id
  editForm.value = { ...row }
  originalData.value = { ...row }
  dialogVisible.value = true
}

// 保存编辑（内联编辑，当前未使用）
const saveRow = (row) => {
  emit('edit', row)
  console.log('行已更新:', row)
  editingRowId.value = null
}

// 取消编辑
const cancelEdit = () => {
  editingRowId.value = null
}

// 确认编辑/新增
const confirmEdit = () => {
  if (isAddingNew.value) {
    // 新增逻辑
    const newData = { ...editForm.value }
    emit('add', newData, type.value)
    console.log('行已新增:', newData)
  } else {
    // 编辑逻辑
    emit('edit', editForm.value)
    console.log('行已更新:', editForm.value)
  }
  dialogVisible.value = false
  resetForm()
}

// 删除行
const deleteRow = (row) => {
  emit('del', row)
  console.log('行已删除:', row)
}

// 重置表单
const resetForm = () => {
  editForm.value = {
    id: null,
    menuTitle: '',
    menuIcon: '',
    componentName: '',
    menuUrl: '',
    componentPath: '',
    menuType: '',
    parentId: null
  }
  editingRowId.value = null
  originalData.value = null
  isAddingNew.value = false
  currentParentRow.value = null
}

</script>
<script>
export default {
  name: 'permission'
}
</script>
<style scoped>
.treelist-demo {
  padding: 10px;
}

.demo-section {
  margin-bottom: 0;
}

/* DevExtreme 风格的表格样式 */
.dx-style-table {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

:deep(.dx-style-table .el-table__header-wrapper) {
  background-color: #f8f9fa;
}

:deep(.dx-style-table th) {
  background-color: #f8f9fa !important;
  font-weight: 600;
  color: #333;
}

:deep(.dx-style-table .el-table__body-wrapper .el-table__row:hover > td) {
  background-color: #f5f5f5 !important;
}

:deep(.dx-style-table .el-table__cell) {
  padding: 12px;
  height: 48px;
}

/* 操作按钮样式 */
.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: nowrap;
}

:deep(.el-button.is-link) {
  color: #007acc;
  font-weight: 500;
  padding: 4px 8px;
  margin: 0;
}

:deep(.el-button.is-link:hover) {
  color: #005a9e;
  text-decoration: underline;
}

:deep(.el-button.is-link.is-danger) {
  color: #f56c6c;
}

:deep(.el-button.is-link.is-danger:hover) {
  color: #f56c6c;
  text-decoration: underline;
}
</style>
