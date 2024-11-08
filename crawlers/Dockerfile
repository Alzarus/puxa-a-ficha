# Etapa de build
FROM node:18-slim AS build
WORKDIR /app/crawlers

# Copiando apenas os arquivos necessários para o build
COPY ./crawlers/package.json ./crawlers/package-lock.json ./
RUN npm ci --prefer-offline --cache /app/.npm && rm -rf /app/.npm

# Copiando o código-fonte e o script `run-crawlers.sh`
COPY ./crawlers /app/crawlers

# Etapa de produção
FROM node:18-slim AS production
WORKDIR /app/crawlers

# Instalação de dependências necessárias
RUN apt-get update && \
    apt-get install -y curl cron wget gnupg2 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalação do Google Chrome para uso com Puppeteer
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalação do Chromium para uso com Playwright
RUN apt-get update && \
    apt-get install -y chromium && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiando o código e as dependências do build
COPY --from=build /app/crawlers /app/crawlers

# Garantindo que o script tem permissão de execução
RUN chmod +x /app/crawlers/run-crawlers.sh

# CMD para iniciar o serviço de crawlers
CMD ["bash", "/app/crawlers/run-crawlers.sh"]
