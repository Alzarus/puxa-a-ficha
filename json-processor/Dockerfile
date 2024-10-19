# Etapa de build
FROM node:18-slim AS build
WORKDIR /app/json-processor

# Copiando e instalando as dependências
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

# Copiando o código
COPY . .

# Etapa de produção
FROM node:18-slim AS production
WORKDIR /app/json-processor

# Instalação do curl e cron
RUN apt-get update && \
    apt-get install -y curl cron && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiando o build e as dependências da etapa de build
COPY --from=build /app/json-processor /app/json-processor

# Configurando múltiplos workers usando o Node.js cluster
# Configuração para permitir mais de um worker
ENV WORKER_COUNT=4

# Configurando o cron job para processar os JSONs em paralelo usando múltiplos workers
RUN echo "30 0 * * * root npm run process-json -- --workers=\$WORKER_COUNT >> /var/log/json-processor.log 2>&1" >> /etc/crontab

# Executando o cron em primeiro plano
CMD ["cron", "-f"]
