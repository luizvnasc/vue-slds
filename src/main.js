import Vue from 'vue'
import App from './App.vue'
import VueSlds from './index'
Vue.use(VueSlds)
new Vue({
  el: '#app',
  render: h => h(App)
})
