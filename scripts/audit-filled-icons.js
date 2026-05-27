const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'icons', 'stratis-filled');
const strokeOnly = [];
const solid = [];

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.svg'))) {
  const s = fs.readFileSync(path.join(dir, f), 'utf8');
  const hasSolidFill = /fill="currentColor"/i.test(s) && !/stroke-width/i.test(s);
  const hasStroke = /stroke-width/i.test(s) || /stroke="currentColor"/i.test(s);
  const hasBlackStroke = /stroke="black"/i.test(s) || /stroke="#000"/i.test(s);
  if (hasStroke && (!hasSolidFill || hasBlackStroke)) strokeOnly.push(f);
  else solid.push(f);
}

console.log('solid:', solid.length, 'stroke-only:', strokeOnly.length);
strokeOnly.forEach((f) => console.log('  ', f));
