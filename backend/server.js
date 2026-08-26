/**
 * AuraSketch AI - High Performance Backend & Local Server
 * Mirrors Vercel Serverless Functions with zero-cost security architecture.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Serverless Handler imports
const saveSessionHandler = require('../api/quiz/save-session');
const checkoutSyncpayHandler = require('../api/checkout/syncpay');
const webhookSyncpayHandler = require('../api/webhook/syncpay');
const orderStatusHandler = require('../api/order/status');
const simulatePaymentHandler = require('../api/admin/simulate-payment');

const PORT = process.env.PORT || 4173;
const ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

// Helper to parse JSON body
function parseJsonBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        req.connection.destroy();
        resolve({});
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
  });
}

// Serverless adapter for Node http.createServer
function adaptServerless(handler) {
  return async (req, res, parsedUrl, body) => {
    req.query = Object.fromEntries(parsedUrl.searchParams.entries());
    req.body = body;

    // Polyfill res.status and res.json
    res.status = function(code) {
      res.statusCode = code;
      return res;
    };
    res.json = function(data) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(data));
      return res;
    };

    try {
      await handler(req, res);
    } catch (err) {
      console.error('[Server] Uncaught handler error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message || 'Erro interno no servidor' });
      }
    }
  };
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-syncpay-signature');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost:4173'}`);
  const pathname = url.pathname;

  // 1. API: Save Quiz Session
  if (pathname === '/api/quiz/save-session') {
    const body = await parseJsonBody(req);
    return adaptServerless(saveSessionHandler)(req, res, url, body);
  }

  // 2. API: Checkout SyncPay (Pix)
  if (pathname === '/api/checkout/syncpay' || pathname === '/api/checkout/create') {
    const body = await parseJsonBody(req);
    return adaptServerless(checkoutSyncpayHandler)(req, res, url, body);
  }

  // 3. API: SyncPay Webhook
  if (pathname === '/api/webhook/syncpay' || pathname === '/api/webhook/payment-confirmed') {
    const body = await parseJsonBody(req);
    return adaptServerless(webhookSyncpayHandler)(req, res, url, body);
  }

  // 4. API: Order Status Polling
  if (pathname === '/api/order/status' || pathname.startsWith('/api/order/status/')) {
    const body = await parseJsonBody(req);
    if (pathname.startsWith('/api/order/status/')) {
      const parts = pathname.split('/');
      url.searchParams.set('sessionId', parts[parts.length - 1]);
    }
    return adaptServerless(orderStatusHandler)(req, res, url, body);
  }

  // 5. API: Simulate Payment
  if (pathname === '/api/admin/simulate-payment') {
    const body = await parseJsonBody(req);
    return adaptServerless(simulatePaymentHandler)(req, res, url, body);
  }

  // =========================================================================
  // Static File Serving
  // =========================================================================
  let reqPath = pathname;
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(ROOT_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` AuraSketch AI Server running at: http://localhost:${PORT}`);
  console.log(` SyncPay Gateway & Vercel Serverless Ready`);
  console.log(`====================================================`);
});
