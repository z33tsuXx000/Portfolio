# Logos intégrés

**Album interactif :** le site actuel utilise `assets/css/album.css`. Aucun logo institutionnel n’y reçoit de masque monochrome. ESAIP utilise le SVG sombre fourni ; ESAIP Robotics conserve son PNG en couleurs, placé sur une zone claire avec son nom. Les instructions de masque ci-dessous documentent l’étape précédente, conservée uniquement dans les aperçus historiques. UEMC est désormais rangé dans `assets/img/logos/uemc.jpg`.

**Mise à jour :** ESAIP utilise désormais l’adaptation `../logos-v2/esaip-dark.svg`, à la place du masque décrit ci-dessous. Les autres logos de ce pack restent conservés. Voir `../logos-v2/INTEGRATION.md`.

Les cinq PNG et `manifest.json` proviennent du lot fourni `portfolio-logo-pack`. Ils sont copiés sans transformation. Les sources de référence du lot sont conservées dans `originals/`.

- `esaip.png` : transparent, couleurs originales, 334 × 165 px. Affichage limité à 128 px de largeur sur desktop et 112 px sur mobile.
- `han.png` : fichier avec son **fond noir d’origine**, non transparent. Aucun détourage effectué.
- `happy-babees.png` : transparence et slogan intégral conservés.
- `esaip-robotics.png` : dérivé assisté fourni, pas un master vectoriel officiel.
- `wilaya-emblem.png` : extraction assistée fournie, pas un master officiel. Le nom de la préfecture est présent en HTML à côté du blason.

ESAIP et ESAIP Robotics utilisent le masque monochrome optionnel du CSS fourni. Il colore la silhouette entière, symbole compris : **traitement graphique, pas variante blanche officielle**. Les PNG originaux restent intacts et le nom de chaque organisme est affiché en texte HTML. Si les masques ne sont pas pris en charge, le PNG original reste affiché sur un éclaircissement local diffus.

Les dimensions intrinsèques des images HTML proviennent du manifeste. L’affichage utilise `object-fit: contain`, sans recadrage, filtre, réduction d’opacité ou fond de badge. Les images sont chargées paresseusement ; leur `alt` est vide lorsque le nom adjacent remplit déjà cette fonction.

UEMC conserve `assets/img/uemc.jpg`. Le fichier historique `er.png` correspond à ESAIP Robotics ; il n’est pas utilisé pour UEMC. Les anciens médias restent conservés.

L’aperçu du lot, avec ses chemins adaptés, est disponible dans `docs/logos/apercu.html`. Les textes d’expériences et de projets restent inchangés en français et en anglais.
