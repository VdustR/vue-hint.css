import Vue from 'vue'
import App from './App.vue'
import vueHintCss from '../src'
import 'hint.css'
import 'normalize.css'
Vue.use(vueHintCss)

new Vue({
  el: '#app',
  render: h => h(App)
})
