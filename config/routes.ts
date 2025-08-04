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
      { path: '/admin/sub-page', name: '接口调用top3统计', component: './interface/AdminStatistic' },
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
    path: '/monitor',
    name: '系统监控',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/monitor', redirect: '/monitor/link-tracing' },
      { path: '/monitor/link-tracing', name: '分布式链路调用追踪', component: './monitor/LinkTracing' },
      { path: '/monitor/metrics/servers', name: '服务器指标监控', component: './monitor/metrics/Servers' },
      { path: '/monitor/metrics/apps', name: '应用指标监控', component: './monitor/metrics/Apps' },
    ],
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
