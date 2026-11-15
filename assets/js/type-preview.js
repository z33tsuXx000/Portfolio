// Apply before the stylesheet paints; no variant is imposed on the main site.
const typographyVariant = new URLSearchParams(location.search).get('type');
if (['a', 'b'].includes(typographyVariant)) document.documentElement.dataset.type = typographyVariant;
