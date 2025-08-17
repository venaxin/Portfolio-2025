# Portfolio 2025 (React + Vite)

> A responsive, animated portfolio built with React, Vite, Tailwind CSS, and Framer Motion. Includes an accessibility + themes panel, performance-friendly toggles, and project case studies.

## Quick start

Requirements

- Node.js 18+ (Node 20 recommended)

Install and run

```bash
npm install
npm run dev
```

Build and preview production

```bash
npm run build
npm run preview
```

Lint

```bash
npm run lint
```

## Project structure

```
Portfolio-2025/
	src/
		App.jsx               # Main app, sections & accessibility panel
		MeteorShower.jsx      # Animated meteor background
		components/           # UI components (Parallax, Resume, Projects, etc.)
		data/projects.js      # Project cards data (edit me to add projects)
		data/Resume.pdf       # CV (rendered in Resume section)
		assets/               # Images/GIFs used by parallax + backgrounds
	public/                 # Static assets copied as-is
	vite.config.js          # Vite config (BASE_PATH-aware)
	tailwind.config.js      # Tailwind (v4)
	eslint.config.js        # ESLint (React 19-ready)
```

## Features

- Animated backgrounds: stars, meteors, galaxy parallax, optional black hole effects
- Sections: Home, About, Experience, Resume (PDF viewer), Projects, Contact
- Accessibility & Themes panel:
  - Low Power mode (simplifies visuals/animations)
  - 8‑bit Retro mode (pixel aesthetic)
  - Theme selection with sky presets and accent/stars/meteor colors
  - Toggle background elements (stars, galaxy, GIF black holes)
- Motion-aware: honors `prefers-reduced-motion`
- Local persistence: most toggles saved in `localStorage`

## Using and customizing

### Add or edit project cards

Edit `src/data/projects.js`. Each project item supports:

```js
{
	title: "Project Name",
	year: 2025,
	status: "Ongoing" | "Completed",
	description: "Short description",
	tech: ["React", "Tailwind"],
	image: "https://...",           // or local asset
	demoLink: "https://...",        // optional
	repoLink: "https://...",        // optional
	metrics: { perf: 98, a11y: 100, bundle: "165KB" },
	caseStudy: {                      // optional, used by CaseStudy component
		problem: "...",
		constraints: ["..."],
		approach: "...",
		results: ["..."],
		highlights: ["..."],
		links: [{ label: "Design notes", href: "#" }],
		images: []
	}
}
```

You can point `image` to a remote URL or import a local asset and pass it along in your data.

### Resume PDF

Replace `src/data/Resume.pdf` with your own file (same filename) or update the import path in `src/App.jsx` if you change the name.

### Contact links

In `src/App.jsx` (Contact section), icons link to your email and LinkedIn. Update URLs as needed.

### Themes, sky, and colors

All theme selections and sky presets are applied via CSS variables + Tailwind. You can add new presets or themes by extending styles and the toggle lists in `App.jsx`.

### Persistence keys (localStorage)

Common keys used by the app: `snapEnabled`, `theme`, `lowPower`, `eightBit`, `starsColor`, `meteorsColor`, `starsEnabled`, `bhGifsEnabled`, `galaxiesEnabled`, plus black‑hole related tuning keys. Delete keys in DevTools to reset.

## Deployment

### GitHub Pages (preconfigured)

This repo ships with `.github/workflows/deploy.yml`. On every push to `main`, it:

- Installs deps, builds the site
- Sets `BASE_PATH=/Portfolio-2025/` so assets load from the project subpath
- Copies `index.html` to `404.html` for SPA routing
- Creates `.nojekyll` and deploys to Pages

One-time setup in GitHub:

1. Settings → Pages → Build and deployment → Source: GitHub Actions
2. Push to `main` (or re-run the workflow under Actions)

Your site URL: `https://<your-username>.github.io/Portfolio-2025/`

If you rename the repo, update the workflow’s `BASE_PATH` to `/<new-name>/`.

### Netlify (alternative)

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: add `_redirects` with `/* /index.html 200` (can be placed in `public/`)

### Vercel (alternative)

- Framework preset: Vite
- Build command: `npm run build`
- Output: `dist`

## Environment variables

- `BASE_PATH`: The public base path for assets and routes. For GitHub Pages project sites, set to `/<repo-name>/` (workflow does this). For root domains (e.g., custom domain or `username.github.io`), set `/`.

## Troubleshooting

White screen on GitHub Pages

- Ensure Pages Source = GitHub Actions (not "Deploy from a branch")
- Check asset URLs in the Network tab — if they start with `/assets/...` and 404, set `BASE_PATH` correctly (e.g., `/Portfolio-2025/`)
- Hard refresh (Cmd+Shift+R) to clear cache after deploy
- Confirm `404.html` exists in the deployed artifact for SPA routing

Broken routes on refresh

- Pages doesn’t handle SPA routes by default; copying `index.html` to `404.html` fixes this (done in the workflow)

## Tech stack

- React 19, Vite 6, Tailwind CSS 4, Framer Motion
- Icons: `react-icons`
- Type animation: `react-type-animation`

## License

No license file is present. All rights reserved by the author unless a license is added.

## Contact

- Email: abdulrahman.hussain02@gmail.com
- LinkedIn: https://linkedin.com/in/abdul-rahman-hussain
