# Robotics Club Website

Maintainer
- Name: Khushi
- Contact:khushi22072207@gmail.com / 9279554234
Overview
- Static, responsive website for the Robotics Club built with Vanilla HTML, CSS and JavaScript. The design uses a dark/neon theme and is optimized for fast loading and easy deployment.

Technology choice and reason
- HTML5 / CSS3 / JavaScript (Vanilla): Simple, dependency-free delivery suitable for static hosting (GitHub Pages, Netlify, etc.).
- GSAP (CDN): used for lightweight, high-performance animations (hero and small transitions).
- Font resources: Google Fonts (Exo 2, Orbitron, Montserrat) for aesthetic headings and body typography.
- Font Awesome (CDN): iconography used across the UI.

How this supports future scalability
- Modular CSS: `main.css`, `components.css`, and `responsive.css` separate concerns so new components or pages can be added with minimal conflicts.
- CSS variables (`:root`) for colors, fonts, and layout primitives (e.g., `--nav-height`) make it straightforward to update the theme or adjust spacing globally.
- Semantic HTML and small JS modules (`js/main.js`, `js/news.js`, `js/projects.js`) keep behavior isolated and easy to migrate to a build system later.
- If the project grows, the codebase is ready to be migrated to a component-based workflow or static site generator (11ty / Hugo / Next) with minimal rework.

External resources & images used
- Google Fonts: Exo 2, Orbitron, Montserrat (loaded via `fonts.googleapis.com`)
- Font Awesome: CDN at `cdnjs.cloudflare.com` for icons
- GSAP + ScrollTrigger: `cdnjs.cloudflare.com` (used for hero and UI animations)
- Unsplash images: several pages use Unsplash CDN images as visual placeholders (e.g., hero / project thumbnails). Example sources visible in `*.html` files.
- Local assets: `images/` (background, team, projects, hero images, logo)

Setup & Local Testing
1. Clone or download the repository and open the folder `robotics_club_website`.
2. Quick local view: open `index.html` directly in a browser for basic testing (some features may require a server due to CORS/browser restrictions).
3. Recommended: run a local static server (Python):

```bash
cd robotics_club_website
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

4. Alternatively use VS Code Live Server extension for instant reloads.
5. When testing after style/script edits, do a hard refresh (Ctrl+Shift+R) or open the site in an incognito tab — some files include cache-busting query strings (e.g., `css/responsive.css?v=4`).

Notes & Next Steps
- To embed a live Google Map replace the static placeholder in `contact.html` with the Google Maps embed snippet (requires API key for dynamic features).
- To bundle dependencies for production (optional) add a build step with a bundler (Vite / Webpack) and move CDN libs to local copies or npm packages.

License / Attribution
- Design and code authored by the Robotics Club contributors. External images and fonts retain their original licenses (Unsplash and Google Fonts);
  please review their usage terms if redistributing assets.

