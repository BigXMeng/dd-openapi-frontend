// 通用代理函数
export default async function proxyRequest(req, res, targetUrl) {
  const { method, headers, body } = req;
  const url = new URL(targetUrl);

  // 添加查询参数
  const queryParams = new URLSearchParams(req.query).toString();
  if (queryParams) url.search = queryParams;

  try {
    const proxyRes = await fetch(url.toString(), {
      method,
      headers: {
        ...headers,
        host: url.host, // 关键：模拟 changeOrigin
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    // 复制响应头
    proxyRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // 返回状态码和内容
    res.status(proxyRes.status);
    const data = await proxyRes.text();
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed' });
  }
}
