# Maths2.0 — Learning Studio

## Présentation
Maths2.0 est une application web progressive (PWA) en français pour apprendre, pratiquer et visualiser les mathématiques du lycée à l'université.

- La racine du site (\`index.html\`) présente le produit.
- \`app.html\` ouvre directement l'espace de travail.
- \`landing.html\` est la copie de la page de présentation.
- Le manifeste PWA ouvre l'espace de travail lorsqu'un utilisateur lance l'application installée.

## Contenu pédagogique actuel
- **26 notions** réparties en Analyse et Algèbre, du lycée à L2 et avec des prolongements d'approfondissement.
- **121 exercices** classés par thème et difficulté, avec énoncés, indices et corrections affichées en étapes.
- **64 flashcards** pour le rappel actif.
- **14 visualisations interactives** : suites, limites, continuité, dérivation, intégrales, développements limités, injectivité, déterminants, Gram–Schmidt, Fourier, trigonométrie, valeurs propres, surfaces 3D et exponentielle complexe.
- **4 vidéos Manim publiées** : formule d'Euler, tangente et dérivée, série de Fourier et intégrale de Riemann. Deux scènes supplémentaires (convergence ε-N et Gram–Schmidt) sont en cours de rendu et de validation.
- Parcours de révision espacée, suivi de progression, sauvegarde locale, import et export JSON, tuteur IA facultatif.

Les corrections sont structurées dans l'interface à partir des réponses rédigées ; leur exactitude mathématique et leur niveau de détail doivent encore faire l'objet d'une relecture pédagogique indépendante avant une commercialisation.

## Navigation et expérience
- Les cours sont organisés par domaine, niveau et notion.
- Chaque fiche de cours distingue définitions, propriétés, théorèmes/démonstrations, exemple, méthodes et erreurs classiques.
- Les prérequis permettent de naviguer directement vers les notions nécessaires.
- Les exercices proposent deux indices ou plus et une correction découpée en étapes.
- Les niveaux Terminale, L1, L2 et approfondissement sont accessibles dans les sélecteurs lorsqu'ils contiennent du contenu.

## Déploiement GitHub Pages
1. Publier la branche principale à la racine du dépôt.
2. Conserver à la racine les ressources \`data.js\`, \`curriculum.js\`, \`app.js\`, \`style.css\`, \`config.js\` et \`sw.js\`.
3. Après déploiement, recharger avec Ctrl+F5 si une ancienne version reste en cache.
4. Vérifier le workflow GitHub Actions et tester les parcours sur ordinateur et mobile.

## Comptes, synchronisation et paiements
L'interface de compte et le pont Supabase/Cloudflare sont préparés dans le dépôt, mais les comptes et la synchronisation restent désactivés dans \`config.js\`. Aucun paiement ni abonnement n'est actif. Les offres et tarifs visibles sont des propositions, pas une vente disponible.

Ne jamais placer une clé service-role Supabase, une clé secrète Stripe ou un secret webhook dans le code client ou dans le dépôt.

## Données et confidentialité
La progression, les tentatives, les révisions et les brouillons sont stockés dans le navigateur via \`localStorage\`. Ils ne sont pas synchronisés entre appareils et peuvent être perdus si le stockage du navigateur est effacé.

Le tuteur IA transmet les messages et, le cas échéant, les images au Worker Cloudflare configuré. Le fournisseur de modèle, les durées de conservation et les modalités de traitement doivent être confirmés dans la configuration réelle et dans les conditions des prestataires.

Consulter :
- [Politique de confidentialité](privacy.html)
- [Mentions légales](legal.html)

## Conditions à satisfaire avant commercialisation
- Tester chaque parcours et chaque bouton dans les navigateurs et appareils cibles.
- Faire relire les cours, exercices, corrections et animations par un enseignant ou un spécialiste.
- Vérifier les quatre fichiers vidéo avec ffprobe (résolution, fréquence d'images, durée, poids) avant toute mention de qualité 4K/60 FPS.
- Compléter les mentions légales, la politique de confidentialité, les coordonnées de contact et les informations relatives aux sous-traitants.
- Définir le support utilisateur, les conditions d'utilisation et les modalités de traitement des demandes de suppression.
- Configurer et tester comptes/synchronisation si ces fonctions sont proposées au lancement.
- Définir les offres et le paiement seulement après validation du produit et de ses obligations.

Cette version est une bêta avancée. Le déploiement technique ne vaut pas validation pédagogique, juridique ou commerciale.
