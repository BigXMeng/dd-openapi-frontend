// config/proxy.ts
export default {
  dev: {
    // 认证服务代理
    '/auth-api/': {
      target: 'http://localhost:10088',
      changeOrigin: true,
      pathRewrite: { '^/auth-api': '/gateway-api/auth-service' },
    },
    // 开放API接口信息接口
    '/openapi-main-api/': {
      target: 'http://localhost:10088', // 18011
      changeOrigin: true,
      pathRewrite: { '^/openapi-main-api': '/gateway-api/dd-openapi-main-web' },
      // pathRewrite: { '^/openapi-main-api': '/dd-openapi-main-web' },
    },
    // 开放API调用
    '/apiInvoke-api/': {
      target: 'http://localhost:10088', // 18011
      changeOrigin: true,
      pathRewrite: { '^/apiInvoke-api': '/gateway-api/dd-openapi-main-web' },
      // pathRewrite: { '^/apiInvoke-api': '/dd-openapi-main-web' },
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
