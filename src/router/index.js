import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import {
  post
} from '@/api/index';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      Top: () => import('../components/Top.vue'),
      Footer: () => import('../components/Footer.vue')
    },
    meta: {
      title: '首页',
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
    path: '/topic',
    name: 'Topic',
    components: {
      default: () => import('../views/Topic.vue'),
      Top: () => import('../components/Top.vue'),
      Footer: () => import('../components/Footer.vue')
    },
    meta: {
      title: '话题',
      auth: true,
      authArr: [0, 1, 2]
    }
  },
  {
    path: '/post',
    name: 'Post',
    components: {
      default: () => import('../views/Post.vue'),
      Top: () => import('../components/Top.vue'),
      Footer: () => import('../components/Footer.vue')
    },
    meta: {
      title: '发布新话题',
      auth: true,
      authArr: [0, 1, 2]
    }
  },
  {
    path: '/postClass',
    name: 'PostClass',
    components: {
      default: () => import('../views/PostClass.vue'),
      Top: () => import('../components/Top.vue'),
      Footer: () => import('../components/Footer.vue')
    },
    meta: {
      title: '发布新分类',
      auth: true,
      authArr: [0, 1, 2]
    }
  },
  {
    path: '/topicDetails/:id',
    name: 'TopicDetails',
    components: {
      default: () => import('../views/TopicDetails.vue'),
      Top: () => import('../components/Top.vue'),
      Footer: () => import('../components/Footer.vue')
    },
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
    components: {
      default: () => import('../views/Personal.vue'),
      Top: () => import('../components/Top.vue'),
      Footer: () => import('../components/Footer.vue')
    },
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
    components: {
      default: () => import('../views/TopicClass.vue'),
      Top: () => import('../components/Top.vue'),
      Footer: () => import('../components/Footer.vue')
    },
    meta: {
      title: '话题分类',
      auth: true,
      authArr: [0, 1, 2]
    },
    props: true
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 判断是否需要登录权限
router.beforeEach((to, from, next) => {
  if (to.meta.auth == true) {
    // 需要登录权限
    post('/isLogin.php')
      .then((result) => {
        if (result.ret === 200) {
          next()
        } else {
          next({
            name: 'Login'
          })
        }
      }).catch(() => {});
  } else {
    // 不需要登录权限
    return next();
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router