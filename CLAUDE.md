# RTJ Club Caddie Wiki

## Project Overview
A training wiki for RTJ (Robert Trent Jones) golf club staff, built with vanilla HTML/CSS/JS and deployed on Vercel. No build step — the site is served as static files with two serverless API routes.

## Architecture
- **index.html** — Single-page app (all UI, styles, and logic in one file)
- **articles.js** — Article database (modules, articles, keywords, screenshots)
- **api/publish.js** — Serverless function for publishing articles
- **api/upload-image.js** — Serverless function for image uploads
- **screenshots/** — Article screenshot images
- **onesheets/** — One-sheet reference documents
- **vercel.json** — Vercel deployment config

## Branching Workflow
- **main** — Production branch. Deploys to the live Vercel site automatically. Never work directly on main.
- **dev** — Development branch. Do all work here (or on feature branches off dev). Merge to main only when tested and ready.

### How to work safely:
1. Switch to `dev` branch before making changes
2. Make your changes and commit them
3. When ready, merge `dev` into `main` to deploy

## Key Conventions
- Articles are defined in `articles.js` with the structure: `{ id, title, module, role, content, keywords, relatedIds, dateUpdated, version }`
- Screenshots follow the naming pattern: `screenshots/{article-id}-{descriptor}.png`
- All styling is inline in index.html (no external CSS files)
- No npm dependencies for the frontend — pure vanilla JS
