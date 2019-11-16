import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import store from './store'
import ApiService from './services/api.service'
import TokenService from './services/storage.service'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_ROOT_API)

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
