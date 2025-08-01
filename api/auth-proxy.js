import proxyRequest from './_utils';

// 认证服务代理
export default async (req, res) => {
  const path = req.url.replace('/auth-api/', '/gateway-api/auth-service/');
  const target = `http://140.143.165.120:10088${path}`;
  await proxyRequest(req, res, target);
};
