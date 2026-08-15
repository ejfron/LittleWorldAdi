# Our Little World

A minimalist Vue 3 + TypeScript + Tailwind CSS site for a couple's memories page.

## Getting started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build      # type-check + production build to /dist
npm run preview    # preview the production build
```

## Pages

Routed with `vue-router` (`src/router/index.ts`):

| Route         | Page             | What's on it |
|---------------|------------------|--------------|
| `/`           | `HomeView`       | Hero + condensed teasers linking to the three pages below |
| `/memories`   | `MemoriesView`   | Full alternating vertical timeline of every memory |
| `/gallery`    | `GalleryView`    | Full photo grid, category filters (All/Travel/Everyday/Celebrations), click-to-enlarge lightbox |
| `/details`    | `DetailsView`    | Live "days together" counter, key dates, favorite things list |

## Folder structure

```
our-little-world/
├── index.html                  Entry HTML (Google Fonts: Fraunces + Inter)
├── tailwind.config.ts          Color palette, fonts, blob radius, shadows
├── postcss.config.js
├── vite.config.ts              @ alias -> src/
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── src/
    ├── main.ts                 App bootstrap (registers router)
    ├── App.vue                 Shell: NavBar + <router-view> + Footer
    ├── style.css                Tailwind layers + base resets
    ├── vite-env.d.ts
    ├── router/
    │   └── index.ts             Route definitions (/ , /memories, /gallery, /details)
    ├── types/
    │   └── index.ts             Shared TS interfaces (Memory, GalleryPhoto, etc.)
    ├── data/
    │   └── content.ts           ALL editable copy, dates, image URLs live here
    ├── views/
    │   ├── HomeView.vue          Hero + teaser sections
    │   ├── MemoriesView.vue      Full memories timeline page
    │   ├── GalleryView.vue       Full gallery page w/ filters + lightbox
    │   └── DetailsView.vue       Full details page w/ days-together counter
    └── components/
        ├── ui/
        │   ├── HeartIcon.vue
        │   ├── BaseButton.vue    Supports href (anchor) or to (router-link)
        │   └── PageHeader.vue    Shared eyebrow/title/description header
        ├── layout/
        │   ├── NavBar.vue        router-link based nav, active-route styling
        │   └── Footer.vue
        └── sections/
            ├── HeroSection.vue       Headline + blob-framed photo
            ├── OverviewCards.vue     Clickable teaser cards -> the 3 pages
            ├── MemoriesCard.vue      Home teaser: quote carousel
            ├── GalleryPreview.vue    Home teaser: 6-photo grid
            ├── DetailsCard.vue       Home teaser: key dates list
            └── ContentSection.vue    Wraps the three teaser panels
```

## Customizing

- **Your photos & copy**: edit `src/data/content.ts` — swap the placeholder
  `picsum.photos` URLs for your own images (drop files in `src/assets/` and
  import them, or point to hosted URLs), update quotes and dates.
- **Colors**: `tailwind.config.ts` → `theme.extend.colors` (`cream`, `ivory`,
  `stone`, `ink`, `clay`, `rose`).
- **Fonts**: `Fraunces` (display/serif headlines) + `Inter` (body), loaded via
  Google Fonts in `index.html`.
- **The hero photo shape**: the soft asymmetric blob frame uses the custom
  `rounded-blob` utility defined in `tailwind.config.ts`.

## Design notes

Warm cream background, a single terracotta/clay accent color, a serif display
face for headings against a clean sans body, and a hand-drawn heart motif
tying the whole page to the "for us" theme — kept deliberately quiet outside
of the hero photo, which is the one place the layout gets playful (the
organic blob crop + tossed sparkle accents).
