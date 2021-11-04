import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userList: {}
  },
  mutations: {
    add(state, data) {
      state.userList = data
    },
    change(state, data) {
      state.userList.avatar = data
    }
  },
  actions: {
    change(store, data) {
      this.commit('change', data)
    }
  },
  modules: {},
  plugins: [
    persistedState({
      storage: window.sessionStorage
    })
  ]
})