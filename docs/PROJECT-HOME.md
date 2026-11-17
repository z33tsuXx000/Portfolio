# Accueil centré sur les projets — LIQUID INDEX

Passe limitée à l'accueil et à l'ouverture du SOC. Les six rubriques, leurs contenus et leur mise en page sont conservés. Travail local sur `design/liquid-index`, sans publication.

## Composition

- Identité compacte en haut à gauche ; CV et langues en haut à droite. Suppression du bandeau opaque sur l'accueil uniquement. Deux lumières localisées protègent le contraste des contrôles sans voiler le métal partout.
- Une seule navigation vers les six rubriques, en barre basse. Sur mobile, deux lignes de trois entrées maintiennent des cibles tactiles confortables.
- SOC Homelab principal, Sticks & Stones secondaire. Titres, outils et années proviennent du dépôt. Les deux seuls fragments sont la capture Wazuh et le visuel existant du jeu.
- Fond `accueil` recadré sans déformation. Traits recalculés au redimensionnement à partir de coordonnées dans le PNG source pour conserver leur attache à deux points du chrome. Ils aboutissent aux repères numérotés sans traverser les titres. Sur mobile, les projets suivent un ordre vertical naturel et ces traits sont retirés.

## Ouverture et retour

La capture et le titre effectuent une transition de 560 ms vers leur position dans la fiche native. Les clones décoratifs sont placés dans la couche du dialogue et retirés à la fin ou à la fermeture. Aucun délai de navigation imposé ; focus, Échap, historique et liens directs restent gérés par le code existant. Le mode de réduction des animations ouvre directement la fiche.

La capture Wazuh devient le premier média du SOC. L'illustration auparavant placée en tête reste dans la même fiche, à l'ancienne position de la capture. Aucun média ni contenu professionnel supprimé. L'image complète reste limitée à sa largeur source de 473 px dans le détail.

## Vérification

Chrome, FR/EN, 1440×1000, 1280×720, 390×844, 360×800 : deux projets, navigation unique, absence de débordement, ouverture au clavier, présence puis retrait des deux éléments animés, fermeture avec Échap, retour du focus, ouverture du second projet, accès à Compétences puis retour à l'accueil. Vérification complémentaire du lien profond SOC, du mode sans JavaScript et de la réduction des animations. Aucun texte professionnel modifié (comparaison automatisée). Aucune erreur JavaScript ni ressource locale manquante pendant les parcours testés.

Captures : `docs/previews/project-home/`. Aperçu : `http://127.0.0.1:4173/dist/`.
