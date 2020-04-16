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


// Promise内全局异常捕获
window.addEventListener('unhandledrejection',e=>{
  e.preventDefault()
  console.log('log-error:::\n'+e.reason.stack)
  //  
  return true
})

// window error捕获的错误
window.onerror = (msg, url, line, col, error) => {
  console.log('log-error:::\n'+msg+',发生在:'+url,'第'+line+'行')
  //  发给后台
  //  
  return true // error不会以error形式打印到控制台
}
// vue捕获的错误不会上报到window.error
Vue.config.errorHandler = function (error, vm, msg) {
  let e = 'log-error:::\n'+error+'in：'+msg+vm
  // 发给后台

}