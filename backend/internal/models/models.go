package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents admin users
type User struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	Username     string    `json:"username" gorm:"uniqueIndex;not null"`
	Email        string    `json:"email" gorm:"uniqueIndex;not null"`
	PasswordHash string    `json:"-" gorm:"not null"`
	Role         string    `json:"role" gorm:"default:admin"`
	IsActive     bool      `json:"is_active" gorm:"default:true"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// Project represents construction projects
type Project struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title" gorm:"not null"`
	Category    string    `json:"category" gorm:"not null"`
	Year        string    `json:"year" gorm:"not null"`
	Location    string    `json:"location" gorm:"not null"`
	Description string    `json:"description"`
	Client      string    `json:"client"`
	Status      string    `json:"status" gorm:"default:Dalam Proses"`
	Image       string    `json:"image"`
	Team        string    `json:"team"`
	Challenges  string    `json:"challenges"`
	Solutions   string    `json:"solutions"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	// Relationships
	Images   []ProjectImage   `json:"images" gorm:"foreignKey:ProjectID"`
	Features []ProjectFeature `json:"features" gorm:"foreignKey:ProjectID"`
}

// ProjectImage represents images for projects
type ProjectImage struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	ProjectID  uint      `json:"project_id"`
	ImagePath  string    `json:"image_path" gorm:"not null"`
	ImageOrder int       `json:"image_order" gorm:"default:0"`
	CreatedAt  time.Time `json:"created_at"`
}

// ProjectFeature represents features of projects
type ProjectFeature struct {
	ID           uint   `json:"id" gorm:"primaryKey"`
	ProjectID    uint   `json:"project_id"`
	Feature      string `json:"feature" gorm:"not null"`
	FeatureOrder int    `json:"feature_order" gorm:"default:0"`
}

// CompanyInfo represents company vision and mission
type CompanyInfo struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Vision    string    `json:"vision"`
	Mission   string    `json:"mission"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// CompanyValue represents company values
type CompanyValue struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	Value      string    `json:"value" gorm:"not null"`
	ValueOrder int       `json:"value_order" gorm:"default:0"`
	CreatedAt  time.Time `json:"created_at"`
}

// CompanyHistory represents company milestones
type CompanyHistory struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	Year         string    `json:"year" gorm:"not null"`
	Title        string    `json:"title" gorm:"not null"`
	Description  string    `json:"description"`
	HistoryOrder int       `json:"history_order" gorm:"default:0"`
	CreatedAt    time.Time `json:"created_at"`
}

// ManagementTeam represents company management
type ManagementTeam struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" gorm:"not null"`
	Position  string    `json:"position" gorm:"not null"`
	Photo     string    `json:"photo"`
	Bio       string    `json:"bio"`
	TeamOrder int       `json:"team_order" gorm:"default:0"`
	CreatedAt time.Time `json:"created_at"`
}

// Service represents company services
type Service struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	Title        string    `json:"title" gorm:"not null"`
	Description  string    `json:"description"`
	Icon         string    `json:"icon"`
	ServiceOrder int       `json:"service_order" gorm:"default:0"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`

	// Relationships
	Features []ServiceFeature `json:"features" gorm:"foreignKey:ServiceID"`
}

// ServiceFeature represents features of services
type ServiceFeature struct {
	ID           uint   `json:"id" gorm:"primaryKey"`
	ServiceID    uint   `json:"service_id"`
	Feature      string `json:"feature" gorm:"not null"`
	FeatureOrder int    `json:"feature_order" gorm:"default:0"`
}

// CompanyDocument represents company documents
type CompanyDocument struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	Name          string    `json:"name" gorm:"not null"`
	FilePath      string    `json:"file_path" gorm:"not null"`
	FileType      string    `json:"file_type"`
	FileSize      int64     `json:"file_size"`
	DocumentOrder int       `json:"document_order" gorm:"default:0"`
	CreatedAt     time.Time `json:"created_at"`
}

