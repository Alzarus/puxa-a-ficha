# Etapa de build
FROM golang:1.23 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração do Go (mod e sum)
COPY go.mod go.sum ./

# Baixa as dependências necessárias
RUN go mod download

# Copia o restante do código
COPY . .

# Gera o binário com variáveis de ambiente para compatibilidade
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main .

# Etapa de produção
FROM alpine:latest

# Define o diretório de trabalho
WORKDIR /app

# Copia o binário gerado na etapa de build
COPY --from=builder /app/main .

# Adiciona dependências necessárias e configura permissões
RUN apk add --no-cache ca-certificates && \
    chmod +x /app/main

# Define a porta exposta (se necessário)
EXPOSE 3000

# Define o comando padrão para execução
CMD ["/app/main"]