const state = () => ({
  list: [],
});
const mutations = {
  SET_LIST(state, list) {
    state.list = list;
  },
};

const actions = {
  fetchVueshop({ commit }, list) {
    commit("SET_LIST", list);
  },
};
const getters = {
  vueshopList(state) {
    return state.list;
  },
};

export default {
  mutations,
  actions,
  getters,
  state,
};
