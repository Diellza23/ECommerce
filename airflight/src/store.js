import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

let cart = window.localStorage.getItem("cart");

export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : [],
  },

  getters: {
    totalPrice: (state) => {
      let total = 0;
      state.cart.filter((item) => {
        total += item.productPrice * item.productQuantity;
      });

      return total;
    },
  },

  mutations: {
    addToCart(state, item) {
      let found = false;
      state.cart.map((product) => {
        if (product.product_id == item.product_id) {
          console.log("found");
          found = true;
        } else {
          found = false;
        }
      });

      console.log("FOUND STATE: " + found);

      if (found == true) {
        item.productQuantity++;
      } else {
        state.cart.push(item);
      }

      this.commit("saveData");
    },

    saveData(state) {
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);
      item.productQuantity = 1;
      state.cart.splice(index, 1);
      this.commit("saveData");
    },
  },
});
