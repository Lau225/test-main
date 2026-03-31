<template>
  <div id="popup-container">
    <DxPopup
      v-model:visible="popupVisible"
      :drag-enabled="true"
      :hide-on-outside-click="true"
      :show-close-button="true"
      :show-title="true"
      :width="400"
      :height="300"
      title="测试弹窗"
    >
      <div class="popup-content">
        <h3>弹窗内容</h3>
        <p>这是一个测试弹窗，用来验证弹窗功能是否正常。</p>
        <div class="popup-buttons">
          <DxButton 
            text="确定" 
            type="default" 
            styling-mode="contained"
            @click="handleConfirm"
          />
          <DxButton 
            text="取消" 
            type="normal" 
            styling-mode="outlined"
            @click="handleClose"
          />
        </div>
      </div>
    </DxPopup>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DxPopup from 'devextreme-vue/popup';
import DxButton from 'devextreme-vue/button';

const popupVisible = ref(false);
console.log('初始化 popupVisible:', popupVisible.value);

const handleConfirm = () => {
  console.log('确定按钮被点击');
  popupVisible.value = false;
};

const handleClose = () => {
  console.log('取消按钮被点击');
  popupVisible.value = false;
};

const showPop = () => {
  console.log('showPop 方法被调用');
  console.log('当前 popupVisible 值:', popupVisible.value);
  popupVisible.value = true;
  console.log('设置后 popupVisible 值:', popupVisible.value);
};

// 暴露方法给父组件
defineExpose({
  showPop
});
</script>
<style scoped>
.popup-content {
  padding: 20px;
  text-align: center;
}

.popup-content h3 {
  margin-bottom: 15px;
  color: #333;
  font-size: 18px;
}

.popup-content p {
  margin-bottom: 20px;
  color: #666;
  line-height: 1.5;
}

.popup-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.popup-buttons .dx-button {
  min-width: 80px;
}
</style>
