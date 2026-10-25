#!/usr/bin/env node
// Rewrites the content between <!-- PARTIAL:name --> markers in every *.html file at the
// repo root to match partials/<name>.html. Plain find/replace, no templating — so a partial
// must be byte-identical on every page (per-page nav "active" state is handled client-side
// by assets/site.js, not baked into the markup). Run manually after editing a partial:
//   node scripts/sync-partials.mjs
// The committed output is plain static HTML; this script is not part of any build/deploy step.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PARTIALS = ['header', 'footer'];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const htmlFiles = readdirSync(root).filter((f) => f.endsWith('.html'));
let changedFiles = 0;

for (const name of PARTIALS) {
  const partialPath = join(root, 'partials', `${name}.html`);
  const content = readFileSync(partialPath, 'utf8').trim();
  const open = `<!-- PARTIAL:${name} -->`;
  const close = `<!-- /PARTIAL:${name} -->`;
  const re = new RegExp(`${esc(open)}[\\s\\S]*?${esc(close)}`);
  const block = `${open}\n${content}\n${close}`;

  for (const file of htmlFiles) {
    const filePath = join(root, file);
    const html = readFileSync(filePath, 'utf8');
    if (!re.test(html)) {
      console.warn(`skip ${file}: no ${open} ... ${close} markers found`);
      continue;
    }
    const next = html.replace(re, block);
    if (next !== html) {
      writeFileSync(filePath, next);
      changedFiles++;
      console.log(`updated ${name} in ${file}`);
    }
  }
}

console.log(`done — ${changedFiles} file update(s) written.`);
