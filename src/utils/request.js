import axios from 'axios'
import storage from '@/model/storage.js'

// create an axios instance
const service = axios.create({
  // CD = http://58.246.79.142:25005
  baseURL: '/CD', // url = base url + request url
  timeout: 5000 // request timeout
  // headers:  { 'Content-Type': 'multipart/form-data' }

})

/**
 * 将格式转为formdata格式
 */
// service.defaults.transformRequest = [(data) => {
//     if (data instanceof FormData) {
//       return data;
//     } else if (data !== undefined) {
//       const newData = new FormData();
//       for (const k of Object.keys(data)) {
//         newData.append(k, data[k]);
//       }
//       return newData;
//     }
//   }];

// 添加请求拦截器，若token存在则在请求头中加token，不存在也继续请求
service.interceptors.request.use(
  config => {
    // 每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器,没有则不带token
    // Authorization是必须的
    let tokenInfo = storage.get('tokenInfo')
    const token = tokenInfo ? tokenInfo.accessToken : null
    const tokenType = token ? tokenInfo.tokenType.substring(0, 1).toUpperCase() + tokenInfo.tokenType.substring(1) + ' ' : null
    if (token && tokenType) {
      config.headers.Authorization = tokenType + token
    }
    return config
  },
  error => {
    console.log('在request拦截器检查到错误：', error.response)
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // 在status不正确的情况下，判别status状态码给出对应响应
    if (error.response) {
      console.log('在respone拦截器检查到错误：')
      switch (error.response.status) {
        case 204:
          error.response.data.error = '204:No Content（没有内容）'
          break
        case 401:
          location.reload() // 刷新页面，触发路由守卫
          error.response.data.error = '401:Unauthorized（未经授权）'
          break
        case 403:
          error.response.data.error = '403:Forbidden（被禁止的）'
          break
        case 500:
          error.response.data.error = '500:服务器内部错误'
          break
        default:
          return error
      }
      return Promise.reject(error.response.data.error)
    }

    return Promise.reject(error)
  }
)

export default service
