import proxyRequest from './_utils';

// 开放 API 代理
export default async (req, res) => {
  const path = req.url.replace('/openapi-main-api/', '/gateway-api/dd-openapi-main-web/');
  const target = `http://140.143.165.120:10088${path}`;
  await proxyRequest(req, res, target);
};
