# YJ-Global — Static HTML/CSS/JS

A redesigned static version of the YJ-Global logistics website, built with plain HTML, CSS, and vanilla JavaScript. No build step required.

## Pages
- `index.html` — Home (hero, stats, services preview, quote, testimonials, team)
- `about.html` — Company story, mission/vision/values
- `services.html` — Full services grid + quote form
- `contact.html` — Contact details + quote form

## Structure
```
.
├── index.html
├── about.html
├── services.html
├── contact.html
├── css/styles.css
├── js/main.js
└── images/
    ├── hero-cargo.jpg
    ├── air-freight.jpg
    └── warehouse.jpg
```

## Run locally
Just open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```
Then visit http://localhost:8000.

## Customize
- Colors and typography live as CSS variables at the top of `css/styles.css` (`--ink`, `--primary`, `--paper`, fonts...).
- Form submissions in `js/main.js` show a toast — wire to your backend by replacing the success branch in the submit handler.
