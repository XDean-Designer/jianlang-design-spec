/**
 * Stratis outline SVGs use fill="currentColor" on root — closed paths render solid.
 * Normalize to stroke-only: fill="none", stroke="currentColor".
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'icons', 'stratis');

function normalizeSvg(content) {
  return content
    .replace(/<svg([^>]*)>/i, (_, attrs) => {
      let a = attrs.replace(/\s*fill="[^"]*"/gi, '');
      return `<svg${a} fill="none">`;
    })
    .replace(/<(\w+)([^>]*?)\s*\/>/gi, (match, tag, attrs) => {
      if (!/^(path|circle|rect|ellipse|line|polyline|polygon)$/i.test(tag)) return match;
      let a = attrs.replace(/\s*fill="[^"]*"/gi, '');
      if (!/stroke=/i.test(a)) return match;
      if (!/fill=/i.test(a)) a += ' fill="none"';
      if (!/stroke-width=/i.test(a) && /^path$/i.test(tag)) a += ' stroke-width="2"';
      a = a.replace(/stroke="[^"]*"/gi, 'stroke="currentColor"');
      return `<${tag}${a} />`;
    })
    .replace(/<(\w+)([^>]*)>/gi, (match, tag, attrs) => {
      if (!/^(path|circle|rect|ellipse|line|polyline|polygon)$/i.test(tag)) return match;
      if (match.endsWith('/>')) return match;
      let a = attrs.replace(/\s*fill="[^"]*"/gi, '');
      if (!/stroke=/i.test(a)) return match;
      if (!/fill=/i.test(a)) a += ' fill="none"';
      a = a.replace(/stroke="[^"]*"/gi, 'stroke="currentColor"');
      return `<${tag}${a}>`;
    });
}

let count = 0;
for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith('.svg')) continue;
  const p = path.join(DIR, file);
  fs.writeFileSync(p, normalizeSvg(fs.readFileSync(p, 'utf8')), 'utf8');
  count++;
}
console.log('Normalized', count, 'SVG files');
