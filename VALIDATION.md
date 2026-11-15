# Bilan de refonte — 13 novembre 2026

Branche : `fix/remove-home-portrait`. Version locale uniquement ; aucun push ni déploiement.

## Contenu conservé

Les pages HTML du dépôt avant refonte servent de référence. Une comparaison automatisée vérifie la présence des listes de compétences, intitulés et paragraphes du parcours, certifications, paragraphes et listes des détails des projets, dans chaque langue. Le PDF du CV est identique octet pour octet.

| Ensemble | Inventaire |
| --- | --- |
| Compétences (7) | Développement web, administration système, développement logiciel, développement Android, cybersécurité, outils & gestion, backend |
| Parcours (8) | Ingénieur Réseaux et Sécurité — 2026 ; Data Analyst — 2026 ; contrat de professionnalisation — 2024–2025 ; cycle ingénieur ESAIP — 2023–2025 ; Valladolid — janvier–juin 2024 ; Arnhem — janvier–juin 2022 ; prépa ESAIP — 2020–2022 ; baccalauréat — 2020 |
| Certifications (5) | SOC Level 1 ; Pre Security Certificate ; MOOC ANSSI ; Microsoft Certified: Azure AI Fundamentals ; TOEIC |
| Projets (5) | AI-Augmented SOC Homelab — 2026 ; PSIR — 2023–2024 ; Sticks & Stones — 2022 ; Esaip Robotics — 2022 ; tournoi d’esport / Esaip Rivals — 2021 |
| Contact | adam.laaouane.pro@gmail.com ; LinkedIn existant ; France ; CV |

CEH reste explicitement **en préparation**. Les logos d’organismes et captures réellement disponibles sont réutilisés. Les mentions de licences et de version de l’ancien site sont conservées dans « Crédits & historique ».

## Fonds

| Rubrique FR / EN | Original conservé |
| --- | --- |
| Présentation / Introduction | `assets/img/backgrounds/Présentation.webp` |
| Compétences / Skills | `assets/img/backgrounds/Compétences.png` |
| Parcours / Journey | `assets/img/backgrounds/parcours.png` |
| Certifications | `assets/img/backgrounds/Certifications.png` |
| Projets / Projects | `assets/img/backgrounds/Projets.png` |
| Contact | `assets/img/backgrounds/Contact.png` |

Déclinaisons WebP locales dans `assets/scenes/`, environ **747 ko au total pour les 12 variantes**. La source Présentation mesure 1000 × 563 px : elle n’est pas agrandie lors de la conversion. Les autres sources mesurent 1672 × 941 px. Première scène préchargée, scène suivante préparée après affichage sur desktop, chargement à proximité du viewport sur mobile. En cas d’échec d’une version optimisée, l’image originale prend le relais. Les images ne sont pas étirées. Le cadrage du parcours privilégie la vitre pour écarter le visage de la référence.

`CV3.jpg`, sa variante WebP et les références au portrait sont retirés. Aucun autre média source n’a été supprimé, aucun portrait ni décor n’a été généré.

## Vérifications dans Chrome

FR et EN testés aux dimensions **360 × 800, 390 × 844, 768 × 1024, 1024 × 768, 1440 × 900 et 1920 × 1080** :

- Six rubriques et fonds chargés ; casse et accents des chemins vérifiés sur disque.
- Tous les accordéons de compétences et du parcours activables.
- Cinq projets ouverts et fermés ; Échap, bouton visible, retour du focus, cycle Tab/Shift+Tab dans le dialogue.
- Navigation latérale, commandes précédent/suivant, ancres et lien direct au lab SOC.
- Historique précédent/suivant du navigateur et maintien de la rubrique au changement FR/EN.
- Molette : un geste prolongé ne traverse pas plusieurs scènes ; défilement interne des contenus longs.
- Navigation clavier et défilement des projets longs sans changer de scène.
- Copie d’adresse avec confirmation accessible ; mailto et CV présents.
- Aucun débordement horizontal ; contrôles et textes examinés sur captures desktop/mobile.
- Animations normales et mode `prefers-reduced-motion` ; transitions supprimées dans ce dernier.
- Mode sans JavaScript : contenu, accordéons HTML natifs et descriptions des projets accessibles.
- Repli vers les fonds originaux testé en simulant l’échec des fichiers optimisés.
- Aucune exception JavaScript ni réponse HTTP d’erreur sur les ressources locales lors du parcours normal.

Les textes courants sont foncés sur des surfaces laiteuses à forte opacité ; le contraste des couleurs principales a été vérifié. Les images restent décoratives (`alt=""`, conteneur masqué aux technologies d’assistance). Les scènes inactives ne reçoivent pas le focus sur desktop.

## Liens externes

- Deux justificatifs TryHackMe : réponses HTTP **200**.
- Profil Root-Me : réponse HTTP **200**.
- LinkedIn : réponse **999** à la requête automatisée ; disponibilité du profil à vérifier manuellement.
- Profil TryHackMe : réponse **429** à la requête automatisée ; disponibilité à vérifier manuellement.

Les destinations d’origine sont conservées. Ces contrôles attestent des réponses reçues, sans certifier l’exactitude du contenu des profils.

## Points à confirmer

1. `assets/img/ai-alert-analysis.png` n’existe pas dans le dépôt. La description de l’analyse IA reste intégrale ; aucune capture de remplacement n’a été inventée et aucune image cassée n’est affichée.
2. La référence Wazuh utilisait `wazuh-alert.png`, tandis que le fichier réel est `wazuh-alert.png.png` : le chemin a été corrigé. Les icônes dont les PNG étaient absents utilisent les WebP existants ou une icône du domaine approprié.
3. Les métadonnées historiques parlent encore d’un « étudiant ingénieur », alors que le contenu décrit un ingénieur diplômé. Elles sont conservées pour confirmation éditoriale ; le titre de page et l’introduction reflètent le métier fourni.
4. Le PSIR est daté 2023–2024 mais son texte indique encore une phase de recherche en cours. Le texte source n’a pas été actualisé arbitrairement.
5. La disponibilité immédiate, les dates du parcours et le statut de préparation CEH sont ceux du contenu existant. À actualiser si nécessaire.
6. Les mentions 2023 / version 0.9 et anciennes bibliothèques figurent désormais dans l’historique, sans être présentées comme les dépendances de cette refonte.

Validation effectuée dans Chrome, y compris avec des viewports mobiles ; pas de test sur appareil physique ni dans Safari/Firefox. Aucun audit d’accessibilité exhaustif ni mesure Lighthouse n’est revendiqué.
