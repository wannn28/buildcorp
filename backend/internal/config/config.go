package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	Database DatabaseConfig
	JWT      JWTConfig
	Server   ServerConfig
	Upload   UploadConfig
	CORS     CORSConfig
	Logging  LoggingConfig
	Security SecurityConfig
}

type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
	SSLMode  string
}

type JWTConfig struct {
	Secret        string
	Expiry        string
	RefreshExpiry string
}

type ServerConfig struct {
	Port        string
	Host        string
	Environment string
}

type UploadConfig struct {
	Path              string
	MaxFileSize       int64
	AllowedImageTypes []string
	AllowedDocTypes   []string
}

type CORSConfig struct {
	AllowedOrigins []string
	AllowedMethods []string
	AllowedHeaders []string
}

type LoggingConfig struct {
	Level  string
	Format string
}

type SecurityConfig struct {
	RateLimitRequests int
	RateLimitDuration string
}

func Load() (*Config, error) {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		// Don't return error if .env file doesn't exist
		fmt.Println("No .env file found, using environment variables")
	}

	config := &Config{
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("DB_USER", "buildcorp_user"),
			Password: getEnv("DB_PASSWORD", "secure_password"),
			Name:     getEnv("DB_NAME", "buildcorp_db"),
			SSLMode:  getEnv("DB_SSL_MODE", "disable"),
		},
		JWT: JWTConfig{
			Secret:        getEnv("JWT_SECRET", "default_secret_key_change_in_production"),
			Expiry:        getEnv("JWT_EXPIRY", "24h"),
			RefreshExpiry: getEnv("JWT_REFRESH_EXPIRY", "168h"),
		},
		Server: ServerConfig{
			Port:        getEnv("SERVER_PORT", "8080"),
			Host:        getEnv("SERVER_HOST", "0.0.0.0"),
			Environment: getEnv("ENVIRONMENT", "development"),
		},
		Upload: UploadConfig{
			Path:              getEnv("UPLOAD_PATH", "./uploads"),
			MaxFileSize:       getEnvAsInt64("MAX_FILE_SIZE", 5242880), // 5MB
			AllowedImageTypes: strings.Split(getEnv("ALLOWED_IMAGE_TYPES", "jpg,jpeg,png,webp"), ","),
			AllowedDocTypes:   strings.Split(getEnv("ALLOWED_DOC_TYPES", "pdf,doc,docx"), ","),
		},
		CORS: CORSConfig{
			AllowedOrigins: strings.Split(getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173"), ","),
			AllowedMethods: strings.Split(getEnv("CORS_ALLOWED_METHODS", "GET,POST,PUT,DELETE,OPTIONS"), ","),
			AllowedHeaders: strings.Split(getEnv("CORS_ALLOWED_HEADERS", "Origin,Content-Type,Authorization,X-Requested-With"), ","),
		},
		Logging: LoggingConfig{
			Level:  getEnv("LOG_LEVEL", "info"),
			Format: getEnv("LOG_FORMAT", "json"),
		},
		Security: SecurityConfig{
			RateLimitRequests: getEnvAsInt("RATE_LIMIT_REQUESTS", 100),
			RateLimitDuration: getEnv("RATE_LIMIT_DURATION", "1m"),
		},
	}

	return config, nil
}

func (c *DatabaseConfig) GetDSN() string {
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		c.Host, c.Port, c.User, c.Password, c.Name, c.SSLMode)
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

func getEnvAsInt64(key string, defaultValue int64) int64 {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.ParseInt(value, 10, 64); err == nil {
			return intValue
		}
	}
	return defaultValue
}
