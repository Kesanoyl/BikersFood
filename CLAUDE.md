# Bikers Food — Site Click & Collect

## Résumé
Site de commande en ligne pour **Bikers Food** (Noisy-le-Sec, 93130). Restaurant casual food — Burgers, smash burgers, naan burgers, tacos, sandwichs, tex-mex. 100% halal. Commande + paiement en ligne + compte client.

Dupliqué depuis le site **La Marinade** (même moteur), avec carte, logo, coordonnées et palette adaptés à Bikers Food. Le "Composer" de tacos de La Marinade a été retiré (carte à base de menus fixes).

## Stack
- **Backend** : Node.js + Express (`server.js`), ES modules
- **Base de données** : PostgreSQL (Neon) via `DATABASE_URL`. Fallback `data.json` sans DB.
- **Paiement** : Stripe Checkout (clés **test** par défaut)
- **Frontend** : HTML/CSS/JS pur dans `public/` — mobile-first
- **Carte** : définie en dur dans `public/app.js` (const `MENU`), 15 catégories / 86 produits. Images produits dans `public/img/menu/`.

## Design tokens (palette logo Bikers Food)
- `--rojo: #A83A4C` (bordeaux/vin) — accent principal
- `--fuego: #C56A3A` (brique) — accent secondaire
- `--oro: #D8BE8A` (crème/doré) — premium
- `--bg: #141210` (charbon profond) — fond
- Polices : Playfair Display (headings) + Inter (body) + Bebas Neue (logo)

## Coordonnées (site vitrine)
- Adresse : 7 Bd de la Boissière, 93130 Noisy-le-Sec
- Téléphone : 01 41 63 61 45
- Horaires : Lun–Jeu 11h30–00h00 · Ven 11h30–13h00 & 14h30–00h00 · Sam–Dim 11h30–00h00

## Lancer en local
```bash
npm install
npm start        # http://localhost:3000
npm run dev      # avec --watch
```

## Variables d'environnement (.env)
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://...   # optionnel, fallback data.json
PUBLIC_URL=http://localhost:3000
PORT=3000
```
