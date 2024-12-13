package repositories

import (
	"to-de-olho-api/configs"
	"to-de-olho-api/models"
)

func GetAllFrequencies() ([]models.Frequency, error) {
	var frequencies []models.Frequency
	result := configs.DB.Find(&frequencies)
	return frequencies, result.Error
}

func CreateFrequency(frequency *models.Frequency) error {
	result := configs.DB.Create(frequency)
	return result.Error
}
