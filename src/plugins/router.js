import Vue from 'vue'
import Store from '@/plugins/store'
import Router from 'vue-router'
import { Directory } from '@/data/directory'

Vue.use(Router)

let routers = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/backpage',
      name: 'backpage',
      component: () => import('@/views/BackPage'),
      meta: {
        name: '后台'
      },
      children: []
    },
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login'),
      meta: {
        name: '登录',
        jurisdiction: true
      }
    }
  ]
})
function fun (to) {
  if (!to.meta.name || !to.path) return false
  let json = {
    name: to.meta.name,
    path: to.path
  }
  let historyPath = JSON.parse(Store.state.historyPath); let state = true
  historyPath.map(item => {
    if (item.path === to.path) {
      state = false
      return false
    }
  })
  if (state) {
    historyPath.push(json)
    Store.commit('setHistoryPath', JSON.stringify(historyPath))
  }
  Store.commit('setPath', JSON.stringify(json))
}

routers.beforeEach((to, form, next) => {
  // 设置title
  if (to.meta.name) {
    window.document.title = to.meta.name
  }
  // 权限
  if (to.meta.jurisdiction) {
    if (to.path === '/') {
      Store.commit('setToken', '')
    }
    next()
    return false
  } else {
    // 认证
    if (!routers.options.routes[0].children.length) {
      // 请求接口
      Directory.map(item => {
        item.component = resolve => require([`../views/back${item.path}.vue`], resolve)
      })
      routers.options.routes[0].children = Directory
      routers.addRoutes(routers.options.routes)
      fun(to)
      next({ ...to, replace: true })
      return false
    } else {
      if (to.matched.length) {
        fun(to)
        next()
      } else {
        next(routers.options.routes[0].children[0].path)
      }
    }
  }
})

export default routers
