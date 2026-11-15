(() => {
  'use strict';
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal || !window.ResizeObserver) return;
  const root = document.documentElement;
  const chapters = [...document.querySelectorAll('.scene')];
  const nav = [...document.querySelectorAll('[data-scene-link]')];
  const dialogs = [...document.querySelectorAll('.project-detail')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fr = root.lang === 'fr';
  const atmosphere = document.createElement('div');
  atmosphere.className = 'atmosphere'; atmosphere.setAttribute('aria-hidden','true');
  document.body.prepend(atmosphere);
  const backgrounds = chapters.map(c => {
    const bg = c.querySelector('.scene-background');
    bg.classList.add('scene-' + c.id); atmosphere.append(bg); return bg;
  });
  const clamp = (x,a=0,b=1) => Math.max(a,Math.min(b,x));
  let active = -1, positions = [], readings = [], stops = [], total = 1, frame = 0;
  let opener = null, returnY = 0, fromLink = false;
  const arrival = document.querySelector('.arrival');
  const route = document.querySelector('.journey-list');
  let routeTop = 0, routeHeight = 1;
  const load = i => {
    const img = backgrounds[i]?.querySelector('img[data-src]');
    if (!img) return;
    img.srcset = img.dataset.srcset; img.src = img.dataset.src; delete img.dataset.src;
  };
  backgrounds.forEach(bg => {
    const img=bg.querySelector('img[data-fallback]');
    const fallback=()=>{if(img.dataset.fallback){img.removeAttribute('srcset');img.src=img.dataset.fallback;delete img.dataset.fallback;}};
    img.addEventListener('error',fallback);
    if(img.hasAttribute('src') && img.complete && !img.naturalWidth) fallback();
  });
  function language() {
    const hash = dialogs.some(d=>d.open) ? location.hash : '#' + chapters[Math.max(active,0)].id;
    document.querySelectorAll('[data-language]').forEach(a=>{const url=new URL(a.href);const variant=root.dataset.type;a.href=url.pathname.split('/').pop()+(variant?'?type='+variant:'')+hash;});
  }
  function mark(index) {
    if(index===active) return;
    active=index;root.dataset.scene=chapters[index].id;
    nav.forEach((a,i)=>i===index?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));
    document.getElementById('scene-counter').textContent=`${String(index+1).padStart(2,'0')} / 06`;
    document.getElementById('previous-scene').disabled=index===0;
    document.getElementById('next-scene').disabled=index===5;
    if(innerWidth<1000){const menu=nav[index].parentElement;menu.scrollLeft=nav[index].offsetLeft-menu.clientWidth/2+nav[index].offsetWidth/2;}
    language();
  }
  function measure() {
    const y=scrollY;
    positions=chapters.map(c=>c.getBoundingClientRect().top+y);
    readings=[...document.querySelectorAll('.reveal')].map(el=>({el,top:el.getBoundingClientRect().top+y}));
    stops=[...document.querySelectorAll('.journey-stop')].map(el=>({el,top:el.getBoundingClientRect().top+y}));
    routeTop=route.getBoundingClientRect().top+y;routeHeight=route.offsetHeight;
    total=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    update();
  }
  function update() {
    frame=0;
    if(dialogs.some(d=>d.open))return;
    const y=scrollY,h=innerHeight;
    let index=0;positions.forEach((top,i)=>{if(top<=y+h*.35)index=i;});
    mark(index);load(index);
    if(positions[index+1]<y+h*1.8)load(index+1);
    backgrounds.forEach((bg,i)=>{
      const enter=i===0?1:clamp((y+h-positions[i])/(h*.8));
      const leave=i===5?1:1-clamp((y+h-positions[i+1])/(h*.8));
      bg.style.opacity=reduced.matches?(i===index?'1':'0'):String(Math.min(enter,leave));
      bg.style.setProperty('--depth',reduced.matches?'1':String(1+clamp((y-positions[i])/h,-1,1)*.012));
    });
    readings.forEach(({el,top})=>{
      const t=reduced.matches?1:clamp((y+h*.92-top)/(h*.42));
      el.style.setProperty('--reveal','1');el.style.setProperty('--rise',`${reduced.matches?0:(1-t)*18}px`);
    });
    arrival.querySelector('h1').style.opacity=reduced.matches?'1':String(1-clamp((y-h*.35)/(h*.5))*.8);
    root.style.setProperty('--progress',String(clamp(y/total)));
    route.style.setProperty('--route-progress',String(reduced.matches?1:clamp((y+h*.55-routeTop)/routeHeight)));
    let stop=0;stops.forEach((s,i)=>{if(s.top<=y+h*.45)stop=i;});
    stops.forEach((s,i)=>s.el.classList.toggle('is-reading',i===stop));
    document.querySelectorAll('.route-index a').forEach((a,i)=>i===stop?a.setAttribute('aria-current','step'):a.removeAttribute('aria-current'));
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(update);}
  // Scroll is never cancelled or converted to chapter changes.
  addEventListener('scroll',schedule,{passive:true});
  let measurementFrame=0;
  const queueMeasure=()=>{if(!measurementFrame)measurementFrame=requestAnimationFrame(()=>{measurementFrame=0;measure();});};
  const resize=new ResizeObserver(queueMeasure);resize.observe(document.querySelector('main'));
  addEventListener('resize',queueMeasure);reduced.addEventListener('change',queueMeasure);
  document.querySelectorAll('.skill-index button').forEach((button,i,buttons)=>{
    button.addEventListener('click',()=>{
      buttons.forEach(b=>{const selected=b===button;b.setAttribute('aria-pressed',String(selected));document.getElementById(b.getAttribute('aria-controls')).hidden=!selected;});
      queueMeasure();
    });
    if(i===0)button.click();
  });
  document.querySelectorAll('.credential').forEach(d=>d.addEventListener('toggle',()=>{
    if(d.open)document.querySelectorAll('.credential').forEach(other=>{if(other!==d)other.open=false;});
    queueMeasure();
  }));
  function go(id,push=true,instant=false) {
    const target=document.getElementById(id);if(!target)return;
    if(push)history.pushState(null,'','#'+id);
    target.scrollIntoView({behavior:instant||reduced.matches?'instant':'smooth',block:'start'});
    if(target.matches('.scene'))target.focus({preventScroll:true});
    schedule();
  }
  function closeView(dialog,historyAction=true) {
    if(dialog.open)dialog.close();
    document.body.classList.remove('modal-open');
    if(historyAction && location.hash==='#'+dialog.id){
      if(fromLink){history.back();}else{history.replaceState(null,'','#portfolio');go('portfolio',false,true);}
    }
    if(fromLink)scrollTo({top:returnY,behavior:'instant'});
    const target=opener||document.querySelector(`a[href="#${dialog.id}"]`);
    setTimeout(()=>target?.focus({preventScroll:true}),100);
    queueMeasure();language();
  }
  dialogs.forEach(d=>{
    d.removeAttribute('open');
    d.addEventListener('cancel',e=>{e.preventDefault();closeView(d);});
    d.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();closeView(d);}));
    d.addEventListener('keydown',e=>{
      if(e.key!=='Tab')return;
      const controls=[...d.querySelectorAll('button,a[href]')].filter(e=>e.getClientRects().length);
      if(e.shiftKey && document.activeElement===controls[0]){e.preventDefault();controls.at(-1).focus();}
      else if(!e.shiftKey && document.activeElement===controls.at(-1)){e.preventDefault();controls[0].focus();}
    });
  });
  function syncRoute(){
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{id='home';}
    const dialog=dialogs.find(d=>d.id===id);
    if(dialog){
      if(!dialog.open){if(!fromLink)go('portfolio',false,true);document.body.classList.add('modal-open');dialog.showModal();dialog.scrollTop=0;}
    }else{
      const open=dialogs.find(d=>d.open);
      if(open){closeView(open,false);fromLink=false;}
      else if(fromLink){scrollTo({top:returnY,behavior:'instant'});fromLink=false;}
      else go(id||'home',false,true);
    }
    queueMeasure();language();
  }
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]');
    if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    const id=a.getAttribute('href').slice(1),dialog=dialogs.find(d=>d.id===id);
    if(!document.getElementById(id))return;
    e.preventDefault();
    if(dialog){opener=a;returnY=scrollY;fromLink=true;history.pushState(null,'','#'+id);syncRoute();}
    else go(id);
  });
  document.getElementById('previous-scene').addEventListener('click',()=>go(chapters[Math.max(0,active-1)].id));
  document.getElementById('next-scene').addEventListener('click',()=>go(chapters[Math.min(5,active+1)].id));
  addEventListener('popstate',syncRoute);
  addEventListener('hashchange',()=>{if(!dialogs.some(d=>d.open))queueMeasure();});
  document.getElementById('copy-email').addEventListener('click',async()=>{
    const status=document.getElementById('copy-status');
    try{await navigator.clipboard.writeText('adam.laaouane.pro@gmail.com');status.textContent=fr?'Adresse copiée.':'Email address copied.';}
    catch{status.textContent=fr?'Sélectionnez l’adresse ci-dessus pour la copier.':'Select the email address above to copy it.';}
  });
  root.classList.add('enhanced');history.scrollRestoration='manual';measure();
  if(location.hash)syncRoute();
  addEventListener('load',queueMeasure,{once:true});
})();
