FROM node:18-slim

WORKDIR /app/crawlers

COPY package.json package-lock.json ./

ENV NODE_ENV=production

RUN npm ci --prefer-offline --cache /app/.npm && rm -rf /app/.npm

COPY . .

RUN apt-get update && \
    apt-get install -y cron && \
    echo "0 0 * * * root /app/crawlers/run-crawlers.sh >> /var/log/crawlers.log 2>&1" >> /etc/crontab && \
    chmod +x /app/crawlers/run-crawlers.sh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

CMD ["cron", "-f"]
