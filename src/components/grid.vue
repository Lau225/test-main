<template>
  <div class="data-grid-container">
    <DxDataGrid :data-source="products" :show-borders="true" width="800px" :column-auto-width="false"
      :horizontal-scroll-enabled="true" :scrollable="true">
      <!-- 列定义：总宽度需超过 800px（触发滚动） -->
      <DxColumn data-field="id" caption="ID" :width="100" alignment="center" />
      <DxColumn data-field="name" caption="产品名称" :width="200" alignment="center" />
      <DxColumn data-field="price" caption="价格" :width="150" alignment="center" />
      <DxColumn data-field="category" caption="类别" :width="200" alignment="center" />
      <DxColumn data-field="inStock" caption="是否库存" :width="150" alignment="center" />
      <DxColumn data-field="productionDate" caption="生产日期" :width="200" alignment="center" />
    </DxDataGrid>
  </div>
</template>

<script setup>
import DxDataGrid, { DxColumn } from 'devextreme-vue/data-grid';
const products = [
  { id: 1, name: "笔记本 Pro", price: 6999, category: "电子产品", inStock: true, productionDate: new Date(2023, 5, 10) },
  { id: 2, name: "无线鼠标", price: 199, category: "电脑配件", inStock: false, productionDate: new Date(2023, 3, 22) },
  { id: 3, name: "MacBook Pro", price: 2499, category: "电子产品", inStock: true, productionDate: new Date(2023, 4, 15) }
]
</script>


<style scoped>
/* 关键：确保表格容器不被父元素挤压 */
.data-grid-container {
  /* 避免父容器样式影响表格宽度 */
  overflow: visible;
  margin: 20px;
}

/* 可选：自定义滚动条样式（增强可见性） */
::v-deep .dx-datagrid-headers+.dx-scrollable {
  /* 确保滚动区域正确显示 */
  overflow-x: auto !important;
}

::v-deep .dx-scrollable-horizontal .dx-scrollable-scroll {
  height: 10px;
  /* 加粗滚动条，更容易看到 */
}

::v-deep .dx-scrollable-horizontal .dx-scrollable-scroll-thumb {
  background-color: #666;
  /* 深色滚动条，更明显 */
}

::v-deep .dx-datagrid-headers .dx-header-row {
  background-color: #4CAF50 !important;
  /* 设置表头背景色 */
}

::v-deep .dx-datagrid-headers .dx-header-row>td {
  color: white;
  /* 设置表头文字颜色 */
  font-weight: bold;
  /* 可选：加粗表头文字 */
}
</style>