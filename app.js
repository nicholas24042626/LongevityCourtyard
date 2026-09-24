(() => {
  const updateScale=()=>document.documentElement.style.setProperty('--page-scale',window.innerWidth>=900?document.documentElement.clientWidth/1440:1);
  window.addEventListener('resize',updateScale);updateScale();
  const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#main-navigation');
  function closeMenu(){nav.classList.remove('open');document.body.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label',document.documentElement.lang==='zh-Hans'?translateString('Open navigation'):'Open navigation')}
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');document.body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',document.documentElement.lang==='zh-Hans'?translateString(open?'Close navigation':'Open navigation'):(open?'Close navigation':'Open navigation'))});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});
  nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
  window.addEventListener('resize',()=>{if(innerWidth>=900)closeMenu()});
  // Long mobile pages can leave native lazy images blank until they are almost visible.
  // Begin loading them ahead of the viewport so the picture is ready when users reach it.
  const deferredImages=[...document.querySelectorAll('img[loading="lazy"]')];
  if('IntersectionObserver' in window){
    const imageLoader=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const img=entry.target;
      img.loading='eager';
      img.decode?.().catch(()=>{});
      imageLoader.unobserve(img);
    }),{rootMargin:'1200px 0px'});
    deferredImages.forEach(img=>imageLoader.observe(img));
  }else deferredImages.forEach(img=>{img.loading='eager'});
  const zhTranslations=window.LCChinese||{};
  const originalContent=new WeakMap();
  const originalLabels=new WeakMap();
  let englishTitle=document.title;
  let lastTranslatedTitle='';
  function normText(value){return String(value||'').replace(/\s+/g,' ').trim()}
  function translateString(value){
    const key=normText(value);
    return Object.hasOwn(zhTranslations,key)?zhTranslations[key]:value;
  }
  function languageTargets(){
    const selector='main h1,main h2,main h3,.text-node,.mobile-headline,.desktop-title,.approach-eyebrow,.approach-summary,.approach-button,.fun-fact p,.process-grid strong,.process-grid h3,.process-grid p,.process-footnote,.anyone-process h2,.anyone-process em,.not-gym-intro,.programme-kicker,.shangri-la-approach h2,.shangri-la-approach p,.shangri-la-approach h3,.programme-assessment h2,.programme-assessment p,.anyone-aspect-grid h3,.anyone-aspect-grid p,.footer-instagram,.story-video-selector strong,.story-video-selector span,nav a,.visit-button,.skip-link,dialog h2,dialog p,dialog a';
    const candidates=[...document.querySelectorAll(selector)];
    // Translate entire blocks, never nested fragments or containers with controls.
    return candidates.filter(el=>!el.closest('script,style')&&!candidates.some(parent=>parent!==el&&parent.contains(el)));
  }
  function setLanguage(language){
    const chinese=language==='zh';
    document.documentElement.lang=chinese?'zh-Hans':'en';
    document.body.classList.toggle('is-zh',chinese);
    try{localStorage.setItem('lc-language',chinese?'zh':'en')}catch{}
    document.querySelectorAll('.language-switch [lang]').forEach(control=>{
      const active=control.lang===(chinese?'zh':'en');
      control.classList.toggle('selected',active);
      control.setAttribute('aria-pressed',String(active));
    });
    languageTargets().forEach(el=>{
      let original=originalContent.get(el);
      // Dynamic coach profiles and dialog contents can replace existing text.
      if(!original||el.innerHTML!==original.rendered){
        original={html:el.innerHTML,text:el.textContent};
        originalContent.set(el,original);
      }
      const translated=translateString(original.text);
      if(chinese&&translated!==original.text)el.textContent=translated;
      else el.innerHTML=original.html;
      original.rendered=el.innerHTML;
    });
    document.querySelectorAll('[aria-label]').forEach(el=>{
      let original=originalLabels.get(el);
      if(!original||el.getAttribute('aria-label')!==original.rendered){
        original={text:el.getAttribute('aria-label')};originalLabels.set(el,original);
      }
      original.rendered=chinese?translateString(original.text):original.text;
      el.setAttribute('aria-label',original.rendered);
    });
    if(document.title!==lastTranslatedTitle)englishTitle=document.title;
    document.title=chinese?translateString(englishTitle):englishTitle;
    lastTranslatedTitle=document.title;
  }
  window.LCApplyLanguage=setLanguage;
  document.addEventListener('click',event=>{
    const zh=event.target.closest('.language-switch [lang="zh"]');
    const en=event.target.closest('.language-switch [lang="en"]');
    if(!zh&&!en)return;
    event.preventDefault();event.stopImmediatePropagation();
    setLanguage(zh?'zh':'en');
  },true);
  document.addEventListener('keydown',event=>{
    if(!['Enter',' '].includes(event.key))return;
    const zh=event.target.closest?.('.language-switch [lang="zh"]');
    const en=event.target.closest?.('.language-switch [lang="en"]');
    if(!zh&&!en)return;
    event.preventDefault();
    setLanguage(zh?'zh':'en');
  });

  const dialog=document.querySelector('#information-dialog');let opener;
  const messages={
    'Ng Swee Gek Emily':'<p>Emily’s coach description is not available yet.</p><p>Contact Longevity Courtyard to learn more about Emily and her sessions.</p><a href="https://wa.me/6568591961" target="_blank" rel="noopener noreferrer">Ask about Emily</a>',
    'Soh Tiong Eng Fion':'<p>Fion’s coach description is not available yet.</p><p>Contact Longevity Courtyard to learn more about Fion and her sessions.</p><a href="https://wa.me/6568591961" target="_blank" rel="noopener noreferrer">Ask about Fion</a>',
    'Dawn':'<p>Dawn’s coach description is not available yet.</p><p>Contact Longevity Courtyard to learn more about Dawn and her sessions.</p><a href="https://wa.me/6568591961" target="_blank" rel="noopener noreferrer">Ask about Dawn</a>',
    'Karis':'<p>Karis’s coach description is not available yet.</p><p>Contact Longevity Courtyard to learn more about Karis and her sessions.</p><a href="https://wa.me/6568591961" target="_blank" rel="noopener noreferrer">Ask about Karis</a>',
    'Privacy Policy':'<p>Please contact Longevity Courtyard for its current privacy policy and questions about your personal information. This website does not use contact forms, analytics, or tracking cookies.</p><a href="tel:+6568591961">Call +65 6859 1961</a>',
    'Terms of Service':'<p>Please contact Longevity Courtyard to confirm current programme terms, prices, availability, and participation requirements before booking.</p><a href="https://wa.me/6568591961" target="_blank" rel="noopener noreferrer">Contact Longevity Courtyard</a>',
    'Accessibility':'<p>You can navigate this site using your keyboard, enlarge text with your browser’s zoom controls, and play or pause testimonial videos. For assistance with visiting the centre or joining a session, please call us.</p><a href="tel:+6568591961">Call +65 6859 1961</a>',
    'Facebook':'<p>Please contact the team for the official Longevity Courtyard Facebook page and the latest community updates.</p><a href="https://wa.me/6568591961" target="_blank" rel="noopener noreferrer">Contact the team</a>'
  };
  document.addEventListener('click',event=>{const button=event.target.closest('[data-dialog]');if(!button||button.closest('.language-switch'))return;opener=button;const title=button.dataset.dialog;document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-content').innerHTML=messages[title]||'';dialog.showModal();document.body.classList.add('modal-open');setLanguage(document.documentElement.lang==='zh-Hans'?'zh':'en')});
  // Keep coach changes in the current document, with a transition between profiles.
  let changingCoach=false;
  const coachPages=new Map();
  async function changeCoach(url,push=true){
    if(changingCoach)return;changingCoach=true;
    const current=document.querySelector('#coach-profile');
    current?.setAttribute('aria-busy','true');
    try{
      const path=url.pathname;
      if(!coachPages.has(path)){
        const response=await fetch(path);if(!response.ok)throw new Error('Profile unavailable');
        coachPages.set(path,await response.text());
      }
      const parsed=new DOMParser().parseFromString(coachPages.get(path),'text/html');
      const replacement=parsed.querySelector('main');
      if(!replacement?.querySelector('#coach-profile'))throw new Error('Profile missing');
      // Load the new portrait before starting the animation.
      await Promise.all([...replacement.querySelectorAll('#coach-profile img')].map(image=>{
        const preload=new Image();preload.src=image.getAttribute('src');return preload.decode().catch(()=>{});
      }));
      const scroll=window.scrollY;
      const update=()=>{
        document.querySelectorAll('[data-photo-carousel]').forEach(carousel=>photoCarouselControllers.get(carousel)?.());
        document.querySelector('main').replaceWith(replacement);
        initPhotoCarousels(replacement);
        document.title=parsed.title;document.body.dataset.page=parsed.body.dataset.page;
        if(push)history.pushState({coach:true},'',url.pathname+url.hash);
        window.LCApplyLanguage?.(localStorage.getItem('lc-language')==='zh'?'zh':'en');
        updateScale();
        const profile=document.querySelector('#coach-profile');profile.tabIndex=-1;profile.focus({preventScroll:true});
        const top=innerWidth<900&&push?profile.getBoundingClientRect().top+window.scrollY-document.querySelector('.site-header').getBoundingClientRect().height:scroll;
        window.scrollTo({top,behavior:'instant'});
      };
      const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(document.startViewTransition&&!reduced){await document.startViewTransition(update).finished;}
      else if(!reduced){
        await current.animate([{opacity:1},{opacity:0}],{duration:140,fill:'forwards'}).finished;
        update();await document.querySelector('#coach-profile').animate([{opacity:0,transform:'translateX(12px)'},{opacity:1,transform:'translateX(0)'}],{duration:240,easing:'ease-out'}).finished;
      }else update();
    }catch{window.location.assign(url.href);}
    finally{changingCoach=false;current?.removeAttribute('aria-busy');}
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[data-coach-selector][href]');
    if(!link||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0||location.protocol==='file:')return;
    event.preventDefault();changeCoach(new URL(link.href));
  });
  window.addEventListener('popstate',()=>{if(document.querySelector('#coach-profile')&&/\/(fitness-team|holistic-team|emily|fion|dawn|karis)\.html$/.test(location.pathname))changeCoach(new URL(location.href),false)});
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus()});
  document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause()})));
  if(document.body.dataset.page==='programmes'){
    const programmeHeading=document.querySelector('[data-node="757:1281"]');
    const programmeBody=document.querySelector('[data-node="757:1282"]');
    if(programmeHeading&&programmeBody){
      programmeHeading.textContent='The Shangri-La Programme';
      programmeBody.textContent='As we age, strength, balance, and mobility can gradually decline. The Shangri-La program was created to provide a safe, structured, and supportive environment where adults can train with confidence through assessment, supervision, and progressive exercise.';
      const programmeKicker=document.createElement('p');
      programmeKicker.className='programme-kicker';
      programmeKicker.textContent='A holistic active-ageing fitness programme';
      programmeHeading.after(programmeKicker);
    }
    const progressHeading=document.querySelector('[data-node="683:814"]');
    if(progressHeading)progressHeading.textContent='How the Longevity Courtyard Sessions Progress';
    const progressList=document.querySelector('[data-node="683:841"]');
    if(progressList)progressList.textContent='• Coach-led warm-up\n• HUR and functional exercise circuit\n• Balance, mobility, and cool-down';
    const approach=document.createElement('section');
    approach.className='shangri-la-approach';
    approach.setAttribute('aria-labelledby','shangri-la-approach-title');
    approach.innerHTML=`<p class="approach-eyebrow">-------- LONGEVITY COURTYARD SESSIONS</p>
      <h2 id="shangri-la-approach-title">The Shangri-La approach</h2>
      <p class="approach-intro">Shangri-La is a guided wellness programme that supports strength, balance, mobility and overall well-being, helping you stay active, confident and independent in everyday life. Shangri-La takes a holistic approach, targeting the following 8 aspects</p>
      <div class="approach-grid">
        <article class="approach-image-card"><img src="assets/images/Strength.png" alt="Older adult doing strength exercises with dumbbells" loading="lazy"><h3>Strength</h3><p>Individualised progressive exercises using resistance and weights to support lifting, carrying, standing and other everyday movements.</p></article>
        <article class="approach-image-card"><img src="assets/images/Balance.png" alt="Older adult practising balance with a coach" loading="lazy"><h3>Balance</h3><p>Balance practices that support walking, climbing stairs, taking public transport and moving around independently.</p></article>
        <article class="approach-image-card"><img src="assets/images/Stamina.png" alt="Older adult doing stamina exercises on a stationary bike" loading="lazy"><h3>Stamina</h3><p>Low-impact endurance activities incorporated into our 45-minute sessions, aligned with healthy ageing recommendations.</p></article>
        <article class="approach-image-card"><img src="assets/images/Flexibility.png" alt="Older adult practising flexibility with a coach" loading="lazy"><h3>Flexibility &amp; Mobility</h3><p>Effective stretching practices and yoga to maintain range of movement, improve mobility and make everyday movements easier.</p></article>
        <article class="approach-image-card"><img src="assets/images/Well-Being.png" alt="Older adults doing seated well-being exercises" loading="lazy"><h3>Well-being</h3><p>Chair Yoga warm-ups, mat-based yoga and breathing practices to promote relaxation and support overall well-being.</p></article>
        <article class="approach-image-card"><img src="assets/images/797cd8b5d6592841f7722961671d30b3b75514c2.png" alt="Healthy nutrition" loading="lazy"><h3>Nutrition</h3><p>Practical nutrition coaching to help participants make healthier food choices.</p></article>
        <article class="approach-image-card"><img src="assets/images/0cd33127e664b430b308971cb9741f65cd335b8f.png" alt="Sleep therapy" loading="lazy"><h3>Sleep Therapy</h3><p>Sleep talks and guidance on quality sleep, sufficient rest and recovery.</p></article>
        <article class="approach-image-card"><img src="assets/images/12ee47b08fdcbf9c31086c52d163232fce41fa1b.png" alt="Medical coaching" loading="lazy"><h3>Medical Coaching</h3><p>Guidance to understand personal limitations and adjust exercise intensity.</p></article>
      </div>
    `;
    const main=document.querySelector('main');
    const sessionsSection=document.querySelector('[data-node="683:737"]');
    const assessment=document.createElement('section');
    assessment.className='programme-assessment';
    assessment.setAttribute('aria-labelledby','programme-assessment-title');
    assessment.innerHTML=`<h2 id="programme-assessment-title">Pre- &amp; Post-Programme Assessment</h2>
      <p>See how your strength, balance and mobility improve over time. Shangri-La is structured programme with measurable outcomes, not simply a collection of exercise classes.</p>
      <p>From our members' pre/post HUR SmartTouch assessments (Jan–Aug 2026). Across these exercises, strength (training load) improved by about 34% on average, ranging from +7% to +74%.</p>`;
    main.insertBefore(approach,sessionsSection);
    main.insertBefore(assessment,sessionsSection);
  }
  if(document.body.dataset.page==='stories'){
    const storyFrame=document.querySelector('[data-node="828:2511"]');
    const mainVideo=document.querySelector('[data-node="611:997"] video');
    if(storyFrame&&mainVideo){
      const selector=document.createElement('button');
      selector.type='button';
      selector.className='story-video-selector';
      selector.setAttribute('aria-label','Play Seng Kek and Lit Seang battling Parkinson’s Disease');
      selector.innerHTML='<strong>Seng Kek &amp; Lit Seang</strong><span>Battling Parkinson’s Disease</span><video muted playsinline preload="metadata" poster="assets/images/2795cd699951266680eb34059ae9937e9c67df0e.png"><source src="assets/videos/74a7134a639e9dd640552d0ba7f4cc06a8bbae0c.mp4" type="video/mp4"></video><span>Watch video</span>';
      selector.addEventListener('click',()=>{
        const source=mainVideo.querySelector('source');
        if(!source)return;
        source.src='assets/videos/74a7134a639e9dd640552d0ba7f4cc06a8bbae0c.mp4';
        mainVideo.poster='assets/images/2795cd699951266680eb34059ae9937e9c67df0e.png';
        mainVideo.load();
        mainVideo.play().catch(()=>{});
        mainVideo.focus({preventScroll:true});
      });
      storyFrame.append(selector);
    }
  }
  if(['for-anyone','index'].includes(document.body.dataset.page)){
    const seniors=document.body.dataset.page==='index';
    const fact=document.querySelector(seniors?'[data-node="669:1333"]':'[data-node="811:1641"]');
    const approach=document.querySelector(seniors?'[data-node="670:1398"]':'[data-node="811:1686"]');
    const notGym=document.querySelector(seniors?'[data-node="669:1363"]':'[data-node="811:1669"]');
    if(fact)fact.innerHTML='<div class="fun-fact"><span>✦</span><p><strong>Fun Fact:</strong> According to Health Promotion Board (HPB) guidelines, seniors aged 65 and above should aim to accumulate 150-300 minutes of moderate-intensity aerobic activity per week. Older adults should also incorporate exercises targeting muscle strength, balance and flexibility at least 3 days a week.</p><span>✦</span></div>';
    if(approach){
      approach.innerHTML='<p class="approach-eyebrow">-------- THE SHANGRI-LA PROGRAMME</p><h2><span>Shangri-La.</span> A guided 12-week journey, not a one-off class.</h2><p class="approach-summary">A personalised active-ageing programme designed to improve physical function, support recovery and enhance quality of life through guided exercise and wellness care. Shangri-La targets 8 aspects for a holistic approach to activeness and health.</p><div class="anyone-aspect-grid"><article><h3>Strength</h3><p>For muscle functionality and everyday strength.</p></article><article><h3>Balance</h3><p>For confident movement and independent living reducing the risk of falls.</p></article><article><h3>Stamina</h3><p>For sustained energy and greater endurance during daily activities.</p></article><article><h3>Flexibility &amp; Mobility</h3><p>For easier movement, better flexibility and improved joint mobility.</p></article><article class="assessment-card"><h3>Pre- &amp; Post-Programme Assessment</h3><p>Assessments before and after the programme to track participants progress, measure changes in physical function and better understand the outcomes of the programme.</p></article><article><h3>Medical Coaching</h3><p>For guided exercise support tailored to individual health and physical needs.</p></article><article><h3>Well-being</h3><p>For better overall wellness, confidence and quality of life.</p></article><article><h3>Nutrition</h3><p>For healthier eating habits that support strength, energy and recovery.</p></article><article><h3>Rest &amp; Sleep</h3><p>For improved recovery, better sleep quality and daily energy levels.</p></article></div><a class="approach-button" href="about.html">Learn more about Shangri-La</a>';
      if(notGym)notGym.parentElement.insertBefore(approach,notGym);
      if(notGym)notGym.parentElement.insertBefore(notGym,approach);
    }
    const process=document.createElement('section');
    process.className='anyone-process';
    process.innerHTML='<p class="approach-eyebrow">-------- THE LONGEVITY COURTYARD PROCESS</p><div class="process-grid"><article><strong>Step 1</strong><h3>Book Trial Session</h3><p>Meet a coach and try the programme with no pressure to commit.</p></article><article><strong>Step 2</strong><h3>Health &amp; Functional Screening</h3><p>We assess strength, balance and mobility to build your baseline.</p></article><article><strong>Step 3</strong><h3>Personalised Programme</h3><p>A weekly plan of strength, stretch and coaching sessions, built around you.</p></article><article><strong>Step 4</strong><h3>Progress &amp; Graduation</h3><p>Regular reassessment, celebrated milestones, and a plan to keep going.</p></article></div><p class="process-footnote">*This is included for both Shangri-La and Longevity Courtyard Monthly Pass plans.</p><a class="approach-button" href="https://wa.me/6568591961">Book a Trial Session</a><em>Each session is 45 minutes with up to 10 participants.</em>';
    const nextSection=document.querySelector(seniors?'[data-node="758:1322"]':'[data-node="811:1711"]');
    if(nextSection)nextSection.parentElement.insertBefore(process,nextSection);
    const fitnessTeam=document.querySelector(seniors?'[data-node="670:1497"]':'[data-node="811:1748"]');
    if(approach&&fitnessTeam)fitnessTeam.before(approach);
    // Keep phone flex order consistent with the document's reading order.
    [...document.querySelector('main').children].forEach((section,index)=>section.style.setProperty('order',index,'important'));
  }
  const photoCarouselControllers=new WeakMap();
  function initPhotoCarousels(root=document){root.querySelectorAll('[data-photo-carousel]').forEach(carousel=>{
    if(photoCarouselControllers.has(carousel))return;
    const photos=[...carousel.querySelectorAll('.carousel-photo')];
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let index=0,paused=reduced.matches,loading=false;
    const show=async step=>{
      if(loading)return;
      loading=true;
      const next=(index+step+photos.length)%photos.length;
      try{
        // Keep the current photo visible until the next one is ready to paint.
        await photos[next].decode();
        index=next;
        photos.forEach((photo,i)=>{
          photo.classList.toggle('is-active',i===index);
          photo.setAttribute('aria-hidden',String(i!==index));
        });
      }catch{ /* Keep the current photo if the next image fails to load. */ }
      finally{loading=false}
    };
    carousel.querySelectorAll('[data-photo-step]').forEach(button=>button.addEventListener('click',()=>show(Number(button.dataset.photoStep))));
    carousel.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
      event.preventDefault();show(event.key==='ArrowLeft'?-1:1);
    });
    const onMotionChange=()=>{paused=reduced.matches};
    reduced.addEventListener('change',onMotionChange);
    const timer=setInterval(()=>{if(carousel.isConnected&&!paused&&!document.hidden&&!carousel.querySelector(':focus-visible'))show(1)},5000);
    photoCarouselControllers.set(carousel,()=>{clearInterval(timer);reduced.removeEventListener('change',onMotionChange);photoCarouselControllers.delete(carousel)});
  });}
  initPhotoCarousels();
  const equipmentMap={'Leg Extension / Curl':0,'Shoulder Press / Lat Pulldown':4,'Hip Adduction / Abduction':1,'Abdomen / Back Extension':2,'Pulley / Functional Trainer':3,'Recumbent Bike':5};
  document.querySelectorAll('[data-node="537:566"]').forEach(facebook=>{
    if(facebook.parentElement.querySelector('.footer-instagram'))return;
    const instagram=document.createElement('a');
    instagram.className='footer-instagram';
    instagram.href='https://www.instagram.com/glow.tzuchisg/?hl=en';
    instagram.target='_blank';
    instagram.rel='noopener noreferrer';
    instagram.textContent='Instagram';
    facebook.parentElement.append(instagram);
  });
  document.querySelectorAll('[data-coach-carousel]').forEach(carousel=>{
    const controls=document.querySelector(`[data-carousel-controls="${carousel.id}"]`);
    const previous=controls.querySelector('[data-carousel-direction="-1"]');
    const next=controls.querySelector('[data-carousel-direction="1"]');
    const update=()=>{previous.disabled=carousel.scrollLeft<=1;next.disabled=carousel.scrollLeft>=carousel.scrollWidth-carousel.clientWidth-1};
    controls.addEventListener('click',event=>{
      const button=event.target.closest('[data-carousel-direction]');if(!button)return;
      const cards=[...carousel.children];const step=cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:carousel.clientWidth;
      carousel.scrollBy({left:step*Number(button.dataset.carouselDirection),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    });
    carousel.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(carousel);update();
  });
  document.addEventListener('click',e=>{const button=e.target.closest('[data-equipment]');if(!button)return;const label=button.dataset.equipment;const template=document.querySelector('#equipment-'+equipmentMap[label]);const slot=document.querySelector('[data-equipment-slot]');if(!template||!slot)return;slot.replaceChildren(template.content.cloneNode(true));slot.querySelectorAll('[data-equipment]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.equipment===label)));window.LCApplyLanguage?.(localStorage.getItem('lc-language')==='zh'?'zh':'en');slot.querySelector(`[data-equipment="${label}"]`)?.focus({preventScroll:true})});
  window.LCApplyLanguage?.(localStorage.getItem('lc-language')==='zh'?'zh':'en');
})();
