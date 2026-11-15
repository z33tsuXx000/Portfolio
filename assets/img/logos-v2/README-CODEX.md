# Correctifs logos / fond sombre

Copier logos/ dans Portfolio/assets/img/logos-v2/. Les fichiers SVG sont autonomes et s'utilisent directement avec une balise img. Ils contiennent les PNG originaux et des filtres SVG locaux : ce sont des adaptations web, PAS des masters entièrement vectoriels et PAS des variantes officielles obtenues des marques. Aucun mot ni contour n'a été régénéré. Les sources exactes sont dans originals/.

## Fichiers recommandés sur le portfolio sombre

- esaip-dark.svg : lettres sombres éclaircies, symbole cyan et bandeau conservés. Le texte ÉCOLE D'INGÉNIEURS reste visible dans le bandeau. Remplace le masque monochrome du pack précédent, qui remplissait le bandeau en blanc.
- tryhackme-dark.svg : rouge conservé, Try / Me et chiffres sombres éclaircis. La source exacte est embarquée.
- microsoft-dark.svg : quatre couleurs conservées, mot Microsoft éclairci, damier opaque retiré par filtre. Composition originale verticale conservée.
- toeic-dark.svg : lettres éclaircies pour le fond sombre, accent rouge conservé. Le damier et le blanc de la source sont masqués. Les bords de ce petit raster initial peuvent conserver une finesse irrégulière ; afficher à une taille raisonnable.
- adam-monogram.svg : AL seul, fond noir retiré, cadrage resserré. À utiliser pour la signature et les petits emplacements.
- adam-al.svg : AL avec signature manuscrite originale, sans fond noir. Réserver aux plus grands emplacements où la signature peut être lue.

Les fichiers *-original.svg conservent les couleurs sources pour les fonds clairs. Microsoft et TOEIC incluent aussi le retrait du damier. Les fichiers originaux sont conservés séparément.

## Affichage

Utiliser logos.css. Ne pas ajouter mask-image, brightness/invert, blend-mode, fond de badge blanc, opacité réduite ni objet-fit: cover.
Préserver les proportions : object-fit: contain. Employer une largeur adaptée à la forme du logo plutôt qu'un carré forcé. Le logo ESAIP fourni est petit : éviter de l'agrandir démesurément.

Exemple :

```html
<img class="org-logo" src="assets/img/logos-v2/esaip-dark.svg" alt="ESAIP" width="334" height="165" loading="lazy">
```

Préférer un alt vide si le nom de l'organisme est déjà présent juste à côté. Ne pas remplacer le logo ESAIP Robotics par ESAIP ni UEMC par ESAIP. Ces correctifs complètent le précédent pack et ne remplacent pas les logos non concernés.

Ouvrir index.html localement après extraction pour comparer les rendus en deux tailles, sur fond sombre et clair. Les SVG requièrent la prise en charge de filtres SVG standard dans le navigateur ; ils ne chargent aucun fichier externe et ne contiennent aucun script. Tester le rendu dans le véritable site après intégration. Éviter de les passer par un optimiseur qui supprimerait les filtres ou les images embarquées.
