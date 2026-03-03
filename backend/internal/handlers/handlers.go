package handlers

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/wannn28/buildcorp/backend/internal/database"
	"github.com/wannn28/buildcorp/backend/internal/models"
)

// ─────────────────────────────────────────────────────────────────────────────
// JWT helpers
// ─────────────────────────────────────────────────────────────────────────────

type Claims struct {
	UserID   uint   `json:"user_id"`
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

func jwtSecret() []byte {
	s := os.Getenv("JWT_SECRET")
	if s == "" {
		s = "default_secret_key_change_in_production"
	}
	return []byte(s)
}

func generateToken(user *models.User, expiry time.Duration) (string, error) {
	claims := Claims{
		UserID:   user.ID,
		Username: user.Username,
		Role:     user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(expiry)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Subject:   fmt.Sprintf("%d", user.ID),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret())
}

func parseToken(tokenStr string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return jwtSecret(), nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}
	return nil, fmt.Errorf("invalid token")
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth handlers
// ─────────────────────────────────────────────────────────────────────────────

// Login godoc
// @Summary      Login admin
// @Description  Authenticate with username and password, returns JWT tokens
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body body models.LoginRequest true "Credentials"
// @Success      200  {object}  models.LoginResponse
// @Failure      400  {object}  models.Response
// @Failure      401  {object}  models.Response
// @Router       /auth/login [post]
func Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "Invalid request body",
			Error:   err.Error(),
		})
		return
	}

	var user models.User
	if err := database.DB.Where("username = ? AND is_active = ?", req.Username, true).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, models.Response{
			Success: false,
			Message: "Invalid username or password",
		})
		return
	}

	if !database.VerifyPassword(req.Password, user.PasswordHash) {
		c.JSON(http.StatusUnauthorized, models.Response{
			Success: false,
			Message: "Invalid username or password",
		})
		return
	}

	accessToken, err := generateToken(&user, 24*time.Hour)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{
			Success: false,
			Message: "Failed to generate token",
			Error:   err.Error(),
		})
		return
	}

	refreshToken, err := generateToken(&user, 168*time.Hour)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{
			Success: false,
			Message: "Failed to generate refresh token",
			Error:   err.Error(),
		})
		return
	}

	user.PasswordHash = ""
	c.JSON(http.StatusOK, models.LoginResponse{
		Success:      true,
		Message:      "Login successful",
		Token:        accessToken,
		RefreshToken: refreshToken,
		User:         user,
	})
}

// Register godoc
// @Summary      Register new admin
// @Description  Create a new admin account (requires existing admin JWT)
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body body models.RegisterRequest true "New user data"
// @Success      201  {object}  models.Response
// @Failure      400  {object}  models.Response
// @Failure      409  {object}  models.Response
// @Security     BearerAuth
// @Router       /auth/register [post]
func Register(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "Invalid request body",
			Error:   err.Error(),
		})
		return
	}

	// Check duplicate username
	var existing models.User
	if err := database.DB.Where("username = ?", req.Username).First(&existing).Error; err == nil {
		c.JSON(http.StatusConflict, models.Response{
			Success: false,
			Message: "Username already taken",
		})
		return
	}

	// Check duplicate email
	if err := database.DB.Where("email = ?", req.Email).First(&existing).Error; err == nil {
		c.JSON(http.StatusConflict, models.Response{
			Success: false,
			Message: "Email already registered",
		})
		return
	}

	hashed, err := database.HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{
			Success: false,
			Message: "Failed to hash password",
			Error:   err.Error(),
		})
		return
	}

	role := req.Role
	if role == "" {
		role = "admin"
	}

	newUser := models.User{
		Username:     req.Username,
		Email:        req.Email,
		PasswordHash: hashed,
		Role:         role,
		IsActive:     true,
	}
	if err := database.DB.Create(&newUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{
			Success: false,
			Message: "Failed to create user",
			Error:   err.Error(),
		})
		return
	}

	newUser.PasswordHash = ""
	c.JSON(http.StatusCreated, models.Response{
		Success: true,
		Message: "User registered successfully",
		Data:    newUser,
	})
}

// Logout godoc
// @Summary      Logout
// @Tags         auth
// @Security     BearerAuth
// @Router       /auth/logout [post]
func Logout(c *gin.Context) {
	c.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "Logged out successfully",
	})
}

