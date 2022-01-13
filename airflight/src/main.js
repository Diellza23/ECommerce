import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery';
import router from "./router";
window.$ = window.jQuery = jQuery;

import 'popper.js';
import 'bootstrap';
import './assets/app.scss';

Vue.component("Navbar", require('./components/Navbar.vue').default);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
