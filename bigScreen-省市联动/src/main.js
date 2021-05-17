import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
import '@/API/demo'
import echarts from 'echarts'
require('echarts/extension/bmap/bmap');
Vue.prototype.$echarts = echarts


Vue.use(Vant);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
