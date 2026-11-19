# Maths2.0 — Learning Studio

Nouvelle version de Maths2.0, application web progressive (PWA) en français, sans compilation.

## Déploiement GitHub Pages
1. Décompresser l'archive.
2. Importer **tout le contenu** du dossier `Maths2.0` à la racine du dépôt GitHub Pages.
3. Vérifier dans Settings → Pages que la publication utilise la branche `main` et le dossier `/ (root)`.
4. Ouvrir le site et effectuer un rechargement forcé (Ctrl+F5).

## Fonctionnalités incluses
- Tableau de bord avec indicateurs de progression.
- Diagnostic de départ et recommandation de prochaine notion.
- Cours filtrables en analyse et algèbre.
- 61 exercices repris de Maths4, filtrables par thème et difficulté, avec indices progressifs, corrections détaillées sur fond vert et auto-évaluation.
- Progression locale par notion et validation de maîtrise après plusieurs réussites autonomes.
- Révisions espacées avec trois niveaux de rappel.
- Tuteur IA avec quatre modes et envoi de photos manuscrites.
- Laboratoire visuel interactif : 12 expériences en analyse, algèbre et géométrie (limites, dérivation, intégrales, Taylor, injectivité, déterminants, Gram-Schmidt, Fourier, trigonométrie, valeurs propres).
- Installation PWA et cache hors ligne des fichiers essentiels.

## Tuteur IA
Le fichier `ai-config.js` contient l'URL du Worker Cloudflare déjà utilisé. L'application envoie au Worker les champs `mode`, `exercise`, `messages`, `text` et `image`. Aucune clé secrète n'est stockée dans le navigateur.

Le quota et les coûts d'utilisation dépendent du compte Cloudflare et de la configuration du Worker. Cette application ne prétend pas fournir un accès IA illimité.

## Données et limites de cette version
La progression et les conversations sont stockées localement dans le navigateur : elles ne sont pas synchronisées entre appareils. Le diagnostic est un repérage initial court, pas une évaluation officielle. Le contenu pédagogique fourni constitue une première base structurée à enrichir et à vérifier avant une diffusion commerciale. MathJax et les polices web nécessitent une connexion lors du premier chargement.
