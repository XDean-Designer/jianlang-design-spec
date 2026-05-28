/**
 * Normalize Iconex light/filled SVGs for spec display (currentColor).
 */
const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, '..', 'icons', 'iconex'),
  path.join(__dirname, '..', 'icons', 'iconex-filled')
];
const SHAPES = /^(path|circle|rect|ellipse|line|polyline|polygon)$/i;

function normalizeSvg(content) {
  let s = content.replace(/<svg([^>]*)>/i, (_, attrs) => {
    let a = attrs.replace(/\s*fill="[^"]*"/gi, '');
    return `<svg${a} fill="none">`;
  });

  s = s.replace(/<(\w+)([^>]*?)(\s*\/?)>/gi, (match, tag, attrs, selfClose) => {
    if (!SHAPES.test(tag)) return match;
    let a = attrs;
    const hasStroke = /\bstroke\s*=\s*"(?!none")/i.test(a);
    a = a.replace(/\s*fill="[^"]*"/gi, '');
    a = a.replace(/\s*stroke="[^"]*"/gi, '');
    if (hasStroke) {
      a += ' fill="none" stroke="currentColor"';
      if (!/stroke-width=/i.test(attrs)) a += ' stroke-width="2"';
      if (!/stroke-linecap=/i.test(attrs) && /^path$/i.test(tag)) {
        a += ' stroke-linecap="round" stroke-linejoin="round"';
      }
    } else {
      a += ' fill="currentColor"';
    }
    return `<${tag}${a}${selfClose || ''}>`;
  });

  return s;
}

let count = 0;
for (const DIR of dirs) {
  if (!fs.existsSync(DIR)) continue;
  for (const file of fs.readdirSync(DIR)) {
    if (!file.endsWith('.svg')) continue;
    const p = path.join(DIR, file);
    fs.writeFileSync(p, normalizeSvg(fs.readFileSync(p, 'utf8')), 'utf8');
    count++;
  }
}
console.log('Normalized', count, 'Iconex SVG files');
