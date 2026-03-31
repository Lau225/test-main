<template>
  <div class="theme-switcher">
    <DxSelectBox
      :data-source="themeOptions"
      :value="currentTheme"
      @value-changed="onThemeChanged"
      display-expr="label"
      value-expr="value"
      placeholder="选择主题"
      :width="200"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DxSelectBox from 'devextreme-vue/select-box'
import { themeManager } from '@/utils/themeManager.js'

const currentTheme = ref('material-blue-light')

const themeOptions = [
  // Material Design 主题
  { label: 'Material Blue Light', value: 'material-blue-light', category: 'Material' },
  { label: 'Material Blue Dark', value: 'material-blue-dark', category: 'Material' },
  { label: 'Material Lime Light', value: 'material-lime-light', category: 'Material' },
  { label: 'Material Lime Dark', value: 'material-lime-dark', category: 'Material' },
  { label: 'Material Orange Light', value: 'material-orange-light', category: 'Material' },
  { label: 'Material Orange Dark', value: 'material-orange-dark', category: 'Material' },
  { label: 'Material Purple Light', value: 'material-purple-light', category: 'Material' },
  { label: 'Material Purple Dark', value: 'material-purple-dark', category: 'Material' },
  { label: 'Material Teal Light', value: 'material-teal-light', category: 'Material' },
  { label: 'Material Teal Dark', value: 'material-teal-dark', category: 'Material' },
  
  // Generic 主题
  { label: 'Generic Light', value: 'generic-light', category: 'Generic' },
  { label: 'Generic Dark', value: 'generic-dark', category: 'Generic' },
  { label: 'Generic Contrast', value: 'generic-contrast', category: 'Generic' },
  { label: 'Generic Carmine', value: 'generic-carmine', category: 'Generic' },
  { label: 'Generic Dark Moon', value: 'generic-dark-moon', category: 'Generic' },
  { label: 'Generic Soft Blue', value: 'generic-soft-blue', category: 'Generic' },
  { label: 'Generic Dark Violet', value: 'generic-dark-violet', category: 'Generic' },
  { label: 'Generic Green Mist', value: 'generic-green-mist', category: 'Generic' },
  
  // Fluent 主题
  { label: 'Fluent Blue Light', value: 'fluent-blue-light', category: 'Fluent' },
  { label: 'Fluent Blue Dark', value: 'fluent-blue-dark', category: 'Fluent' },
  { label: 'Fluent SaaS Light', value: 'fluent-saas-light', category: 'Fluent' },
  { label: 'Fluent SaaS Dark', value: 'fluent-saas-dark', category: 'Fluent' }
]

const onThemeChanged = (e) => {
  const newTheme = e.value
  themeManager.loadTheme(newTheme)
  currentTheme.value = newTheme
}

onMounted(() => {
  currentTheme.value = themeManager.getCurrentTheme()
})
</script>

<style scoped>
.theme-switcher {
  display: inline-block;
  margin: 10px;
}
</style>
