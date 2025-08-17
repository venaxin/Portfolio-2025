# Portfolio 2025 (React + Vite)

Development

- Install deps: npm install
- Start dev server: npm run dev

Deploy (GitHub Pages)

This repo includes an Actions workflow that builds and publishes to GitHub Pages on every push to main.

Steps once in GitHub:

1. Push this repo to GitHub (public or private).
2. In the GitHub repo, go to Settings → Pages → Build and deployment → Source: GitHub Actions. No other changes needed.
3. Push to main. The workflow will build and deploy. Your site will be available at: https://<your-username>.github.io/Portfolio-2025/

Notes

- The Vite base path is set from env var BASE_PATH. The workflow sets BASE_PATH=/Portfolio-2025/ so all assets resolve correctly on project pages.
- For single-page app routing, 404.html is copied from index.html to enable fallback on Pages.

Alternative: Netlify (one-click)

1. Create a new site in Netlify and connect this repo.
2. Build command: npm run build
3. Publish directory: dist
4. For SPA routing, enable Redirects: add a \_redirects file in dist with `/* /index.html 200` (or create public/\_redirects in repo with that rule).
