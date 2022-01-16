import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery';
import router from "./router";
window.$ = window.jQuery = jQuery;
import firebase from 'firebase/compat/app'
require("firebase/compat/firestore");
// import { getFirestore } from "firebase/firestore"

import 'popper.js';
import 'bootstrap';
import './assets/app.scss';

Vue.component("Navbar", require('./components/Navbar.vue').default);

const firebaseConfig = {
  apiKey: "AIzaSyBLEvrn8vnVrW9Y46LSxfbMyHlVe2Y4Zpo",
  authDomain: "vue-projectuni.firebaseapp.com",
  projectId: "vue-projectuni",
  storageBucket: "vue-projectuni.appspot.com",
  messagingSenderId: "876452602881",
  appId: "1:876452602881:web:b104c88aef0099c32d8c00",
  measurementId: "G-0X96HBT70Q"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

let app ="";



firebase.auth().onAuthStateChanged(function(){

  if(!app){
    new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
  }
})

const db = firebase.firestore();
export {db}


