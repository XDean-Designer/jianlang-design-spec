/**
 * Re-apply external icon overrides after build-stratis-icons.js.
 * Sources: Iconex (more/ellipsis dots, call), Lucide ISC (deprecated overrides).
 */
const fs = require('fs');
const path = require('path');

const OVERRIDE_DIR = path.join(__dirname, '..', 'icons', 'icon-overrides');
const OUT_DIR = path.join(__dirname, '..', 'icons', 'stratis');
const DEPLOY_DIR = path.join(__dirname, '..', 'Cursor设计规范', 'icons', 'stratis');

const OVERRIDES = ['more.svg', 'ellipsis.svg', 'call.svg', 'call-1.svg'];

if (!fs.existsSync(OVERRIDE_DIR)) {
  console.warn('No icon-overrides directory:', OVERRIDE_DIR);
  process.exit(0);
}

for (const file of OVERRIDES) {
  const src = path.join(OVERRIDE_DIR, file);
  if (!fs.existsSync(src)) {
    console.warn('Missing override:', file);
    continue;
  }
  fs.copyFileSync(src, path.join(OUT_DIR, file));
  if (fs.existsSync(DEPLOY_DIR)) {
    fs.copyFileSync(src, path.join(DEPLOY_DIR, file));
  }
}

console.log('Applied', OVERRIDES.length, 'icon overrides to icons/stratis/');
