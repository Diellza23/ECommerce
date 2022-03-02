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
      let found = state.cart.find(
        (product) => product.productId == item.productId
      );

      if (found >= 1) {
        found.productQuantity++;
        console.log(found.productQuantity, "quantt");
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

      state.cart.splice(index, 1);

      this.commit("saveData");
    },
  },
});
