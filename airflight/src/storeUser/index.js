import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import vueshop from "./modules/vueshop";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    vueshop,
  },
});
