package database

import (
	"fmt"
	"log"

	"github.com/wannn28/buildcorp/backend/internal/config"
	"github.com/wannn28/buildcorp/backend/internal/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// Initialize database connection
func Init(config *config.Config) error {
	dsn := config.Database.GetDSN()

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		return fmt.Errorf("failed to connect to database: %v", err)
	}

	// Auto migrate models
	if err := autoMigrate(); err != nil {
		return fmt.Errorf("failed to auto migrate: %v", err)
	}

	// Create default admin user if not exists
	if err := createDefaultAdmin(); err != nil {
		return fmt.Errorf("failed to create default admin: %v", err)
	}

	log.Println("Database connected successfully")
	return nil
}

// Auto migrate all models
func autoMigrate() error {
	return DB.AutoMigrate(
		&models.User{},
		&models.Project{},
		&models.ProjectImage{},
		&models.ProjectFeature{},
		&models.CompanyInfo{},
		&models.CompanyValue{},
		&models.CompanyHistory{},
		&models.ManagementTeam{},
		&models.Service{},
		&models.ServiceFeature{},
		&models.CompanyDocument{},
		&models.FeaturedProject{},
		&models.FeaturedProjectHighlight{},
	)
}

// Create default admin user
func createDefaultAdmin() error {
	var count int64
	DB.Model(&models.User{}).Count(&count)

	if count == 0 {
		// Hash password: admin123
		hashedPassword, err := hashPassword("admin123")
		if err != nil {
			return err
		}

		adminUser := models.User{
			Username:     "admin",
			Email:        "admin@buildcorp.com",
			PasswordHash: hashedPassword,
			Role:         "admin",
			IsActive:     true,
		}

		if err := DB.Create(&adminUser).Error; err != nil {
			return err
		}

		log.Println("Default admin user created: admin/admin123")
	}

	return nil
}

// Hash password using bcrypt
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	return string(bytes), err
}

// Verify password
func VerifyPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Get database instance
func GetDB() *gorm.DB {
	return DB
}
