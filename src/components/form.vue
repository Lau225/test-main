<template>
  <div class="form-container">
    <h2>用户信息表单 (Vue3 组合式 API)</h2>
    
    <DxForm
      ref="formRef"
      :form-data="formData"
      :col-count="4"
      label-mode="outside"
      :show-colon-after-label="true"
      @field-data-changed="handleFieldChange"
      @content-ready="onFormReady"
    >
      <!-- 第一行：4个必填字段 -->
      <DxSimpleItem
        data-field="firstName"
        editor-type="dxTextBox"
        :editor-options="{ placeholder: '请输入名字' }"
      >
        <DxRequiredRule message="名字是必填项" />
        <DxStringLengthRule 
          :min="2" 
          :max="20" 
          message="名字长度必须在2-20个字符之间" 
        />
      </DxSimpleItem>
      
      <DxSimpleItem
        data-field="lastName"
        editor-type="dxTextBox"
        :editor-options="{ placeholder: '请输入姓氏' }"
      >
        <DxRequiredRule message="姓氏是必填项" />
        <DxStringLengthRule 
          :min="2" 
          :max="20" 
          message="姓氏长度必须在2-20个字符之间" 
        />
      </DxSimpleItem>
      
      <DxSimpleItem
        data-field="email"
        editor-type="dxTextBox"
        :editor-options="{ placeholder: '请输入邮箱' }"
      >
        <DxRequiredRule message="邮箱是必填项" />
        <DxEmailRule message="请输入有效的邮箱地址" />
      </DxSimpleItem>
      
      <DxSimpleItem
        data-field="phone"
        editor-type="dxTextBox"
        :editor-options="{ 
          placeholder: '请输入手机号',
          mask: '+86 XXXXXXXXXXX',
          maskRules: { 'X': /[0-9]/ }
        }"
      >
        <DxRequiredRule message="手机号是必填项" />
        <DxPatternRule
          :pattern="/^1[3-9]\d{9}$/"
          message="请输入有效的手机号码"
        />
      </DxSimpleItem>
      
      <!-- 第二行：其他字段 -->
      <DxSimpleItem
        data-field="department"
        editor-type="dxSelectBox"
        :editor-options="{
          dataSource: departmentOptions,
          placeholder: '请选择部门',
          displayExpr: 'name',
          valueExpr: 'id'
        }"
      >
        <DxRequiredRule message="请选择部门" />
      </DxSimpleItem>
      
      <DxSimpleItem
        data-field="age"
        editor-type="dxNumberBox"
        :editor-options="{
          placeholder: '请输入年龄',
          showSpinButtons: true,
          min: 18,
          max: 65
        }"
      >
        <DxRequiredRule message="年龄是必填项" />
        <DxRangeRule
          :min="18"
          :max="65"
          message="年龄必须在18-65岁之间"
        />
      </DxSimpleItem>
      
      <DxSimpleItem
        data-field="joinDate"
        editor-type="dxDateBox"
        :editor-options="{
          placeholder: '请选择入职日期',
          type: 'date',
          displayFormat: 'yyyy-MM-dd',
          format: 'yyyy-MM-dd',
        }"
      >
        <DxRequiredRule message="入职日期是必填项" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="endDate"
        editor-type="dxDateBox"
        :editor-options="{
          placeholder: '结束时间',
          type: 'date',
          displayFormat: 'yyyy-MM-dd',
          min: formData.joinDate
        }"
      >
        <DxRequiredRule message="结束时间是必填项" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="salary"
        editor-type="dxNumberBox"
        :editor-options="{
          placeholder: '请输入薪资',
          format: '$ #,##0.##',
          showSpinButtons: true,
          min: 0
        }"
      >
        <DxRequiredRule message="薪资是必填项" />
        <DxRangeRule
          :min="0"
          :max="1000000"
          message="薪资必须在合理范围内"
        />
      </DxSimpleItem>
    </DxForm>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <DxButton
        text="提交表单"
        type="default"
        :disabled="!isFormValid"
        @click="handleSubmit"
      />
      <DxButton
        text="重置表单"
        @click="handleReset"
      />
      <DxButton
        text="验证表单"
        @click="validateForm"
      />
      <DxButton
        text="加载示例数据"
        @click="loadSampleData"
      />
    </div>

    <!-- 验证摘要 -->
    <DxValidationSummary
      ref="validationSummaryRef"
    />

    <!-- 表单状态显示 -->
    <div class="form-status">
      <p :class="['status-text', isFormValid ? 'valid' : 'invalid']">
        {{ isFormValid ? '✅ 表单验证通过' : '❌ 表单存在错误' }}
      </p>
      <p class="field-count">
        已填写字段: {{ filledFieldCount }}/{{ totalFieldCount }}
      </p>
    </div>
  </div>
  <DemoForm/>
