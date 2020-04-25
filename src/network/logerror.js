import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://suen.xyz:3001',
    // baseURL:'http://localhost:3001',
    timeout: 10000,
  })
  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    // 这里可以处理config中不符合服务器要求的信息
    // 发送请求时，显示请求图标
    // 某些网络请求（比如登陆token），必须携带一些特殊信息
    
    return config //必须return
  }, err => {

  })
  // 响应拦截
  instance.interceptors.response.use(res => {

    return res
  }, err => {

  })
  //axios本身返回的就是promise
  return instance(config)
}

export function errorLog(str){
  request({
    url:'/internship',
    params:{
      str
    }
  })
}