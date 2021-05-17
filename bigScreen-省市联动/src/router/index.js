import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    meta: {
      title: '智能电子证数据分析中心'
    },
    component: () => import('../views/index.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    meta: {
      title: '智能电子证数据分析中心'
    },
    component: () => import('../views/demo.vue')
  },
  {
    path: '/demo2',
    name: 'demo2',
    meta: {
      title: '智能电子证数据分析中心'
    },
    component: () => import('../views/demo2.vue')
  },
 
]




const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */

  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router