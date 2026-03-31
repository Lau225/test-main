/**
 * 权限控制自定义指令
 * 使用方式：v-permission="true" 或 v-permission="false"
 * true: 显示元素
 * false: 隐藏元素
 */

export const permission = {
  // Vue 3 指令钩子 - 元素挂载时
  mounted(el, binding) {
    const { value } = binding
    let arr = ['add']
    if (!arr.includes(value)) {
      // 不在权限列表中时隐藏元素
      el.style.display = 'none'
    }
  },

  // 当绑定值更新时
  updated(el, binding) {
    const { value } = binding

    if (!value) {
      // false 时隐藏元素
      el.style.display = 'none'
    } else {
      // true 时显示元素
      el.style.display = ''
    }
  }
}

export default permission
