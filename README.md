# Skills Framework - Training and Adult Education (TAE) Archive Mirror

This repository contains a backup mirror of the Skills Framework TAE page from the SkillsFuture Singapore website, archived on August 5, 2025.

## Source

Original Archive URL: https://web.archive.org/web/20250805010555id_/https://www.skillsfuture.gov.sg/skills-framework/tae

## Contents

This mirror includes:
- **index.html** - Main HTML page (90KB)
- **assets/** - Local assets (CSS, JS, favicons)
  - dist/css/ - Stylesheets (main.css, main.min.css, all.min.css)
  - dist/js/ - JavaScript files (bootstrap, popper, main.js, all.min.js)
  - favicon/ - Favicon images
- **cdn/** - CDN resources downloaded locally
  - sgds/ - Singapore Government Design System CSS
  - bootstrap-icons/ - Bootstrap Icons fonts and CSS
  - sgds-web-component/ - SGDS web components
- **images/** - Images from the archived page
- **www.skillsfuture.gov.sg/** - External images from skillsfuture.gov.sg
- **Mvc/** - Additional CSS and JS files
- **external/** - External scripts (wogaa.js)

## Viewing the Mirror

Simply open `index.html` in a web browser to view the archived page. All resources (CSS, JavaScript, images) are included locally so the page works offline.

## File Structure

```
.
├── index.html              # Main page
├── assets/                 # Local assets
│   ├── dist/
│   │   ├── css/           # Stylesheets
│   │   └── js/            # JavaScript files
│   └── favicon/           # Favicons
├── cdn/                   # CDN resources (downloaded locally)
│   ├── bootstrap-icons/   # Bootstrap Icons
│   ├── sgds/             # Singapore Government Design System
│   └── sgds-web-component/
├── images/                # Page images
├── www.skillsfuture.gov.sg/  # External images
├── Mvc/                   # Additional assets
└── external/              # External scripts
```

## Technical Details

- All external CDN resources have been downloaded and stored locally
- Image paths have been updated to point to local copies
- CSS and JavaScript files are preserved in their original structure
- Total size: ~3MB
- 27 files downloaded including fonts, images, CSS, and JavaScript

## Note

This is a static archive for backup purposes. Some interactive features that depend on external APIs may not function.