// RefreshToken godoc
// @Summary      Refresh access token
// @Tags         auth
// @Accept       json
// @Produce      json
// @Router       /auth/refresh [post]
func RefreshToken(c *gin.Context) {
	type refreshReq struct {
		RefreshToken string `json:"refresh_token" binding:"required"`
	}
	var req refreshReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "refresh_token is required",
		})
		return
	}

	claims, err := parseToken(req.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, models.Response{
			Success: false,
			Message: "Invalid or expired refresh token",
		})
		return
	}

	var user models.User
	if err := database.DB.Where("id = ? AND is_active = ?", claims.UserID, true).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, models.Response{
			Success: false,
			Message: "User not found or inactive",
		})
		return
	}

	accessToken, err := generateToken(&user, 24*time.Hour)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{
			Success: false,
			Message: "Failed to generate token",
		})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "Token refreshed",
		Data:    gin.H{"token": accessToken},
	})
}

// GetProfile godoc
// @Summary      Get current user profile
// @Tags         auth
// @Security     BearerAuth
// @Router       /auth/profile [get]
func GetProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var user models.User
	if err := database.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, models.Response{
			Success: false,
			Message: "User not found",
		})
		return
	}
	user.PasswordHash = ""
	c.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "Profile retrieved",
		Data:    user,
	})
}

// ─────────────────────────────────────────────────────────────────────────────
// Project handlers
// ─────────────────────────────────────────────────────────────────────────────

func GetProjects(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get projects endpoint - implement projects retrieval logic"})
}

func GetProject(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Get project endpoint", "id": id})
}

func CreateProject(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Create project endpoint - implement project creation logic"})
}

func UpdateProject(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Update project endpoint", "id": id})
}

func DeleteProject(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Delete project endpoint", "id": id})
}

func UploadProjectImages(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Upload project images endpoint", "id": id})
}

func DeleteProjectImage(c *gin.Context) {
	id := c.Param("id")
	imageId := c.Param("imageId")
	c.JSON(http.StatusOK, gin.H{"message": "Delete project image endpoint", "id": id, "imageId": imageId})
}

// ─────────────────────────────────────────────────────────────────────────────
// Company handlers
// ─────────────────────────────────────────────────────────────────────────────

func GetCompanyInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get company info endpoint"})
}

func UpdateCompanyInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Update company info endpoint"})
}

func GetCompanyValues(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get company values endpoint"})
}

func CreateCompanyValue(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Create company value endpoint"})
}

func UpdateCompanyValue(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Update company value endpoint", "id": id})
}

func DeleteCompanyValue(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Delete company value endpoint", "id": id})
}

func GetCompanyHistory(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get company history endpoint"})
}

func CreateCompanyHistory(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Create company history endpoint"})
}

func UpdateCompanyHistory(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Update company history endpoint", "id": id})
}

func DeleteCompanyHistory(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Delete company history endpoint", "id": id})
}

func GetManagementTeam(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get management team endpoint"})
}

func CreateManagementTeam(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Create management team endpoint"})
}

func UpdateManagementTeam(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Update management team endpoint", "id": id})
}

func DeleteManagementTeam(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Delete management team endpoint", "id": id})
}

// ─────────────────────────────────────────────────────────────────────────────
// Service handlers
// ─────────────────────────────────────────────────────────────────────────────

func GetServices(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get services endpoint"})
}

func GetService(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Get service endpoint", "id": id})
}

func CreateService(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Create service endpoint"})
}

func UpdateService(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Update service endpoint", "id": id})
}

func DeleteService(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Delete service endpoint", "id": id})
}

// ─────────────────────────────────────────────────────────────────────────────
// Document handlers
// ─────────────────────────────────────────────────────────────────────────────

func GetDocuments(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get documents endpoint"})
}

func UploadDocument(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Upload document endpoint"})
}

func DeleteDocument(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Delete document endpoint", "id": id})
}

func DownloadDocument(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Download document endpoint", "id": id})
}

// ─────────────────────────────────────────────────────────────────────────────
// Featured project handlers
// ─────────────────────────────────────────────────────────────────────────────

func GetFeaturedProject(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get featured project endpoint"})
}

func UpdateFeaturedProject(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Update featured project endpoint"})
}

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

func extractBearerToken(c *gin.Context) string {
	h := c.GetHeader("Authorization")
	if strings.HasPrefix(h, "Bearer ") {
		return h[7:]
	}
	return ""
}
