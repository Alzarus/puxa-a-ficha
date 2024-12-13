package configs

import (
	"fmt"
	"log"
	"os"
	"to-de-olho-api/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// Obter as variáveis de ambiente
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_DATABASE")

	// Montar a DSN (Data Source Name)
	dsn := fmt.Sprintf("host=%s user=%s dbname=%s password=%s port=%s sslmode=disable",
		dbHost, dbUser, dbName, dbPassword, dbPort)

	// Conectar ao banco de dados
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Falha ao conectar ao banco de dados:", err)
	}

	// Rodar as migrações
	err = database.AutoMigrate(&models.Frequency{})
	if err != nil {
		log.Fatal("Falha ao rodar as migrações:", err)
	}

	DB = database
}
