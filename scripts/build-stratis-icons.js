/**
 * Copy Stratis UI outline SVGs and emit STRATIS_ICON_MAP for the design spec.
 * Source: https://github.com/RaymondHolm26/stratis-ui-icons (Stratis Figma icons)
 */
const fs = require('fs');
const path = require('path');

const SRC_ROOT = process.env.STRATIS_SRC || path.join(require('os').tmpdir(), 'stratis-ui-icons/svg-icons');
const OUT_DIR = path.join(__dirname, '..', 'icons', 'stratis');
const MAP_OUT = path.join(__dirname, '..', 'icons', 'stratis-map.json');

/** catalog name (kept for spec compatibility) -> relative path under svg-icons */
const STRATIS_ICON_MAP = {
  'chevron-left': 'arrows-outline/chevron-left.svg',
  'chevron-right': 'arrows-outline/chevron-right.svg',
  'chevron-down': 'arrows-outline/chevron-down.svg',
  'chevron-up': 'arrows-outline/chevron-up.svg',
  'arrow-left': 'arrows-outline/arrow-left.svg',
  close: 'general-outline/x-01.svg',
  home: 'general-outline/home-01.svg',
  app: 'layout-outline/grid-01.svg',
  menu: 'general-outline/menu-01.svg',
  jump: 'general-outline/link-external.svg',
  search: 'general-outline/search-01.svg',
  filter: 'general-outline/filter.svg',
  'filter-clear': 'general-outline/x-circle-contained.svg',
  add: 'general-outline/plus-01.svg',
  'add-circle': 'general-outline/check-contained.svg',
  edit: 'general-outline/edit-01.svg',
  delete: 'general-outline/trash-01.svg',
  check: 'general-outline/check.svg',
  'close-circle': 'general-outline/x-circle-contained.svg',
  more: 'general-outline/dot-horizontal.svg',
  ellipsis: 'general-outline/dot-horizontal.svg',
  refresh: 'arrows-outline/arrow-refresh-01.svg',
  rollback: 'arrows-outline/arrow-rotate-left-01.svg',
  share: 'general-outline/share.svg',
  copy: 'general-outline/copy-left.svg',
  scan: 'security-outline/scan.svg',
  qrcode: 'security-outline/scan.svg',
  print: 'files-outline/file-01.svg',
  download: 'general-outline/download-01.svg',
  upload: 'general-outline/upload-01.svg',
  calendar: 'time-outline/calendar-01.svg',
  time: 'time-outline/clock-01.svg',
  location: 'travel-and-location-outline/marker-01.svg',
  browse: 'general-outline/eye-open.svg',
  'browse-off': 'general-outline/eye-closed.svg',
  'lock-on': 'security-outline/lock-01.svg',
  'lock-off': 'security-outline/lock-open-01.svg',
  secured: 'security-outline/shield-check.svg',
  chart: 'charts-outline/bar-chart-01.svg',
  'chart-bar': 'charts-outline/bar-chart-02.svg',
  'chart-line': 'charts-outline/line-chart-up-01.svg',
  'chart-pie': 'charts-outline/pie-chart-01.svg',
  table: 'layout-outline/table.svg',
  'view-list': 'editor-outline/list.svg',
  'view-module': 'layout-outline/grid-02.svg',
  'order-adjustment-column': 'general-outline/sort-vertical-01.svg',
  task: 'general-outline/check-square-contained.svg',
  assignment: 'profiles-and-users-outline/user-profile-check.svg',
  'check-circle': 'general-outline/check-contained.svg',
  'close-circle-filled': 'general-outline/x-circle-contained.svg',
  'time-filled': 'time-outline/hourglass-01.svg',
  certificate: 'education-outline/package-check.svg',
  money: 'finance-outline/currency-dollar.svg',
  wallet: 'finance-outline/wallet-01.svg',
  shop: 'finance-outline/cart.svg',
  cart: 'finance-outline/cart.svg',
  file: 'files-outline/file-01.svg',
  'file-paste': 'files-outline/file-02.svg',
  folder: 'files-outline/folder.svg',
  image: 'images-outline/image-01.svg',
  camera: 'images-outline/camera-01.svg',
  video: 'media-outline/video-on.svg',
  link: 'general-outline/link.svg',
  mail: 'communication-outline/mail-01.svg',
  notification: 'alerts-outline/bell-01.svg',
  chat: 'communication-outline/message-circle.svg',
  call: 'communication-outline/phone.svg',
  user: 'profiles-and-users-outline/user-profile-01.svg',
  'user-add': 'profiles-and-users-outline/user-profile-add.svg',
  usergroup: 'profiles-and-users-outline/users-profiles-01.svg',
  member: 'profiles-and-users-outline/user-profile-02.svg',
  'personal-information': 'profiles-and-users-outline/user-profile-circle.svg',
  'info-circle': 'general-outline/information-circle-contained.svg',
  'help-circle': 'general-outline/help-circle-contained.svg',
  'error-circle': 'alerts-outline/alert-circle.svg',
  'error-triangle': 'alerts-outline/alert-triangle.svg',
  loading: 'general-outline/loader-01.svg',
  setting: 'general-outline/settings.svg',
  tools: 'general-outline/gear.svg',
  poweroff: 'media-outline/power.svg',
  login: 'general-outline/logout-01.svg',
  logout: 'general-outline/logout-01.svg',
  wifi: 'media-outline/wifi-on.svg',
  history: 'time-outline/clock-backward.svg',
  bookmark: 'general-outline/favourite.svg',
  flag: 'travel-and-location-outline/target-01.svg',
  star: 'shapes-outline/star-01.svg',
  heart: 'general-outline/favourite.svg',
  map: 'travel-and-location-outline/map-01.svg',
  layers: 'layout-outline/layers-01.svg',
  'root-list': 'editor-outline/list.svg',
  'control-platform': 'general-outline/component.svg',
  desktop: 'media-outline/laptop-01.svg',
  mobile: 'media-outline/iphone-02.svg',
  cloud: 'weather-outline/cloud-01.svg',
  'cloud-upload': 'general-outline/upload-02.svg',
  attach: 'general-outline/paperclip.svg',
  sound: 'media-outline/volume-01.svg',
  discount: 'finance-outline/discount-circle.svg',
  gift: 'finance-outline/gift-01.svg',
  'precise-monitor': 'general-outline/activity.svg',
  fork: 'education-outline/git-branch-01.svg',
  pin: 'travel-and-location-outline/marker-02.svg',
  backtop: 'arrows-outline/arrow-up.svg',
  'zoom-in': 'editor-outline/zoom-in.svg',
  'zoom-out': 'editor-outline/zoom-out.svg',
  fullscreen: 'general-outline/expand.svg',
  'play-circle': 'media-outline/play-01.svg',
  'pause-circle': 'media-outline/pause-01.svg',
  creditcard: 'finance-outline/card-01.svg',
  coupon: 'finance-outline/discount-circle.svg',
  'file-add': 'files-outline/file-plus-01.svg',
  'undertake-delivery': 'travel-and-location-outline/truck.svg',
  store: 'travel-and-location-outline/box.svg',
  barcode: 'general-outline/hash-01.svg',
  ticket: 'travel-and-location-outline/ticket-01.svg',
  'thumb-up': 'shapes-outline/star-01.svg',
  'thumb-down': 'general-outline/x-01.svg',
  'logo-wechat': 'communication-outline/message-chat-01.svg',
  'logo-wechatpay': 'finance-outline/wallet-02.svg',
  bill: 'finance-outline/receipt.svg',
  'chart-bubble': 'finance-outline/coins.svg',
  swap: 'arrows-outline/arrow-switch-horizontal.svg',
  enter: 'arrows-outline/arrow-right.svg',
  'user-circle': 'profiles-and-users-outline/user-profile-circle.svg',
  service: 'media-outline/headphones.svg',
  'call-1': 'communication-outline/phone-call-02.svg',
  remove: 'general-outline/minus-circle-contained.svg',
  'add-rectangle': 'general-outline/add-square-01.svg',
  'minus-circle': 'general-outline/minus-circle-contained.svg',
  'check-rectangle': 'general-outline/check-square-contained.svg',
  'close-rectangle': 'general-outline/x-square-contained.svg',
  hourglass: 'time-outline/hourglass-01.svg',
  queue: 'editor-outline/list-numbers.svg'
};

if (!fs.existsSync(SRC_ROOT)) {
  console.error('Stratis source not found:', SRC_ROOT);
  console.error('Clone: git clone https://github.com/RaymondHolm26/stratis-ui-icons.git');
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const copied = {};
const missing = [];

for (const [name, rel] of Object.entries(STRATIS_ICON_MAP)) {
  const src = path.join(SRC_ROOT, rel.replace(/\//g, path.sep));
  const destName = name + '.svg';
  const dest = path.join(OUT_DIR, destName);
  if (!fs.existsSync(src)) {
    missing.push({ name, rel });
    continue;
  }
  fs.copyFileSync(src, dest);
  copied[name] = destName;
}

fs.writeFileSync(MAP_OUT, JSON.stringify(copied, null, 2), 'utf8');

require('./normalize-stratis-svgs.js');

console.log('Copied', Object.keys(copied).length, 'icons to', OUT_DIR);
if (missing.length) {
  console.warn('Missing', missing.length, 'icons:');
  missing.forEach(m => console.warn(' -', m.name, '->', m.rel));
  process.exitCode = 1;
}
