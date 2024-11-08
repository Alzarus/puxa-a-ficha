# Etapa de build
FROM node:18-slim AS build
WORKDIR /app/json-processor

# Copiando os arquivos de dependência para a instalação
COPY ./json-processor/package.json ./json-processor/package-lock.json ./
RUN npm ci && npm cache clean --force

# Copiando o código-fonte necessário do json-processor
COPY ./json-processor /app/json-processor

# Etapa de produção
FROM node:18-slim AS production
WORKDIR /app/json-processor

# Instalação de curl e cron para o ambiente de produção
RUN apt-get update && \
    apt-get install -y curl cron && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiando o código e dependências do estágio de build
COPY --from=build /app/json-processor /app/json-processor

# CMD para iniciar o json-processor, aguardando o sinal do broker
CMD ["npm", "run", "process-json"]
