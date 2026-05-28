/**
 * Iconex icons from Figma Community (light + filled).
 * Source repo: https://github.com/budggy-Inc/iconex_flutter
 * Figma: https://www.figma.com/design/uXSogFY3f1EEJsK1iDPf9h/Iconex---Freebie-icons--Community-
 */
const fs = require('fs');
const path = require('path');

const SRC_LIGHT = process.env.ICONEX_SRC_LIGHT
  || path.join(require('os').tmpdir(), 'iconex-flutter', 'assets', 'svg', 'light');
const SRC_FILLED = process.env.ICONEX_SRC_FILLED
  || path.join(require('os').tmpdir(), 'iconex-flutter', 'assets', 'svg', 'filled');
const OUT_LIGHT = path.join(__dirname, '..', 'icons', 'iconex');
const OUT_FILLED = path.join(__dirname, '..', 'icons', 'iconex-filled');
const MAP_LIGHT_JSON = path.join(__dirname, '..', 'icons', 'iconex-map.json');
const MAP_LIGHT_JS = path.join(__dirname, '..', 'icons', 'iconex-map.js');
const MAP_FILLED_JSON = path.join(__dirname, '..', 'icons', 'iconex-filled-map.json');
const MAP_FILLED_JS = path.join(__dirname, '..', 'icons', 'iconex-filled-map.js');

/** catalog name -> Iconex light filename */
const ICONEX_ICON_MAP = {
  'alarm-clock': 'alarm_clock.svg',
  minus: 'minus.svg',
  play: 'play.svg',
  pause: 'pause.svg',
  stop: 'stop.svg',
  save: 'save.svg',
  sale: 'sale.svg',
  rocket: 'rocket.svg',
  expand: 'expand.svg',
  collapse: 'collapse.svg',
  danger: 'danger.svg',
  fire: 'fire.svg',
  lightning: 'lightning.svg',
  graph: 'graph.svg',
  heartbeat: 'heartbeat.svg',
  hide: 'hide.svg',
  microphone: 'microphone.svg',
  scanner: 'scanner.svg',
  'toggle-left': 'toggle_left.svg',
  'toggle-right': 'toggle_right.svg',
  'add-user': 'add_user.svg',
  book: 'book.svg',
  browser: 'browser.svg',
  briefcase: 'case_icon.svg',
  category: 'category.svg',
  'category-grid': 'category_2.svg',
  'category-list': 'category_3.svg',
  'document-add': 'document_add.svg',
  'document-delete': 'document_delete.svg',
  'document-stack': 'document_2.svg',
  'call-missed': 'call_missed.svg',
  'call-silent': 'call_silent.svg',
  calling: 'calling.svg',
  'info-square': 'info_square.svg',
  'time-circle': 'time_circle.svg',
  'time-square': 'time_square.svg',
  timer: 'timer.svg',
  'more-circle': 'more_circle.svg',
  'more-square': 'more_square.svg',
  palette: 'color_palette.svg',
  compass: 'compass.svg',
  scale: 'scale.svg',
  screen: 'screen.svg',
  bag: 'bag_1.svg',
  'shopping-bag': 'bag_3.svg',
  'coupon-badge': 'coupon_1.svg',
  'coupon-tag': 'coupon_2.svg',
  'chart-alt': 'chart_1.svg',
  'chart-trend': 'chart_2.svg',
  'lock-open': 'lock_open.svg',
  'lock-check': 'lock_check.svg',
  'lock-x': 'lock_x.svg',
  'right-circle': 'right_circle.svg',
  'left-circle': 'left_circle.svg',
  'down-circle': 'down_circle.svg',
  'up-circle': 'up_circle.svg',
  'down-square': 'down_square.svg',
  'up-square': 'up_square.svg',
  'right-square': 'right_square.svg',
  'left-square': 'left_square.svg',
  bell: 'bell.svg',
  burger: 'burger.svg',
  coffee: 'coffee.svg',
  headphones: 'headphones.svg',
  paperclip: 'paperclip.svg',
  'cloud-download': 'cloud_download.svg',
  'cloud-upload-alt': 'cloud_upload.svg',
  'download-alt': 'download_2.svg',
  'link-chain': 'link_2.svg',
  'link-external-alt': 'link_3.svg',
  'message-circle-alt': 'message_circle.svg',
  'edit-alt': 'edit_2.svg',
  'chart-pie-alt': 'chart.svg',
  coins: 'coins.svg',
  'credit-card-alt': 'credit_card.svg',
  'box-package': 'box_1.svg',
  'box-open': 'box_2.svg'
};

