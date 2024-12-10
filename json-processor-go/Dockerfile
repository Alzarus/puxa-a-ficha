# Etapa de build
FROM golang:1.22 AS builder
WORKDIR /app

# Copiar todos os arquivos do projeto
COPY . .

# Instalar dependências e compilar o binário
RUN go mod tidy
RUN go build -o main .

# Etapa de produção
FROM alpine:latest
WORKDIR /root/

# Copiar o binário gerado
COPY --from=builder /app/main .
# Adicionar dependências necessárias
RUN apk add --no-cache ca-certificates
EXPOSE 3000

# Executar o binário
CMD ["./main"]
