import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* layout */
import layout from '@/view/layout/Layout'

export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }, {
    path: '/error',
    name: '401',
    component: layout,
    redirect: '/error/401',
    hidden: true,
    children: [
      {
        path: '401',
        component: _import('errorPage/401')
      }
    ]
  }, {
    path: '/404',
    name: '404',
    component: _import('errorPage/404'),
    hidden: true
  }, {
    path: '/login', // 登录
    name: 'login',
    hidden: true,
    component: _import('login/login')
  }, {
    path: '/',
    component: layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/index')
      }
    ]
  }, {
    path: '/new',
    component: layout,
    redirect: '/new/add',
    icon: 'icon-xuanti-neirongjianshu',
    noDropdown: false,
    name: "文章",
    children: [
      {
        path: 'add',
        component: _import('new/add'),
        name: '添加文章',
        hidden: true
      }
    ]
  }, {
    path: '/category',
    component: layout,
    redirect: '/category/list',
    icon: 'icon-xuanti-neirongjianshu',
    noDropdown: false,
    name: "分类",
    children: [
      {
        path: 'add',
        component: _import('category/list'),
        name: '分类列表',
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: asyncRouterMap
})
