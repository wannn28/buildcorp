package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/wannn28/buildcorp/backend/internal/config"
	"github.com/wannn28/buildcorp/backend/internal/database"
	"github.com/wannn28/buildcorp/backend/internal/handlers"
	"github.com/wannn28/buildcorp/backend/internal/middleware"
)

// @title           BuildCorp API
// @version         1.0
// @description     Backend API untuk website profil perusahaan BuildCorp
// @termsOfService  http://swagger.io/terms/

// @contact.name   BuildCorp Team
// @contact.url    http://www.buildcorp.com/support
// @contact.email  support@buildcorp.com

// @license.name  MIT
// @license.url   https://opensource.org/licenses/MIT

// @host      localhost:8080
// @BasePath  /api

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Initialize database
	if err := database.Init(cfg); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Set Gin mode
	if cfg.Server.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Create Gin router
	r := gin.New()

	// Middleware
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(middleware.CORS(cfg.CORS))

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "BuildCorp API is running",
		})
	})

	// API routes
	api := r.Group("/api")
	{
		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/login", handlers.Login)
			auth.POST("/logout", middleware.AuthMiddleware(), handlers.Logout)
			auth.POST("/refresh", handlers.RefreshToken)
			auth.GET("/profile", middleware.AuthMiddleware(), handlers.GetProfile)
		}

		// Projects routes
		projects := api.Group("/projects")
		{
			projects.GET("", handlers.GetProjects)
			projects.GET("/:id", handlers.GetProject)
			projects.POST("", middleware.AuthMiddleware(), handlers.CreateProject)
			projects.PUT("/:id", middleware.AuthMiddleware(), handlers.UpdateProject)
			projects.DELETE("/:id", middleware.AuthMiddleware(), handlers.DeleteProject)
			projects.POST("/:id/images", middleware.AuthMiddleware(), handlers.UploadProjectImages)
			projects.DELETE("/:id/images/:imageId", middleware.AuthMiddleware(), handlers.DeleteProjectImage)
		}

		// Company info routes
		company := api.Group("/company")
		{
			company.GET("/info", handlers.GetCompanyInfo)
			company.PUT("/info", middleware.AuthMiddleware(), handlers.UpdateCompanyInfo)

			company.GET("/values", handlers.GetCompanyValues)
			company.POST("/values", middleware.AuthMiddleware(), handlers.CreateCompanyValue)
			company.PUT("/values/:id", middleware.AuthMiddleware(), handlers.UpdateCompanyValue)
			company.DELETE("/values/:id", middleware.AuthMiddleware(), handlers.DeleteCompanyValue)

			company.GET("/history", handlers.GetCompanyHistory)
			company.POST("/history", middleware.AuthMiddleware(), handlers.CreateCompanyHistory)
			company.PUT("/history/:id", middleware.AuthMiddleware(), handlers.UpdateCompanyHistory)
			company.DELETE("/history/:id", middleware.AuthMiddleware(), handlers.DeleteCompanyHistory)

			company.GET("/team", handlers.GetManagementTeam)
			company.POST("/team", middleware.AuthMiddleware(), handlers.CreateManagementTeam)
			company.PUT("/team/:id", middleware.AuthMiddleware(), handlers.UpdateManagementTeam)
			company.DELETE("/team/:id", middleware.AuthMiddleware(), handlers.DeleteManagementTeam)
		}

		// Services routes
		services := api.Group("/services")
		{
			services.GET("", handlers.GetServices)
			services.GET("/:id", handlers.GetService)
			services.POST("", middleware.AuthMiddleware(), handlers.CreateService)
			services.PUT("/:id", middleware.AuthMiddleware(), handlers.UpdateService)
			services.DELETE("/:id", middleware.AuthMiddleware(), handlers.DeleteService)
		}

		// Documents routes
		documents := api.Group("/documents")
		{
			documents.GET("", handlers.GetDocuments)
			documents.POST("", middleware.AuthMiddleware(), handlers.UploadDocument)
			documents.DELETE("/:id", middleware.AuthMiddleware(), handlers.DeleteDocument)
			documents.GET("/:id/download", handlers.DownloadDocument)
		}

		// Featured project routes
		featured := api.Group("/featured-project")
		{
			featured.GET("", handlers.GetFeaturedProject)
			featured.PUT("", middleware.AuthMiddleware(), handlers.UpdateFeaturedProject)
		}
	}

	// Start server
	addr := fmt.Sprintf("%s:%s", cfg.Server.Host, cfg.Server.Port)
	log.Printf("Server starting on %s", addr)
	log.Printf("Environment: %s", cfg.Server.Environment)

	if err := r.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
