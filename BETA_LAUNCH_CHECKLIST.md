# Maths2.0 — Checklist de préparation à la bêta

Dernière revue du dépôt : 23 novembre 2026  
Branche de référence : `main`

## Périmètre de la bêta actuelle

- Bêta gratuite, sans paiement ni abonnement actif.
- Comptes et synchronisation cloud désactivés dans `config.js`.
- Progression, tentatives, révisions et brouillons conservés dans le stockage local du navigateur.
- Tuteur IA facultatif : les messages, le contexte pédagogique et, le cas échéant, l'image jointe sont envoyés au Worker Cloudflare configuré. Le Worker peut ensuite transmettre les données au fournisseur de modèle.
- Site publié sur GitHub Pages. MathJax est chargé depuis des CDN externes.
- Le dépôt contient six ressources vidéo Manim référencées dans l'application.

## Contrôles techniques vérifiés dans le dépôt

- [x] Le contrôle qualité GitHub Actions a réussi sur le commit `a3d4a84f3128674c01483cb407792a65461ce529`.
- [x] Le workflow GitHub Pages a terminé avec succès sur ce même commit.
- [x] Les fichiers de confidentialité et mentions légales existent et sont liés depuis les pages publiques.
- [x] Les comptes et paiements sont désactivés dans la configuration actuelle.
- [x] Le manifeste PWA ouvre `app.html`.
- [x] Les six fichiers vidéo Manim sont référencés et contrôlés par le script qualité.

## À faire avant d'inviter publiquement des bêta-testeurs

### 1. Informations légales et confidentialité — BLOQUANT

- [ ] Renseigner l'identité exacte de l'éditeur / responsable du service et les coordonnées de contact requises dans les mentions légales.
- [ ] Déterminer le statut de publication (personne physique ou structure) et vérifier les mentions applicables avec une source juridique compétente.
- [ ] Identifier précisément le fournisseur IA utilisé derrière le Worker Cloudflare.
- [ ] Vérifier les journaux du Worker, les données enregistrées, leurs durées de conservation et les éventuels transferts hors EEE.
- [ ] Décrire les finalités, bases légales, destinataires, durées de conservation et modalités d'exercice des droits dans la politique de confidentialité.
- [ ] Vérifier les conditions et politiques de GitHub Pages, Cloudflare, du fournisseur IA et des CDN MathJax.
- [ ] Faire relire les mentions légales et la politique de confidentialité avant diffusion publique. Les pages actuelles sont des bases de transparence, pas une validation de conformité.

### 2. Sécurité du tuteur IA — BLOQUANT si le tuteur est accessible aux bêta-testeurs

- [ ] Tester le Worker en production avec un message texte puis une image.
- [ ] Vérifier les limites de taille, les quotas, la limitation de débit et la protection contre les abus.
- [ ] Vérifier qu'aucun secret serveur (clé fournisseur, clé service-role, secret de webhook) n'est exposé dans les fichiers publics.
- [ ] Vérifier les messages d'erreur et le comportement lorsque le Worker ou le fournisseur IA est indisponible.
- [ ] Afficher clairement à l'utilisateur que l'envoi au tuteur transmet ses messages et images à un service tiers.

### 3. Tests manuels sur appareils réels — NON VALIDÉS PAR LE CONTRÔLE AUTOMATIQUE

- [ ] Tester l'installation PWA et le lancement depuis l'icône.
- [ ] Tester chaque onglet, retour, menu mobile et lien de navigation.
- [ ] Ouvrir plusieurs cours et exercices ; vérifier les formules, démonstrations, indices et corrections.
- [ ] Tester une session de flashcards, les trois évaluations et le calendrier de révision.
- [ ] Exporter, réimporter puis réinitialiser une progression de test.
- [ ] Tester les visualisations interactives et lire chacune des six vidéos Manim.
- [ ] Tester le tuteur IA avec texte et image, puis son indisponibilité.
- [ ] Vérifier le rendu sur Android Chrome et au moins un navigateur de bureau.
- [ ] Vérifier qu'une mise à jour du site remplace correctement l'ancienne version mise en cache.

### 4. Validation pédagogique et support — BLOQUANT avant une promotion large

- [ ] Faire relire un échantillon représentatif des cours, exercices, corrections et flashcards par une personne compétente en mathématiques.
- [ ] Corriger les erreurs signalées et conserver un canal de retour utilisateur.
- [ ] Définir une adresse ou un canal de contact réellement suivi pour les retours et demandes relatives aux données.
- [ ] Préparer une procédure simple de signalement d'une erreur pédagogique ou d'un problème technique.

## Décision de lancement

**État actuel : bêta technique avancée, pas encore prête pour une ouverture publique large ni pour une commercialisation.**

Une bêta privée et gratuite peut être envisagée après les contrôles bloquants ci-dessus, avec un petit groupe de testeurs informés. Ne pas activer les comptes, la synchronisation ou les paiements tant que leurs propres tests techniques, contractuels et de confidentialité ne sont pas terminés.

Le succès d'un workflow GitHub confirme la construction et le déploiement du site ; il ne valide ni l'expérience réelle sur chaque appareil, ni l'exactitude pédagogique, ni la conformité juridique.
