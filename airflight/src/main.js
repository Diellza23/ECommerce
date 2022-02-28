import Vue from "vue";
import App from "./App.vue";
import jQuery from "jquery";
import router from "./router";
window.$ = window.jQuery = jQuery;
import firebase from "firebase/compat/app";
require("firebase/compat/firestore");
import VueFirestore from "vue-firestore";
import Swal from "sweetalert2";
// import { getFirestore } from "firebase/firestore"
import "popper.js";
import "bootstrap";
import "./assets/app.scss";
import "firebase/compat/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import storeUser from "./storeUser/index.js";
// import {getApp} from 'firebase/app'
// import {getAuth, connectAuthEmulator} from 'firebase/auth';
// import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore'
// import {getFunctions, connectFunctionsEmulator} from 'firebase/functions'

import store from "./store.js";

Vue.use(VueFirestore, {
  key: "id",
  enumerable: true,
});

window.Swal = Swal;

Vue.use(VueFirestore);

Vue.component("mini-cart", require("./components/MiniCart.vue").default);
Vue.component("add-to-cart", require("./components/AddToCart.vue").default);
Vue.component("Navbar", require("./components/Navbar.vue").default);
Vue.component("products-list", require("./sections/ProductsList.vue").default);

import Vue2Filters from "vue2-filters";
Vue.use(Vue2Filters);

// import VueCarousel  from 'vue-carousel';
// Vue.use(VueCarousel)

const firebaseConfig = {
  apiKey: "AIzaSyBLEvrn8vnVrW9Y46LSxfbMyHlVe2Y4Zpo",
  authDomain: "vue-projectuni.firebaseapp.com",
  projectId: "vue-projectuni",
  storageBucket: "vue-projectuni.appspot.com",
  messagingSenderId: "876452602881",
  appId: "1:876452602881:web:b104c88aef0099c32d8c00",
  measurementId: "G-0X96HBT70Q",
};
firebase.initializeApp(firebaseConfig);

onAuthStateChanged(getAuth(), (user) => {
  storeUser.dispatch(user, "fetchUser");
});

// const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");

// const firestore = getFirestore();
// connectFirestoreEmulator(firestore, 'localhost', 8080);

// const functions = getFunctions(getApp());
// connectFunctionsEmulator(functions, 'localhost', 5001);

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

window.Toast = Toast;

Vue.config.productionTip = false;

let app = "";

firebase.auth().onAuthStateChanged(function () {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

const db = firebase.firestore();
export { db };
