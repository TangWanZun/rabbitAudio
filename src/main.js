import vConsole from 'vconsole'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import axios from 'axios'
import VueAxios from 'vue-axios'
import audio  from './audio.js'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default-dark.css'
import './registerServiceWorker'
import './main.less'
import dialog from '@/components/index.js';

// var vconsole = new vConsole(); 
Vue.use(dialog)
Vue.use(VueAxios, axios)
Vue.use(VueMaterial);
Vue.config.productionTip = false
window.$audio = audio;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
