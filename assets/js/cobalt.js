(() => {
 'use strict';
 const root=document.documentElement;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const routeLinks=[...document.querySelectorAll('.route-index a')];
 const stops=[...document.querySelectorAll('.journey-stop')];
 function selectStop(id){
  if(!stops.some(s=>s.id===id))return;
  stops.forEach(s=>{s.hidden=s.id!==id;s.classList.toggle('is-reading',s.id===id);});
  routeLinks.forEach(a=>a.getAttribute('href')==='#'+id?a.setAttribute('aria-current','step'):a.removeAttribute('aria-current'));
 }
 const initial=location.hash.slice(1);selectStop(stops.some(s=>s.id===initial)?initial:stops[0].id);
 document.addEventListener('click',event=>{
  const link=event.target.closest('.route-index a');if(link)selectStop(link.hash.slice(1));
 },true);
 addEventListener('popstate',()=>{if(location.hash.startsWith('#stop-'))selectStop(location.hash.slice(1));},true);
 addEventListener('hashchange',()=>{if(location.hash.startsWith('#stop-'))selectStop(location.hash.slice(1));},true);
 const tabs=[...document.querySelectorAll('.album-index [data-scene-link]')];
 function syncTabs(){tabs.forEach(a=>{
  const selected=!root.classList.contains('is-cover')&&a.dataset.sceneLink===root.dataset.scene;
  if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
 });}
 new MutationObserver(syncTabs).observe(root,{attributes:true,attributeFilter:['class','data-scene']});syncTabs();
 let effects=[],outgoing=null;
 function cancel(){effects.forEach(a=>a.cancel());effects=[];outgoing?.remove();outgoing=null;}
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');
  if(!link||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey||event.button>0)return;
  const target=document.getElementById(link.hash.slice(1));
  if(!target||!(target.matches('main .scene')||target.id==='cover'))return;
  cancel();
  if(reduced.matches)return;
  const from=root.classList.contains('is-cover')?document.querySelector('.cover-copy'):document.querySelector('#'+root.dataset.scene+' .scene-content');
  const fromRect=from?.getBoundingClientRect(),copy=from?.cloneNode(true);
  if(copy){copy.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));copy.removeAttribute('id');}
  requestAnimationFrame(()=>{
   if(copy&&fromRect.bottom>66&&fromRect.top<innerHeight){
    outgoing=document.createElement('div');outgoing.className='scene-transition-out';outgoing.setAttribute('aria-hidden','true');outgoing.inert=true;
    Object.assign(copy.style,{position:'absolute',left:fromRect.left+'px',top:fromRect.top+'px',width:fromRect.width+'px',margin:'0',padding:'0',maxWidth:'none'});
    outgoing.append(copy);document.body.append(outgoing);
    const holder=outgoing;const exit=copy.animate([{transform:'translateX(0)',opacity:1},{transform:'translateX(-45px)',opacity:0}],{duration:220,easing:'ease-in',fill:'forwards'});
    effects.push(exit);exit.finished.then(()=>holder.remove(),()=>holder.remove());
   }
   const content=target.querySelector('.scene-content,.cover-copy');
   const art=target.querySelector('.cobalt-decor');
   if(content)effects.push(content.animate([{opacity:0,transform:'translateX(18px)',offset:0},{opacity:0,transform:'translateX(18px)',offset:.32},{opacity:1,transform:'translateX(0)',offset:1}],{duration:420,easing:'cubic-bezier(.2,.7,.2,1)'}));
   if(art)effects.push(art.animate([{opacity:.45,transform:'translateX(20px)'},{opacity:1,transform:'translateX(0)'}],{duration:520,easing:'cubic-bezier(.2,.7,.2,1)'}));

  });
 },true);
 reduced.addEventListener('change',cancel);
 // Give each actual project image an accessible full-size view without
 // inventing a gallery or replacing the source image.
 document.querySelectorAll('.dialog-content img').forEach(img=>{
  if(img.closest('a')||img.classList.contains('organization-logo'))return;
  const a=document.createElement('a');a.href=img.getAttribute('src');a.target='_blank';a.rel='noopener';
  a.setAttribute('aria-label',(root.lang==='fr'?'Ouvrir l’image en taille réelle : ':'Open full-size image: ')+(img.alt||''));
  img.replaceWith(a);a.append(img);
 });
})();
