import axios from 'axios'

/**
 * 获取Cookie值
 * @param {string} name - cookie名称
 * @returns {string|null} cookie值
 */
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
  return null
}

/**
 * 创建axios实例
 */
const service = axios.create({
  baseURL: import.meta.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api', // API基础路径
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 请求拦截器
 * 在每个请求发送前执行
 */
service.interceptors.request.use(
  config => {
    console.log('[Request] 发送请求:', config.url)
    
    // 从cookie中获取token并添加到请求头
    const token = getCookie('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
      console.log('[Request] 添加token到请求头')
    }
    
    // 从wujie获取主应用传递的token（备用方案）
    if (!token && window.$wujie && window.$wujie.props && window.$wujie.props.token) {
      config.headers['Authorization'] = `Bearer ${window.$wujie.props.token}`
      console.log('[Request] 从wujie获取token')
    }
    
    return config
  },
  error => {
    console.error('[Request] 请求错误:', error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 * 在收到响应后执行
 */
service.interceptors.response.use(
  response => {
    
    console.log('[Response] 收到响应:', response.config.url, response.status)
    
    const { data, status } = response
    
    // 根据实际后端API结构调整
    // if (status === 200) {
    //   // 如果后端返回的数据结构是 { code, data, message }
    //   if (data.code === 0 || data.code === 200) {
    //     return data.data || data
    //   } else {
    //     // 业务错误
    //     console.error('[Response] 业务错误:', data.message)
    //     return Promise.reject(new Error(data.message || '请求失败'))
    //   }
    // }
    
    return data
  },
  error => {
    console.error('[Response] 响应错误:', error)
    
    const { response } = error
    
    if (response) {
      switch (response.status) {
        case 401:
          console.error('[Response] 未授权，请重新登录')
          // 清除token
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
          // 可以触发登录弹窗或跳转到登录页
          break
        case 403:
          console.error('[Response] 权限不足')
          break
        case 404:
          console.error('[Response] 请求的资源不存在')
          break
        case 500:
          console.error('[Response] 服务器内部错误')
          break
        default:
          console.error('[Response] 请求错误:', response.status)
      }
    } else {
      // 网络错误
      console.error('[Response] 网络错误，请检查网络连接')
    }
    
    return Promise.reject(error)
  }
)

/**
 * 封装的请求方法
 */
const request = {
  /**
   * GET请求
   * @param {string} url - 请求地址
   * @param {object} params - 请求参数
   * @param {object} config - 额外配置
   * @returns {Promise}
   */
  get(url, params = {}, config = {}) {
    return service({
      method: 'get',
      url,
      params,
      ...config
    })
  },

  /**
   * POST请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求数据
   * @param {object} config - 额外配置
   * @returns {Promise}
   */
  post(url, data = {}, config = {}) {
    return service({
      method: 'post',
      url,
      data,
      ...config
    })
  },

  /**
   * PUT请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求数据
   * @param {object} config - 额外配置
   * @returns {Promise}
   */
  put(url, data = {}, config = {}) {
    return service({
      method: 'put',
      url,
      data,
      ...config
    })
  },

  /**
   * DELETE请求
   * @param {string} url - 请求地址
   * @param {object} params - 请求参数
   * @param {object} config - 额外配置
   * @returns {Promise}
   */
  delete(url, params = {}, config = {}) {
    return service({
      method: 'delete',
      url,
      params,
      ...config
    })
  },

  /**
   * 上传文件
   * @param {string} url - 请求地址
   * @param {FormData} formData - 文件数据
   * @param {object} config - 额外配置
   * @returns {Promise}
   */
  upload(url, formData, config = {}) {
    return service({
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    })
  }
}

// 导出axios实例和封装的请求方法
export { service as axiosInstance }
export default request
