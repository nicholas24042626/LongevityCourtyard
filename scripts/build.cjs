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
 '564:2588':{name:'Ng Swee Gek Emily',image:'assets/images/Emily.png',href:'emily.html#coach-profile'},
 '564:2622':{name:'Ng Swee Gek Emily',image:'assets/images/Emily.png',href:'emily.html#coach-profile'},
 '564:2589':{name:'Soh Tiong Eng Fion',image:'assets/images/Fion.png',href:'fion.html#coach-profile'},
 '564:2623':{name:'Soh Tiong Eng Fion',image:'assets/images/Fion.png',href:'fion.html#coach-profile'},
 '564:2590':{name:'Dawn',image:'assets/images/Dawn.png',href:'dawn.html#coach-profile'},
 '564:2624':{name:'Dawn',image:'assets/images/Dawn.png',href:'dawn.html#coach-profile'}
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
const memberProfiles=[
 {slug:'emily',title:'Emily | Fitness Team',name:'Ng Swee Gek Emily',first:'Emily',role:'Fitness Associate',image:'assets/images/Emily.png'},
 {slug:'fion',title:'Fion | Fitness Team',name:'Soh Tiong Eng Fion',first:'Fion',role:'Fitness Associate',image:'assets/images/Fion.png'},
 {slug:'dawn',title:'Dawn | Fitness Team',name:'Dawn',first:'Dawn',role:'Medical Coach',image:'assets/images/Dawn.png'},
 {slug:'karis',title:'Karis | Fitness Team',name:'Karis',first:'Karis',role:'Nutrition Coach',image:'assets/images/Karis.png'}
];
const fitnessPage=pages.find(p=>p.slug==='fitness-team');
// Draft profile copy based on the team's listed roles, without unverified credentials.
const memberStories={
 emily:{
  motto:'“Strength grows with every small step you take for yourself.”',
  specialties:['Everyday Strength','Steady Progress','Active Living'],
  background:'Emily is a Fitness Associate at Longevity Courtyard, supporting members as they make movement part of everyday life. Her focus is on building a steady exercise routine and finding encouragement in small achievements. From getting started to keeping up the momentum, the focus is on growing stronger and feeling more confident in daily activities.',
  highlight:'Building Strength Through Consistency',
  quotes:['“A small achievement today can become the confidence to try a little more tomorrow.”','“I want every member to feel encouraged by their progress, one session at a time.”'],
  message:'You do not have to do everything at once. Come along for a trial session and take your first step towards a regular movement routine. Let us work towards everyday strength, celebrate your progress, and keep you moving at a pace that feels manageable.'
 },
 fion:{
  motto:'“Moving together makes every step feel a little more possible.”',
  specialties:['Movement Confidence','Balance','Connection'],
  background:'Fion is a Fitness Associate at Longevity Courtyard, supporting members on their active ageing journey. She puts connection and movement confidence at the heart of exercise. With a focus on feeling more at ease during each session, she encourages members to take part, find their rhythm, and enjoy working towards more comfortable everyday movement together.',
  highlight:'Encouragement in Every Movement',
  quotes:['“Feeling welcome is the first step towards feeling confident enough to begin.”','“Movement can be a chance to connect, share a smile, and discover what you can do.”'],
  message:'If joining an exercise session feels unfamiliar, start by coming to meet us. We can help you settle in and take things one step at a time. Join a trial session to explore movement, meet others, and begin building confidence in a friendly setting.'
 },
 dawn:{
  motto:'“Understanding your body is the first step towards moving with confidence.”',
  specialties:['Body Awareness','Guided Movement','Wellbeing'],
  background:'Dawn is the Medical Coach at Longevity Courtyard. Her role brings a health-aware perspective to staying active, with an emphasis on understanding your body and recognising your starting point. The focus is on helping members ask questions, communicate their concerns, and approach movement with greater awareness as they work towards everyday wellbeing.',
  highlight:'A Thoughtful Approach to Wellbeing',
  quotes:['“Confidence begins when you feel heard and understand the next step.”','“Listening to your body is part of making movement a lasting part of your life.”'],
  message:'Bring your questions and share what matters to you. A trial session is an opportunity to talk with our team about your starting point and goals. Together, we can explore how the programme may fit into your journey towards a more active everyday life.'
 },
 karis:{
  motto:'“Eating well starts with small choices that fit your everyday life.”',
  specialties:['Balanced Eating','Everyday Habits','Nutrition'],
  background:'Karis is the Nutrition Coach at Longevity Courtyard. Her approach connects eating well with the practical rhythms of daily life, from familiar meals to habits that are easier to maintain. The focus is on making nutrition approachable and helping members think about how everyday food choices can complement an active lifestyle and their personal wellbeing goals.',
  highlight:'Making Everyday Nutrition Approachable',
  quotes:['“Eating well can begin with one manageable change to a familiar meal.”','“The habits you can keep are the ones that fit into your everyday life.”'],
  message:'Start with the meals you know and enjoy. Share your routine and questions with our team, and explore simple ways to make balanced eating part of your day. Visit us to learn how nutrition support can complement your movement and wellbeing journey.'
 }
};
for(const member of memberProfiles){
 const page=JSON.parse(JSON.stringify(fitnessPage));
 Object.assign(page,{slug:member.slug,title:member.title,navSlug:'fitness-team'});
 const danielSelector=findNode(page.root,'564:2583');
 if(danielSelector){
  danielSelector.id=`member-daniel-${member.slug}`;
  danielSelector.children=[];
  danielSelector.style={borderRadius:'50%',background:'linear-gradient(rgba(217,217,217,1),rgba(217,217,217,1))'};
  coachSelectors[danielSelector.id]={name:'Daniel Phua',image:'assets/images/189dd86bce5f226b338fa454f55b11b13070c53d.png',href:'fitness-team.html#coach-profile'};
 }
 const story=memberStories[member.slug];
 const updates={
  '564:2569':member.name,'564:2570':member.role,
  '564:2573':story.motto,
  '564:2575':story.specialties[0],'564:2577':story.specialties[1],'564:2579':story.specialties[2],
  '564:2592':story.background,
  '564:2595':story.highlight,
  '564:2593':story.quotes.join('\n\n'),
  '564:2599':`A message from ${member.first}:`,
  '564:2598':story.message
 };
 for(const [id,text] of Object.entries(updates)){const node=findNode(page.root,id);if(node){node.text=text;node.name=text;node.lines=[text];}}
 for(const id of ['564:2566','564:2594']){
  const portrait=findNode(page.root,id);
  if(portrait?.image){portrait.image.src=member.image;portrait.image.alt=`Portrait of ${member.name}`;portrait.image.style={objectFit:'contain',objectPosition:'center bottom',width:'100%',height:'100%',left:'0%',top:'0%'};}
 }
 const heroPortrait=findNode(page.root,'564:2566');
 if(heroPortrait?.image)heroPortrait.image.style={objectFit:'contain',objectPosition:'center top',width:'116%',height:'181%',left:'-8%',top:'-17%'};
 if(member.slug==='dawn'&&heroPortrait?.image)heroPortrait.image.style={objectFit:'contain',objectPosition:'center top',width:'108%',height:'169%',left:'-4%',top:'-8%'};
 pages.push(page);
}
function action(text){text=text?.trim();if(equipmentLabels.includes(text))return{equipment:text};if(text==='For Seniors')return{href:'index.html'};if(text==='For Anyone')return{href:'for-anyone.html'};if(links[text])return{href:links[text]};if(/^(Book a Trial Session|Contact Us|Contact us on|Contact Us on)/.test(text))return{href:whatsapp};if(['Privacy Policy','Terms of Service','Accessibility','Facebook','中文'].includes(text))return{dialog:text};return null;}
let renderingPageSlug='';
function render(n,depth=0,inLink=false){
 if(['679:499','483:1720','475:1390','688:979'].includes(n.id)){
  const photos=Array.from({length:5},(_,i)=>`<img class="carousel-photo${i===0?' is-active':''}" src="assets/carousel/photo-${i+1}.jpg" alt="Longevity Courtyard activities — photo ${i+1}" aria-hidden="${i!==0}" decoding="async">`).join('');
  return `<div class="design-node has-image photo-carousel" data-node="${n.id}" data-photo-carousel role="region" aria-roledescription="carousel" aria-label="Longevity Courtyard photos" style="left:${n.x}px;top:${n.y}px;width:${n.w}px;height:${n.h}px;--original-width:${n.w};--original-height:${n.h}">${photos}<div class="carousel-shade" aria-hidden="true"></div><div class="photo-carousel-controls"><button type="button" data-photo-step="-1" aria-label="Previous photo">&#8249;</button><button type="button" data-photo-step="1" aria-label="Next photo">&#8250;</button></div></div>`;
 }
 const coachCarousel=['670:1501','811:1754'].includes(n.id);
 const memberProfile=n.id==='564:2676'&&Object.hasOwn(memberStories,renderingPageSlug);
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
 const classes=['design-node',memberProfile?'member-profile':'',isText?'text-node':'layout-node',depth===1?'section':'',n.image?'has-image':'',n.clip?'clip':'',n.paths?'vector-node':'',!isText&&!n.image&&!n.paths&&!n.children.length?'empty-node':'',n.name==='Footer'?'site-footer':'',n.name==='Begin Your Journey'?'contact-section':'',n.video?'video-node':'',n.children.length>1&&n.children.filter(c=>c.h>100).length>1&&n.children.filter(c=>c.h>100).every(c=>Math.abs(c.y-n.children.filter(c=>c.h>100)[0].y)<40)?'card-row':''].filter(Boolean).join(' ');
 const selectorGroup=['564:2582','564:2616'].includes(n.id);
 const style={left:n.x+'px',top:n.y+'px',width:(selectorGroup?610:n.w)+'px',height:n.h+'px','--original-width':selectorGroup?610:n.w,'--original-height':n.h,'--mobile-order':Math.round(n.y*100+n.x),...n.style};
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
 if(coach?.image)inner=`<img class="coach-selector-photo" src="${coach.image}" alt="" aria-hidden="true" decoding="async">`;
 if(n.video){inner=`<video controls playsinline preload="none" poster="${n.image.src}" aria-label="${escape(n.image.alt)}"><source src="${n.video}" type="video/mp4">Your browser does not support video playback.</video>`;}
 else if(n.image){inner=`<div class="image-crop" aria-hidden="true"><img src="${n.image.src}" alt="" loading="${depth<3?'eager':'lazy'}" decoding="async" style="${escape(css(n.image.style))}"></div>`;if(n.overlay)inner+=`<div class="image-overlay" style="background:${escape(n.overlay)}"></div>`;if(!n.children.length&&!act)attrs+=` role="img" aria-label="${escape(n.image.alt)}"`;}
 if(n.paths)inner+=`<svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 ${n.w||1} ${n.h||1}" overflow="visible">${n.paths.map(p=>`<path d="${p.d}" fill="${p.fill}" fill-rule="${p.rule||'nonzero'}"/>`).join('')}</svg>`;
 if(isText)inner+=n.lines?n.lines.map(line=>`<span class="text-line">${escape(line)}</span>`).join(''):escape(n.text);
 if(selectorGroup){
  const team=[
   {name:'Daniel Phua',href:'fitness-team.html#coach-profile',image:'assets/images/189dd86bce5f226b338fa454f55b11b13070c53d.png'},
   {name:'Titisa Jeamsakul (Ice)',href:'holistic-team.html#coach-profile',image:'assets/images/b86fedffaf2cd6915cc6ad9d19520abe411c2a38.png'},
   {name:'Ng Swee Gek Emily',href:'emily.html#coach-profile',image:'assets/images/Emily.png'},
   {name:'Soh Tiong Eng Fion',href:'fion.html#coach-profile',image:'assets/images/Fion.png'},
   {name:'Dawn',href:'dawn.html#coach-profile',image:'assets/images/Dawn.png'},
   {name:'Karis',href:'karis.html#coach-profile',image:'assets/images/Karis.png'}
  ];
  inner+=team.map((member,index)=>`<a class="design-node coach-standard-selector" style="left:${index*105}px;top:0;width:85px;height:85px;--mobile-order:${index}" data-coach-selector href="${member.href}" aria-label="View ${member.name}'s profile" title="${member.name}"><img class="coach-selector-photo" src="${member.image}" alt="" aria-hidden="true" decoding="async"></a>`).join('');
 }else inner+=n.children.map(c=>render(c,depth+1,inLink||!!act)).join('');
 if(n.id==='823:2477')inner+='<h1 class="mobile-headline">Stay Strong for the <em>Moments</em> that Matter.</h1>';
 if(n.id==='823:2483')inner+='<h1 class="mobile-headline">Strength belongs to <em>You.</em><br>Maintain Strength<br>Choose Yourself</h1>';
 const controls=coachCarousel?`<div class="coach-carousel-controls" data-carousel-controls="coaches-${n.id.replace(':','-')}" style="left:${n.x+n.w-108}px;top:${n.y+n.h+14}px;--mobile-order:${Math.round(n.y*100+n.x)+1}"><button type="button" data-carousel-direction="-1" aria-label="View previous coaches" aria-controls="coaches-${n.id.replace(':','-')}">←</button><button type="button" data-carousel-direction="1" aria-label="View next coaches" aria-controls="coaches-${n.id.replace(':','-')}">→</button></div>`:'';
 const instagram=n.id==='537:566'?`<a class="footer-instagram" href="https://www.instagram.com/glow.tzuchisg/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>`:'';
 return `<${tag} ${attrs}>${inner}</${tag}>${instagram}${controls}`;
}
function header(slug){return `<header class="site-header"><div class="nav-canvas"><div class="brand"><a class="brand-home" href="index.html" aria-label="Longevity Courtyard home"><img src="assets/images/d3785a90c69bb02a1026498fd15e24ba8c36ef10.png" alt="Longevity Courtyard, in collaboration with HUR and Tzu Chi"></a><a class="tzu-chi-link" href="https://www.tzuchi.org.sg/en/" target="_blank" rel="noopener noreferrer" aria-label="Tzu Chi Singapore website" title="Tzu Chi Singapore"></a></div><button class="menu-toggle" aria-controls="main-navigation" aria-expanded="false" aria-label="Open navigation"><span></span><span></span><span></span></button><nav id="main-navigation" aria-label="Main navigation">${[['Programmes','programmes'],['Fitness Team','fitness-team'],['Stories','stories'],['Equipment','resources']].map(([t,s])=>`<a href="${s}.html" ${slug===s?'aria-current="page"':''}>${t}</a>`).join('')}<div class="language-switch" aria-label="Language"><button type="button" lang="en" class="selected" aria-pressed="true">English</button><button type="button" lang="zh" aria-pressed="false">中文</button></div><a class="visit-button" href="visit.html">Visit Us!</a></nav></div></header>`;}
for(const page of pages){renderingPageSlug=page.slug;const {root}=page;const content=root.children.map(n=>render(n,1)).join('\n');const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#002e56"><meta name="description" content="Coach-guided active ageing at Longevity Courtyard. Explore our 12-week programme, meet our team, and book a free trial session in Jurong West."><title>${page.title==='Home'?'Longevity Courtyard — Stay Strong for the Moments that Matter':page.title+' | Longevity Courtyard'}</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/fonts.css"><link rel="stylesheet" href="styles.css"><script>document.documentElement.style.setProperty('--page-scale',innerWidth>=900?innerWidth/1440:1)</script><script src="assets/zh.js" defer></script><script src="app.js" defer></script></head><body data-page="${page.slug}"><a class="skip-link" href="#main-content">Skip to content</a>${header(page.navSlug||page.slug)}<main id="main-content" class="site-page" style="--page-height:${root.h}px" aria-label="${escape(page.title)}">${page.slug==='index'?'<h1 class="sr-only desktop-title">Stay Strong for the Moments that Matter.</h1>':`<h1 class="sr-only">${escape(page.title)}</h1>`}${content}</main><dialog id="information-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close dialog" autofocus>×</button><h2 id="dialog-title"></h2><div id="dialog-content"></div></dialog></body></html>`;
const templates=page.slug==='resources'?equipment.map((n,i)=>`<template id="equipment-${i}">${n.children.map(c=>render(c,3)).join('')}</template>`).join(''):'';
const output=html.replace('</body>',templates+'</body>');
fs.writeFileSync(path.join(projectRoot,page.slug+'.html'),output);
fs.writeFileSync(path.join(publishDir,page.slug+'.html'),output);}
console.log(`Built ${pages.length} static pages in dist/ (and refreshed root pages for local preview).`);
