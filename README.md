# Personal websites

This repo holds more than one website. Each one is deployed as its **own app** in Easypanel, using a different **build path**.

| Site | Folder | Easypanel build path |
|---|---|---|
| Brayan Muñoz — brayan.dev | `/` (root) | `/` |
| Walter Muñoz | `walter/` | `/walter` |

Every site is a static page served by nginx (Dockerfile + nginx.conf inside its folder). No build step.

## Add another website
1. Create a new folder, e.g. `maria/`.
2. Put the site's `index.html` (and any assets) inside it.
3. Copy `walter/Dockerfile` and `walter/nginx.conf` into the new folder. If the site has more files than `index.html`, add them to the `COPY` line in the Dockerfile.
4. In Easypanel, create a new App → Source **GitHub** → repo `Brayan744/portfolio`, branch `main`, build path `/maria` → Build type **Dockerfile** → Domain on port **80** → Deploy.

## Brayan's site (root)
Static site (HTML, CSS, vanilla JS): bilingual (ES/EN), interactive terminal, command palette (`Ctrl + K`), project bento grid, timeline and certificate gallery (personal IDs redacted).

```
index.html  styles.css  main.js  assets/  Dockerfile  nginx.conf
```

Run locally:
```bash
docker build -t brayan-portfolio .
docker run -p 8080:80 brayan-portfolio
```
