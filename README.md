# JULIAN VANCE — Official Editorial Celebrity Portfolio & Brand Website

A high-end, modern editorial celebrity portfolio website built for **Julian Vance** — author, stand-up comedian, podcaster, and cultural critic.

Inspired by contemporary celebrity digital experiences (such as *trevornoah.com*), featuring rich editorial typography, warm parchment & deep midnight burgundy tones, a full-screen visual image tile navigation overlay, embedded video/audio modal players, tour date schedules, interactive book sample excerpts, and smooth Framer Motion entrance & scroll animations.

---

## 🌟 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router & SSG Static Export)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom editorial color palette & typography
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```
d:/new_website_2/
├── app/
│   ├── layout.tsx                # Root layout with Header & Footer
│   ├── page.tsx                  # Home page assembling all sections in order
│   ├── globals.css               # Base Tailwind CSS styles & Google Fonts imports
│   ├── shows/page.tsx            # Shows & 2026 World Tour page
│   ├── watch-listen/page.tsx     # Video specials & podcast embeds page
│   ├── books/page.tsx            # Books & publications catalog + excerpt reader
│   ├── about/page.tsx            # Full biography & press highlights
│   ├── store/page.tsx            # Official merchandise & signed editions
│   └── legal/privacy-policy/     # Legal privacy policy page
├── components/
│   ├── Header.tsx                # Sticky header with logo & CTA button
│   ├── NavMenuOverlay.tsx        # Full-screen visual tile menu overlay
│   ├── Hero.tsx                  # Hero section with large headline & Latest badge
│   ├── TaglineSection.tsx        # Centered editorial tagline in display serif
│   ├── MediaGalleryTeaser.tsx    # Horizontal scrolling media cards ("Media — on the screen")
│   ├── AboutTeaser.tsx           # Biography teaser & photo layout
│   ├── NewsFeed.tsx              # "Where's Julian?" reverse-chronological timeline
│   ├── QuoteBlock.tsx            # Standout pull quote with giant quote graphic
│   ├── BooksTeaser.tsx           # Grid of book covers & buy links
│   ├── Footer.tsx                # Newsletter signup, social icons, navigation repeat
│   ├── ModalPlayer.tsx           # Embedded video/audio player popup
│   └── ExcerptModal.tsx          # Interactive book sample chapter reader
├── data/
│   ├── site.ts                   # Site-wide settings, social handles, bio snippets
│   ├── shows.ts                  # Tour schedule & venue details
│   ├── books.ts                  # Bibliography data, blurbs, & sample chapters
│   ├── media.ts                  # Video/podcast embeds & metadata
│   └── news.ts                   # Timeline feed dispatches
├── public/                       # Static public assets
├── next.config.mjs               # Next.js configuration (static export ready)
├── tailwind.config.ts            # Custom editorial theme tokens
└── tsconfig.json                 # TypeScript configuration
```

---

## 🛠️ Editing Content

All site content is stored in clean TypeScript files inside `/data/`. You can update content without modifying components:

1. **Tour Dates**: Edit `data/shows.ts` to add or update upcoming shows, venues, ticket links, and statuses ("Selling Fast", "Sold Out", "On Sale").
2. **Books & Publications**: Edit `data/books.ts` to update book covers, blurbs, press praise quotes, purchase links, or sample chapter excerpts.
3. **Videos & Podcasts**: Edit `data/media.ts` to add new YouTube/Netflix embed links or Spotify podcast episodes.
4. **Timeline Feed**: Edit `data/news.ts` to update the "Where's Julian?" news timeline dispatches.
5. **Site Info & Socials**: Edit `data/site.ts` to update contact email addresses, social media handles, and short bio text.

---

## 🚀 Running Locally

### Development Server
```bash
cmd /c npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production (Static SSG Export)
```bash
cmd /c npm run build
```
The output will be exported to the `out/` directory, ready to deploy to Vercel, Netlify, GitHub Pages, or any web host.
