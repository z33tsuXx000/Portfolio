# Portfolio — Adam Laaouane

Portfolio statique bilingue, sans dépendance JavaScript externe. Une couverture interactive ouvre un livret à six chapitres, avec les ancres `#home`, `#services`, `#parcours`, `#certifications`, `#portfolio` et `#contact`. `#cover` ramène à la couverture.

La version actuelle est l’[album interactif](docs/ALBUM.md), sur la branche `design/interactive-album`. Le scroll transforme la couverture en note d’ouverture ; la tracklist et l’index du livret donnent un accès immédiat aux chapitres. Les étapes précédentes restent documentées comme historique.

L’ancienne [comparaison typographique A/B](docs/TYPOGRAPHIE.md) est archivée sur `http://127.0.0.1:4173/typography.html`. L’album utilise Barlow Semi Condensed Light pour le display et Barlow Regular pour les textes, avec repères monospace.

## Aperçu local

Depuis la racine du dépôt :

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Ouvrir **http://127.0.0.1:4173/** (FR) ou **http://127.0.0.1:4173/en.html** (EN). Arrêter le serveur avec `Ctrl+C`.

## Organisation

- `index.html` / `en.html` : contenu complet, navigation et détails des projets.
- `assets/css/album.css` : compositions, ouverture, livret et adaptations mobile.
- `assets/css/fonts.css` / `icons.css` : fontes locales sous OFL et pictogrammes fournis.
- `assets/js/album.js` : scroll natif, sélection, historique, dialogues, focus et copie d’adresse.
- `assets/img/backgrounds/` : les six fonds définitifs, fichiers sources intacts.
- `assets/img/projects/` : illustrations et captures réelles des projets.
- `assets/img/logos/` et `assets/img/logos-v2/` : logos, adaptations pour fond sombre et originaux de référence.
- `assets/icons/` : pictogrammes, drapeaux et variantes sociales du pack fourni.
- `assets/logos/anssi.png` : logo ANSSI original, sans transformation.
- `assets/scenes/` : déclinaisons WebP des fonds (800 px et jusqu’à 1672 px, sans agrandissement de la source).
- `assets/files/CV_Adam_Laaouane.pdf` : CV original inchangé.

Le [bilan des assets et des icônes](docs/ASSETS.md) détaille le rangement, les suppressions et les vérifications. L’[aperçu des icônes](docs/icons/index.html) reprend les fichiers du pack avec les chemins du portfolio.

Le défilement est natif sur desktop comme sur mobile. L’ouverture desktop suit la position du scroll sur moins d’un viewport supplémentaire, puis laisse place au document. Sur mobile et avec réduction des animations, la couverture et la note d’ouverture se suivent naturellement. Les sélections directes sont immédiates. L’itinéraire se construit au scroll ; compétences et certifications se consultent localement, sans fenêtres imbriquées.

Les liens `#portfolioModal1` à `#portfolioModal5` ouvrent directement les projets ; `#portfolioModal5` correspond au lab SOC. Le changement de langue conserve l’ancre. Sans JavaScript, les rubriques, accordéons natifs et descriptions des projets restent disponibles dans la page.

## Publication

Le site se consulte depuis la racine. Pour préparer les fichiers publiables :

```sh
python scripts/build.py
```

`netlify.toml` exécute ce script avec Python 3 et sert `dist/`. Le script copie uniquement `index.html`, `en.html` et `assets/`. **`design-references/`, les archives, la documentation et la QA sont exclus de la publication.** Les références restent locales et ignorées par Git. Un aperçu exact du build est disponible à `http://127.0.0.1:4173/dist/` après génération.

Respecter la casse et les accents des chemins, notamment `Projets.png`, `Compétences.png` et `Présentation.webp`. Les chemins web utilisent `/`.

Aucun déploiement ni push n’a été effectué pour cette refonte. La publication en production attend l’accord du propriétaire.

Voir [le bilan de l’album](docs/ALBUM.md) pour les vérifications actuelles et [l’inventaire initial](VALIDATION.md) pour le contenu historique.
