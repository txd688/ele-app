import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

import '@/core/lazy_use';

//请求拦截
axios.interceptors.request.use(config=>{
  //加载动画
  store.commit('showLoading')
  return config;
},error=>{
  store.commit('hideLoading')
  return Promise.reject(error);
});
//响应拦截
axios.interceptors.response.use(response=>{
  store.commit('hideLoading')
  return response;
},error=>{
  store.commit('hideLoading')
  return Promise.reject(error);
});

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
