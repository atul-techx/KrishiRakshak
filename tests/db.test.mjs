import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleAPI } from '../api.mjs';
import { isDbConfigured } from '../db.mjs';

test('database status returns not configured when DATABASE_URL is empty', async () => {
  const req = new Request('https://example.test/api/db/status', { method: 'GET' });
  const res = await handleAPI(req, {});
  const data = await res.json();
  assert.equal(res.status, 200);
  assert.equal(data.configured, false);
  assert.equal(data.connected, false);
});

test('database routes gracefully inform fallback when unconfigured', async () => {
  const req = new Request('https://example.test/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 'farmer123', password: 'pass' })
  });
  const res = await handleAPI(req, {});
  const data = await res.json();
  assert.equal(res.status, 503);
  assert.equal(data.fallback, true);
});
