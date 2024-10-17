FROM node:18-slim

WORKDIR /app/json-processor

COPY package.json package-lock.json ./

RUN npm ci && \
    npm cache clean --force

COPY . .

CMD ["npm", "run", "process-json"]
