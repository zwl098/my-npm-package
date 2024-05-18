import Vue from 'vue'
import App from './App.vue'
import { Select,Checkbox } from 'ant-design-vue'
Vue.config.productionTip = false
Vue.use(Select)
Vue.use(Checkbox)
new Vue({
  render: h => h(App),
}).$mount('#app')
