# Traversée narrative au scroll

Branche : `design/scroll-narrative`. Version locale, sans push ni publication.

## Lancer et consulter

```sh
python -m http.server 4173 --bind 127.0.0.1
```

- [Français](http://127.0.0.1:4173/index.html)
- [English](http://127.0.0.1:4173/en.html)

La stack reste HTML/CSS/JavaScript, sans compilation et sans dépendance externe. Netlify peut servir la racine du dépôt. Les noms de fichiers, leur casse et leurs accents sont conservés dans les URLs avec `/`.

## Composition

1. **Entrer** : accueil nocturne conservé, invitation à défiler, puis texte intégral « Qui suis-je ? » déplacé depuis les compétences. L’accroche s’efface à la sortie du viewport, les actions restent lisibles.
2. **Comprendre** : trois domaines apparaissent successivement avec des outils déjà présents dans le contenu source. Un index de sept compétences ouvre les descriptions complètes dans une zone voisine.
3. **Traverser** : huit étapes lisibles dans l’ordre, ligne d’itinéraire liée au scroll, repère de lecture et index d’accès direct. Les dates, intitulés, organismes, descriptions et logos sont conservés.
4. **Franchir** : cinq certifications en index compact. Une entrée développée affiche ses dates, identifiants et justificatifs lorsqu’ils existent. Les logos gardent leurs couleurs.
5. **Construire** : séquence SOC en cinq parties, à partir des sections et images déjà présentes dans le détail du projet : vue d’ensemble, architecture/collecte, détection, analyse assistée et mise en œuvre. Le tableau des cinq projets et leurs descriptions complètes restent disponibles.
6. **Relier** : adresse, mailto, copie avec confirmation, LinkedIn et CV dans une composition ouverte.

## Mouvement et navigation

La page possède une vraie hauteur de défilement. Aucun gestionnaire `wheel` ne détourne le geste. Le scroll n’est ni verrouillé ni interpolé par une bibliothèque. Les raccourcis clavier et les gestes tactiles restent natifs.

Les six fonds existants se superposent pendant le passage entre chapitres. Leur cadrage évolue de façon très légère en 2D. Les positions sont mesurées lors des changements de dimensions ; les mises à jour au scroll passent par `requestAnimationFrame` et utilisent les positions mémorisées. Il n’existe pas de boucle d’animation permanente.

Le défilement manuel actualise le chapitre actif et le lien de langue, sans créer d’entrées d’historique. Les liens de navigation créent des ancres normales. Les cinq adresses de projet sont conservées. À la fermeture d’un projet ouvert depuis la page, le focus et la position de lecture reviennent au déclencheur.

Sans JavaScript, les sept descriptions de compétences, les huit étapes et les cinq descriptions de projet restent dans le document. Avec réduction des animations, déplacements, parallaxe, fondus progressifs et effacement du titre sont supprimés ; l’ordre et toutes les informations restent accessibles.

## Préservation et limites

- Textes professionnels, listes, descriptions et justificatifs comparés avec la version précédant cette refonte. Aucun ajout de responsabilité, compétence ou résultat.
- CV PDF inchangé octet pour octet. Portrait toujours absent.
- Sources graphiques intactes ; déclinaisons WebP précédentes réutilisées, première scène préchargée, suivantes chargées à l’approche. Repli vers les originaux si une version optimisée échoue.
- L’image de présentation du lab SOC est **l’illustration déjà présente dans le dépôt**, pas une nouvelle capture de logiciel. Les images d’architecture et de détection réutilisent également les fichiers existants. Aucune image ni métrique n’a été générée.
- La capture `ai-alert-analysis.png` reste absente : le passage d’analyse assistée repose sur son texte existant, sans fausse interface.
- Les six fonds conservent leur éclairage d’origine sous un traitement sombre réversible. Les grandes vitres et certains reflets gardent une lumière diurne ; une véritable lumière nocturne demanderait des variantes des fonds, notamment Présentation, Compétences, Certifications et Projets. Aucun simple traitement CSS n’est présenté comme un nouvel éclairage photographique.
- Les points éditoriaux historiques restent à confirmer : métadonnées « étudiant », état du PSIR, disponibilité et préparation CEH. Voir l’inventaire initial.

## Vérifications navigateur

Chrome, FR et EN, 1440 × 900, 390 × 844, 360 × 800 et 768 × 1024 : chapitres, chargement des fonds, index de compétences, cinq dialogues, retour de focus et position de lecture, copie d’adresse, langues et absence de débordement horizontal.

Vérifications complémentaires : défilement natif avant/arrière et arrêt stable, historique, lien direct au lab SOC, réduction des animations, contenu sans JavaScript, chemins des médias et intégrité du CV. Les tests capturent les erreurs JavaScript et les réponses HTTP d’erreur des ressources locales.

Les destinations des justificatifs sont conservées. Leur contrôle HTTP précédent avait retourné 200 pour les deux PDF ; LinkedIn et le profil TryHackMe limitaient les requêtes automatisées. Pas de nouvelle certification de disponibilité de ces services externes.

Validation dans Chrome avec viewports mobiles, sans test sur appareil physique ni Safari/Firefox. Aucun score Lighthouse ni audit d’accessibilité exhaustif n’est revendiqué.

## Captures

- [Compétences — desktop](previews/scroll-services-1440.png)
- [Parcours — desktop](previews/scroll-parcours-1440.png)
- [Certifications — desktop](previews/scroll-certifications-1440.png)
- [Projets — mobile](previews/scroll-portfolio-390.png)
- [Contact — mobile](previews/scroll-contact-390.png)
