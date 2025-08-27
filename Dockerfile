
FROM node:20-alpine as build-stage

WORKDIR /build

# Copiar e instalar dependências
COPY package*.json ./
RUN npm ci

# Build da aplicação
COPY . .
RUN npm run build


FROM node:20-alpine

WORKDIR /app

# Instalar servidor estático leve
RUN npm install -g http-server

# Copiar apenas os arquivos de build
COPY --from=build-stage /build/dist ./dist

# Porta padrão (Railway sobrescreve com $PORT)
EXPOSE 8080

# Comando de execução
CMD ["http-server", "dist", "-p", "${PORT:-8080}", "-c-1", "--cors"]
