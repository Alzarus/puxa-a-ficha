package controllers

import (
	"net/http"
	"to-de-olho-api/models"
	"to-de-olho-api/repositories"

	"github.com/gin-gonic/gin"
)

func GetFrequencies(c *gin.Context) {
	frequencies, err := repositories.GetAllFrequencies()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar frequências"})
		return
	}
	c.JSON(http.StatusOK, frequencies)
}

func CreateFrequency(c *gin.Context) {
	var frequency models.Frequency
	if err := c.ShouldBindJSON(&frequency); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
		return
	}

	if err := repositories.CreateFrequency(&frequency); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar frequência"})
		return
	}

	c.JSON(http.StatusCreated, frequency)
}
