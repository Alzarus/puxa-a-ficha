# Etapa de build
FROM node:18-slim AS build
WORKDIR /app/crawlers

# Copiando apenas os arquivos necessários para o build
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --cache /app/.npm && rm -rf /app/.npm

# Copiando o código fonte e os scripts
COPY . .

# Etapa de produção
FROM node:18-slim AS production
WORKDIR /app/crawlers

# 1. Instalação de dependências necessárias (curl, cron, anacron, wget, gnupg)
RUN apt-get update && \
    apt-get install -y curl cron anacron wget gnupg2 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Instalação do Google Chrome para uso com Puppeteer
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Instalação do Chromium para uso com Playwright
RUN apt-get update && \
    apt-get install -y chromium && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 4. Copiando o código e as dependências do build
COPY --from=build /app/crawlers /app/crawlers

# 5. Certificando-se de que o script existe e tem permissão de execução
RUN chmod +x /app/crawlers/run-crawlers.sh

# 6. Configuração do cron job para rodar via anacron
RUN echo "1 0 * * * root /usr/sbin/anacron -s" >> /etc/crontab && \
    echo "0 0 daily root /app/crawlers/run-crawlers.sh >> /app/crawlers/logs/crawlers.log 2>&1" >> /etc/cron.d/anacron && \
    chmod +x /etc/cron.d/anacron

# 7. Iniciando o cron/anacron
CMD ["cron", "-f"]
