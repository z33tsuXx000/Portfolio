# Présentation nocturne — étape à valider

**Historique :** cette étape est remplacée par la [traversée narrative sur les six chapitres](SCROLL-NARRATIVE.md).

Branche : `design/nocturnal-introduction`.

Cette étape concerne uniquement **la Présentation et l’interface persistante**, conformément à la demande. Les cinq autres compositions attendent la validation de cette direction. Aucun déploiement ni push n’a été effectué.

## Aperçu

- [Français](http://127.0.0.1:4173/index.html#home)
- [English](http://127.0.0.1:4173/en.html#home)
- [Capture desktop FR](previews/nocturne-fr-1440.png)
- [Capture mobile FR](previews/nocturne-fr-390.png)
- [Capture desktop EN](previews/nocturne-en-1440.png)
- [Capture mobile EN](previews/nocturne-en-390.png)

Relancer le serveur local si nécessaire : `python -m http.server 4173 --bind 127.0.0.1` depuis la racine du dépôt.

## Traitement

La feuille `assets/css/night-intro.css` isole la correction pour la rendre réversible. L’image source et ses variantes WebP restent intactes.

- Exposition, contraste et saturation ajustés sur le fond de Présentation uniquement.
- Ombres bleu encre directionnelles : profondeur à gauche pour les textes, assombrissement du sol et des bords ; les matières et reflets à droite restent perceptibles.
- Suppression du halo blanc derrière l’introduction et des cartouches clairs de l’interface persistante.
- Navigation fine, signature discrète, texte blanc froid grisé et petits repères aqua.
- Accroche existante conservée ; seconde ligne en italique Georgia, sans téléchargement de police.
- Actions compactes : projet sur verre fumé léger, parcours souligné.
- Recadrage et ombres adaptés au mobile ; texte lisible sans `backdrop-filter`.

Les textes FR/EN et les destinations des liens ont été comparés à l’état précédant cette correction : ils sont inchangés. Le HTML des cinq autres scènes et la feuille CSS principale sont identiques. Les composants persistants prennent la nouvelle palette ; les contenus des cinq autres scènes ne sont pas encore déclinés dans cette direction.

## Vérifications

Chrome, FR et EN : 1440 × 900, 390 × 844, 360 × 800 et 768 × 1024. Vérification des images, absence de débordement horizontal, accès projets/parcours, ouverture et fermeture du lab SOC, maintien de l’ancre lors du changement de langue et réduction des animations. Aucune exception JavaScript ni erreur HTTP de ressource locale détectée pendant ce parcours.

Les captures sont des rendus réels du navigateur. Le CV reste le PDF original et le portrait reste absent.

## Limite du fond actuel

Le traitement établit une ambiance sombre et froide, mais **ne recrée pas un éclairage nocturne** : les grandes vitres, le ciel et les reflets de la source conservent leur lumière diurne diffuse. Pour atteindre pleinement le terminal à 2 h du matin, une **version nocturne de `assets/img/backgrounds/Présentation.webp` est nécessaire**, conservant architecture, cadrage et banquettes, avec un extérieur réellement sombre et des sources lumineuses localisées.

Aucune image de remplacement n’a été introduite ni générée. Arrêt à cette étape pour validation de la composition et de la palette avant toute déclinaison aux cinq autres scènes.
