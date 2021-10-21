import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '未来社区首页',
      auth: true,
      authArr: [0, 1, 2]
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/result/:type',
    name: 'Result',
    component: () => import('../views/Result.vue'),
    meta: {
      title: '操作结果'
    },
    props: true
  },
  {
    path: '/topic',
    name: 'Topic',
    component: () => import('../views/Topic.vue'),
    meta: {
      title: '话题',
      auth: true,
      authArr: [0, 1, 2]
    }
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('../views/Post.vue'),
    meta: {
      title: '发布新话题',
      auth: true,
      authArr: [0, 1, 2]
    }
  },
  {
    path: '/topicDetails/:id',
    name: 'TopicDetails',
    component: () => import('../views/TopicDetails.vue'),
    meta: {
      title: '话题详情',
      auth: true,
      authArr: [0, 1, 2]
    },
    props: true
  },
  {
    path: '/userCenter/:uid',
    name: 'UserCenter',
    component: () => import('../views/UserCenter.vue'),
    meta: {
      title: '用户中心',
      auth: true,
      authArr: [0, 1, 2]
    },
    props: true
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('../views/Personal.vue'),
    meta: {
      title: '个人资料',
      auth: true,
      authArr: [0, 1, 2]
    },
    props: true
  },
  {
    path: '/topicClass',
    name: 'TopicClass',
    component: () => import('../views/TopicClass.vue'),
    meta: {
      title: '话题分类',
      auth: true,
      authArr: [0, 1, 2]
    },
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router