# Indian Farm

Simple static site and Node server for the Indian Farm Market project.

## Summary
- Small website with product pages, basic server, and static assets.

## Features
- Static HTML pages: index, home, about, product pages
- Static assets: CSS (`styles.css`) and `images/` folder
- Node server entry: `server.js`

## Quick start
1. Install dependencies (if any):

```bash
npm install
```

2. Start the server:

```bash
node server.js
```

3. Open your browser at http://localhost:3000 (or the port set in `server.js`).

## Important files
- `index.html` — main landing page
- `home.html`, `about.html`, `product.html`, `products.html` — other pages
- `server.js` — Node server
- `script.js`, `index.js`, `IndianFarmMarket.js` — client scripts
- `styles.css` — site styles
- `images/` — project images
- `models/` — (contains `payment.html`) — model-related files

## Notes
- Update `server.js` port or configuration as needed.
- Add a `package.json` start script for convenience, e.g.:

```json
"scripts": {
  "start": "node server.js"
}
```

## License
Add a license file if you plan to publish or share this project.
