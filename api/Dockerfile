# Etapa de build
FROM node:18-slim AS build
WORKDIR /app

# Copiando apenas os arquivos essenciais para o build
COPY package*.json ./
RUN npm ci

# Copiando o código fonte e rodando o build
COPY . .
RUN npm run build

# Etapa de produção
FROM node:18-slim AS production
WORKDIR /app

# Copiando o resultado do build e as dependências instaladas da etapa anterior
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Definindo o comando para iniciar a aplicação
CMD ["node", "dist/main"]