</template>

<script setup>
import { 
  DxForm, 
  DxSimpleItem, 
  DxRequiredRule, 
  DxStringLengthRule, 
  DxPatternRule, 
  DxRangeRule, 
  DxEmailRule 
} from 'devextreme-vue/form';
import { DxButton } from 'devextreme-vue/button';
import { DxDateRangeBox } from 'devextreme-vue/date-range-box';
import { DxValidationSummary } from 'devextreme-vue/validation-summary';
import DemoForm from './demoForm.vue';

// 表单引用
const formRef = ref();
const validationSummaryRef = ref();

// 响应式数据
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  department: null,
  age: null,
  joinDate: null,
  salary: null,
  endDate:null
});

// 部门选项
const departmentOptions = ref([
  { id: 1, name: '技术部' },
  { id: 2, name: '市场部' },
  { id: 3, name: '人事部' },
  { id: 4, name: '财务部' },
  { id: 5, name: '运营部' }
]);

// 表单状态
const formValidationResult = ref(null);
const isFormDirty = ref(false);

// 计算属性
const isFormValid = computed(() => {
  if (!formValidationResult.value) return false;
  return formValidationResult.value.isValid;
});

const filledFieldCount = computed(() => {
  return Object.values(formData).filter(value => {
    return value !== null && value !== undefined && value !== '';
  }).length;
});

const totalFieldCount = computed(() => {
  return Object.keys(formData).length;
});

// 表单实例
const formInstance = computed(() => {
  return formRef.value?.instance;
});

// 方法
const handleFieldChange = (e) => {
  isFormDirty.value = true;
  
  // 实时验证
  validateForm();
};

const onFormReady = () => {
  console.log('表单准备就绪');
  validateForm();
};

const validateForm = () => {
  if (!formInstance.value) return;
  
  formValidationResult.value = formInstance.value.validate();
  console.log(formValidationResult.value);
  
  if (formValidationResult.value.isValid) {
    console.log('✅ 表单验证通过');
  } else {
    console.log('❌ 表单验证失败:', formValidationResult.value.brokenRules);
  }
  
  return formValidationResult.value.isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    console.error('表单验证失败，无法提交');
    return;
  }

  try {
    // 模拟 API 调用
    console.log('提交表单数据:', JSON.parse(JSON.stringify(formData)));
    
    // 这里可以添加实际的 API 调用
    // await submitFormAPI(formData);
    
    alert('表单提交成功！');
    handleReset();
    
  } catch (error) {
    console.error('表单提交失败:', error);
    alert('表单提交失败，请重试');
  }
};

const handleReset = () => {
  
  if (formInstance.value) {
    formInstance.value.resetValues();
  }
};

const loadSampleData = () => {
  formData.firstName = '张1';
  formData.lastName = '三123';
  formData.email = 'zhangsan@example.com';
  formData.phone = '13800138000';
  formData.department = 1;
  formData.age = 28;
  formData.joinDate = new Date();
  formData.salary = 15000;
  
  // 触发验证
  setTimeout(() => {
    validateForm();
  }, 100);
};

const getFormData = () => {
  return { ...formData };
};

const setFormData = (data) => {
  Object.assign(formData, data);
  validateForm();
};

// 监听表单数据变化
watch(formData, () => {
  if (isFormDirty.value) {
    validateForm();
  }
}, { deep: true });

// 生命周期
onMounted(() => {
  console.log('表单组件已挂载');
});

// 暴露方法给父组件（如果需要）
defineExpose({
  validateForm,
  getFormData,
  setFormData,
  handleReset
});
</script>

<style scoped>
.form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.action-buttons {
  margin-top: 30px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.form-status {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #6c757d;
}

.status-text.valid {
  color: #198754;
  font-weight: bold;
}

.status-text.invalid {
  color: #dc3545;
  font-weight: bold;
}

.field-count {
  color: #6c757d;
  margin: 5px 0 0 0;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-container {
    padding: 10px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  
  .action-buttons .dx-button {
    margin-bottom: 8px;
  }
}
</style>

<style>
/* 全局表单样式 */
.dx-form {
  margin-bottom: 20px;
}

.dx-invalid-message > .dx-overlay-content {
  background-color: #ffe6e6;
  border: 1px solid #ffcccc;
  color: #d9534f;
  font-size: 12px;
}

.dx-invalid .dx-texteditor {
  border-color: #dc3545;
}

.dx-valid .dx-texteditor {
  border-color: #198754;
}

.dx-texteditor.dx-state-focused.dx-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
}

.dx-texteditor.dx-state-focused.dx-valid {
  border-color: #198754;
  box-shadow: 0 0 0 2px rgba(25, 135, 84, 0.2);
}
</style>