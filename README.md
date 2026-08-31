# Carolo Canis d.o.o.

Bilingual (HR / EN) website for a Karlovac-based cynology firm — dog
training, equipment and food, and cynology consulting.

## Stack

- Next.js (App Router, static generation) + TypeScript
- Tailwind CSS
- next-intl for HR/EN routing and messages
- Deployed on Vercel; source on GitHub

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Structure

- `src/app/[locale]/` — locale-scoped routes; home + gallery
- `src/components/` — layout, gallery lightbox, marks
- `src/data/` — locations, gallery index, shared nav links
- `src/i18n/` — next-intl routing, request and navigation helpers
- `messages/{hr,en}.json` — copy for both languages
- `public/` — brand mark, hero silhouette, gallery assets
