// config/proxy.ts
export default {
  dev: {
    // 认证服务代理
    '/auth-api/': {
      target: 'http://localhost:10066',
      changeOrigin: true,
      pathRewrite: { '^/auth-api': '/auth-service' },
    },

    // 订单服务代理
    '/api-api/': {
      target: 'http://localhost:8002',
      changeOrigin: true,
      pathRewrite: { '^/api-api': '/order-service' },
    },
  },

  // 测试环境配置
  test: {
    '/auth-api/': {
      target: 'https://test-auth.example.com',
      changeOrigin: true,
      pathRewrite: { '^/auth-api': '' },
    },
    // 其他服务类似配置...
  },

  // 生产环境配置
  pre: {
    // 通常生产环境不使用代理，直接配置网关地址
  }
};
