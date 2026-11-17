# Accueil et SOC — étude de mouvement

Référence examinée : `C:/Users/zirko/Downloads/liquid-index-motion.mp4`, 22 secondes, 1280×720. Quinze états espacés ont été extraits localement pour comparaison. La vidéo et ses captures de référence ne sont pas intégrées au site ni au build.

## Traduction en interface

- 0–3 s : accueil au repos, identité compacte, deux projets avec fragments, marge extérieure et barre basse.
- 3–6 s : aperçu d'architecture à côté du SOC au survol ou au focus. Cet aperçu est du HTML, pas une simulation d'interface de sécurité.
- 6–8 s : le titre et les blocs d'architecture rejoignent la fiche ; le même fond se recadre et s'éclaircit localement.
- 8–18 s : vue stable du SOC, sélection des trois parties, accès aux captures et au texte complet.
- 18–22 s : retour à l'accueil, restitution du focus et déplacement inverse du titre lorsque celui-ci était visible.

Ces intervalles décrivent la référence : le site ne joue pas cette séquence automatiquement. Le visiteur déclenche chaque état. Les transitions durent 440–700 ms ; elles sont supprimées avec `prefers-reduced-motion`. Le défilement reste natif.

## Fidélité au dépôt

Le SOC conserve son titre officiel `AI-Augmented SOC Homelab`. Windows/Linux, agents Wazuh, centralisation/détection et LLM local sont issus de sa fiche complète. L'exemple « Ollama » de la vidéo n'est pas repris comme fait nouveau. La seconde entrée reste le vrai projet Sticks & Stones, avec son média existant et son année. Aucune capture simulée, mesure ou réalisation ajoutée.

Tous les paragraphes, listes, captures et autres médias de la fiche sont conservés sous la nouvelle introduction. Les autres rubriques, logos, CV et badge dynamique TryHackMe ne sont pas modifiés par cette passe. Les six liens de navigation fonctionnent aussi depuis la fiche SOC : ils ferment le détail et conduisent à la rubrique choisie.

## Vérifications

FR/EN à 1440×1000, 1280×720, 390×844 et 360×800 : états au repos/aperçu/ouverture, sélection de chaque partie, accès au détail complet, retour avec Échap et focus restitué, navigation vers une rubrique depuis la fiche, absence d'erreurs JS et de ressources locales manquantes. Contrôle des contenus par comparaison avec l'état précédent. Liens profonds, réduction des animations et contenu sans JavaScript vérifiés. Contrôle additionnel du mouvement de retour et précédent/suivant du navigateur en FR/EN à 1280 et 390 px.

Captures de l'implémentation : `docs/previews/motion-study/`. Aperçu local : `http://127.0.0.1:4173/dist/`. Branche `design/liquid-index`. Aucun déploiement.
