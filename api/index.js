import { handleAPI } from '../api.mjs';

export const config = {
  maxDuration: 30
};

export default async function handler(req, res) {
  // If invoked with standard Web Request (Edge / Web-style runtime)
  if (req instanceof Request || (!res && req.url)) {
    return handleAPI(req, process.env);
  }

  // If invoked with Node.js Serverless Function (req, res)
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url, `${protocol}://${host}`);

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
    console.error('API execution error:', err);
    return res.status(500).json({ error: 'Unable to process API request.' });
  }
}
