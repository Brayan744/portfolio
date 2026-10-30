# Walter Muñoz — static site served by nginx (Easypanel build path: /walter)
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD wget -q --spider http://127.0.0.1/ || exit 1
