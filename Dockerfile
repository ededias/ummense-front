# Build em uma imagem temporária - Node 16 para compatibilidade
FROM node:20-alpine as build-stage

WORKDIR /build

# Copiar e instalar apenas o necessário para build
COPY package*.json ./
RUN npm ci

# Build da aplicação
COPY . .
RUN npm run build

# Imagem final com Node 16
FROM node:16-alpine

WORKDIR /app

# Instalar apenas http-server (mais leve que serve)
RUN npm install -g http-server

# Copiar apenas os arquivos dist
COPY --from=builder /build/dist ./

# Railway usa a variável PORT
EXPOSE $PORT

# Comando simples e eficiente
CMD http-server . -p $PORT -c-1 --cors