(() => {
 const panel=document.querySelector('.project-selection');
 if(!panel)return;
 const links=[...document.querySelectorAll('[data-project-preview]')];
 const buttons=[...document.querySelectorAll('.project-select')];
 const media=['wazuh-alert.png','PSIR.jpg','ss.png',null,'tournoi.png'];
 function select(i){
  const link=links[i],img=panel.querySelector('img');
  img.src=media[i]?'assets/img/projects/'+media[i]:'assets/img/logos/esaip-robotics.png';
  const name=link.querySelector('.project-name').cloneNode(true);
  name.querySelector('small')?.remove();
  img.alt=name.textContent.trim();
  panel.classList.toggle('robotics-preview',i===3);
  panel.querySelector('h3').textContent=name.textContent.trim();
  img.parentElement.href = img.src;
  panel.querySelector('.event-note').hidden = i !== 0;
  panel.querySelector('.selected-project-open').href=link.getAttribute('href');
  buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
  links.forEach((a,j)=>a.classList.toggle('is-selected',i===j));
 }
 buttons.forEach((b,i)=>b.addEventListener('click',()=>select(i)));
 links.forEach((a,i)=>{a.addEventListener('focus',()=>select(i));a.addEventListener('pointermove',()=>select(i));});
 select(0);
})();
