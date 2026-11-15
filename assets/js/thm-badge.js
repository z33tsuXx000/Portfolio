// The official cross-origin document has a fixed 329 x 88 px canvas.
// Scale its viewport, not its contents; never crop the badge or cache its data.
document.querySelectorAll('.thm-badge-viewport').forEach(viewport => {
  const fit = () => {
    if (viewport.clientWidth) viewport.style.setProperty('--thm-scale', Math.min(1, viewport.clientWidth / 329));
  };
  fit();
  if (window.ResizeObserver) new ResizeObserver(fit).observe(viewport);
  else addEventListener('resize', fit);
});
