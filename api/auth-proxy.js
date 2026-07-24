import proxyRequest from './_utils';

// 认证服务代理
export default async (req, res) => {
  const path = req.url.replace('/auth-api/', '/gateway-api/auth-service/');
  const target = `http://1.14.106.222:10088${path}`;
  await proxyRequest(req, res, target);
};
