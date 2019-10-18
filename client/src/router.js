import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Index from './views/Index.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

const FundList = () => import('./views/FundList.vue')
const User = () => import('./views/User.vue')
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/home',
      children: [{
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'fundlist',
          name: 'fundlist',
          component: FundList
        },
        {
          path:'user',
          name:'user',
          component: User
        }
      ]
    },
    {
      path: '*',
      name: '/404',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.token ? true : false
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    token ? next() : next('/login')
  }
})

export default router