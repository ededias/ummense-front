# Build stage
FROM node:20-alpine as build-stage

WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    && rm -rf /var/cache/apk/*

# Copiar package files
COPY package*.json ./

# Instalar dependências com npm ci para builds determinísticos
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Fazer o build
RUN npm run build

# Verificar se o build foi criado
RUN test -f dist/index.html || (echo "Build failed - no index.html found" && exit 1)

# Production stage
FROM nginx:1.25-alpine as production-stage

# Copiar configuração customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos buildados
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Ajustar permissões
RUN chown -R 1001:1001 /usr/share/nginx/html && \
    chown -R 1001:1001 /var/cache/nginx && \
    chown -R 1001:1001 /var/log/nginx && \
    chown -R 1001:1001 /etc/nginx/conf.d

# Criar diretório para pid
RUN touch /var/run/nginx.pid && \
    chown -R 1001:1001 /var/run/nginx.pid

USER 1001

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]