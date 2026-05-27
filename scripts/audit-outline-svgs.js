const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'icons', 'stratis');
const issues = [];

for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.svg'))) {
  const s = fs.readFileSync(path.join(DIR, file), 'utf8');
  if (/<svg[^>]*\sfill="currentColor"/i.test(s)) issues.push(`${file}: svg fill=currentColor`);
  if (/<svg[^>]*\sfill="#000"/i.test(s)) issues.push(`${file}: svg fill=#000`);

  for (const m of s.matchAll(/<path\b([^>]*?)(\/?)>/gi)) {
    const attrs = m[1];
    if (/\bstroke=/.test(attrs) && !/\bfill=/.test(attrs)) {
      issues.push(`${file}: stroked path missing fill attr`);
    }
    if (/\bfill="#000"|\bfill="#000000"|\bfill="black"/i.test(attrs) && !/\bstroke=/.test(attrs)) {
      issues.push(`${file}: fill-only black path`);
    }
  }
}

console.log('Total issues:', issues.length);
issues.forEach((i) => console.log(i));
