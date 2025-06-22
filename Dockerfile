# Dockerfile para servir los archivos estáticos generados por Next.js
FROM nginx:alpine

# Copiar los archivos estáticos desde la carpeta out
COPY out/ /usr/share/nginx/html/

# Configuración personalizada de nginx para SPAs
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Servir archivos estáticos \
    location / { \
        try_files $uri $uri/ $uri.html /index.html; \
    } \
    \
    # Configuración para archivos de assets \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Configuración para archivos JSON \
    location ~* \.json$ { \
        add_header Content-Type application/json; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
