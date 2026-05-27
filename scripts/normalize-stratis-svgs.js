/**
 * Normalize Stratis outline SVGs for linear (stroke) display.
 * - svg root: fill="none"
 * - stroked shapes: fill="none", stroke="currentColor"
 * - fill-only silhouettes (#000): fill="currentColor" (Stratis outline export style)
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'icons', 'stratis');
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
    const fillMatch = a.match(/\bfill\s*=\s*"([^"]*)"/i);
    const fillVal = fillMatch ? fillMatch[1] : null;

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
for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith('.svg')) continue;
  const p = path.join(DIR, file);
  fs.writeFileSync(p, normalizeSvg(fs.readFileSync(p, 'utf8')), 'utf8');
  count++;
}
console.log('Normalized', count, 'outline SVG files');
