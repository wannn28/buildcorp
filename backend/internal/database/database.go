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

// Init opens the database connection and seeds default data.
// Schema management is handled exclusively by golang-migrate (make migrate-up),
// so GORM AutoMigrate is intentionally not called here.
func Init(config *config.Config) error {
	dsn := config.Database.GetDSN()

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %v", err)
	}

	// Seed default admin if the users table is empty.
	if err := createDefaultAdmin(); err != nil {
		return fmt.Errorf("failed to create default admin: %v", err)
	}

	log.Println("Database connected successfully")
	return nil
}

// createDefaultAdmin inserts an admin account on first run.
func createDefaultAdmin() error {
	// Table may not exist yet if migrations haven't been run.
	if !DB.Migrator().HasTable(&models.User{}) {
		log.Println("users table not found — run `make migrate-up` first")
		return nil
	}

	var count int64
	DB.Model(&models.User{}).Count(&count)
	if count > 0 {
		return nil
	}

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

	log.Println("Default admin user created: admin / admin123")
	return nil
}

// HashPassword hashes a password using bcrypt (exported for use in handlers).
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	return string(bytes), err
}

func hashPassword(password string) (string, error) {
	return HashPassword(password)
}

// VerifyPassword compares a plain password against a bcrypt hash.
func VerifyPassword(password, hash string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}

// GetDB returns the global GORM DB instance.
func GetDB() *gorm.DB {
	return DB
}
