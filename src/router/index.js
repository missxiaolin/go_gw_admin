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
    path: '/introduction',
    component: layout,
    redirect: '/introduction/index',
    icon: 'icon-xuanti-neirongjianshu',
    noDropdown: true,
    children: [
      {
        path: 'index',
        component: _import('introduction/index'),
        name: '简述'
      }
    ]
  }, {
    path: '/rbac',
    component: layout,
    redirect: '/rbac/project',
    icon: 'icon-quanxian',
    noDropdown: false,
    name: '权限模块',
    children: [
      {
        path: 'project',
        component: _import('rbac/project'),
        name: '项目管理'
      }, {
        path: 'role',
        component: _import('rbac/role'),
        name: '角色管理'
      }, {
        path: 'role/add/:id',
        component: _import('rbac/addRole'),
        name: '角色操作',
        hidden: true
      }, {
        path: 'user',
        component: _import('rbac/user'),
        name: '管理员管理'
      }, {
        path: 'user/add/:id',
        component: _import('rbac/addUser'),
        name: '管理员操作',
        hidden: true
      },{
        path: 'group',
        component: _import('rbac/group'),
        name: '分组管理'
      }, {
        path: 'group/add/:id',
        component: _import('rbac/addGroup'),
        name: '分组操作',
        hidden: true
      },{
        path: 'router',
        component: _import('rbac/group'),
        name: '路由管理'
      }, {
        path: 'router/add/:id',
        component: _import('rbac/addGroup'),
        name: '路由操作',
        hidden: true
      }
			
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: asyncRouterMap
})
