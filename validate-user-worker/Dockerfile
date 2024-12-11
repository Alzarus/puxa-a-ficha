# Imagem base para o build
FROM golang:1.23-alpine AS builder

# Instala dependências necessárias
RUN apk add --no-cache git

# Configura o diretório de trabalho
WORKDIR /app

# Copia os arquivos do microsserviço
COPY . .

# Baixa as dependências
RUN go mod tidy

# Compila o binário
RUN go build -o validate-user-worker .

# Imagem final para produção
FROM alpine:latest

# Configura o diretório de trabalho
WORKDIR /app

# Copia o binário gerado na etapa anterior
COPY --from=builder /app/validate-user-worker .

# Define o comando padrão ao iniciar o container
CMD ["./validate-user-worker"]
