import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function extractPrecacheAssets(swSource) {
  const match = swSource.match(/const PRECACHE_ASSETS = \[([\s\S]*?)\];/);
  assert.ok(match, 'PRECACHE_ASSETS array not found in sw.js');

  return [...match[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
}

function assetPath(urlPath) {
  if (urlPath === '/') return path.join(ROOT, 'index.html');
  return path.join(ROOT, urlPath.replace(/^\//, ''));
}

describe('service worker precache list', () => {
  const swSource = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const assets   = extractPrecacheAssets(swSource);

  it('lists at least the app shell and core modules', () => {
    assert.ok(assets.includes('/index.html'));
    assert.ok(assets.includes('/js/app.js'));
    assert.ok(assets.includes('/css/pages.css'));
  });

  it('every precache URL resolves to a file in the repo', () => {
    const missing = assets.filter(url => !fs.existsSync(assetPath(url)));
    assert.equal(
      missing.length,
      0,
      `Missing precache files:\n${missing.map(u => `  ${u}`).join('\n')}`,
    );
  });

  it('does not duplicate entries', () => {
    const dupes = assets.filter((url, i) => assets.indexOf(url) !== i);
    assert.deepEqual(dupes, []);
  });
});
