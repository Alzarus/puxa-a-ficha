package repositories

import (
	"puxa-a-ficha-api/configs"
	"puxa-a-ficha-api/models"
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
