import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue'// 组件库
import 'ant-design-vue/dist/antd.css'// 样式表

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
