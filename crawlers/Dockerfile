FROM node:18

WORKDIR /app/crawlers

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y cron

RUN echo "0 0 * * * root /app/crawlers/run-crawlers.sh >> /var/log/crawlers.log 2>&1" >> /etc/crontab

COPY run-crawlers.sh /app/crawlers/run-crawlers.sh

RUN chmod +x /app/crawlers/run-crawlers.sh

CMD cron -f
