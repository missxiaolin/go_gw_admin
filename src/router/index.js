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
  },{
			  path: '/drawing',
			  component: layout,
			  redirect: '/drawing/index',
			  icon: 'icon-quanxian',
			  noDropdown: false,
			  name: '图纸管理',
			  children: [
			    {
			      path: 'publish/:id',
			      component: _import('drawing/publish'),
			      name: '添加询价单',
						hidden: true
			    },
					{
					  path: 'index',
					  component: _import('drawing/index'),
					  name: '询价单列表'
					},
					/* {
					  path: 'offer',
					  component: _import('drawing/offer'),
					  name: '报价单列表'
					}, */
			  ]
			},{
			  path: '/order',
			  component: layout,
			  redirect: '/order/index',
			  icon: 'icon-quanxian',
			  noDropdown: false,
			  name: '订单管理',
			  children: [
					{
					  path: 'index',
					  component: _import('order/index'),
					  name: '订单列表'
					},
					{
						path:'detail',
						component:_import('order/detail'),
						name:'订单详情',
						hidden:true
					}
			  ]
			},
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: asyncRouterMap
})
