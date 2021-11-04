import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import {
  Upload,
  Dialog
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
import {
  userApi,
  artApi,
  commonApi,
  categoryApi
} from './api/api';

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$userApi = userApi
Vue.prototype.$artApi = artApi
Vue.prototype.$commonApi = commonApi
Vue.prototype.$categoryApi = categoryApi

Vue.use(ViewUI)
Vue.use(Upload)
Vue.use(Dialog)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')