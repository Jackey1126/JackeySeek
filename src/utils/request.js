// axios 请求库二次封装
import axios from 'axios'

// 创建请求实例
const instance = axios.create({
  baseURL: 'http://localhost:11434/api',
  timeout: 500000, // 50s超时(ai接口请求时间偏长)
  withCredentials: false // 跨域请求时是否需要使用凭证
})

// 前置拦截器
instance.interceptors.request.use(
  (config) => {
    /**
     * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
     * const token = getToken()
     * if (token) {
     *  config.headers.token = token
     * }
     */
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器
instance.interceptors.response.use(
  (response) => {
    return response // 直接返回
  },
  (error) => {
    const { response } = error
    if (response && response.data) {
      return Promise.reject(error)
    }
    const { message } = error
    console.log(message)
    return  Promise.reject(error)
  }
)

// 导出常用函数
export const post = (url, data={}, params={}) => {
  return instance({
    method: 'post',
    url,
    data,
    params
  })
}
export const get = (url, params = {}) => {
  return instance({
    method: 'get',
    url,
    params,
  });
}
export const put = (url, data = {}, params = {}) => {
  return instance({
    method: 'put',
    url,
    params,
    data,
  });
}
export const _delete = (url, params = {}) => {
  return instance({
    method: 'delete',
    url,
    params,
  });
}

export default instance