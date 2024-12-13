package routes

import (
	"to-de-olho-api/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		v1.GET("/frequencies", controllers.GetFrequencies)
		v1.POST("/frequencies", controllers.CreateFrequency)
		v1.GET("/health", controllers.HealthCheck)
		v1.POST("/validate-user", controllers.ValidateUser)
	}
}
