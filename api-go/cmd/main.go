package main

import (
	"log"
	"puxa-a-ficha-api/configs"
	"puxa-a-ficha-api/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Conectar ao banco de dados
	configs.ConnectDatabase()

	// Configurar rotas
	routes.SetupRoutes(r)

	// Iniciar o servidor
	if err := r.Run(":3000"); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %s", err)
	}
}
