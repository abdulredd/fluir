import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const toml   = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');

function sectionFor(pathPattern) {
  const re = new RegExp(`for = "${pathPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*\\n\\s*\\[headers\\.values\\]\\s*\\n\\s*Cache-Control = "([^"]+)"`);
  const match = toml.match(re);
  assert.ok(match, `No Cache-Control header found for ${pathPattern}`);
  return match[1];
}

describe('netlify cache headers', () => {
  it('does not mark unhashed app assets as immutable', () => {
    for (const pattern of ['/js/*', '/pages/*', '/css/*']) {
      const value = sectionFor(pattern);
      assert.doesNotMatch(value, /immutable/, `${pattern} must not use immutable without content hashes`);
    }
  });

  it('requires revalidation for JS, pages, and CSS', () => {
    for (const pattern of ['/js/*', '/pages/*', '/css/*']) {
      const value = sectionFor(pattern);
      assert.match(value, /must-revalidate/, `${pattern} should must-revalidate`);
      assert.match(value, /max-age=0/, `${pattern} should use max-age=0`);
    }
  });

  it('keeps sw.js and index.html uncached at the CDN', () => {
    assert.equal(sectionFor('/sw.js'), 'no-cache');
    assert.equal(sectionFor('/index.html'), 'no-cache');
  });
});
