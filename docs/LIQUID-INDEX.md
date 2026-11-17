# LIQUID INDEX — direction complète

Branche : `design/liquid-index`, créée depuis `design/home-introduction-polish` (`65dd4e2`). La version précédente et le stash de `design/reference-layouts` restent intacts. Aucun push, merge ou déploiement.

## Périmètre

À la demande de l'utilisateur, la direction s'applique désormais à l'accueil et aux six rubriques, ainsi qu'aux cinq fenêtres de projets. Accueil spatial, Présentation ouverte à droite, sélection des compétences, chronologie horizontale suivie des huit étapes complètes, index des certifications, projets avec captures réelles, Contact sur verre clair. Les anciens styles photographiques/nocturnes ne sont plus chargés.

Les sept PNG fournis sont conservés sans modification dans `assets/img/liquid-index/`. Chaque scène utilise son propre fond, avec dérivés WebP 800/1672 px et fallback PNG. Aucune requête vers les anciens dossiers `assets/scenes/` ou `assets/img/backgrounds/` n'est émise pendant le parcours des six rubriques. Les anciens fichiers restent archivés sur disque. Les fontes locales OFL existantes sont conservées.

Les repères sont répartis autour de la forme métallique. Le survol et le focus changent l'aperçu et le cadrage léger de la photographie ; le métal n'est pas déformé. L'ouverture utilise le déplacement d'un repère puis l'arrivée du contenu. Aucune interception de molette, aucune durée de scroll imposée. Sur mobile, les liens sont immédiatement activables dans un index en deux colonnes. Avec réduction des animations, les déplacements sont supprimés.

Les contenus professionnels, détails longs, logos, justificatifs, CV et intégration dynamique TryHackMe sont préservés. Les variantes `*-original.svg` du pack de logos sont employées sur fond clair, sans filtre ni masque ; LinkedIn utilise le pictogramme sombre fourni. L'image Wazuh de l'aperçu est le fichier réel du dépôt, sans métrique ajoutée.

## Référence de composition

La planche `directions-comparatives.png` a ensuite été jointe directement par l'utilisateur et inspectée. Seule la proposition « 02 / LIQUID INDEX » est retenue : forme argentée dominante, repères circulaires numérotés, lignes fines, libellés sombres discrets sans panneaux rectangulaires, identité secondaire et aperçu photographique. L'accueil a été ajusté en conséquence. Les textes et projets illustratifs ne sont pas repris. Aucune planche n'est intégrée au site.

## Aperçu et vérifications

`python scripts/build.py`, puis serveur local racine sur le port 4173. Aperçu : `http://127.0.0.1:4173/dist/` et `http://127.0.0.1:4173/dist/en.html`.

Vérifications Chrome : FR/EN, 1440×1000, 1280×720, 390×844 et 360×800 ; six accès ; ouverture SOC ; Échap ; retour du focus ; navigation vers Projets et retour à l'accueil ; liens profonds ; mode de réduction des animations ; absence d'erreurs JavaScript et de réponses locales HTTP en erreur. Comparaison automatisée du texte des compétences, expériences, certifications, détails de projets et présentation avec la version de départ. Captures dans `docs/previews/liquid-index/`.

Un contrôle complémentaire parcourt toutes les rubriques dans les deux langues à 1440, 390 et 360 px : chargement de chaque nouveau fond, aucune requête vers un ancien fond, accordéons des certifications, sept domaines de compétences, aucun débordement horizontal ni erreur locale. `liquid-index.css` définit l'accueil et les projets ; `liquid-chapters.css` définit le système global clair et les six rubriques. Aucun framework ou dépendance runtime ajouté. Le chargement externe TryHackMe est vérifié séparément et reste soumis à la disponibilité du service.

Le test navigateur avec accès réseau a confirmé le rendu du badge officiel : avatar, Z33tsu, rang et statistiques visibles. Capture réelle : `docs/previews/liquid-index/badge.png`. Les statistiques ne sont pas copiées dans le code.
