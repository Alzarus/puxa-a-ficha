# Etapa de build
FROM node:18-slim AS build
WORKDIR /app/json-processor

# Copiando e instalando as dependências
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

# Copiando o código
COPY . .

FROM node:18-slim AS production
WORKDIR /app/json-processor

# Instalação do curl, cron e anacron
RUN apt-get update && \
    apt-get install -y curl cron anacron && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiando o build e as dependências da etapa de build
COPY --from=build /app/json-processor /app/json-processor

# Configurando o cron job para rodar via anacron com caminho absoluto
RUN echo "1 0 * * * root /usr/sbin/anacron -s" >> /etc/crontab && \
    echo "1 30 daily root cd /app/json-processor && /usr/local/bin/npm run process-json -- --workers=\$WORKER_COUNT >> /app/json-processor/logs/json-processor.log 2>&1" >> /etc/cron.d/anacron && \
    chmod +x /etc/cron.d/anacron

# Executando o cron/anacron em primeiro plano
CMD ["cron", "-f"]
