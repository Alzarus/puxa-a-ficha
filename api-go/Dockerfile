# Etapa de build
FROM golang:1.22 AS builder
WORKDIR /app

# Copiar arquivos do projeto
COPY . .

# Alterar diretório para a pasta onde está o main.go
WORKDIR /app/cmd

# Configurar a compilação estática
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64

# Baixar dependências e compilar o binário
RUN go mod tidy
RUN go build -o main .

# Etapa de produção
FROM alpine:latest
WORKDIR /root/

# Instalar dependências necessárias, como curl
RUN apk add --no-cache ca-certificates curl

# Copiar o binário gerado
COPY --from=builder /app/cmd/main .

# Expor a porta da API
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["./main"]