// FeaturedProject represents the main featured project
type FeaturedProject struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	ProjectID   *uint     `json:"project_id"`
	Title       string    `json:"title" gorm:"not null"`
	Description string    `json:"description"`
	Image       string    `json:"image"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	// Relationships
	Highlights []FeaturedProjectHighlight `json:"highlights" gorm:"foreignKey:FeaturedProjectID"`
}

// FeaturedProjectHighlight represents highlights of featured project
type FeaturedProjectHighlight struct {
	ID                uint   `json:"id" gorm:"primaryKey"`
	FeaturedProjectID uint   `json:"featured_project_id"`
	Highlight         string `json:"highlight" gorm:"not null"`
	HighlightOrder    int    `json:"highlight_order" gorm:"default:0"`
}

// Response models for API
type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type RegisterRequest struct {
	Username string `json:"username" binding:"required,min=3,max=50"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Role     string `json:"role"`
}

type LoginResponse struct {
	Success      bool   `json:"success"`
	Message      string `json:"message"`
	Token        string `json:"token"`
	RefreshToken string `json:"refresh_token"`
	User         User   `json:"user"`
}

type ProjectRequest struct {
	Title       string   `json:"title" binding:"required"`
	Category    string   `json:"category" binding:"required"`
	Year        string   `json:"year" binding:"required"`
	Location    string   `json:"location" binding:"required"`
	Description string   `json:"description"`
	Client      string   `json:"client"`
	Status      string   `json:"status"`
	Image       string   `json:"image"`
	Team        string   `json:"team"`
	Challenges  string   `json:"challenges"`
	Solutions   string   `json:"solutions"`
	Features    []string `json:"features"`
}

type CompanyInfoRequest struct {
	Vision  string `json:"vision"`
	Mission string `json:"mission"`
}

type CompanyValueRequest struct {
	Value string `json:"value" binding:"required"`
}

type CompanyHistoryRequest struct {
	Year        string `json:"year" binding:"required"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
}

type ManagementTeamRequest struct {
	Name     string `json:"name" binding:"required"`
	Position string `json:"position" binding:"required"`
	Photo    string `json:"photo"`
	Bio      string `json:"bio"`
}

type ServiceRequest struct {
	Title       string   `json:"title" binding:"required"`
	Description string   `json:"description"`
	Icon        string   `json:"icon"`
	Features    []string `json:"features"`
}

type FeaturedProjectRequest struct {
	ProjectID   *uint    `json:"project_id"`
	Title       string   `json:"title" binding:"required"`
	Description string   `json:"description"`
	Image       string   `json:"image"`
	Highlights  []string `json:"highlights"`
}

// Generic response wrapper
type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// Pagination models
type Pagination struct {
	Page       int `json:"page"`
	Limit      int `json:"limit"`
	Total      int `json:"total"`
	TotalPages int `json:"total_pages"`
}

type PaginatedResponse struct {
	Response
	Pagination Pagination `json:"pagination"`
}

// BeforeCreate hook for GORM
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.CreatedAt.IsZero() {
		u.CreatedAt = time.Now()
	}
	if u.UpdatedAt.IsZero() {
		u.UpdatedAt = time.Now()
	}
	return nil
}

func (p *Project) BeforeCreate(tx *gorm.DB) error {
	if p.CreatedAt.IsZero() {
		p.CreatedAt = time.Now()
	}
	if p.UpdatedAt.IsZero() {
		p.UpdatedAt = time.Now()
	}
	return nil
}

func (s *Service) BeforeCreate(tx *gorm.DB) error {
	if s.CreatedAt.IsZero() {
		s.CreatedAt = time.Now()
	}
	if s.UpdatedAt.IsZero() {
		s.UpdatedAt = time.Now()
	}
	return nil
}

func (fp *FeaturedProject) BeforeCreate(tx *gorm.DB) error {
	if fp.CreatedAt.IsZero() {
		fp.CreatedAt = time.Now()
	}
	if fp.UpdatedAt.IsZero() {
		fp.UpdatedAt = time.Now()
	}
	return nil
}
