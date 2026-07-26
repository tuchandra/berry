// Render the built page in headless Chrome and screenshot the Beasts section.
import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1200, height: 1000, deviceScaleFactor: 2 });
await p.goto('http://localhost:4477/berry/', { waitUntil: 'networkidle0' });
const el = await p.$('#beasts');
await el.screenshot({ path: '/tmp/beasts.png' });
// also check nothing says "unaligned" and that ordering is by CR
const crs = await p.$$eval('#beasts .statblock__meta', ns => ns.map(n => n.textContent.split('·').pop().trim()));
const names = await p.$$eval('#beasts .statblock__name', ns => ns.map(n => n.textContent));
const tags = await p.$$eval('#beasts .statblock__tag', ns => ns.map(n => n.textContent));
console.log('order:', names.map((n,i)=>`${n} [${crs[i]}]`).join(' | '));
console.log('unaligned present:', (await p.content()).includes('unaligned'));
console.log('tags sample:', tags.slice(0,8).join(', '));
await b.close();
