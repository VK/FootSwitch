import Vue from 'vue'
import App from './App.vue'
import store from './store'

import './registerServiceWorker'




import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: '#007bff',
  failedColor: 'red',
  thickness: '3px'
})
declare module 'vue/types/vue' {
  interface Vue {
    $Progress: any
  }
}



Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
