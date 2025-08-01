// config/proxy.ts
export default {
  dev: {
    // 认证服务代理
    '/auth-api/': {
      target: 'http://140.143.165.120:10088',
      changeOrigin: true,
      pathRewrite: { '^/auth-api': '/gateway-api/auth-service' },
    },
    // 开放API接口信息接口
    '/openapi-main-api/': {
      target: 'http://140.143.165.120:10088', // 18011
      changeOrigin: true,
      pathRewrite: { '^/openapi-main-api': '/gateway-api/dd-openapi-main-web' },
      // pathRewrite: { '^/openapi-main-api': '/dd-openapi-main-web' },
    },
  }
};
