module.exports = async function handler(req, res) {
  const { handleAPI } = await import('../api.mjs');

  // If invoked with standard Web Request
  if (typeof Request !== 'undefined' && (req instanceof Request || (!res && req.url))) {
    return handleAPI(req, process.env);
  }

  // If invoked with Node.js Serverless Function (req, res)
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const matched = req.headers['x-matched-path'] || req.url || '/api/status';
    const cleanPath = matched.startsWith('http') ? new URL(matched).pathname : matched.split('?')[0];
    const fullPath = cleanPath.startsWith('/api') ? cleanPath : ('/api' + (cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath));
    const search = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    const url = new URL(fullPath + search, `${protocol}://${host}`);

    let body = undefined;
    if (!['GET', 'HEAD'].includes(req.method)) {
      if (typeof req.body === 'object' && req.body !== null) {
        body = JSON.stringify(req.body);
      } else if (typeof req.body === 'string') {
        body = req.body;
      } else {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        body = Buffer.concat(chunks).toString('utf-8');
      }
    }

    const webRequest = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: body ? body : undefined
    });

    const response = await handleAPI(webRequest, process.env);
    res.status(response.status);
    response.headers.forEach((val, key) => {
      res.setHeader(key, val);
    });
    const text = await response.text();
    return res.send(text);
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
