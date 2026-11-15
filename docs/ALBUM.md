# Album interactif — version locale

Branche `design/interactive-album`. Aucune publication, aucun push. Aperçu : `http://127.0.0.1:4173/` ; sortie de publication contrôlée : `/dist/`.

## Lecture des références

Les trois images de `design-references/` ont été examinées individuellement avant conception : la cover, le storyboard d’interaction et le chapitre Compétences. Elles ont guidé les décalages de cadrage, la juxtaposition de fragments, les titres légers à grande échelle, les filets, les trames ponctuelles et la continuité entre index et contenu.

Le portfolio utilise exclusivement ses propres médias. Aucun visuel de référence, aucune annotation A/B/C/D, durée fictive, marque ou donnée de démonstration n’est intégré au site. La préparation Netlify utilise une liste explicite de fichiers à copier et exclut le dossier de références. Les originaux des six fonds sont préservés dans `assets/img/backgrounds/`.

## Interaction centrale

La couverture est immédiatement navigable : six pistes, CV, langue, contact, signature et invitation au scroll. Le focus clavier et le survol changent un aperçu local et son indication. Le mot graphique « au-delà. » / « beyond. » vient de l’accroche retenue ; c’est une proposition de composition, pas une identité de marque validée.

Sur desktop avec une hauteur suffisante, la cover reste momentanément fixe pendant 0,85 viewport de scroll. L’image change de cadrage et de position, le mot se réduit, les cinq lignes secondaires s’effacent et la même ligne Présentation demeure comme repère. Le contenu professionnel se lit dans la zone libérée. La transformation est calculée depuis la position du document, réversible, sans timeline autonome ni interception de la molette. Une navigation directe place immédiatement le lecteur au bon endroit.

Sur mobile, petits écrans en hauteur et avec `prefers-reduced-motion`, le livret reste dans le flux naturel sans transformation épinglée. La cover conserve ses fragments et sa tracklist tactile. Le menu inférieur contient les noms des six rubriques et se parcourt horizontalement lorsque nécessaire.

| Niveau | Fonctionnement |
| --- | --- |
| Couverture | Six pistes, aperçu au focus/survol, accès direct aux chapitres |
| Livret | Index persistant, retour à la couverture, précédent/suivant, scroll libre |
| Détail de projet | Une seule couche de dialogue, adresse partageable, Échap, focus contenu et retour à l’élément d’origine |

Les compétences et certifications se développent dans le chapitre. Les étapes du parcours restent de vrais éléments du document : leurs dates et la ligne d’itinéraire permettent de les situer et l’index donne un accès immédiat.

## Six compositions

- **Présentation** : note d’ouverture issue de la cover, puis texte de présentation sur une page claire.
- **Compétences** : sept domaines sélectionnables avec contenu adjacent intégral ; vue d’ensemble repliable pour éviter l’exposition permanente de toutes les listes.
- **Parcours** : index et fragment de vitre à gauche, huit étapes sur une ligne progressive à droite. Le cadrage écarte le visage identifiable du fond.
- **Certifications** : répertoire de cinq références avec logos, organismes et justificatifs existants. ANSSI reste intact, 76 px sur desktop / 72 px sur mobile.
- **Projets** : index des cinq projets à côté de la séquence SOC existante, images réelles conservées et détail complet partageable. Le répertoire peut défiler sur les écrans bas.
- **Contact** : dernière page calme, mailto, copie avec confirmation, LinkedIn, CV et retour à la cover.

## Contenu et médias

Comparaison automatisée avec les pages précédant cette intervention : textes des compétences, expériences, certifications, séquence SOC, détails de projets, présentation professionnelle et crédits conservés. Ensemble des liens externes inchangé. Aucun compte social ajouté. CEH reste en préparation. Les intitulés officiels et le niveau de détail de l’expérience à Agadir ne changent pas.

Les logos institutionnels sont affichés sans masque CSS. ESAIP conserve le bandeau du SVG fourni ; Robotics utilise son propre PNG en couleurs sur une zone locale claire incluant le nom d’organisme. Aucune substitution UEMC/Robotics. Les seuls masques employés par le site sont les pictogrammes UI monochromes fournis.

Deux WOFF2 utilisés, Barlow Regular et Barlow Semi Condensed Light, sous SIL OFL 1.1, avec `font-display: swap`. La monospace de repères est locale au système. Les autres fontes et anciennes études restent archivées. Le CSS n’anime pas les lettres séparément.

## Vérifications réalisées

Chrome en mode headless, FR et EN, **1440 × 1000, 1280 × 720, 900 × 900, 390 × 844 et 360 × 800** :

- Six pistes et navigation directe, six chapitres, noms et ancres conservés.
- Ouverture au scroll, position intermédiaire stable, retour réversible ; geste molette vérifié sur le build final.
- Focus sur la tracklist modifiant l’aperçu ; sept domaines activables au clavier.
- Étapes récentes et anciennes accessibles depuis l’index ; accordéons de certifications activables au clavier.
- Cinq dialogues ouverts par adresse profonde, fermeture avec Échap, retour à l’index.
- Séquence cover → Présentation → lab SOC → fermeture : retour à la position de lecture et au lien initial.
- Précédent/suivant du navigateur, réouverture du détail par l’historique, changement de langue conservant le chapitre.
- Cycle de focus Tab / Shift+Tab dans le dialogue, fermeture visible.
- Chargement des médias et logos, contrastes examinés visuellement, absence de débordement horizontal.
- Copie effective de l’email, confirmation accessible, réponse PDF du CV.
- Lecture sans JavaScript : textes et détails de projets dans le document, sélection de domaines masquée car non fonctionnelle sans JS.
- Réduction des animations sur desktop et mobile : pas de cover épinglée, contenu immédiatement consultable.
- Aucun échec de ressource locale ni exception JavaScript pendant les parcours testés.
- Contrôle des chemins locaux, accents et casse ; vérification que les empreintes des références ne figurent pas dans `dist/`.

Captures : [cover](previews/album/cover-1440.png), [ouverture](previews/album/opening-1440.png), [compétences](previews/album/services-1440.png), [cover mobile](previews/album/cover-in-390.png), [compétences mobile](previews/album/services-in-390.png), [lab SOC](previews/album/soc-detail-1440.png).

Tests réalisés dans Chrome avec viewports mobiles, pas sur appareils physiques ni dans Safari/Firefox. Les justificatifs et profils externes ont gardé leurs destinations ; leur disponibilité distante n’a pas été recontrôlée pendant cette intervention.

## À confirmer

1. Le traitement graphique « au-delà. » / « beyond. » et l’équilibre des fragments sont des propositions à examiner dans l’aperçu.
2. Les métadonnées historiques parlent encore d’« étudiant ingénieur », alors que le corps de page indique un diplôme obtenu. Conservées sans correction éditoriale arbitraire.
3. Le PSIR daté 2023–2024 se décrit encore en phase de recherche ; disponibilité immédiate et préparation CEH sont reprises du contenu existant.
4. L’illustration `ai-soc-homelab.png` était déjà présente. Elle est réutilisée ; aucune nouvelle interface, capture ou métrique n’a été générée. La capture d’analyse IA absente reste absente.

Les anciennes études de layout sont remplacées par cette expérience. Leur documentation et la comparaison typographique sont conservées en archive locale, exclue du build.
