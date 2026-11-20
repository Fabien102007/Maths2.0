# Maths2.0 — Learning Studio

Maths2.0 est une application web progressive (PWA) en français, publiée sur GitHub Pages. Cette version est une bêta pédagogique : elle vise à structurer l'apprentissage des mathématiques, l'entraînement et la mémorisation.

## Déploiement GitHub Pages
1. Le dépôt doit publier la branche principale à la racine.
2. Tous les fichiers du dépôt doivent rester accessibles à la racine, notamment `data.js`, `curriculum.js`, `app.js`, `style.css` et `sw.js`.
3. Après un déploiement, effectuer un rechargement forcé (Ctrl+F5). Le service worker utilise une version de cache dédiée et vérifie le réseau avant de servir les fichiers.

## Fonctionnalités pédagogiques
- 20 chapitres filtrables par domaine et niveau : lycée, L1, L2 et prépa.
- 91 exercices avec filtres par thème et difficulté, indices et corrections enrichies.
- Parcours initial avec 10 questions diagnostiques et recommandations tenant compte des résultats, des notions fragiles et des prérequis.
- Sauvegarde locale des démarches saisies dans les exercices.
- Export et import d’un fichier JSON pour sauvegarder ou transférer manuellement la progression entre appareils.
- Validation d'une notion après plusieurs réussites autonomes consécutives.
- Révisions espacées dont les intervalles progressent selon la qualité du rappel.
- 20 flashcards environ, avec retournement animé.
- 14 expériences visuelles interactives : convergence, limites, continuité, dérivation, intégrales, développements limités, Fourier, trigonométrie, injectivité, déterminants, Gram–Schmidt, valeurs propres, surfaces 3D et exponentielle complexe en hélice.
- Installation PWA et cache hors ligne des ressources essentielles.

## Navigation et pédagogie
- Bibliothèque des cours en trois temps : choix Analyse / Algèbre, sélection du chapitre, puis affichage du cours.
- Visualisations de limite et de continuité recentrées sur les notions de voisinage, de limite et de contrôle de Δx / Δy.
- Les 30 exercices complémentaires disposent désormais de corrections en étapes distinctes.

## Comptes, synchronisation et paiements
- Interface de compte et pont Supabase Auth préparés, désactivés tant que les paramètres du projet ne sont pas renseignés.
- Synchronisation de progression préparée via Supabase et règles RLS.
- Cloudflare Worker préparé pour Stripe Checkout, portail client, webhooks et retours bêta.
- Voir `backend/README.md` pour le déploiement. Aucun compte ni paiement n'est actif tant que les services ne sont pas configurés et déployés.

## Données et confidentialité
La progression, les tentatives, les révisions et les brouillons sont stockés dans le navigateur via `localStorage`. Ils ne sont pas synchronisés entre appareils et peuvent être perdus si le stockage du navigateur est effacé.

Le tuteur IA existant n'a pas été retravaillé dans cette mise à jour. Lorsqu'il est utilisé, les messages et images sont transmis au Worker Cloudflare configuré. La politique de confidentialité décrit les flux connus et les points qui restent à préciser à partir de la configuration réelle du Worker et du fournisseur IA.

Consulter :
- [Politique de confidentialité](privacy.html)
- [Mentions légales](legal.html)

## Limites à résoudre avant commercialisation
- Tester chaque parcours dans les navigateurs et sur les appareils cibles.
- Faire relire et valider l'intégralité des cours, exercices, solutions et visualisations par un enseignant ou un spécialiste.
- Compléter les mentions légales et la politique de confidentialité avec l'identité de l'éditeur, ses coordonnées et les informations exactes sur les sous-traitants.
- Mettre en place une infrastructure de comptes et de synchronisation uniquement si elle devient nécessaire.
- Définir les conditions commerciales, le support utilisateur et le dispositif de paiement avant toute offre payante.

Cette version ne comporte pas encore de compte utilisateur, de paiement intégré, ni de synchronisation cloud de la progression.
