<template>
  <el-dialog v-model="visible" :title="title" :width="width" @close="handleCancel">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item v-for="field in fields" :key="field.name" :label="field.label" :prop="field.name">
        <el-input v-if="!field.type || field.type === 'input'" v-model="formData[field.name]"
          :placeholder="field.placeholder || `请输入${field.label}`" />
        <el-input v-else-if="field.type === 'textarea'" v-model="formData[field.name]" type="textarea" :rows="3"
          :placeholder="field.placeholder || `请输入${field.label}`" />
        <el-select v-else-if="field.type === 'select'" v-model="formData[field.name]"
          :placeholder="field.placeholder || `请选择${field.label}`" style="width: 100%">
          <el-option v-for="opt in field.options" :key="opt.value" :label="opt.label" :value="opt.value" />
        </el-select>
        <el-date-picker v-else-if="field.type === 'date'" v-model="formData[field.name]" type="date"
          :placeholder="field.placeholder || `请选择${field.label}`" style="width: 100%" />
        <el-date-picker v-else-if="field.type === 'datetime'" v-model="formData[field.name]" type="datetime"
          :placeholder="field.placeholder || `请选择${field.label}`" style="width: 100%" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
type fieldsType = {
  name: string
  label: string
  type?: 'input' | 'textarea' | 'select' | 'date' | 'datetime'
  placeholder?: string
  options?: Array<{ label: string; value: any }>
  rules?: Array<{ required: boolean; message: string }>
}
const props = defineProps<{
  title: string,
  width: string,
  fields: fieldsType[]
}>()

const emit = defineEmits(['save', 'cancel'])

const visible = ref(false)
const formRef = ref()
const formData = ref({})

const formRules = computed(() => {
  const rules = {}
  props.fields.forEach(field => {
    if (field.rules) rules[field.name] = field.rules
  })
  return rules
})

const open = (data = {}) => {
  formData.value = {}
  props.fields.forEach(f => (formData.value[f.name] = data[f.name] || ''))
  visible.value = true
}

const close = () => {
  visible.value = false
  formRef.value?.resetFields()
}

const handleCancel = () => {
  close()
  emit('cancel')
}

const handleSave = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (valid) {
    emit('save', { ...formData.value })
    close()
  }
}

defineExpose({ open, close })
</script>
