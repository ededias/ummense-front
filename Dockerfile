# Build stage
FROM node:20-alpine as build-stage

WORKDIR /app

# Dependências necessárias
RUN apk add --no-cache python3 make g++

# Copia arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia código
COPY . .

# Build da aplicação
RUN npm run build


# Production stage (usando Nginx)
FROM nginx:stable-alpine as production-stage

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copia config customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia build do Vue
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
