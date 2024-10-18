# Etapa de build
FROM node:18-slim AS build
WORKDIR /app/crawlers

# Copiando apenas os arquivos necessários para o build
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --cache /app/.npm && rm -rf /app/.npm

# Copiando o código fonte e preparando o cron
COPY . .

# Etapa de produção
FROM node:18-slim AS production
WORKDIR /app/crawlers

# Copiando o cron job e o código
COPY --from=build /app/crawlers /app/crawlers

RUN apt-get update && \
    apt-get install -y cron && \
    echo "0 0 * * * root /app/crawlers/run-crawlers.sh >> /var/log/crawlers.log 2>&1" >> /etc/crontab && \
    chmod +x /app/crawlers/run-crawlers.sh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Iniciando o cron
CMD ["cron", "-f"]
