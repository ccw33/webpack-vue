{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}


import axios from 'axios'
import qs from 'qs'
require('jquery');
require('bootstrap');
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Promise from 'es6-promise'
import 'animate.css'
Promise.polyfill()

Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
Vue.prototype.host='http://172.16.125.67:5000';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
