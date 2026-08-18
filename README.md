# Academic Research Hub

A clean, responsive academic research website designed for **GitHub Pages**.

## Features

- Daily research progress journal
- Lecture notes / knowledge base
- Paper and manuscript tracker
- Research scope map
- Academic activities timeline
- Search and category filtering
- Dark mode
- Local browser storage
- Export all entries as JSON
- Fully static: no backend required
- Responsive on desktop and mobile

## Quick start

1. Create a new GitHub repository, for example `academic-research-hub`.
2. Copy all files from this folder into the repository.
3. Commit and push.
4. On GitHub, open **Settings → Pages**.
5. Select **Deploy from a branch**.
6. Choose `main` and `/ (root)`.
7. Save. GitHub will publish the website.

## Important data note

The **Add** forms currently save entries to the browser's `localStorage`. This means they are persistent on the same browser/device, but they are **not automatically committed to GitHub**.

For a truly public research log, the recommended workflow is:

- edit the source data in a GitHub repository,
- commit changes,
- let GitHub Pages rebuild the site.

A future version can use Markdown files as the content database and GitHub Actions to publish them automatically.

## Personalization

The initial research scope is a starter structure around:

- Nonlinear optics
- Quantum geometry
- Quantum materials
- Computational physics
- Materials & detection
- Scientific computing

Replace the seed data inside `assets/js/app.js` with your own content.

## Suggested future structure

```text
academic-research-hub/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── data/
│   ├── progress/
│   ├── notes/
│   ├── papers/
│   └── activities/
└── README.md
```
