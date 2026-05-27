const fs = require('fs');
const path = require('path');

const base = process.env.STRATIS_SRC || path.join(require('os').tmpdir(), 'stratis-ui-icons/svg-icons');
const files = [];

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.svg') && d.includes('filled')) files.push(p);
  }
}

walk(base);

const solid = files.filter((p) => {
  const s = fs.readFileSync(p, 'utf8');
  return /fill="#000"|fill="#000000"|fill="black"/i.test(s) && !/stroke-width/i.test(s);
});

console.log('solid:', solid.length);
const keys = ['user', 'message', 'pie', 'cloud', 'hourglass', 'layer', 'list', 'marker', 'map', 'ticket', 'member', 'profile', 'avatar', 'grid', 'chat', 'book', 'assign', 'location'];
for (const k of keys) {
  const m = solid.filter((p) => path.basename(p).toLowerCase().includes(k));
  if (m.length) {
    console.log('\n' + k + ':');
    m.slice(0, 8).forEach((p) => console.log(' ', p.replace(base + path.sep, '').replace(/\\/g, '/')));
  }
}
