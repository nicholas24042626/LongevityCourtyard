(() => {
  const updateScale=()=>document.documentElement.style.setProperty('--page-scale',window.innerWidth>=900?document.documentElement.clientWidth/1440:1);
  window.addEventListener('resize',updateScale);updateScale();
  const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#main-navigation');
  function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation')}
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});
  nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
  const zhTranslations={
    'Skip to content':'跳到主要内容',
    'Programmes':'课程',
    'Fitness Team':'健身团队',
    'Stories':'真实故事',
    'Equipment':'器械',
    'Resources':'资源',
    'Visit Us!':'预约参观！',
    'Visit Us':'预约参观',
    'Home':'首页',
    'Explore':'浏览',
    'Contact':'联系我们',
    'Hours':'营业时间',
    'Social Media':'社交媒体',
    'Privacy Policy':'隐私政策',
    'Terms of Service':'服务条款',
    'Accessibility':'无障碍说明',
    'Longevity Courtyard':'长寿庭院',
    'Dedicated to promoting active and':'致力于推广积极、',
    'healthy ageing through professional':'健康的老龄化生活，',
    'coaching, holistic support, and forming':'提供专业指导、整体支持，',
    'genuine connections.':'并建立真诚连接。',
    'Contact us for a':'联系我们预约',
    'free Trial Session!':'免费体验课程！',
    'Questions • Suitability • Pricing • Free Trial':'咨询 • 适合度 • 价格 • 免费体验',
    'Contact Us on WhatsApp→':'通过 WhatsApp 联系我们 →',
    'Contact Us →':'联系我们 →',
    '---- Start Today!----':'---- 今天就开始！----',
    'Find us on Google Maps':'在 Google 地图查看位置',
    '9.00am - 12.30pm & 1.30pm - 5.00pm':'上午9:00 - 下午12:30 及 下午1:30 - 下午5:00',
    'Singapore 640707':'新加坡 640707',
    'Monday-Friday:':'星期一至星期五：',
    'Monday -Friday':'星期一至星期五',
    'Opening Hours':'营业时间',
    'Address':'地址',
    'Phone':'电话',
    'We’d Love to See You':'期待见到你',
    'Stay Strong for the Moments that Matter.':'为重要时刻保持强健。',
    'Stay Strong for':'为重要时刻',
    'Stay Strong for the':'为重要时刻',
    'Moments':'保持强健',
    'the':'',
    'that Matter.':'',
    'A guided active-ageing programme for strength,':'以力量、灵活度与独立生活为目标的',
    'mobility and independence.':'专业积极老龄化课程。',
    'Longevity Courtyard helps older adults build functional strength,':'长寿庭院帮助年长者建立实用力量，',
    'reduce fall risk, and stay independent — through a coach-guided':'降低跌倒风险，并通过教练指导',
    'programme grounded in preventive care, not gym culture.':'维持独立生活；这里重视预防保健，而不是传统健身房文化。',
    'Coach supervised sessions - never alone':'教练全程指导，不必独自训练',
    '12 week structured journey - start to graduation':'12周结构化旅程，从开始到结业',
    'Book a Trial Session':'预约体验课程',
    'Book a Trial Session ':'预约体验课程',
    'View our Programmes':'查看我们的课程',
    'For Seniors':'适合年长者',
    'For Anyone':'适合所有人',
    '12 Weeks':'12周',
    'Guided training, progress reviews and':'指导训练、进度回顾与',
    'personalised support.':'个性化支持。',
    'Strength belongs to':'力量属于',
    'You.':'你。',
    'Maintain Strength':'维持力量',
    'Choose Yourself':'选择自己',
    'A guided fitness programme for strength, mobility and':'帮助提升力量、活动度与',
    'long term independence.':'长期独立生活的指导式健身课程。',
    'Don’t wait for movement to become harder. Build strength, balance,':'不要等到行动变困难才开始。及早建立力量、平衡',
    'and confidence earlier with guided exercise designed to help you stay':'与信心，通过指导式运动帮助自己保持',
    'capable, independent, and active for the years ahead.':'能力、独立和活跃。',
    '-------- WHO WE ARE':'-------- 我们是谁',
    '-------- THE SHANGRI-LA PROGRAMME':'-------- 香格里拉课程',
    '-------- WHY IT MATTERS':'-------- 为什么重要',
    '-------- REAL STORIES':'-------- 真实故事',
    '-------- OUR FITNESS TEAM':'-------- 我们的健身团队',
    '-------- PRICING PLANS':'-------- 价格配套',
    '-------- WHY ACTIVE AGEING MATTERS':'-------- 为什么积极老龄化重要',
    '-------- LONGEVITY COURTYARD SESSIONS':'-------- 长寿庭院课程',
    '-------- HUR EQUIPMENT':'-------- HUR 器械',
    '-------- SUPPORTING EQUIPMENT':'-------- 辅助器械',
    '-------- LONGEVITY COURTYARD RESOURCES':'-------- 长寿庭院资源',
    'Longevity Courtyard is a preventive active ageing programme in':'长寿庭院是位于',
    'Jurong West, run under the Tzu-Chi Foundation. Sessions take place':'裕廊西、由慈济基金会运营的预防型积极老龄化课程。',
    'on HUR strength equipment, designed for older bodies. Every':'课程使用专为年长身体设计的 HUR 力量器械。',
    'session is guided by a coach — never self-service, never intimidating.':'每一堂课都有教练指导，不是自助式，也不会让人感到压力。',
    'Learn More About Us →':'了解更多 →',
    'Shangri-La. A guided 12-week journey, not a one-off class.':'香格里拉：12周指导旅程，不只是单次课程。',
    'A guided 12-week journey, not':'12周指导旅程，',
    'a one-off class.':'不只是单次课程。',
    'Strength':'力量',
    'Balance':'平衡',
    'Stamina':'耐力',
    'Flexibility & Mobility':'柔韧性与活动度',
    'Medical Coaching':'医疗指导',
    'Well-being':'身心健康',
    'Nutrition':'营养',
    'Rest & Sleep':'休息与睡眠',
    'Pre- & Post-Programme Assessment':'课程前后评估',
    'Healthy ageing is something we':'健康老龄化值得',
    'should prepare for.':'提前准备。',
    'Stronger Muscles, Longer':'肌肉更强，独立更久',
    'Independence':'保持独立',
    'Better Balance, Fewer Falls':'平衡更好，跌倒更少',
    'Mind & Mood Wellbeing':'头脑与情绪健康',
    'Authentic journeys, not dramatic':'真实旅程，而不是戏剧化',
    'transformations':'改造',
    'starts somewhere different.':'每个故事都有不同的起点。',
    'What makes Longevity Courtyard so special.':'长寿庭院有什么特别之处。',
    'Working around Parkinson’s disease':'与帕金森共处并继续前进',
    'See All Testimonials →':'查看所有见证 →',
    'Your browser does not support video playback.':'你的浏览器不支持视频播放。',
    'Testimonials':'见证故事',
    'Battling Parkinson’s Disease':'对抗帕金森病',
    'The people behind your journey':'陪你同行的团队',
    'Meet the Fitness Team →':'认识健身团队 →',
    'Fitness Head Coach':'健身总教练',
    'Head of Arts & Holistic Movement':'艺术与整体运动负责人',
    'Head of Arts & Holistic Movement Coach':'艺术与整体运动教练',
    'Role':'职务',
    'Message to readers':'给读者的话',
    '"Exercise should help you live':'“运动应该帮助你过',
    '"Exercise should help you live the life you want”':'“运动应该帮助你过想要的生活”',
    '"Exercise should help you live the life you want"':'“运动应该帮助你过想要的生活”',
    'the life you want."':'想要的生活。”',
    'See other Coaches:':'查看其他教练：',
    'A message from Daniel:':'Daniel 的话：',
    'A message from Ice:':'Ice 的话：',
    'Strength Training':'力量训练',
    'Posture':'体态',
    'Calisthenics':'徒手训练',
    'Equipment & Resources':'器械与资源',
    'Longevity Courtyard Equipment':'长寿庭院器械',
    'Longevity uses a combination or Hur Pneumatic machines':'长寿庭院结合 HUR 气压式器械',
    'and other equipment to safely and effectively train the':'以及其他器材，安全有效地训练',
    'body.':'身体。',
    'Longevity Courtyard uses both Hur Pneumatic machines and other equipment to':'长寿庭院结合 HUR 气压式器械与其他器材，',
    'enable various exercises to target different muscle groups':'进行多样化训练，针对不同肌群。',
    'Hur Pneumatic Machines':'HUR 气压式器械',
    'HUR Pneumatic Machines':'HUR 气压式器械',
    'Unlike your standard gym machines, HUR machines use air-powered resistance':'不同于一般健身房器械，HUR 使用气压阻力，',
    'instead of traditional weight stacks, creating smoother movement and less impact on':'取代传统重量片，让动作更平顺，并减少对',
    'the joints. The resistance can be adjusted precisely, making it suitable for beginners,':'关节的冲击。阻力可精细调节，适合初学者、',
    'older adults, and progressive strength training. Combined with coach supervision,':'年长者与渐进式力量训练。配合教练指导，',
    'HUR supports safer and more comfortable exercise.':'HUR 能支持更安全、更舒适的运动。',
    'Leg Extension / Curl':'腿伸展 / 腿弯举',
    'Leg Extension / Leg Curl':'腿伸展 / 腿弯举',
    'Leg Extension / Leg Curl machine':'腿伸展 / 腿弯举机',
    'Shoulder Press / Lat Pulldown':'肩推 / 高位下拉',
    'Shoulder Press / Lat Pulldown machine':'肩推 / 高位下拉机',
    'Hip Adduction / Abduction':'髋内收 / 髋外展',
    'Hip Adduction / Hip Abduction machine':'髋内收 / 髋外展机',
    'Abdomen / Back Extension':'腹部 / 背伸展',
    'Abdomen / Back Extension machine':'腹部 / 背伸展机',
    'Pulley / Functional Trainer':'滑轮 / 功能训练器',
    'Recumbent Bike':'卧式脚踏车',
    'Quadriceps':'股四头肌',
    'Hamstrings':'腘绳肌',
    'Shoulders':'肩部',
    'Upper Back':'上背部',
    'Upper back':'上背部',
    'Arms':'手臂',
    'Inner Thighs':'大腿内侧',
    'Inner thighs':'大腿内侧',
    'Outer Hips':'髋外侧',
    'Outer hips':'髋外侧',
    'Hip Stabilisers':'髋部稳定肌',
    'Hip stabilisers':'髋部稳定肌',
    'Abdominals':'腹肌',
    'Lower Back':'下背部',
    'Core':'核心',
    'Chest':'胸部',
    'Back':'背部',
    'Thighs':'大腿',
    'Calves':'小腿',
    'Cardiovascular Endurance':'心肺耐力',
    'Typical gym:':'一般健身房：',
    'HUR at LC:':'长寿庭院的 HUR：',
    'Helps with improving lower-body':'帮助提升下肢',
    'strength used in walking, climbing':'走路、爬楼梯所需的力量，',
    'stairs, and standing up from a chair.':'以及从椅子站起的能力。',
    'Helps with maintaining upper-body':'帮助维持上肢',
    'strength for reaching, lifting light':'伸手、提轻物所需的力量，',
    'objects, and everyday activities.':'以及日常活动能力。',
    'Helps with supporting hip strength':'帮助支持髋部力量',
    'and stability during walking,':'以及走路时的稳定性，',
    'turning, and daily movement.':'包括转身与日常动作。',
    'Resistance comes from moving weight plates, which may feel more abrupt':'传统重量片提供阻力，',
    'when pushing, pulling, or changing direction.':'推、拉或改变方向时可能感觉较突然。',
    'Pneumatic resistance stays smooth through the full range of motion, making':'气压阻力在整个动作范围内都很平顺，',
    'upper-body exercises easier to control and more comfortable for the shoulders.':'使上肢训练更容易控制，也让肩部更舒适。',
    'Supporting Equipment':'辅助器材',
    'Functional Training Equipment':'功能训练器材',
    'Tanita Machine and':'Tanita 仪器与',
    'Assessment':'评估',
    'Tanita Body Composition Assessment':'Tanita 身体成分评估',
    'Progress Tracking':'进度追踪',
    'Personalised Planning':'个性化计划',
    'Exercise Balls':'健身球',
    'TRX Suspension Trainer':'TRX 悬吊训练带',
    'Light Dumbbells':'轻哑铃',
    'Resistance Bands':'弹力带',
    'Battle Ropes':'战绳',
    'Treadmill':'跑步机',
    'Pricing plans':'价格配套',
    '1 time Longevity':'一次长寿',
    'Courtyard Trial':'庭院体验',
    'Session':'课程',
    '$0 (Free)':'$0（免费）',
    'Monthly':'月度',
    'Courtyard Pass':'庭院通行证',
    '$74/month':'每月 $74',
    '8 sessions':'8堂课',
    '3 Month':'3个月',
    'Plan':'配套',
    '$220/3 months':'3个月 $220',
    '1 time only':'仅限一次',
    'Coach-supervised group sessions':'教练指导小组课',
    'Ongoing supervised sessions':'持续教练指导课程',
    '*Terms and conditions apply':'*须遵守相关条款',
    'Types of Longevity Courtyard Sessions':'长寿庭院课程类型',
    'Functional Strength Training':'功能力量训练',
    'Stretch and Strength':'伸展与力量',
    '7 Hur Machines':'7台 HUR 器械',
    'Other Exercise Stations':'其他运动站',
    'See Our Equipment':'查看我们的器械',
    'The Shangri-La Programme':'香格里拉课程',
    'The Shangri-La Programme':'香格里拉课程',
    'As we age, strength, balance, and mobility can gradually decline. The Shangri-La program was created to provide a safe, structured, and supportive environment where adults can train with confidence through assessment, supervision, and progressive exercise.':'随着年龄增长，力量、平衡与活动度可能逐渐下降。香格里拉课程提供安全、有结构和支持性的环境，让成人通过评估、监督和渐进式运动有信心地训练。',
    'A holistic active-ageing fitness programme':'整体积极老龄化健身课程',
    'How the Longevity Courtyard Sessions Progress':'长寿庭院课程如何推进',
    'Coach-led warm-up':'教练带领热身',
    'HUR and functional exercise circuit':'HUR与功能训练循环',
    'Balance, mobility, and cool-down':'平衡、活动度与缓和运动',
    'Weeks 1–4':'第1–4周',
    'Weeks 5–8':'第5–8周',
    'Weeks 9–12':'第9–12周',
    'Graduation':'结业',
    'Pre/Post Assessment':'课前/课后评估',
    'Progressive Overload':'渐进负荷',
    'Maintenance & Function':'维持与功能',
    'Tanita Assessment':'Tanita 评估',
    'Sleep Therapy':'睡眠疗法',
    'About':'关于我们',
    'About Us':'关于我们',
    'About Shangri-La':'关于香格里拉',
    '“The Shangri-La Programme is a structured active-ageing programme organised by Tzu Chi and':'“香格里拉课程是由慈济组织的结构化积极老龄化课程，',
    '“The Shangri-La Programme is a structured active-':'“香格里拉课程是一项结构化的积极',
    'ageing programme organised by Tzu Chi and':'老龄化课程，由慈济组织，',
    'conducted at Longevity Courtyard using HUR':'并在长寿庭院使用 HUR',
    'resistance equipment, Tanita assessment, and':'阻力器械、Tanita 评估，',
    'supervised group sessions.”':'以及教练监督小组课程进行。”',
    'As we age, strength, balance, and mobility can gradually decline. The':'随着年龄增长，力量、平衡与活动度可能逐渐下降。',
    'Shangri-La Programme was created to provide a safe, structured, and':'香格里拉课程提供安全、有结构',
    'supportive environment where adults can train with confidence':'且支持性的环境，让成人能够有信心地训练，',
    'through assessment, supervision, and progressive exercise.':'通过评估、监督和渐进式运动逐步进步。',
    'Exercise confidently with experienced':'在经验丰富的教练陪伴下',
    'coaches guiding every step of':'安心运动，完成旅程中的',
    'your journey.':'每一步。',
    'Equipment and pacing can be adjusted':'器械与训练节奏可根据',
    'to your strength and needs.':'你的力量与需要调整。',
    'Our Mission':'我们的使命',
    'Our Vision':'我们的愿景',
    'The Longevity Courtyard Difference':'长寿庭院的不同之处',
    'Professional Coaching':'专业教练',
    'Safe Environment':'安全环境',
    'Suitable for':'适合',
    'everyone':'每个人',
    'Our Reliable Coaches':'可靠教练',
    'Our Friendly Community':'友善社群',
    'Holistic Approach':'整体方式',
    'Evidence-Based Tracking':'循证追踪',
    'Personalised Progress':'个性化进度',
    'Progression':'渐进提升',
    'Supervised Group Sessions':'教练监督小组课',
    'Smooth adjustable resistance':'平顺可调阻力',
    'You are not alone.':'你不会孤单。',
    'Meet the People Behind Your Journey':'陪你同行的团队',
    'Holistic Movement Team':'整体运动团队',
    '10+ Years in Dance':'10年以上舞蹈经验',
    'Yoga':'瑜伽',
    'Community Arts':'社区艺术',
    'Creative Movement':'创意运动',
    'Active Ageing':'积极老龄化',
    'Education &':'教育与',
    'Experience':'经验',
    'Longevity Courtyard helped Seng Kek and Lit Seang realise that':'长寿庭院帮助 Seng Kek 和 Lit Seang 发现，',
    'age is never a barrier to getting stronger. Together, they\'ve':'年龄从不是变强的障碍。他们一起',
    'embraced active ageing, while Lit Seang continues to fight back':'拥抱积极老龄化，而 Lit Seang 也继续',
    'against Parkinson\'s disease through regular exercise.':'通过规律运动与帕金森病抗争。',
    'Recovery':'恢复',
    '"Movement isn\'t about perfection—it\'s about':'“运动不是追求完美，而是关于',
    'discovering confidence, joy, and wellbeing at every':'在生命每个阶段发现信心、快乐与健康。',
    'stage of life."':'”'
  };
  const zhPhrases=[
    ['Longevity Courtyard','长寿庭院'],
    ['active ageing','积极老龄化'],
    ['active-ageing','积极老龄化'],
    ['strength','力量'],
    ['Strength','力量'],
    ['balance','平衡'],
    ['mobility','活动度'],
    ['confidence','信心'],
    ['independent','独立'],
    ['independence','独立生活'],
    ['programme','课程'],
    ['program','课程'],
    ['sessions','课程'],
    ['Sessions','课程'],
    ['session','课程'],
    ['coach','教练'],
    ['Coach','教练'],
    ['guided','指导式'],
    ['support','支持'],
    ['progress','进度'],
    ['exercise','运动'],
    ['Exercise','运动'],
    ['movement','动作'],
    ['Movement','动作'],
    ['everyday','日常'],
    ['older adults','年长者'],
    ['fall risk','跌倒风险'],
    ['healthy ageing','健康老龄化'],
    ['HUR','HUR'],
    ['Shangri-La','香格里拉'],
    ['Free Trial','免费体验'],
    ['Trial Session','体验课程']
  ];
  function normText(value){return String(value||'').replace(/\s+/g,' ').trim()}
  function translateString(value){
    const original=String(value||'');
    const key=normText(original);
    if(!key)return original;
    if(zhTranslations[key])return zhTranslations[key];
    let translated=key;
    zhPhrases.forEach(([english,chinese])=>{
      const escaped=english.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      translated=translated.replace(new RegExp(`\\b${escaped}\\b`,'g'),chinese);
    });
    return translated===key?original:translated;
  }
  function languageTargets(){
    const selector='.text-node,.text-line,.approach-eyebrow,.approach-summary,.approach-button,.fun-fact p,.process-grid strong,.process-grid h3,.process-grid p,.process-footnote,.anyone-process h2,.anyone-process em,.not-gym-intro,.programme-kicker,.shangri-la-approach h2,.shangri-la-approach p,.shangri-la-approach h3,.programme-assessment h2,.programme-assessment p,.footer-instagram,.story-video-selector strong,.story-video-selector span,nav a,.visit-button,.skip-link,dialog h2,dialog p,dialog a';
    return [...document.querySelectorAll(selector)].filter(el=>!el.closest('script,style')&&(!el.classList.contains('text-node')||!el.querySelector('.text-line')));
  }
  function setLanguage(language){
    const chinese=language==='zh';
    document.documentElement.lang=chinese?'zh-Hans':'en';
    document.body.classList.toggle('is-zh',chinese);
    localStorage.setItem('lc-language',chinese?'zh':'en');
    document.querySelectorAll('.language-switch').forEach(switcher=>{
      const english=switcher.querySelector('[lang="en"]');
      const zh=switcher.querySelector('[lang="zh"]');
      [english,zh].forEach(control=>{if(!control)return;control.classList.remove('selected');control.setAttribute('aria-pressed','false');control.setAttribute('role','button');control.tabIndex=0});
      const active=chinese?zh:english;active?.classList.add('selected');active?.setAttribute('aria-pressed','true');
    });
    languageTargets().forEach(el=>{
      if(!el.dataset.i18nOriginal)el.dataset.i18nOriginal=el.textContent;
      el.textContent=chinese?translateString(el.dataset.i18nOriginal):el.dataset.i18nOriginal;
    });
    document.querySelectorAll('[aria-label]').forEach(el=>{
      if(!el.dataset.i18nAriaOriginal)el.dataset.i18nAriaOriginal=el.getAttribute('aria-label')||'';
      el.setAttribute('aria-label',chinese?translateString(el.dataset.i18nAriaOriginal):el.dataset.i18nAriaOriginal);
    });
    document.title=chinese?translateString(document.title):document.title;
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
    '中文':'<p lang="zh">目前网站提供英文内容。如需中文咨询或预约免费体验课程，请通过 WhatsApp 联系我们。</p><a href="https://wa.me/6568591961" target="_blank" rel="noopener noreferrer" lang="zh">通过 WhatsApp 联系我们</a>',
    'Privacy Policy':'<p>Please contact Longevity Courtyard for its current privacy policy and questions about your personal information. This website does not use contact forms, analytics, or tracking cookies.</p><a href="tel:+6568591961">Call +65 6859 1961</a>',
    'Terms of Service':'<p>Please contact Longevity Courtyard to confirm current programme terms, prices, availability, and participation requirements before booking.</p><a href="https://wa.me/6568591961" target="_blank" rel="noopener noreferrer">Contact Longevity Courtyard</a>',
    'Accessibility':'<p>You can navigate this site using your keyboard, enlarge text with your browser’s zoom controls, and play or pause testimonial videos. For assistance with visiting the centre or joining a session, please call us.</p><a href="tel:+6568591961">Call +65 6859 1961</a>',
    'Facebook':'<p>Please contact the team for the official Longevity Courtyard Facebook page and the latest community updates.</p><a href="https://wa.me/6568591961" target="_blank" rel="noopener noreferrer">Contact the team</a>'
  };
  document.addEventListener('click',event=>{const button=event.target.closest('[data-dialog]');if(!button||button.closest('.language-switch'))return;opener=button;const title=button.dataset.dialog;document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-content').innerHTML=messages[title]||'';dialog.showModal();document.body.classList.add('modal-open')});
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
        document.querySelector('main').replaceWith(replacement);
        document.title=parsed.title;document.body.dataset.page=parsed.body.dataset.page;
        if(push)history.pushState({coach:true},'',url.pathname+url.hash);
        window.LCApplyLanguage?.(localStorage.getItem('lc-language')==='zh'?'zh':'en');
        updateScale();window.scrollTo({top:scroll,behavior:'instant'});
        const profile=document.querySelector('#coach-profile');profile.tabIndex=-1;profile.focus({preventScroll:true});
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
  window.addEventListener('popstate',()=>{if(document.querySelector('#coach-profile')&&/\/(fitness-team|holistic-team)\.html$/.test(location.pathname))changeCoach(new URL(location.href),false)});
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
    process.innerHTML='<h2>Longevity Courtyard Is NOT Just A Gym</h2><p class="not-gym-intro">Longevity Courtyard is part of Shangri-La program. Those interested are encouraged to participate in a trial Longevity Courtyard session.<br>There is an alternative pricing plan for those who wish to participate in Longevity Courtyard and not Shangri-La</p><p class="approach-eyebrow">-------- THE LONGEVITY COURTYARD PROCESS</p><div class="process-grid"><article><strong>Step 1</strong><h3>Book Trial Session</h3><p>Meet a coach and try the programme with no pressure to commit.</p></article><article><strong>Step 2</strong><h3>Health &amp; Functional Screening</h3><p>We assess strength, balance and mobility to build your baseline.</p></article><article><strong>Step 3</strong><h3>Personalised Programme</h3><p>A weekly plan of strength, stretch and coaching sessions, built around you.</p></article><article><strong>Step 4</strong><h3>Progress &amp; Graduation</h3><p>Regular reassessment, celebrated milestones, and a plan to keep going.</p></article></div><p class="process-footnote">*This is included for both Shangri-La and Longevity Courtyard Monthly Pass plans.</p><a class="approach-button" href="https://wa.me/6568591961">Book a Trial Session</a><em>Each session is 45 minutes with up to 10 participants.</em>';
    const nextSection=document.querySelector(seniors?'[data-node="758:1322"]':'[data-node="811:1711"]');
    if(nextSection)nextSection.parentElement.insertBefore(process,nextSection);
  }
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
