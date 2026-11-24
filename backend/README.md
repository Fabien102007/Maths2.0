# Backend Mathevo — Supabase + Stripe + Cloudflare Workers

Cette intégration est un socle de déploiement, pas un service déjà activé. Le dépôt public ne contient aucune clé privée.

## 1. Supabase
1. Créer un projet Supabase.
2. Exécuter `schema.sql` dans SQL Editor.
3. Activer la confirmation d'e-mail et configurer les URL de redirection vers l'URL GitHub Pages.
4. Copier l'URL du projet et la clé anon/public dans `config.js`.
5. Ne jamais exposer la clé service_role.

## 2. Cloudflare Worker
Déployer `worker.js` avec les variables/secrets suivants:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (secret)
- `STRIPE_SECRET_KEY` (secret)
- `STRIPE_PRICE_MONTHLY` (ID `price_...` du tarif mensuel)
- `STRIPE_PRICE_ANNUAL` (ID `price_...` du tarif annuel)
- `STRIPE_WEBHOOK_SECRET` (secret)
- `APP_URL` (URL de l'application)
- `ALLOWED_ORIGIN` (origine GitHub Pages, sans chemin)

Configurer les routes:
- POST `/api/checkout`
- POST `/api/portal`
- POST `/api/feedback`
- POST `/api/stripe-webhook`

La route `/api/checkout` refuse désormais de créer une nouvelle souscription si le compte possède déjà un abonnement `active` ou `trialing` dans `user_subscriptions` (HTTP 409). Cette vérification côté serveur complète le blocage visuel du bouton dans l'interface. Déployer le Worker Cloudflare après toute modification de `backend/worker.js`.

Dans Stripe, créer un produit avec deux prix récurrents (mensuel et annuel), renseigner leurs deux identifiants `price_...` dans les variables Cloudflare ci-dessus, puis déclarer le webhook pour les événements `checkout.session.completed`, `customer.subscription.updated` et `customer.subscription.deleted`.

## 3. Synchronisation
Le client authentifie l'utilisateur avec Supabase Auth et synchronise son objet de progression dans `user_progress`. Les politiques RLS limitent chaque ligne à son propriétaire.

## 4. Avant mise en production
- Ajouter une stratégie de résolution de conflits (la version bêta conserve actuellement une fusion locale simple).
- Vérifier le webhook Stripe avec des tests de signature et de cycle de vie.
- Ajouter limitation de débit, journalisation et alertes.
- Vérifier le statut d'abonnement côté serveur pour chaque fonctionnalité Premium; ne jamais se fier à l'état envoyé par le navigateur.
- Faire une revue de sécurité et de conformité RGPD, CGV et droit de rétractation.
- Remplacer le texte de test par les véritables coordonnées de l'éditeur et les prestataires confirmés.
