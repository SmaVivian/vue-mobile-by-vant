// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'

import Vant from 'vant'
import { Lazyload } from 'vant';


import fastClick from "fastclick"
import '@/plugins/rem'
import store from '@/store'
import Cookies from 'js-cookie'
import {common} from '@/utils/common'
import '@/utils/filters'
import request from './utils/request'
import './utils/validate'


fastClick.attach(document.body)

Vue.prototype.$http = request
Vue.prototype.$common = common
Vue.prototype.$staticUrl = process.env.staticPath // 静态数据路径

Vue.use(Vant);
Vue.use(Lazyload, {});

router.beforeEach((to, from, next) => {
  // 页面刷新时，重新赋值token、userid
  if (Cookies.get('userid')) {  
    store.commit('SET_USER_INFO', {
      token: Cookies.get('token'),
      userid: Cookies.get('userid'),
    })
  }  
  next()
});

router.afterEach((to, from, next) => {
  // window.scrollTo(0, 0);
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
