<template>
  <div class="icon-selector">
    <el-popover placement="bottom" :width="500" trigger="click" v-model:visible="popoverVisible">
      <template #reference>
        <el-input v-model="selectedIconName" placeholder="请选择图标" readonly class="icon-input">
          <template #prefix>
            <el-icon v-if="selectedIconName" class="selected-icon">
              <component :is="iconComponents[selectedIconName]" />
            </el-icon>
          </template>
          <template #suffix>
            <el-icon class="select-arrow">
              <ArrowDown />
            </el-icon>
          </template>
        </el-input>
      </template>

      <div class="icon-selector-content">
        <el-input v-model="searchText" placeholder="搜索图标" clearable class="search-input">
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>

        <div class="icon-list">
          <div v-for="iconName in filteredIcons" :key="iconName" class="icon-item"
            :class="{ active: selectedIconName === iconName }" @click="selectIcon(iconName)">
            <el-icon class="icon">
              <component :is="iconComponents[iconName]" />
            </el-icon>
            <span class="icon-name">{{ iconName }}</span>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ArrowDown, Search } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const popoverVisible = ref(false)
const searchText = ref('')
const iconComponents = ElementPlusIconsVue

// 获取所有图标名称
const allIcons = Object.keys(ElementPlusIconsVue)

// 选中的图标名称
const selectedIconName = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 过滤后的图标列表
const filteredIcons = computed(() => {
  if (!searchText.value) {
    return allIcons
  }
  return allIcons.filter(name =>
    name.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

// 选择图标
const selectIcon = (iconName) => {
  selectedIconName.value = iconName
  popoverVisible.value = false
}
</script>

<style scoped>
.icon-selector {
  width: 100%;
}

.icon-input {
  cursor: pointer;
}

.selected-icon {
  font-size: 18px;
}

.select-arrow {
  font-size: 14px;
}

.icon-selector-content {
  max-height: 400px;
  display: flex;
  flex-direction: column;
}

.search-input {
  margin-bottom: 12px;
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-height: 350px;
  overflow-y: auto;
  padding: 4px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-item:hover {
  border-color: #409eff;
  background-color: #ecf5ff;
}

.icon-item.active {
  border-color: #409eff;
  background-color: #409eff;
  color: white;
}

.icon-item .icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.icon-name {
  font-size: 12px;
  text-align: center;
  word-break: break-all;
  line-height: 1.2;
}
</style>
