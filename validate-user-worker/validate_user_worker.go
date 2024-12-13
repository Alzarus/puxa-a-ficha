package main

import (
	"encoding/json"
	"log"
	"os/exec"

	"github.com/rabbitmq/amqp091-go"
)

// RequestBody define a estrutura dos dados recebidos
type RequestBody struct {
	TituloCpf      string `json:"tituloCpf"`
	DataNascimento string `json:"dataNascimento"`
	NomeMae        string `json:"nomeMae"`
}

func main() {
	// Conecta ao RabbitMQ
	conn, err := amqp091.Dial("amqp://to-de-olho:olho-de-to@broker:5672/")
	if err != nil {
		log.Fatalf("Erro ao conectar ao RabbitMQ: %v", err)
	}
	defer conn.Close()

	// Cria um canal
	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Erro ao abrir canal no RabbitMQ: %v", err)
	}
	defer ch.Close()

	// Declara a fila
	q, err := ch.QueueDeclare(
		"validate_user_queue",
		true,  // durable
		false, // autoDelete
		false, // exclusive
		false, // noWait
		nil,   // arguments
	)
	if err != nil {
		log.Fatalf("Erro ao declarar fila: %v", err)
	}

	// Consome mensagens da fila
	msgs, err := ch.Consume(
		q.Name,
		"",    // consumer
		true,  // autoAck
		false, // exclusive
		false, // noLocal
		false, // noWait
		nil,   // args
	)
	if err != nil {
		log.Fatalf("Erro ao consumir mensagens: %v", err)
	}

	// Processa as mensagens
	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Mensagem recebida: %s", d.Body)

			// Decodifica a mensagem
			var requestBody RequestBody
			err := json.Unmarshal(d.Body, &requestBody)
			if err != nil {
				log.Printf("Erro ao decodificar mensagem: %v", err)
				continue
			}

			// Executa o crawler
			result, err := runCrawler(requestBody)
			if err != nil {
				log.Printf("Erro ao validar eleitor: %v", err)
				continue
			}

			log.Printf("Resultado da validação: %s", result)
		}
	}()

	log.Printf("Worker aguardando mensagens na fila %s", q.Name)
	<-forever
}

// runCrawler executa o crawler como subprocesso
func runCrawler(data RequestBody) (string, error) {
	cmd := exec.Command(
		"node",
		"../packages/tseDataJob/src/tseDataJob.js",
		"--tituloCpf", data.TituloCpf,
		"--dataNascimento", data.DataNascimento,
		"--nomeMae", data.NomeMae,
	)

	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}

	return string(output), nil
}
