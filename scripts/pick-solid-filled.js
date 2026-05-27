const fs = require('fs');
const path = require('path');

const base = process.env.STRATIS_SRC || path.join(require('os').tmpdir(), 'stratis-ui-icons/svg-icons');

function isSolid(s) {
  return /fill="#000"|fill="#000000"|fill="black"/i.test(s) && !/stroke-width/i.test(s);
}

function isStroke(s) {
  return /stroke-width/i.test(s);
}

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.svg')) acc.push(p);
  }
}

const all = [];
walk(base, all);

function pick(keywords, preferFilledDir = true) {
  const scored = all
    .map((p) => {
      const rel = p.replace(base + path.sep, '').replace(/\\/g, '/');
      const name = path.basename(p).toLowerCase();
      const s = fs.readFileSync(p, 'utf8');
      if (!isSolid(s)) return null;
      let score = 0;
      for (const k of keywords) if (name.includes(k) || rel.includes(k)) score += 10;
      if (preferFilledDir && rel.includes('filled')) score += 5;
      if (name.includes('filled')) score += 3;
      return { rel, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
  return scored[0]?.rel || null;
}

const needs = {
  'user-filled': ['user', 'profile', 'avatar'],
  'chat-filled': ['message', 'chat'],
  'chart-pie-filled': ['pie'],
  'cloud-filled': ['cloud'],
  'hourglass-filled': ['hourglass'],
  'layers-filled': ['layer'],
  list: ['list'],
  'location-filled': ['marker', 'location'],
  'map-filled': ['map'],
  'ticket-filled': ['ticket'],
  'member-filled': ['user', 'profile'],
  'usergroup-filled': ['users', 'profiles'],
  'view-module-filled': ['grid'],
  'logo-wechat': ['message', 'chat'],
  'assignment-filled': ['user', 'check'],
  'certificate-filled': ['book', 'certificate', 'graduation'],
  'root-list-filled': ['list']
};

for (const [name, keys] of Object.entries(needs)) {
  console.log(name, '->', pick(keys));
}
