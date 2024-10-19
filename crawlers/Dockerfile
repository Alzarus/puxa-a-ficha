# Etapa de build
FROM node:18-slim AS build
WORKDIR /app/crawlers

# Copiando apenas os arquivos necessários para o build
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --cache /app/.npm && rm -rf /app/.npm

# Copiando o código fonte
COPY . .

# Etapa de produção para os crawlers
FROM node:18-slim AS production
WORKDIR /app/crawlers

# Instalação de dependências necessárias para Chrome, Playwright, Puppeteer, curl, cron e wget
RUN apt-get update && \
    apt-get install -y curl cron wget gnupg ca-certificates --no-install-recommends && \
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-chrome-keyring.gpg && \
    sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && apt-get install -y google-chrome-stable --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Instalar Puppeteer e Chrome para Puppeteer
RUN npm install puppeteer@latest && \
    npx puppeteer browsers install chrome

# Instalar Playwright apenas com Chromium
RUN npx playwright install chromium

# Copiando o código e as dependências do build
COPY --from=build /app/crawlers /app/crawlers

# Configurando o cron job
RUN echo "0 0 * * * root /app/crawlers/run-crawlers.sh >> /var/log/crawlers.log 2>&1" >> /etc/crontab && \
    chmod +x /app/crawlers/run-crawlers.sh

# Iniciando o cron
CMD ["cron", "-f"]
