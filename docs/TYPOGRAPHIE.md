# Deux traitements de l’accueil

[Comparaison interactive](http://127.0.0.1:4173/typography.html) : bascule A/B et FR/EN, sur le même accueil avec les mêmes images, couleurs, contenus et interactions. Les variantes ne s’appliquent qu’à la Présentation et à ses repères persistants. Aucun choix n’est généralisé aux cinq autres chapitres.

Les seuls textes remplacés sont les deux phrases explicitement retenues : « Suivre les traces. Apprendre à voir au-delà. » et « Following the traces. Learning to see beyond them. ». Le reste a été comparé automatiquement à l’état précédent : inchangé.

## A — Signal fluide

**Display : Barlow Semi Condensed Light 300.** Deux phrases de taille proche, deuxième ligne en retrait de 54 px sur desktop. Le rythme reste ouvert et horizontal ; la silhouette est légère sans italique. Sur mobile, le retrait passe à 22 px, la seconde phrase se répartit naturellement sur plusieurs lignes.

- [FR](http://127.0.0.1:4173/index.html?type=a#home) · [EN](http://127.0.0.1:4173/en.html?type=a#home)
- [Capture desktop](previews/type-a-fr-1440.png) · [Capture mobile](previews/type-a-fr-390.png)

## B — Index décalé

**Display : IBM Plex Sans Condensed Light 300.** Première phrase plus petite ; deuxième phrase plus ample, en retrait de 110 px et sur deux lignes sur desktop. Le métier et les actions suivent cet axe secondaire. Sur mobile, le texte professionnel revient à l’axe principal et le titre garde un retrait réduit à 26 px.

- [FR](http://127.0.0.1:4173/index.html?type=b#home) · [EN](http://127.0.0.1:4173/en.html?type=b#home)
- [Capture desktop](previews/type-b-fr-1440.png) · [Capture mobile EN](previews/type-b-en-390.png)

## Deux rôles de soutien communs

- **Texte : Barlow Regular 400**, 19 px sur desktop, 17 px pour le métier sur mobile. La lecture n’est pas en graisse légère.
- **Repères : Courier New / monospace système**, pour les courts libellés techniques, numéros et annotations. Aucun fichier de police supplémentaire.

Chaque traitement utilise donc trois rôles, deux WOFF2 et une monospace système. Les titres ont un crénage natif et un tracking modéré (−0,012 em pour A, −0,008 em pour B). Aucun effet lettre par lettre, contour, flou ou italique. Le comportement au scroll et la réduction des animations existants sont conservés.

## Fontes, licences et chargement

Aucune fonte n’était embarquée dans le dépôt avant cette étude : seules Segoe UI, Arial, Georgia et Courier New étaient référencées comme polices système. Les fontes Windows disponibles ne sont pas redistribuées.

Les nouveaux fichiers proviennent de Google Fonts et sont couverts par la **SIL Open Font License 1.1**. Les avis de copyright et textes complets de licence sont conservés avec les fichiers, ainsi que les URL de provenance dans `assets/fonts/sources.json` :

- [Licence Barlow](https://raw.githubusercontent.com/google/fonts/main/ofl/barlow/OFL.txt)
- [Licence Barlow Semi Condensed](https://raw.githubusercontent.com/google/fonts/main/ofl/barlowsemicondensed/OFL.txt)
- [Licence IBM Plex Sans Condensed](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexsanscondensed/OFL.txt)

Fichiers WOFF2 locaux, jeu latin pour FR/EN, une seule graisse par fichier et `font-display: swap`. Aucun appel Google Fonts à l’exécution. La variante A charge environ 44,3 ko de fontes ; B environ 42 ko. Les déclarations de la variante inactive ne provoquent pas son téléchargement. Le site sans paramètre `type` ne sélectionne aucune des nouvelles familles.

Fallbacks Arial/Arial Narrow avec ajustements de métriques, mesurés sur un échantillon de texte dans Chrome. Ils réduisent les écarts de largeur et de hauteur sans garantir une absence totale de changement de ligne sur toutes les plateformes. Segoe UI et sans-serif restent des replis si Arial Narrow n’est pas disponible.

## Vérifications

Chrome, les deux variantes et les deux langues, aux dimensions 1440 × 1000, 390 × 844 et 360 × 800 : chargement des fontes, absence de débordement horizontal, styles non italiques, conservation de la variante au changement de langue et fonctionnement de la comparaison. Captures examinées sur desktop et mobile. Aucune erreur de ressource ou exception JavaScript observée.

Les fichiers des cinq autres chapitres ne reçoivent pas la nouvelle typographie. Le CV et les médias restent inchangés. Aucun déploiement effectué ; choix A/B à valider avant généralisation.
