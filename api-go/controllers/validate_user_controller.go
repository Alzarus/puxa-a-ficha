package controllers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/rabbitmq/amqp091-go"
)

// RequestBody define a estrutura dos dados recebidos
type RequestBody struct {
	TituloCpf      string `json:"tituloCpf" binding:"required"`
	DataNascimento string `json:"dataNascimento" binding:"required"`
	NomeMae        string `json:"nomeMae"`
}

// ValidateUser publica os dados do eleitor na fila do RabbitMQ
func ValidateUser(c *gin.Context) {
	var requestBody RequestBody

	// Valida o JSON recebido
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos: " + err.Error()})
		return
	}

	// Converte os dados para JSON
	message, err := json.Marshal(requestBody)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao serializar dados: " + err.Error()})
		return
	}

	// Publica a mensagem na fila
	err = publishToQueue(c, "validate_user_queue", message)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao publicar mensagem na fila: " + err.Error()})
		return
	}

	// Responde imediatamente ao cliente
	c.JSON(http.StatusAccepted, gin.H{"status": "processing", "message": "Validação em andamento"})
}

// publishToQueue publica uma mensagem em uma fila RabbitMQ
func publishToQueue(c *gin.Context, queueName string, message []byte) error {
	// Conecta ao RabbitMQ
	conn, err := amqp091.Dial("amqp://puxa-a:ficha@localhost:5672/")
	if err != nil {
		log.Printf("Erro ao conectar ao RabbitMQ: %v", err)
		return err
	}
	defer conn.Close()

	// Cria um canal
	ch, err := conn.Channel()
	if err != nil {
		log.Printf("Erro ao abrir canal no RabbitMQ: %v", err)
		return err
	}
	defer ch.Close()

	// Declara a fila
	_, err = ch.QueueDeclare(
		queueName,
		true,  // durable
		false, // autoDelete
		false, // exclusive
		false, // noWait
		nil,   // arguments
	)
	if err != nil {
		log.Printf("Erro ao declarar fila: %v", err)
		return err
	}

	// Cria um contexto com timeout
	ctx, cancel := context.WithTimeout(c, 5*time.Second)
	defer cancel()

	// Publica a mensagem na fila
	err = ch.PublishWithContext(
		ctx,       // contexto para timeout
		"",        // exchange
		queueName, // routing key
		false,     // mandatory
		false,     // immediate
		amqp091.Publishing{
			ContentType: "application/json",
			Body:        message,
		},
	)
	if err != nil {
		log.Printf("Erro ao publicar mensagem: %v", err)
		return err
	}

	log.Printf("Mensagem publicada na fila %s: %s", queueName, message)
	return nil
}
