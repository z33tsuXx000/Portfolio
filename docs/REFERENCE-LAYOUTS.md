# Nouvelle déclinaison des maquettes

Branche `design/reference-layouts`, version locale uniquement.

Les sept nouvelles maquettes ont été examinées individuellement. Le moodboard définit les matières et la lumière ; les trois anciens storyboards restent historiques. Aucun fichier de référence n’est copié dans la publication.

L’accueil ne conserve que l’accroche et ses six accès. Les titres des rubriques deviennent Présentation / About, Compétences / Skills, Parcours / Background, Certifications, Projets / Projects et Contact. Les grands titres poétiques sont supprimés ; les espaces ont été recomposés autour des contenus et des médias.

Les compétences disposent de leur index et du badge TryHackMe réel. Le parcours complet reste accessible par son index et le défilement. Les certifications conservent les vrais logos et leurs détails natifs. Les projets proposent un aperçu sélectionnable au clavier et au tactile, distinct de leur détail partageable : la capture Wazuh existante remplace le faux logiciel de la maquette. L’adresse reste l’élément principal du contact.

Textes professionnels comparés automatiquement avec l’état précédent : compétences, expériences, certifications, séquence SOC et détails de projets inchangés. Navigation testée en FR/EN à 1440, 390 et 360 px sans débordement horizontal. Vérifications du build : historique des détails, focus, Échap, copie de l’email, CV, logos et réduction des animations. Le badge distant a été vérifié avec accès réseau : avatar, pseudo, rang et statistiques visibles dans les deux langues et aux trois largeurs, sans barres de défilement internes.

Limite graphique : les fichiers utilisables restent les six fonds architecturaux et les médias existants. Les scènes de végétation, câbles urbains, ville pluvieuse et lampe des nouvelles maquettes ne sont pas fournies comme fonds séparés sans texte. Elles n’ont pas été extraites des maquettes ni inventées. Les cadrages et superpositions utilisent les fonds disponibles, avec le visage du fond Parcours écarté.

Validation dans Chrome avec viewports mobiles, pas sur appareils physiques ni dans Safari/Firefox. Aperçu local : `/dist/`. Aucun déploiement.
