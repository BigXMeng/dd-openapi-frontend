export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './user/login' }],
  },
  { path: '/welcome', name: '概述', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: 'ADMIN页', component: './Admin' },
      { path: '/admin/api-admin-list', name: '开放API管理', component: './interface/AdminList' },
    ],
  },
  {
    name: '开放API列表',
    icon: 'table',
    path: '/interface/UserList',
    component: './interface/UserList',
  },
  {
    name: '接口在线调试',
    icon: 'table',
    path: '/interface/debug/:id',
    component: './interface/Debug',
    hideInMenu: true,
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
