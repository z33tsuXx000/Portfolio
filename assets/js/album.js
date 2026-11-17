(() => {
  'use strict';
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal || !window.ResizeObserver) return;
  const root = document.documentElement;
  const fr = root.lang === 'fr';
  const clickExplore = root.classList.contains('soft-club');
  const opening = document.querySelector('.album-opening');
  const stage = opening.querySelector('.cover-stage');
  const home = document.getElementById('home');
  const chapters = [...document.querySelectorAll('main .scene')];
  const links = [...document.querySelectorAll('.album-index [data-scene-link]')];
  const tracks = [...document.querySelectorAll('.cover-tracklist a')];
  const dialogs = [...document.querySelectorAll('.project-detail')];
  const route = document.querySelector('.journey-list');
  const stops = [...document.querySelectorAll('.journey-stop')];
  const routeLinks = [...document.querySelectorAll('.route-index a')];
  const motion = matchMedia('(min-width: 901px) and (min-height: 701px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  let positions = [], stopPositions = [], scrollExtent = 1, openingDistance = 1;
  let routeTop = 0, routeHeight = 1, active = -1, lastStop = -1, isCover = null;
  let frame = 0, measureFrame = 0, currentDialog = null, preview = -1;
  let restoring = false;
  const nav = document.querySelector('.album-index');
  const coverExtras = [...document.querySelectorAll('.cover-preview,.cover-line,.cover-identity,.cover-edition,.cover-scroll')];
  const documentTop = element => element.getBoundingClientRect().top + scrollY;
  const decodeHash = () => { try { return decodeURIComponent(location.hash.slice(1)); } catch { return 'cover'; } };
  const stateWith = extra => ({...(history.state || {}), ...extra});

  function language() {
    const hash = currentDialog ? currentDialog.id : isCover ? 'cover' : chapters[Math.max(active, 0)].id;
    document.querySelectorAll('[data-language]').forEach(a => {
      const page = new URL(a.href).pathname.split('/').pop();
      a.href = page + '#' + hash;
    });
  }
  function previewTrack(index) {
    if (!tracks.length) return;
    if (preview === index) return;
    preview = index;
    tracks.forEach((a, i) => a.classList.toggle('is-preview', i === index));
    const track = tracks[index], image = document.querySelector('.preview-window img');
    document.querySelector('.cover-preview').dataset.track = track.getAttribute('href').slice(1);
    image.removeAttribute('srcset');
    image.removeAttribute('data-fallback');
    image.src = track.dataset.image;
    document.getElementById('preview-number').textContent = String(index + 1).padStart(2, '0');
    document.getElementById('preview-hint').textContent = track.dataset.hint;
  }
  tracks.forEach((a, i) => {
    a.addEventListener('pointerenter', () => previewTrack(i));
    a.addEventListener('focus', () => previewTrack(i));
  });
  function showChapter(index) {
    if (index === active) return;
    active = index;
    root.dataset.scene = chapters[index].id;
    links.forEach((a, i) => i === index ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'));
    tracks.forEach((a, i) => i === index ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'));
    document.getElementById('scene-counter').textContent = `${String(index + 1).padStart(2, '0')} / 06`;
    document.getElementById('previous-scene').disabled = index === 0;
    document.getElementById('next-scene').disabled = index === chapters.length - 1;
    if (nav.scrollWidth > nav.clientWidth) nav.scrollLeft = links[index].offsetLeft - nav.clientWidth / 2 + links[index].offsetWidth / 2;
    language();
  }
  function update() {
    frame = 0;
    if (currentDialog || clickExplore) return;
    const y = scrollY, h = innerHeight;
    const p = root.classList.contains('album-motion') ? clamp(y / openingDistance) : 0;
    root.style.setProperty('--opening', p.toFixed(4));
    root.style.setProperty('--reading', clamp((p - .5) / .35).toFixed(4));
    root.style.setProperty('--intro-exit', clamp(p / .38).toFixed(4));
    const cover = root.classList.contains('album-motion') ? p < .6 : y < positions[0] - h * .25;
    if (cover !== isCover) {
      isCover = cover;root.classList.toggle('is-cover', cover);
      nav.inert = cover && !root.classList.contains('project-home') && !root.classList.contains('cobalt');
      language();
    }
    if (root.classList.contains('album-motion')) {
      home.inert = p < .6;
      tracks.slice(1).forEach(a => { a.inert = p > .45; a.style.visibility = p > .5 ? 'hidden' : ''; });
      coverExtras.forEach(el => { el.inert = p > .45; el.style.visibility = p > .5 ? 'hidden' : ''; });
    }
    let index = 0;
    positions.forEach((top, i) => { if (top <= y + h * .3) index = i; });
    showChapter(index);
    root.style.setProperty('--progress', clamp(y / scrollExtent).toFixed(4));
    route.style.setProperty('--route-progress', clamp((y + h * .5 - routeTop) / routeHeight).toFixed(4));
    if (root.classList.contains('cobalt')) return;
    let stop = 0;
    stopPositions.forEach((top, i) => { if (top <= y + h * .5) stop = i; });
    if (stop !== lastStop) {
      lastStop = stop;
      stops.forEach((el, i) => el.classList.toggle('is-reading', i === stop));
      routeLinks.forEach((a, i) => i === stop ? a.setAttribute('aria-current', 'step') : a.removeAttribute('aria-current'));
      const menu = routeLinks[stop].parentElement, a = routeLinks[stop];
      if (a.offsetTop < menu.scrollTop || a.offsetTop + a.offsetHeight > menu.scrollTop + menu.clientHeight) menu.scrollTop = a.offsetTop - menu.offsetTop - menu.clientHeight / 2;
    }
  }
  function measure() {
    measureFrame = 0;
    openingDistance = Math.max(1, opening.offsetHeight - stage.offsetHeight);
    positions = chapters.map(c => c === home && root.classList.contains('album-motion') ? openingDistance : documentTop(c) - (root.classList.contains('cobalt') ? document.querySelector('.masthead').offsetHeight : 80));
    stopPositions = stops.map(documentTop);
    routeTop = documentTop(route);routeHeight = route.offsetHeight;
    scrollExtent = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    update();
  }
  const queueMeasure = () => { if (!measureFrame) measureFrame = requestAnimationFrame(measure); };
  function mode() {
    root.classList.toggle('album-motion', motion.matches && !reduced.matches && !root.classList.contains('liquid') && !root.classList.contains('cobalt'));
    home.inert = false;
    [...tracks, ...coverExtras].forEach(el => { el.inert = false;el.style.visibility = ''; });
    isCover = null;measure();
  }
  addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, {passive:true});
  addEventListener('resize', queueMeasure);
  motion.addEventListener('change', mode);reduced.addEventListener('change', mode);
  new ResizeObserver(queueMeasure).observe(document.querySelector('main'));

  // Selection replaces only its neighbouring panel; the full text is in HTML.
  const skillButtons = [...document.querySelectorAll('.skill-index button')];
  skillButtons.forEach((button, i) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    button.id = 'skill-choice-' + i;
    panel.setAttribute('aria-labelledby', button.id);
    panel.setAttribute('role', 'region');
    button.addEventListener('click', () => {
      skillButtons.forEach(b => {
        const selected = b === button;b.setAttribute('aria-pressed', String(selected));
        document.getElementById(b.getAttribute('aria-controls')).hidden = !selected;
      });
      queueMeasure();
    });
    if (i === 0) button.click();
  });
  document.querySelectorAll('.credential').forEach(d => d.addEventListener('toggle', () => {
    if (d.open) document.querySelectorAll('.credential').forEach(other => { if (other !== d) other.open = false; });
    queueMeasure();
  }));

  function remember() {
    history.replaceState(stateWith({albumY:scrollY}), '', location.href);
  }
  function navigate(id, push = true) {
    const target = document.getElementById(id);
    if (!target) return;
    if (push) { remember();history.pushState({albumAnchor:id}, '', '#' + id); }
    if (clickExplore) {
      const section = target.closest('main .scene');
      const selected = section || opening;
      opening.hidden = selected !== opening;
      chapters.forEach(c => { c.hidden = c !== selected; });
      isCover = selected === opening;
      root.classList.toggle('is-cover', isCover);
      if (!isCover) showChapter(chapters.indexOf(selected));
      nav.inert = false;
    }
    measure();
    const y = clickExplore && (target === opening || chapters.includes(target)) ? 0 : id === 'cover' ? 0 : id === 'home' ? positions[0] : Math.max(0, documentTop(target) - (root.classList.contains('cobalt') ? document.querySelector('.masthead').offsetHeight : 100));
    scrollTo({top:y, behavior:'instant'});
    if (!target.hasAttribute('tabindex') && !target.matches('a,button')) target.setAttribute('tabindex', '-1');
    target.focus({preventScroll:true});
    update();language();
  }
  function openDetail(dialog) {
    if (currentDialog === dialog) return;
    if (currentDialog) currentDialog.close();
    currentDialog = dialog;
    document.body.classList.add('modal-open');
    dialog.showModal();dialog.scrollTop = 0;
    dialog.querySelector('.close-dialog').focus({preventScroll:true});
    language();
  }
  function dismiss() {
    if (!currentDialog) return;
    if (history.state?.albumDetail && history.state?.albumReturn) {
      history.back();
    } else {
      currentDialog.close();currentDialog = null;
      document.body.classList.remove('modal-open');
      history.replaceState({albumAnchor:'portfolio'}, '', '#portfolio');
      navigate('portfolio', false);
    }
  }
  dialogs.forEach(d => {
    d.removeAttribute('open');
    d.addEventListener('cancel', e => {e.preventDefault();dismiss();});
    d.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => {e.preventDefault();dismiss();}));
    d.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = [...d.querySelectorAll('a[href],button,input,select,textarea,[tabindex="0"]')].filter(el => el.getClientRects().length);
      if (e.shiftKey && document.activeElement === focusable[0]) {e.preventDefault();focusable.at(-1).focus();}
      else if (!e.shiftKey && document.activeElement === focusable.at(-1)) {e.preventDefault();focusable[0].focus();}
    });
  });
  function syncRoute(restore = false) {
    if (restoring) return;
    const id = decodeHash() || 'cover', dialog = dialogs.find(d => d.id === id);
    if (dialog) {
      if (!history.state?.albumReturn) navigate('portfolio', false);
      openDetail(dialog);return;
    }
    const wasOpen = currentDialog;
    if (wasOpen) {wasOpen.dispatchEvent(new Event('detailclosing'));wasOpen.close();currentDialog = null;document.body.classList.remove('modal-open');}
    measure();
    if (restore && Number.isFinite(history.state?.albumY)) {
      if (clickExplore) navigate(id, false);
      scrollTo({top:history.state.albumY, behavior:'instant'});
      const opener = document.getElementById(history.state.albumFocus || '');
      if (opener) opener.focus({preventScroll:true});
      else document.getElementById(id)?.focus({preventScroll:true});
    } else navigate(id, false);
    update();language();
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0) return;
    const id = a.getAttribute('href').slice(1), target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (target.matches('.project-detail')) {
      if (!a.id) a.id = 'project-opener-' + [...document.querySelectorAll('a')].indexOf(a);
      history.replaceState(stateWith({albumY:scrollY,albumFocus:a.id}), '', location.href);
      history.pushState({albumDetail:id,albumReturn:true}, '', '#' + id);
      openDetail(target);
    } else if (currentDialog && currentDialog.contains(target)) {
      target.scrollIntoView({behavior:'instant',block:'start'});
      target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
    } else {
      if (currentDialog) {currentDialog.close();currentDialog=null;document.body.classList.remove('modal-open');}
      navigate(id);
    }
  });
  addEventListener('popstate', () => {
    syncRoute(true);restoring = true;setTimeout(() => {restoring = false;}, 0);
  });
  addEventListener('hashchange', () => {if (!restoring) syncRoute(false);});
  document.getElementById('previous-scene').addEventListener('click', () => navigate(chapters[Math.max(0, active - 1)].id));
  document.getElementById('next-scene').addEventListener('click', () => navigate(chapters[Math.min(chapters.length - 1, active + 1)].id));
  document.getElementById('copy-email').addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    try {await navigator.clipboard.writeText('adam.laaouane.pro@gmail.com');status.textContent = fr ? 'Adresse copiée.' : 'Email address copied.';}
    catch {status.textContent = fr ? 'Sélectionnez l’adresse ci-dessus pour la copier.' : 'Select the email address above to copy it.';}
  });
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    const fallback = () => {const src = img.dataset.fallback;if (!src) return;delete img.dataset.fallback;img.removeAttribute('srcset');img.src = src;};
    img.addEventListener('error', fallback);
    if (img.complete && !img.naturalWidth) fallback();
  });
  root.classList.add('enhanced');if (clickExplore) root.classList.add('click-explore');history.scrollRestoration = 'manual';
  mode();previewTrack(root.classList.contains('liquid') ? 4 : 0);
  syncRoute(false);
  addEventListener('load', () => {measure();if (!currentDialog && !Number.isFinite(history.state?.albumY)) syncRoute(false);}, {once:true});
})();
