import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'babel-polyfill'
//引入element-ui
import ElementUI, { Form } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import './assets/css/hidden.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import { errorLog } from './network/logerror'
// Promise内全局异常捕获
window.addEventListener('unhandledrejection', e => {
  e.preventDefault()
  let str = `error::: ${e.reason.stack}`
  errorLog(str)
  return true
})

// window error捕获的错误
window.onerror = (msg, url, line, col, error) => {
  let str = `error::: ${msg} 发生在: ${url} 第${line}行`
  errorLog(str)
  return true // error不会以error形式打印到控制台
}
// vue捕获的错误不会上报到window.error
Vue.config.errorHandler = function (error, vm, msg) {
  let str = `error::: ${error} 发生在组件：${vm.$options._componentTag} 的 ${msg} 中`
  errorLog(str)
}