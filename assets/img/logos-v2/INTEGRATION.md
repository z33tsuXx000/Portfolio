# Adaptations web pour fond sombre

Le contenu de `logos/` du lot `portfolio-logos-v2` est copié ici **octet pour octet**, sans optimisation ni réécriture des SVG. Les sources exactes sont conservées dans `originals/` et les instructions fournies dans `README-CODEX.md`.

Ces fichiers embarquent des PNG et des filtres SVG locaux : ce sont des adaptations web, **pas des masters entièrement vectoriels ni des variantes officielles des marques**. Aucun tracé ni mot n’a été régénéré pendant l’intégration.

## Utilisation dans le portfolio

- `esaip-dark.svg` remplace le masque monochrome ESAIP dans les trois étapes du parcours. Symbole cyan, lettres et texte du bandeau sont conservés à l’affichage.
- `tryhackme-dark.svg` remplace les deux logos des certifications TryHackMe.
- `microsoft-dark.svg` conserve la composition verticale et les quatre couleurs.
- `toeic-dark.svg` est affiché à 110 px sur desktop et 100 px sur mobile pour éviter un agrandissement excessif du raster.
- `adam-monogram.svg` est utilisé dans la signature persistante et comme favicon SVG.
- `adam-al.svg` reste disponible sans être réduit à une petite icône : aucun grand emplacement de signature n’est ajouté à cette étape.

La feuille `assets/css/logos-v2.css` reprend le CSS fourni et adapte les dimensions au layout. Les SVG sont utilisés directement par des balises `img`, avec dimensions intrinsèques, proportions préservées et `object-fit: contain`. Les images hors écran ont `loading="lazy"`. Les noms adjacents rendent les alternatives textuelles vides appropriées.

Aucun masque, filtre CSS, mode de fusion, fond blanc de badge ou réduction d’opacité n’est appliqué aux images du pack v2. Les filtres internes des SVG restent intacts.

**Non concernés et conservés :** ESAIP Robotics (son propre logo du pack précédent), UEMC (`uemc.jpg`), HAN, Happy Babees et l’emblème de la préfecture. Le pack v2 ne propose pas de correction spécifique pour Robotics : son traitement précédent n’est pas remplacé par ESAIP.

## Validation

L’aperçu fourni est consultable à `/docs/logos-v2/index.html`, avec chemins adaptés vers ces fichiers. Il présente les deux tailles et les rendus sombre/clair.

Tests dans le vrai portfolio, en FR/EN, sous Chrome à 1440, 390 et 360 px : chargement des SVG, absence d’erreurs locales et de débordement, styles sans transformation supplémentaire, signature compatible avec les deux essais typographiques A/B. Les captures ont été examinées pour le bandeau ESAIP et les logos de certification.

Comparaisons automatiques : fichiers SVG et originaux identiques au lot, absence de scripts et références externes dans les SVG, dimensions HTML issues des SVG, textes inchangés, sections des organismes non concernés inchangées. Les filtres requièrent un navigateur compatible avec les filtres SVG standard ; validation réalisée dans Chrome, pas dans tous les moteurs.

Rendu Microsoft/TOEIC sur mobile : `/docs/previews/logos-v2-cert-3-390.png`. Rendu ESAIP desktop : `/docs/previews/logos-v2-esaip-1440.png`.

Aucun déploiement effectué.
