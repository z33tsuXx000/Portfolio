(() => {
  'use strict';
  const face = document.querySelector('.cover-face');
  const art = face.querySelector('.cover-art img');
  const svg = face.querySelector('.project-tethers');
  const projects = [...face.querySelectorAll('[data-home-project]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const socDialog = document.getElementById('portfolioModal5');
  const nodes = [...socDialog.querySelectorAll('.soc-node')];
  let closingTitle=null;
  socDialog.addEventListener('detailclosing',()=>{
    const title=socDialog.querySelector('h2');
    closingTitle={rect:title.getBoundingClientRect(),font:getComputedStyle(title).fontSize};
  });
  nodes.forEach(node => node.addEventListener('click', () => {
    nodes.forEach(other => other.setAttribute('aria-pressed',String(other===node)));
    document.getElementById('soc-node-description').textContent=node.dataset.description;
  }));
  socDialog.addEventListener('close', () => {
    requestAnimationFrame(()=>{
      if (reduced.matches || !document.documentElement.classList.contains('is-cover'))return;
      art.animate([{transform:'scale(1.035)'},{transform:'scale(1)'}],{duration:480,easing:'ease-out'});
      if (!closingTitle || closingTitle.rect.bottom<0 || closingTitle.rect.top>innerHeight)return;
      const title=document.querySelector('#home-soc h2'),to=title.getBoundingClientRect(),from=closingTitle.rect;
      const clone=document.createElement('div');clone.className='shared-project-fragment';clone.setAttribute('aria-hidden','true');clone.textContent=title.textContent.trim();
      Object.assign(clone.style,{background:'transparent',left:from.left+'px',top:from.top+'px',width:from.width+'px',height:from.height+'px',fontSize:closingTitle.font});
      document.body.append(clone);title.style.visibility='hidden';
      const animation=clone.animate([{left:from.left+'px',top:from.top+'px',width:from.width+'px',fontSize:closingTitle.font},{left:to.left+'px',top:to.top+'px',width:to.width+'px',fontSize:getComputedStyle(title).fontSize}],{duration:440,easing:'cubic-bezier(.2,.75,.2,1)',fill:'forwards'});
      const cleanup=()=>{title.style.removeProperty('visibility');clone.remove();};animation.finished.then(cleanup,cleanup);closingTitle=null;
    });
  });
  // Source-pixel anchors lie on the central branch and right-hand silver joint.
  const anchors = {soc:[800,390], game:[1030,415]};
  function connect() {
    const base=face.getBoundingClientRect(), photo=art.getBoundingClientRect();
    const scale=Math.max(photo.width/1672,photo.height/941);
    const cropX=(1672*scale-photo.width)/2,cropY=(941*scale-photo.height)/2;
    svg.setAttribute('viewBox',`0 0 ${base.width} ${base.height}`);
    projects.forEach(project => {
      const key=project.dataset.homeProject, dot=project.querySelector('.home-project-number').getBoundingClientRect();
      const [sx,sy]=anchors[key];
      const x=photo.left-base.left+sx*scale-cropX,y=photo.top-base.top+sy*scale-cropY;
      const dx=dot.left-base.left+dot.width/2,dy=dot.top-base.top+dot.height/2;
      const titleRight=project.querySelector('h2').getBoundingClientRect().right-base.left;
      const path=key==='soc'?`M ${x} ${y} L ${titleRight+20} ${dy-50} L ${dx} ${dy-50} L ${dx} ${dy-15}`:`M ${x} ${y} L ${dx} ${dy-42} L ${dx} ${dy-15}`;
      svg.querySelector(`[data-tether=${key}]`).setAttribute('d',path);
      const circle=svg.querySelector(`[data-anchor=${key}]`);circle.setAttribute('cx',x);circle.setAttribute('cy',y);
    });
  }
  new ResizeObserver(connect).observe(face);
  art.addEventListener('load',connect);document.fonts.ready.then(connect);
  projects.forEach(project => {
    function emphasize(on){svg.querySelector(`[data-tether=${project.dataset.homeProject}]`).classList.toggle('is-emphasized',on);}
    project.addEventListener('pointerenter',()=>emphasize(true));project.addEventListener('pointerleave',()=>emphasize(false));
    project.addEventListener('focus',()=>emphasize(true));project.addEventListener('blur',()=>emphasize(false));
  });
  document.addEventListener('click',event => {
    const link=event.target.closest('[data-home-project]');
    if(!link||reduced.matches||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button>0)return;
    const sourceImage=link.querySelector('img'),sourceTitle=link.querySelector('h2');
    const fromImage=sourceImage.getBoundingClientRect(),fromTitle=sourceTitle.getBoundingClientRect();
    const sourceFont=getComputedStyle(sourceTitle).fontSize;
    const dialog=document.querySelector(link.getAttribute('href'));
    // album.js owns routes, modal focus and history. Animate the shared media
    // after it opens the native dialog, in that dialog's top layer.
    requestAnimationFrame(()=>{
      if(!dialog.open)return;
      const targetImage=dialog.querySelector('.dialog-content img'),targetTitle=dialog.querySelector('h2');
      const active=[];
      function travel(source,target,from,isTitle){
        const to=target.getBoundingClientRect(),clone=isTitle?document.createElement('div'):source.cloneNode();
        if(isTitle)clone.textContent=target.textContent.trim();
        clone.removeAttribute('id');clone.className='shared-project-fragment';clone.setAttribute('aria-hidden','true');
        Object.assign(clone.style,{left:from.left+'px',top:from.top+'px',width:from.width+'px',height:from.height+'px',fontSize:sourceFont});
        if(!isTitle)clone.style.objectFit=getComputedStyle(source).objectFit;
        else clone.style.background='transparent';
        dialog.append(clone);target.style.visibility='hidden';
        const animation=clone.animate([
          {left:from.left+'px',top:from.top+'px',width:from.width+'px',height:from.height+'px',fontSize:sourceFont},
          {left:to.left+'px',top:to.top+'px',width:to.width+'px',height:to.height+'px',fontSize:getComputedStyle(target).fontSize}
        ],{duration:560,easing:'cubic-bezier(.2,.75,.2,1)',fill:'forwards'});
        const cleanup=()=>{target.style.removeProperty('visibility');clone.remove();};
        active.push({animation,cleanup});animation.finished.then(cleanup,cleanup);
      }
      if (link.dataset.homeProject==='soc') {
        const target=socDialog.querySelector('.soc-architecture');
        const peek=link.querySelector('.soc-peek-nodes');
        const from=peek.getBoundingClientRect(),to=target.getBoundingClientRect();
        if (from.width>0 && from.height>0) {
          const clone=target.cloneNode(true);
          clone.classList.add('shared-soc-architecture');clone.setAttribute('aria-hidden','true');clone.inert=true;
          Object.assign(clone.style,{left:to.left+'px',top:to.top+'px',width:to.width+'px',height:to.height+'px'});
          socDialog.append(clone);target.style.visibility='hidden';
          const animation=clone.animate([
            {transform:`translate(${from.left-to.left}px,${from.top-to.top}px) scale(${from.width/to.width},${from.height/to.height})`,opacity:.7},
            {transform:'translate(0,0) scale(1)',opacity:1}
          ],{duration:620,easing:'cubic-bezier(.2,.75,.2,1)',fill:'forwards'});
          const cleanup=()=>{target.style.removeProperty('visibility');clone.remove();};
          active.push({animation,cleanup});animation.finished.then(cleanup,cleanup);
        } else target.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:360,easing:'ease-out'});
        socDialog.querySelector('.soc-decor img').animate([{transform:'scale(1.08)',opacity:.85},{transform:'scale(1)',opacity:.55}],{duration:700,easing:'ease-out'});
      } else travel(sourceImage,targetImage,fromImage,false);
      travel(sourceTitle,targetTitle,fromTitle,true);
      dialog.addEventListener('close',()=>active.forEach(({animation,cleanup})=>{animation.cancel();cleanup();}),{once:true});
    });
  },true);
})();
