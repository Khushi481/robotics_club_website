# Robotics Club Website

## Technology Choices
For the construction of this website, we opted for a **Vanilla HTML5, CSS3, and JavaScript** stack.

### Why this stack?
1.  **Compliance with Requirements**: The required folder structure (`/css`, `/js`, `/images`) maps 1:1 with a traditional static site setup, making frameworks like React or Vue overkill or requiring complex build steps (like Webpack/Vite) to output this exact structure.
2.  **No Build Step / No Backend**: The constraints specified "No Backend Required" and implied a simple deployment. Vanilla static files can be deployed anywhere (GitHub Pages, Netlify, Vercel, or a simple Apache/Nginx server) without compiling.
3.  **Performance & Lightweight**: Without the overhead of a Virtual DOM or large bundles, the site loads instantly.
4.  **Control**: Using vanilla CSS allows for precise control over the design to match the "Premium" and "Wowed" aesthetic requirements without fighting framework overrides.

## Project Structure
- `index.html`, `projects.html`, etc.: Main entry points for each page.
- `css/`:
  - `main.css`: Global variables, reset, typography, and shared layout (Navbar/Footer).
  - `components.css`: Specific styles for isolated UI elements (Cards, Buttons, Grids).
  - `responsive.css`: Media queries to override styles for mobile/tablet devices.
- `js/`:
  - `main.js`: Global interactivity (e.g., Mobile Menu toggle).
  - `filters.js`: Specific logic for the Projects page filtering system.
  - `modals.js`: (Future) Modal interaction logic.
- `images/`: Organized assets.

## Deployment
Simply upload the entire `robotics-club-website` folder to any static hosting provider. Open `index.html` to view locally.
