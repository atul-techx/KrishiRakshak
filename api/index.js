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
    
    // Construct standard URL from incoming req.url
    let rawUrl = req.url || '/api/status';
    if (rawUrl === '/api/index.js' || rawUrl === '/api/index' || rawUrl === '/api' || rawUrl.endsWith('/api/index.js')) {
      const alt = req.headers['x-forwarded-uri'] || req.headers['x-matched-path'];
      if (alt && !alt.endsWith('/index.js') && !alt.endsWith('/index')) {
        rawUrl = alt;
      }
    }
    if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
      if (!rawUrl.startsWith('/')) rawUrl = '/' + rawUrl;
      rawUrl = `${protocol}://${host}${rawUrl}`;
    }
    const url = new URL(rawUrl);

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
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};