const ICONEX_FILLED_ICON_MAP = {
  'alarm-clock-filled': 'alarm_clock.svg',
  'play-filled-alt': 'play.svg',
  'pause-filled-alt': 'pause.svg',
  'stop-filled-alt': 'stop.svg',
  'sale-filled': 'sale.svg',
  'rocket-filled': 'rocket.svg',
  'scanner-filled': 'scanner.svg',
  'microphone-filled': 'microphone.svg',
  'graph-filled': 'graph.svg',
  'heartbeat-filled': 'heartbeat.svg',
  'expand-filled': 'expand.svg',
  'collapse-filled': 'collapse.svg',
  'danger-filled': 'danger.svg',
  'fire-filled': 'fire.svg',
  'sale-tag-filled': 'coupon_1.svg',
  'bag-filled': 'bag_1.svg',
  'category-filled': 'category.svg',
  'document-add-filled': 'document_add.svg',
  'document-delete-filled': 'document_delete.svg',
  'calling-filled': 'calling.svg',
  'browser-filled': 'browser.svg',
  'book-filled': 'book.svg',
  'save-filled': 'save.svg',
  'screen-filled': 'screen.svg',
  'scale-filled': 'scale.svg',
  'compass-filled': 'compass.svg',
  'briefcase-filled': 'case_icon.svg',
  'palette-filled': 'color_palette.svg',
  'timer-filled': 'timer.svg',
  'toggle-left-filled': 'toggle_left.svg',
  'more-square-filled': 'more_square.svg',
  'chart-filled-alt': 'chart_1.svg',
  'chart-trend-filled': 'chart.svg',
  'coins-filled': 'coins.svg',
  'coffee-filled': 'coffee.svg',
  'headphones-filled': 'headphones.svg',
  'burger-filled': 'burger.svg',
  'box-filled': 'box_1.svg'
};

function copyMap(map, srcRoot, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const copied = {};
  const missing = [];
  for (const [name, file] of Object.entries(map)) {
    const src = path.join(srcRoot, file);
    const dest = path.join(outDir, name + '.svg');
    if (!fs.existsSync(src)) {
      missing.push({ name, file });
      continue;
    }
    fs.copyFileSync(src, dest);
    copied[name] = name + '.svg';
  }
  return { copied, missing };
}

if (!fs.existsSync(SRC_LIGHT)) {
  console.error('Iconex light source not found:', SRC_LIGHT);
  console.error('Clone: git clone https://github.com/budggy-Inc/iconex_flutter.git %TEMP%\\iconex-flutter');
  process.exit(1);
}

const light = copyMap(ICONEX_ICON_MAP, SRC_LIGHT, OUT_LIGHT);
const filled = fs.existsSync(SRC_FILLED)
  ? copyMap(ICONEX_FILLED_ICON_MAP, SRC_FILLED, OUT_FILLED)
  : { copied: {}, missing: [] };

fs.writeFileSync(MAP_LIGHT_JSON, JSON.stringify(light.copied, null, 2), 'utf8');
fs.writeFileSync(MAP_LIGHT_JS, 'const ICONEX_ICON_MAP = ' + JSON.stringify(light.copied, null, 2) + ';\n', 'utf8');
fs.writeFileSync(MAP_FILLED_JSON, JSON.stringify(filled.copied, null, 2), 'utf8');
fs.writeFileSync(MAP_FILLED_JS, 'const ICONEX_FILLED_ICON_MAP = ' + JSON.stringify(filled.copied, null, 2) + ';\n', 'utf8');

require('./normalize-iconex-svgs.js');

console.log('Iconex light:', Object.keys(light.copied).length, '->', OUT_LIGHT);
console.log('Iconex filled:', Object.keys(filled.copied).length, '->', OUT_FILLED);
const allMissing = [...light.missing, ...filled.missing];
if (allMissing.length) {
  console.warn('Missing', allMissing.length);
  allMissing.forEach(m => console.warn(' -', m.name, m.file));
  process.exitCode = 1;
}
