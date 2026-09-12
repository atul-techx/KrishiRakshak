import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve('dist');
mkdirSync(dist, { recursive: true });

const files = [
  "rakshak-logo.png",
  "theme.css",
  "index.html",
  "product-fixes.js",
  "onnx-worker.js",
  "sentinel-core.js",
  "config.js",
  "sentinel.css",
  "rakshak-chat.js",
  "market-price.js",
  "crop-app.html",
  "workflow.js",
  "api-client.js",
  "style.css",
  "sentinel.js",
  "i18n.js",
  "reports.js",
  "app.js",
  "sw.js",
  "dual-check.js",
  "scan-bridge.js",
  "repairs.js"
];

for (const file of files) {
  if (existsSync(resolve(file))) {
    cpSync(resolve(file), resolve(dist, file));
  }
}

if (existsSync(resolve('public'))) {
  cpSync(resolve('public'), resolve(dist, 'public'), { recursive: true });
}

console.log('Build completed: all assets packaged into dist/');
