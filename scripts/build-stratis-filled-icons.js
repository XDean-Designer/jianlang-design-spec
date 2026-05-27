/**
 * Copy Stratis UI filled SVGs (rounded corners, matches outline family).
 */
const fs = require('fs');
const path = require('path');

const SRC_ROOT = process.env.STRATIS_SRC || path.join(require('os').tmpdir(), 'stratis-ui-icons/svg-icons');
const OUT_DIR = path.join(__dirname, '..', 'icons', 'stratis-filled');
const MAP_OUT = path.join(__dirname, '..', 'icons', 'stratis-filled-map.json');

const STRATIS_FILLED_ICON_MAP = {
  'home-filled': 'general-filled/home-01-filled.svg',
  'app-filled': 'layout-filled/grid-01-filled.svg',
  'user-filled': 'profiles-and-users-filled/Avatar filled.svg',
  'shop-filled': 'finance-filled/cart-filled.svg',
  'cart-filled': 'finance-filled/cart-filled.svg',
  'wallet-filled': 'finance-filled/wallet-01-filled.svg',
  'creditcard-filled': 'finance-filled/card-01-filled.svg',
  'calendar-filled': 'time-filled/calendar-01-filled.svg',
  'chart-filled': 'charts-filled/bar-chart-01-filled.svg',
  'chart-bar-filled': 'charts-filled/bar-chart-square-01-filled.svg',
  'chart-pie-filled': 'finance-filled/discount-circle.svg',
  'notification-filled': 'alerts-filled/bell-01-filled.svg',
  'mail-filled': 'communication-filled/mail-01-filled.svg',
  'chat-filled': 'communication-filled/message-notify-circle.svg',
  'call-filled': 'communication-filled/Phone 1 Filled.svg',
  'search-filled': 'general-filled/search-01-filled.svg',
  'filter-filled': 'general-filled/Filter Filled.svg',
  'setting-filled': 'general-filled/settings-filled.svg',
  'add-circle-filled': 'general-filled/plus-01-filled.svg',
  'edit-filled': 'general-filled/edit-02-filled.svg',
  'delete-filled': 'general-filled/trash-01-filled.svg',
  'check-circle-filled': 'general-filled/check-contained-filled.svg',
  'close-circle-filled': 'general-filled/x-circle-contained-filled.svg',
  'error-circle-filled': 'alerts-filled/alert-circle-filled.svg',
  'info-circle-filled': 'general-filled/information-circle-contained-filled.svg',
  'help-circle-filled': 'general-filled/help-circle-contained-filled.svg',
  'error-triangle-filled': 'alerts-filled/alert-triangle-filled.svg',
  'time-filled': 'time-filled/clock-01-filled.svg',
  'hourglass-filled': 'time-filled/clock-01-filled.svg',
  'star-filled': 'shapes-filled/star-02-filled.svg',
  'heart-filled': 'general-filled/favourite-filled.svg',
  'thumb-up-filled': 'shapes-filled/star-02-filled.svg',
  'thumb-down-filled': 'general-filled/x-01-filled.svg',
  'file-filled': 'files-filled/file-01.svg',
  'folder-filled': 'files-filled/folder-filled.svg',
  'image-filled': 'images-filled/image-01-filled.svg',
  'camera-filled': 'images-filled/camera-01-filled.svg',
  'location-filled': 'travel-and-location-filled/marker-02-filled.svg',
  'map-filled': 'travel-and-location-filled/map-04.svg',
  'lock-on-filled': 'security-filled/lock-01-filled.svg',
  'secured-filled': 'security-filled/shield-check-filled.svg',
  'gift-filled': 'finance-filled/gift-01.svg',
  'discount-filled': 'finance-filled/discount-circle.svg',
  'ticket-filled': 'finance-filled/receipt-filled.svg',
  'coupon-filled': 'finance-filled/discount-star-01-filled.svg',
  'member-filled': 'profiles-and-users-filled/user-profile-03-filled.svg',
  'usergroup-filled': 'profiles-and-users-filled/users-profiles-plus.svg',
  'money-filled': 'finance-filled/currency-dollar-filled.svg',
  'bill-filled': 'finance-filled/receipt-filled.svg',
  'play-circle-filled': 'media-filled/play-01-filled.svg',
  'pause-circle-filled': 'media-filled/pause-01-filled.svg',
  'sound-filled': 'media-filled/volume-01-filled.svg',
  'cloud-filled': 'weather-filled/cloud-sun.svg',
  'cloud-upload': 'general-filled/upload-01-filled.svg',
  attach: 'files-filled/file-attach-01.svg',
  'layers-filled': 'layout-filled/Layers Filled.svg',
  'view-module-filled': 'layout-filled/grid-04-filled.svg',
  list: 'general-filled/menu-01-filled.svg',
  'pin-filled': 'travel-and-location-filled/marker-02-filled.svg',
  'bookmark-filled': 'general-filled/favourite-filled.svg',
  'flag-filled': 'general-filled/target-01-filled.svg',
  'certificate-filled': 'files-filled/File Filled.svg',
  'task-filled': 'general-filled/check-square-contained-filled.svg',
  'assignment-filled': 'profiles-and-users-filled/user-profile-add.svg',
  'logo-wechat': 'communication-filled/message-notify-circle.svg',
  'mobile-filled': 'media-filled/iphone-01-filled.svg',
  'desktop-filled': 'media-filled/laptop-01-filled.svg',
  'root-list-filled': 'general-filled/menu-01-filled.svg',
  'control-platform-filled': 'general-filled/component-filled.svg',
};

function isSolidSvg(content) {
  const hasStroke = /stroke-width/i.test(content);
  const hasSolidFill = /fill="#000"|fill="#000000"|fill="black"|fill="currentColor"/i.test(content);
  return hasSolidFill && !hasStroke;
}

function normalizeFilledSvg(content) {
  return content
    .replace(/fill="#000"/gi, 'fill="currentColor"')
    .replace(/fill="#000000"/gi, 'fill="currentColor"')
    .replace(/fill="black"/gi, 'fill="currentColor"');
}

if (!fs.existsSync(SRC_ROOT)) {
  console.error('Stratis source not found:', SRC_ROOT);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const copied = {};
const missing = [];
const notSolid = [];

for (const [name, rel] of Object.entries(STRATIS_FILLED_ICON_MAP)) {
  const src = path.join(SRC_ROOT, rel.replace(/\//g, path.sep));
  const destName = name + '.svg';
  const dest = path.join(OUT_DIR, destName);
  if (!fs.existsSync(src)) {
    missing.push({ name, rel });
    continue;
  }
  const raw = fs.readFileSync(src, 'utf8');
  if (!isSolidSvg(raw)) notSolid.push({ name, rel });
  fs.writeFileSync(dest, normalizeFilledSvg(raw), 'utf8');
  copied[name] = destName;
}

fs.writeFileSync(MAP_OUT, JSON.stringify(copied, null, 2), 'utf8');
console.log('Copied', Object.keys(copied).length, 'filled icons to', OUT_DIR);
if (missing.length) {
  console.warn('Missing', missing.length);
  missing.forEach((m) => console.warn(' -', m.name, '->', m.rel));
  process.exitCode = 1;
}
if (notSolid.length) {
  console.warn('Not solid (stroke-only source):', notSolid.length);
  notSolid.forEach((m) => console.warn(' -', m.name, '->', m.rel));
  process.exitCode = 1;
}
