import Vue from 'vue'
import App from './App.vue'
import router from '@/plugins/router.js'
import store from '@/plugins/store.js'
import ElementUi from 'element-ui'
import '@/assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import { rules, statusList } from '@/data/reg'
Vue.config.productionTip = false

Vue.prototype.$rules = rules
Vue.prototype.$statusList = statusList
Vue.use(ElementUi)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
