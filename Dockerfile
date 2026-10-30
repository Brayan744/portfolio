# Static site served by nginx — ready for Easypanel
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css main.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/ >/dev/null || exit 1
