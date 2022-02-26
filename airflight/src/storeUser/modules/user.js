import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = () => ({
  user: {
    loggedIn: false,
    data: null,
  },
});

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value;
  },
  SET_USER(state, userData) {
    state.user.data = userData;
  },
};

const actions = {
  fetchUser({ commit }, user) {
    commit("SET_USER", user ? user : null);
    commit("SET_LOGGED_IN", user !== null);
  },
};

const getters = {
  user(state) {
    return state.user;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

