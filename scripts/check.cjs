const fs=require('fs');const assert=require('assert/strict');const pages=require('../src/pages.json');
const path=require('path');
const publishDir=path.resolve(__dirname,'../dist');
assert(fs.existsSync(publishDir),'Missing dist/: run npm run build before npm test');
process.chdir(publishDir);
const allowed=new Set([...pages.map(page=>page.slug+'.html'),'styles.css','app.js','assets']);
for(const entry of fs.readdirSync('.'))assert(allowed.has(entry),`Unexpected publish entry: ${entry}`);
let refs=0;
for(const page of pages){const html=fs.readFileSync(page.slug+'.html','utf8');assert(html.includes('<main '),`${page.slug}: missing main landmark`);assert(html.includes('name="viewport"'),`${page.slug}: missing responsive viewport`);for(const m of html.matchAll(/(?:href|src)="([^"#]+)"/g)){const url=m[1];if(/^(https?:|tel:|mailto:)/.test(url))continue;assert(fs.existsSync(url),`${page.slug}: missing ${url}`);refs++;}assert(!/href="#"/.test(html),`${page.slug}: placeholder link`);assert(!/<button[^>]*>[^]*?<a[^]*?<\/button>/.test(html.split('<dialog')[1]||''));}
console.log(`PASS: ${pages.length} pages, ${refs} local links/assets, main landmarks, mobile viewports, and no empty link destinations.`);
