# Etapa de build
FROM node:18-slim AS build
WORKDIR /app/crawlers

# Copiando apenas os arquivos necessários para dependências
COPY ./crawlers/package.json ./crawlers/package-lock.json ./
RUN npm ci --prefer-offline --cache /app/.npm && rm -rf /app/.npm

# Copiando o restante do código
COPY ./crawlers /app/crawlers

# Etapa de produção
FROM mcr.microsoft.com/playwright:v1.34.0-focal AS production
WORKDIR /app/crawlers

# Instalando dependências do sistema para cron e scripts
RUN apt-get update && \
    apt-get install -y curl cron && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiando o código e as dependências do build
COPY --from=build /app/crawlers /app/crawlers

# Garantindo que o script tem permissão de execução
RUN chmod +x /app/crawlers/run-crawlers.sh

# CMD para iniciar o serviço de crawlers
CMD ["bash", "/app/crawlers/run-crawlers.sh"]