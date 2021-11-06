import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import {
  artApi,
  categoryApi
} from '../api/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userList: {},
    toplicList:[],
    cateGoryList:[],
  },
  mutations: {
    add(state, data) {
      state.userList = data
    },

    change(state, data) {
      state.userList.avatar = data
    },

    getToplicList(state,data) {
      state.toplicList = data
    },

    getCateGoryList(state,data) {
      state.cateGoryList = data
    }
  },
  actions: {
    change(context, data) {
      context.commit('change', data)
    },

    asyncGetTopicList(context,data) {
      artApi.list(data)
      .then((result) => {
        if (result.ret === 200) {
          context.commit('getToplicList',result.data.reverse())
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    asyncGetCateGoryList(context,data) {
      categoryApi.list(data)
      .then((result) => {
        if (result.ret === 200) {
          context.commit('getCateGoryList',result.data)
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  modules: {},
  plugins: [
    persistedState({
      storage: window.sessionStorage,
    })
  ]
})