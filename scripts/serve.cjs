const http=require('http');const fs=require('fs');const path=require('path');
const root=path.resolve(__dirname,'..');const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ttf':'font/ttf','.mp4':'video/mp4'};
http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end('Bad request')}
 if(pathname==='/')pathname='/index.html';if(!path.extname(pathname))pathname+='.html';
 // Only the public site is exposed; source data and tooling stay private.
 if(!/^\/(?:[a-z-]+\.html|styles\.css|app\.js|assets\/[a-zA-Z0-9_./-]+)$/.test(pathname)){res.writeHead(404);return res.end('Not found')}
 const file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404,{'Content-Type':'text/html'});return res.end('<h1>Page not found</h1><a href="/">Return to Longevity Courtyard</a>')}
 const size=fs.statSync(file).size;const headers={'Content-Type':mime[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes','X-Content-Type-Options':'nosniff'};
 if(req.headers.range){const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);if(!match){res.writeHead(416);return res.end()};const start=Number(match[1]),end=match[2]?Math.min(Number(match[2]),size-1):size-1;if(start>=size||end<start){res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end()}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});if(req.method==='HEAD')return res.end();fs.createReadStream(file,{start,end}).pipe(res);
 }else{res.writeHead(200,{...headers,'Content-Length':size});if(req.method==='HEAD')return res.end();fs.createReadStream(file).pipe(res)}
}).listen(port,'127.0.0.1',()=>console.log(`Longevity Courtyard is ready at http://localhost:${port}`));
