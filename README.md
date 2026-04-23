# Monarch Vitality — Website

Premium men's hair systems studio · Shawnee, KS · monarch.hair

This is the production homepage for Monarch Vitality, ready to deploy. Five additional pages (Programs, Results, Our Story, Team, Book, FAQ) will be built next and link-connected.

---

## 1 · Deploy to Vercel (5 minutes)

The fastest, free, production-grade way to host this.

1. Create a free account at **[vercel.com](https://vercel.com)**.
2. Click **Add New → Project**.
3. Choose **Deploy without Git** (or drag the `monarch-site` folder onto the page).
4. Vercel gives you a preview URL like `monarch-abc123.vercel.app` — your site is live in ~30 seconds.
5. To use your real domain: In Vercel project settings → **Domains** → Add `monarch.hair` and `monarchhair.com`. Vercel tells you which DNS records to add. Go to Porkbun → your domain → **DNS** → add those records. Done in another 5 minutes.

**That's it.** SSL certificates, global CDN, and blazing speed are all handled automatically, free.

---

## 2 · Preview locally (optional)

Double-click `index.html` to open in your browser. Works fine for a quick look — but if something doesn't render right, use a local server:

```bash
cd monarch-site
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

---

## 3 · File structure

```
monarch-site/
├── index.html              ← The homepage
├── css/
│   └── styles.css          ← All styling (colors, fonts, layout)
├── js/
│   └── main.js             ← Nav, mobile menu, reveal animations
├── images/
│   ├── logos/              ← All 8 logo variants
│   ├── photos/             ← Team and founder photos
│   └── before-after/       ← Client transformation gallery
└── README.md               ← This file
```

---

## 4 · How to customize common things

### Change copy (headlines, body text)
Open `index.html`. Look for HTML comments like `<!-- ============ HERO ============ -->` to find each section. Edit text between tags. Save. Refresh browser.

### Change colors
Open `css/styles.css`. At the top in the `:root` block, edit:
- `--black: #0A0A0A;` — background
- `--gold: #C9A961;` — accent / brand color
- `--white: #FFFFFF;` — text

Change once, applies everywhere.

### Swap photos
Replace files in `images/photos/` or `images/before-after/` with your own (keep the same filenames), or edit `index.html` to point to new filenames. Keep images under ~400KB for speed.

### Change the phone number
Search `913.326.3852` in `index.html` — appears in the footer and in the "Call" button. Change both.

### Change the domain in footer
Search `monarch.hair` in `index.html` — currently in the footer. Update when finalized.

---

## 5 · What's on the homepage (section by section)

1. **Nav** — logo + links + Book CTA. Sticky, becomes solid on scroll. Mobile menu included.
2. **Hero** — "Stop managing it. Solve it." + sub + two CTAs. Full viewport height.
3. **Trust bar** — three credibility stats (20+ years, 100% men-focused, 0 wait lists).
4. **Pain connection** — "You've been hiding it long enough." — speaks to HC-frustrated prospects.
5. **Transformations** — 3 client before/afters in a grid. Links to full results page.
6. **Why Monarch** — 4 differentiator cards (appointments, hair quality, stylist consistency, transparency).
7. **Founder story teaser** — "One job interview ended the moment she saw my hairline" + short excerpt + link to full story.
8. **Values row** — Faith-led · Client-built · Men first.
9. **Programs preview** — 3 tiers ($350, $450, $675). Links to full programs page.
10. **Final CTA** — Book your consultation / Call 913.326.3852.
11. **Footer** — address, phone, email, site nav, © 2026, monarch.hair.

---

## 6 · Technical notes

- **Fonts**: Unbounded (display), Manrope (body), Fraunces (serif italic accents) — all loaded from Google Fonts, no setup needed.
- **Responsive**: breaks at 1024px and 768px. Tested on mobile, tablet, desktop.
- **Accessibility**: semantic HTML, alt text on all images, respects `prefers-reduced-motion`.
- **No-JS friendly**: if JavaScript fails, the site still works — animations just don't fire.
- **Performance**: zero dependencies, no framework bloat. Pure HTML/CSS/JS.

---

## 7 · Known TODOs before launch

The following pages link from the nav but **haven't been built yet** — they'll be delivered in the next round:

- `/programs.html` — full pricing page
- `/results.html` — full before/after gallery
- `/story.html` — full founder story + values + Kingsmen faith paragraph
- `/team.html` — Justin, Tina, Skyler bios and photos
- `/book.html` — consultation booking form (will integrate with GoHighLevel)
- `/faq.html` — common questions, handles HC-related objections

Clicking those links right now gives a 404. That's expected — building those next.

### Other launch-blockers to resolve:

- [ ] Replace favicon with a proper 32×32 .ico or .png (currently using full logo)
- [ ] Add a proper Open Graph social image (1200×630) for link previews
- [ ] Get Google Workspace email set up on monarch.hair
- [ ] Set up GoHighLevel and wire the booking form to it
- [ ] Attorney review before any outbound to the HC list
- [ ] Confirm the Monarch W tier pricing and add it to the programs page
- [ ] Have all logos professionally redrawn as **SVG vectors** (right now they're PNGs, which pixelate at large sizes — fine for web but not for print/signage)

---

## 8 · Editing advice

- **Don't worry about breaking it.** You can always re-download this package from the original chat and start over.
- **Keep backups.** Before making a big change, make a copy of the folder. Cheap insurance.
- **Test on mobile.** About half your traffic will be phones. Resize your browser window narrow or use Chrome's device emulator (right-click → Inspect → toggle device toolbar).

---

Built for Justin, Tina, and Skyler. For the men you're about to serve.
