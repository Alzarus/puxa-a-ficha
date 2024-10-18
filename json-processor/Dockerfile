# Etapa de build
FROM node:18-slim AS build
WORKDIR /app/json-processor

# Copiando e instalando as dependências
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

# Copiando o código
COPY . .

# Etapa de produção
FROM node:18-slim AS production
WORKDIR /app/json-processor

# Copiando o build e as dependências da etapa de build
COPY --from=build /app/json-processor /app/json-processor

# Instalando o cron e configurando a tarefa agendada
RUN apt-get update && \
    apt-get install -y cron && \
    echo "30 0 * * * root npm run process-json >> /var/log/json-processor.log 2>&1" >> /etc/crontab && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Executando o cron em primeiro plano
CMD ["cron", "-f"]
