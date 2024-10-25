# Etapa de build
FROM node:18-slim AS build
WORKDIR /app/crawlers

# Copiando apenas os arquivos necessários para o build
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --cache /app/.npm && rm -rf /app/.npm

# Copiando o código fonte
COPY . .

FROM node:18-slim AS production
WORKDIR /app/crawlers

# Instalação de curl, cron e anacron
RUN apt-get update && \
    apt-get install -y curl cron anacron && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiando o código e as dependências do build
COPY --from=build /app/crawlers /app/crawlers

# Configurando o cron job para rodar via anacron
RUN echo "1 0 * * * root /usr/sbin/anacron -s" >> /etc/crontab && \
    echo "0 0 daily root /app/crawlers/run-crawlers.sh >> /var/log/crawlers.log 2>&1" >> /etc/cron.d/anacron && \
    chmod +x /app/crawlers/run-crawlers.sh

# Iniciando o cron/anacron
CMD ["cron", "-f"]
