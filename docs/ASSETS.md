# Assets et icônes

Intégration du complément `portfolio-icons-v3`, sur la branche `design/scroll-narrative`. Aucun déploiement.

## Rangement

| Dossier | Contenu |
| --- | --- |
| `assets/icons/` | Dix PNG UI et sociaux, drapeaux, correspondance `mapping.json` |
| `assets/logos/` | PNG ANSSI du pack, inchangé |
| `assets/img/backgrounds/` | Six fonds définitifs, casse et accents conservés |
| `assets/scenes/` | Douze versions WebP responsives des fonds |
| `assets/img/projects/` | Six médias de projets ; double extension de `wazuh-alert.png` corrigée |
| `assets/img/logos/` | Premier pack, UEMC, drapeau marocain et originaux de référence |
| `assets/img/logos-v2/` | Adaptations SVG fournies, variantes claires, signature et originaux de référence |
| `assets/files/` | CV PDF inchangé |

Les quatorze médias déplacés sont identiques aux fichiers précédents. Tous les chemins des pages, des fallbacks et des aperçus ont été adaptés. Les sources originales des logos sont conservées comme demandé ; HAN conserve son fond noir. Les SVG v2 restent des adaptations web avec raster embarqué, sans optimisation ni modification.

## Nettoyage

67 anciens fichiers supprimés : doublons exacts, anciennes variantes du dossier `assets/webp/` non référencées et ancien logo TryHackMe remplacé par le pack v2. Environ 5,8 Mo de fichiers retirés, avant ajout du complément et des captures de validation. Le [journal détaillé](assets-cleanup.json) donne les chemins, empreintes et raisons des suppressions. Les fonds, médias de projets et contenus professionnels sont conservés.

## Intégration

- Pictogrammes monochromes de 24 px pour cybersécurité, web, Android et backend ; pictogramme paysage réservé à l’index des projets. Les masques utilisent l’alpha original et `currentColor`.
- LinkedIn blanc ajouté aux deux liens existants. Aucun lien Instagram créé ; ses variantes restent disponibles dans le pack.
- Drapeaux en couleurs accompagnés des libellés FR / EN. Contrôles de langue d’au moins 44 px de hauteur.
- ANSSI affiché à 76 px sur desktop, 72 px sur mobile, sans fond, filtre ou masque. Le blanc interne du dessin reste intact.
- Les onze PNG sont identiques octet pour octet au pack ; transparence vérifiée après lecture de l’alpha, y compris pour les PNG indexés.
- Textes et intitulés FR/EN, liens externes et crédits Icons8 conservés intégralement. Aucun nouveau droit d’utilisation n’est supposé.

## Vérifications

Chrome, FR et EN, à 1440, 390 et 360 px : six décors chargés, sept compétences activables au clavier, cinq projets ouvrables et refermables avec Échap, logo ANSSI aux dimensions prévues, aucun débordement horizontal ni erreur de ressource ou exception JavaScript sur les pages parcourues. Le mode de réduction des animations a été utilisé pour ces vérifications.

Contrôle statique des chemins locaux et de leur casse ; comparaison des contenus avec l’état avant cette intégration ; comparaison des empreintes du CV, des médias déplacés, des fonds responsives et des originaux des logos. Aperçus des deux packs de logos, du complément et comparaison typographique également ouverts.

Captures examinées : [accueil mobile](previews/icons-home-390.png), [compétences desktop](previews/icons-skills-1440.png), [ANSSI mobile](previews/icons-anssi-390.png). [Aperçu du complément](icons/index.html).

La comparaison typographique A/B reste disponible dans `typography.html` ; le choix avant généralisation reste à confirmer. Cette intégration ne modifie pas les contenus professionnels à confirmer signalés dans l’inventaire initial.
