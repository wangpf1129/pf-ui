import Vue from 'vue'
import App from './App.vue'
import PfUi from '../packages/index'
Vue.config.productionTip = false

Vue.use(PfUi)

new Vue({
  render: h => h(App),
}).$mount('#app')
