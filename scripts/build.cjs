const fs=require('fs');
const path=require('path');
const projectRoot=path.resolve(__dirname,'..');
const publishDir=path.join(projectRoot,'dist');
// Recreate only the dedicated output directory so stale files cannot be published.
if(path.dirname(publishDir)!==projectRoot||path.basename(publishDir)!=='dist')throw new Error('Invalid publish directory');
fs.rmSync(publishDir,{recursive:true,force:true});
fs.mkdirSync(publishDir,{recursive:true});
// Use space-free public paths, including with older local preview servers.
const carouselDir=path.join(projectRoot,'assets','carousel');
fs.mkdirSync(carouselDir,{recursive:true});
for(let i=1;i<=5;i++)fs.copyFileSync(path.join(projectRoot,'assets','images',`Carousell ${i}.jpg`),path.join(carouselDir,`photo-${i}.jpg`));
for(const file of ['styles.css','app.js','assets'])fs.cpSync(path.join(projectRoot,file),path.join(publishDir,file),{recursive:true});
const pages=require('../src/pages.json');
const equipment=require('../src/equipment.json');
const equipmentLabels=['Leg Extension / Curl','Shoulder Press / Lat Pulldown','Hip Adduction / Abduction','Abdomen / Back Extension','Pulley / Functional Trainer','Recumbent Bike'];
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const css=s=>Object.entries(s).map(([k,v])=>`${k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())}:${v}`).join(';');
const links={'Home':'index.html','Programmes':'programmes.html','View our Programmes':'programmes.html','Fitness Team':'fitness-team.html','Stories':'stories.html','Equipment':'resources.html','Resources':'resources.html','Visit Us':'visit.html','Visit Us!':'visit.html','Learn More About Us →':'about.html','See more Equipment →':'resources.html','Meet the Fitness Team →':'fitness-team.html','See All Testimonials →':'stories.html','Daniel Phua':'fitness-team.html','Titisa "Ice" Jeamsakul':'holistic-team.html','Find us on Google Maps':'https://www.google.com/maps/search/?api=1&query=707+Jurong+West+Street+71+Singapore+640707','+65 6859 1961':'tel:+6568591961'};
links['See Our Equipment']='resources.html';
links['Facebook']='https://www.facebook.com/longevitycourtyard';
const whatsapp='https://wa.me/6568591961';
const coachSelectors={
 '564:2583':{name:'Titisa Jeamsakul (Ice)',href:'holistic-team.html#coach-profile'},
 '564:2617':{name:'Daniel Phua',href:'fitness-team.html#coach-profile'},
 '564:2588':{name:'Ng Swee Gek Emily',initials:'E'},
 '564:2622':{name:'Ng Swee Gek Emily',initials:'E'},
 '564:2589':{name:'Soh Tiong Eng Fion',initials:'F'},
 '564:2623':{name:'Soh Tiong Eng Fion',initials:'F'},
 '564:2590':{name:'Dawn',initials:'D'},
 '564:2624':{name:'Dawn',initials:'D'}
};
function findNode(n,id){if(n.id===id)return n;for(const c of n.children||[]){const found=findNode(c,id);if(found)return found;}return null;}
function syncSeniorsTeamSection(){
 const seniors=pages.find(p=>p.slug==='index')?.root;
 const anyone=pages.find(p=>p.slug==='for-anyone')?.root;
 const target=findNode(seniors,'670:1497');
 const source=findNode(anyone,'811:1748');
 if(!target||!source)return;
 const {id,x,y}=target;
 const synced=JSON.parse(JSON.stringify(source));
 Object.assign(target,synced,{id,x,y});
}
syncSeniorsTeamSection();
function action(text){text=text?.trim();if(equipmentLabels.includes(text))return{equipment:text};if(text==='For Seniors')return{href:'index.html'};if(text==='For Anyone')return{href:'for-anyone.html'};if(links[text])return{href:links[text]};if(/^(Book a Trial Session|Contact Us|Contact us on|Contact Us on)/.test(text))return{href:whatsapp};if(['Privacy Policy','Terms of Service','Accessibility','Facebook','中文'].includes(text))return{dialog:text};return null;}
function render(n,depth=0,inLink=false){
 if(['679:499','483:1720','475:1390','688:979'].includes(n.id)){
  const photos=Array.from({length:5},(_,i)=>`<img class="carousel-photo${i===0?' is-active':''}" src="assets/carousel/photo-${i+1}.jpg" alt="Longevity Courtyard activities — photo ${i+1}" aria-hidden="${i!==0}" decoding="async">`).join('');
  return `<div class="design-node has-image photo-carousel" data-node="${n.id}" data-photo-carousel role="region" aria-roledescription="carousel" aria-label="Longevity Courtyard photos" style="left:${n.x}px;top:${n.y}px;width:${n.w}px;height:${n.h}px;--original-width:${n.w};--original-height:${n.h}">${photos}<div class="carousel-shade" aria-hidden="true"></div><div class="photo-carousel-controls"><button type="button" data-photo-step="-1" aria-label="Previous photo">&#8249;</button><button type="button" data-photo-step="1" aria-label="Next photo">&#8250;</button></div></div>`;
 }
 const coachCarousel=['670:1501','811:1754'].includes(n.id);
 if(n.name==='Nav Bar')return '';
 if(n.y+n.h<0)return '';
 const isText=n.text!==undefined;
 const label=n.children.length===1&&n.children[0].text?n.children[0].text:n.text;
 let act=!inLink?(n.href?{href:n.href}:action(label)):null;
 const coach=coachSelectors[n.id];
 if(coach)act=coach.href?{href:coach.href}:{dialog:coach.name};
 if(n.image?.alt?.includes('Logo Lockup'))act={href:'index.html'};
 let tag=act?.href?'a':act?.dialog||act?.equipment?'button':isText?(parseFloat(n.style.fontSize)>=32?'h2':'p'):depth===1?(n.name==='Footer'?'footer':'section'):'div';
 const heading=depth===1?n.children.find(c=>c.text&&parseFloat(c.style.fontSize)>=30)?.text:null;
 const classes=['design-node',isText?'text-node':'layout-node',depth===1?'section':'',n.image?'has-image':'',n.clip?'clip':'',n.paths?'vector-node':'',!isText&&!n.image&&!n.paths&&!n.children.length?'empty-node':'',n.name==='Footer'?'site-footer':'',n.name==='Begin Your Journey'?'contact-section':'',n.video?'video-node':'',n.children.length>1&&n.children.filter(c=>c.h>100).length>1&&n.children.filter(c=>c.h>100).every(c=>Math.abs(c.y-n.children.filter(c=>c.h>100)[0].y)<40)?'card-row':''].filter(Boolean).join(' ');
 const style={left:n.x+'px',top:n.y+'px',width:n.w+'px',height:n.h+'px','--original-width':n.w,'--original-height':n.h,'--mobile-order':Math.round(n.y*100+n.x),...n.style};
 // Keep image overlays above the photograph and below the content.
 // Solid fills preceding an image are its backdrop, not an overlay.
 let attrs=`class="${classes}" data-node="${n.id}" style="${escape(css(style))}"`;
 if(coachCarousel)attrs+=` id="coaches-${n.id.replace(':','-')}" data-coach-carousel role="region" aria-label="Our fitness coaches"`;
 if(coach)attrs+=` data-coach-selector aria-label="View ${escape(coach.name)}'s profile" title="${escape(coach.name)}"`;
 if(depth===1){attrs+=` id="${['564:2676','564:2712'].includes(n.id)?'coach-profile':'section-'+n.id.replace(':','-')}"`;if(heading)attrs+=` aria-label="${escape(heading)}"`;}
 if(act?.href)attrs+=` href="${escape(act.href)}"`+(act.href.startsWith('http')?' target="_blank" rel="noopener noreferrer"':'');
 if(act?.dialog)attrs+=` type="button" data-dialog="${escape(act.dialog)}"`;
 if(act?.equipment)attrs+=` type="button" data-equipment="${escape(act.equipment)}"`;
 if(n.id==='783:2110')attrs+=' data-equipment-slot';
 let inner='';
 if(coach?.initials)inner=`<span class="coach-initial" aria-hidden="true">${coach.initials}</span>`;
 if(n.video){inner=`<video controls playsinline preload="none" poster="${n.image.src}" aria-label="${escape(n.image.alt)}"><source src="${n.video}" type="video/mp4">Your browser does not support video playback.</video>`;}
 else if(n.image){inner=`<div class="image-crop" aria-hidden="true"><img src="${n.image.src}" alt="" loading="${depth<3?'eager':'lazy'}" decoding="async" style="${escape(css(n.image.style))}"></div>`;if(n.overlay)inner+=`<div class="image-overlay" style="background:${escape(n.overlay)}"></div>`;if(!n.children.length&&!act)attrs+=` role="img" aria-label="${escape(n.image.alt)}"`;}
 if(n.paths)inner+=`<svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 ${n.w||1} ${n.h||1}" overflow="visible">${n.paths.map(p=>`<path d="${p.d}" fill="${p.fill}" fill-rule="${p.rule||'nonzero'}"/>`).join('')}</svg>`;
 if(isText)inner+=n.lines?n.lines.map(line=>`<span class="text-line">${escape(line)}</span>`).join(''):escape(n.text);
 inner+=n.children.map(c=>render(c,depth+1,inLink||!!act)).join('');
 if(n.id==='823:2477')inner+='<h1 class="mobile-headline">Stay Strong for the <em>Moments</em> that Matter.</h1>';
 if(n.id==='823:2483')inner+='<h1 class="mobile-headline">Strength belongs to <em>You.</em><br>Maintain Strength<br>Choose Yourself</h1>';
 const controls=coachCarousel?`<div class="coach-carousel-controls" data-carousel-controls="coaches-${n.id.replace(':','-')}" style="left:${n.x+n.w-108}px;top:${n.y+n.h+14}px;--mobile-order:${Math.round(n.y*100+n.x)+1}"><button type="button" data-carousel-direction="-1" aria-label="View previous coaches" aria-controls="coaches-${n.id.replace(':','-')}">←</button><button type="button" data-carousel-direction="1" aria-label="View next coaches" aria-controls="coaches-${n.id.replace(':','-')}">→</button></div>`:'';
 const instagram=n.id==='537:566'?`<a class="footer-instagram" href="https://www.instagram.com/glow.tzuchisg/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>`:'';
 return `<${tag} ${attrs}>${inner}</${tag}>${instagram}${controls}`;
}
function header(slug){return `<header class="site-header"><div class="nav-canvas"><div class="brand"><a class="brand-home" href="index.html" aria-label="Longevity Courtyard home"><img src="assets/images/d3785a90c69bb02a1026498fd15e24ba8c36ef10.png" alt="Longevity Courtyard, in collaboration with HUR and Tzu Chi"></a><a class="tzu-chi-link" href="https://www.tzuchi.org.sg/en/" target="_blank" rel="noopener noreferrer" aria-label="Tzu Chi Singapore website" title="Tzu Chi Singapore"></a></div><button class="menu-toggle" aria-controls="main-navigation" aria-expanded="false" aria-label="Open navigation"><span></span><span></span><span></span></button><nav id="main-navigation" aria-label="Main navigation">${[['Programmes','programmes'],['Fitness Team','fitness-team'],['Stories','stories'],['Equipment','resources']].map(([t,s])=>`<a href="${s}.html" ${slug===s?'aria-current="page"':''}>${t}</a>`).join('')}<div class="language-switch" aria-label="Language"><button type="button" lang="en" class="selected" aria-pressed="true">English</button><button type="button" lang="zh" aria-pressed="false">中文</button></div><a class="visit-button" href="visit.html">Visit Us!</a></nav></div></header>`;}
for(const page of pages){const {root}=page;const content=root.children.map(n=>render(n,1)).join('\n');const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#002e56"><meta name="description" content="Coach-guided active ageing at Longevity Courtyard. Explore our 12-week programme, meet our team, and book a free trial session in Jurong West."><title>${page.title==='Home'?'Longevity Courtyard — Stay Strong for the Moments that Matter':page.title+' | Longevity Courtyard'}</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/fonts.css"><link rel="stylesheet" href="styles.css"><script>document.documentElement.style.setProperty('--page-scale',innerWidth>=900?innerWidth/1440:1)</script><script src="assets/zh.js" defer></script><script src="app.js" defer></script></head><body data-page="${page.slug}"><a class="skip-link" href="#main-content">Skip to content</a>${header(page.slug)}<main id="main-content" class="site-page" style="--page-height:${root.h}px" aria-label="${escape(page.title)}">${page.slug==='index'?'<h1 class="sr-only desktop-title">Stay Strong for the Moments that Matter.</h1>':`<h1 class="sr-only">${escape(page.title)}</h1>`}${content}</main><dialog id="information-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close dialog" autofocus>×</button><h2 id="dialog-title"></h2><div id="dialog-content"></div></dialog></body></html>`;
const templates=page.slug==='resources'?equipment.map((n,i)=>`<template id="equipment-${i}">${n.children.map(c=>render(c,3)).join('')}</template>`).join(''):'';
const output=html.replace('</body>',templates+'</body>');
fs.writeFileSync(path.join(projectRoot,page.slug+'.html'),output);
fs.writeFileSync(path.join(publishDir,page.slug+'.html'),output);}
console.log(`Built ${pages.length} static pages in dist/ (and refreshed root pages for local preview).`);
