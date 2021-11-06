import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import {
  artApi,
  categoryApi,
  commentApi
} from '../api/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userList: {},
    toplicList: [],
    cateGoryList: [],
    commentList: {}
  },
  mutations: {
    add(state, data) {
      state.userList = data
    },

    change(state, data) {
      state.userList.avatar = data
    },
    // 话题列表
    getToplicList(state, data) {
      state.toplicList = data
    },
    // 分类列表
    getCateGoryList(state, data) {
      state.cateGoryList = data
    },
    // 评论列表
    commentList(state, data) {
      state.commentList = data
    }
  },
  actions: {
    change(context, data) {
      context.commit('change', data)
    },
    // 话题列表接口
    asyncGetTopicList(context, data) {
      artApi.list(data)
        .then((result) => {
          if (result.ret === 200) {
            context.commit('getToplicList', result.data.reverse())
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 分类列表接口
    asyncGetCateGoryList(context, data) {
      categoryApi.list(data)
        .then((result) => {
          if (result.ret === 200) {
            context.commit('getCateGoryList', result.data)
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 浏览量接口
    asyncGetArticleViews(context, data) {
      artApi.articleViews(data)
    },
    // 评论列表接口
    asyncGetCommentList(context, data) {
      commentApi.commentList(data)
        .then((result) => {
          context.commit('commentList', result.data)
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