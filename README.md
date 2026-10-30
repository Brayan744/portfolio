# brayan.dev — Personal website

Personal portfolio of **Brayan Muñoz**, Systems Engineer & Software Developer.

Static site (HTML, CSS, vanilla JS) — no build step. Bilingual (ES/EN), interactive terminal, command palette (`Ctrl + K`), project bento grid, timeline and certificate gallery.

## Run locally
Open `index.html` in a browser, or:
```bash
docker build -t brayan-portfolio .
docker run -p 8080:80 brayan-portfolio
```

## Deploy on Easypanel
1. **Create service → App**.
2. **Source:** GitHub → `Brayan744/portfolio`, branch `main`.
3. **Build:** Dockerfile (path `Dockerfile`).
4. **Domains:** add your domain, container port **80**. Enable HTTPS.
5. **Deploy**. Every push to `main` can redeploy automatically (enable *Auto Deploy*).

## Structure
```
index.html      page markup
styles.css      design system & layout
main.js         i18n, terminal, palette, gallery, animations
assets/         photo, CV, certificate previews (personal IDs redacted)
Dockerfile      nginx image
nginx.conf      caching & gzip
```
