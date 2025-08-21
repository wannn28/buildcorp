# Backend Golang - BuildCorp Company Profile

## Overview
Backend API untuk website profil perusahaan BuildCorp yang dibangun dengan Golang. Backend ini menyediakan REST API untuk admin panel dan website frontend.

## 🏗️ Arsitektur Sistem

### Tech Stack
- **Language**: Go 1.21+
- **Framework**: Gin (HTTP Router)
- **Database**: PostgreSQL 15+
- **ORM**: GORM v2
- **Authentication**: JWT + bcrypt
- **File Storage**: Local filesystem (bisa upgrade ke AWS S3/Cloudinary)
- **Validation**: Go validator
- **Documentation**: Swagger/OpenAPI 3.0

### Struktur Project
```
backend/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── config/
│   ├── handlers/
│   ├── middleware/
│   ├── models/
│   ├── repository/
│   ├── services/
│   └── utils/
├── pkg/
│   ├── database/
│   ├── auth/
│   └── upload/
├── migrations/
├── uploads/
├── go.mod
├── go.sum
└── .env
```

## 🗄️ Database Schema

### PostgreSQL Tables

#### 1. Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. Projects Table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    year VARCHAR(4) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    client VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Dalam Proses',
    image VARCHAR(255),
    team VARCHAR(100),
    challenges TEXT,
    solutions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. Project_Images Table
```sql
CREATE TABLE project_images (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    image_path VARCHAR(500) NOT NULL,
    image_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. Project_Features Table
```sql
CREATE TABLE project_features (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    feature VARCHAR(255) NOT NULL,
    feature_order INTEGER DEFAULT 0
);
```

#### 5. Company_Info Table
```sql
CREATE TABLE company_info (
    id SERIAL PRIMARY KEY,
    vision TEXT,
    mission TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 6. Company_Values Table
```sql
CREATE TABLE company_values (
    id SERIAL PRIMARY KEY,
    value VARCHAR(255) NOT NULL,
    value_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 7. Company_History Table
```sql
CREATE TABLE company_history (
    id SERIAL PRIMARY KEY,
    year VARCHAR(4) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    history_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 8. Management_Team Table
```sql
CREATE TABLE management_team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    bio TEXT,
    team_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 9. Services Table
```sql
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    service_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 10. Service_Features Table
```sql
CREATE TABLE service_features (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    feature VARCHAR(255) NOT NULL,
    feature_order INTEGER DEFAULT 0
);
```

#### 11. Company_Documents Table
```sql
CREATE TABLE company_documents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    document_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 12. Featured_Project Table
```sql
CREATE TABLE featured_project (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 13. Featured_Project_Highlights Table
```sql
CREATE TABLE featured_project_highlights (
    id SERIAL PRIMARY KEY,
    featured_project_id INTEGER REFERENCES featured_project(id) ON DELETE CASCADE,
    highlight VARCHAR(255) NOT NULL,
    highlight_order INTEGER DEFAULT 0
);
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/profile
```

### Projects
```
GET    /api/projects              # List all projects
GET    /api/projects/:id          # Get project by ID
POST   /api/projects              # Create new project
PUT    /api/projects/:id          # Update project
DELETE /api/projects/:id          # Delete project
POST   /api/projects/:id/images   # Upload project images
DELETE /api/projects/:id/images/:imageId # Delete project image
```

### Company Information
```
GET    /api/company/info          # Get company info
PUT    /api/company/info          # Update company info
GET    /api/company/values        # Get company values
POST   /api/company/values        # Add company value
PUT    /api/company/values/:id    # Update company value
DELETE /api/company/values/:id    # Delete company value
```

### Company History
```
GET    /api/company/history       # Get company history
POST   /api/company/history       # Add history item
PUT    /api/company/history/:id   # Update history item
DELETE /api/company/history/:id   # Delete history item
```

### Management Team
```
GET    /api/company/team          # Get management team
POST   /api/company/team          # Add team member
PUT    /api/company/team/:id      # Update team member
DELETE /api/company/team/:id      # Delete team member
```

### Services
```
GET    /api/services              # Get all services
GET    /api/services/:id          # Get service by ID
POST   /api/services              # Create new service
PUT    /api/services/:id          # Update service
DELETE /api/services/:id          # Delete service
```

### Documents
```
GET    /api/documents             # Get all documents
POST   /api/documents             # Upload document
DELETE /api/documents/:id         # Delete document
GET    /api/documents/:id/download # Download document
```

### Featured Project
```
GET    /api/featured-project      # Get featured project
PUT    /api/featured-project      # Update featured project
```

## 📋 Request/Response Examples

### 1. Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "admin",
    "password": "admin123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Login berhasil",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "id": 1,
            "username": "admin",
            "email": "admin@buildcorp.com",
            "role": "admin"
        }
    }
}
```

### 2. Create Project
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
    "title": "Gedung Perkantoran Central Park Jakarta",
    "category": "building",
    "year": "2024",
    "location": "Jakarta Pusat",
    "description": "Gedung perkantoran modern 25 lantai",
    "client": "Central Park Development",
    "status": "Dalam Proses",
    "team": "150+ Orang",
    "challenges": "Konstruksi di area padat penduduk",
    "solutions": "Implementasi teknologi prefab"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Proyek berhasil dibuat",
    "data": {
        "id": 2,
        "title": "Gedung Perkantoran Central Park Jakarta",
        "category": "building",
        "year": "2024",
        "location": "Jakarta Pusat",
        "description": "Gedung perkantoran modern 25 lantai",
        "client": "Central Park Development",
        "status": "Dalam Proses",
        "team": "150+ Orang",
        "challenges": "Konstruksi di area padat penduduk",
        "solutions": "Implementasi teknologi prefab",
        "created_at": "2024-01-15T10:30:00Z"
    }
}
```

### 3. Upload Project Images
```http
POST /api/projects/2/images
Authorization: Bearer <token>
Content-Type: multipart/form-data

images: [file1.jpg, file2.jpg, file3.jpg]
```

### 4. Update Company Info
```http
PUT /api/company/info
Authorization: Bearer <token>
Content-Type: application/json

{
    "vision": "Menjadi perusahaan konstruksi terdepan di Indonesia",
    "mission": "Menyediakan layanan konstruksi berkualitas tinggi"
}
```

## 🔐 Authentication & Authorization

### JWT Token Structure
```json
{
    "header": {
        "alg": "HS256",
        "typ": "JWT"
    },
    "payload": {
        "user_id": 1,
        "username": "admin",
        "role": "admin",
        "exp": 1705312800,
        "iat": 1705226400
    }
}
```

### Middleware
- **AuthMiddleware**: Validasi JWT token
- **RoleMiddleware**: Cek role user (admin, editor, viewer)
- **CorsMiddleware**: Handle CORS untuk frontend
- **LoggingMiddleware**: Log semua request
- **RateLimitMiddleware**: Rate limiting untuk security

## 📁 File Upload System

### Upload Structure
```
uploads/
├── projects/
│   ├── 1/
│   │   ├── main.jpg
│   │   ├── construction1.jpg
│   │   └── construction2.jpg
│   └── 2/
│       ├── main.jpg
│       └── progress1.jpg
├── documents/
│   ├── siup.pdf
│   ├── iso-certificate.pdf
│   └── company-profile.pdf
└── team/
    ├── ceo.jpg
    ├── cto.jpg
    └── cfo.jpg
```

### File Validation
- **Images**: JPG, PNG, WebP (max 5MB)
- **Documents**: PDF, DOC, DOCX (max 10MB)
- **File naming**: `{timestamp}_{original_name}`
- **Compression**: Auto-compress images > 1MB

## 🗄️ Database Configuration

### Environment Variables
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=buildcorp_user
DB_PASSWORD=secure_password
DB_NAME=buildcorp_db
DB_SSL_MODE=disable

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRY=24h
JWT_REFRESH_EXPIRY=168h

# Server
SERVER_PORT=8080
SERVER_HOST=0.0.0.0

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp
ALLOWED_DOC_TYPES=pdf,doc,docx
```

### Database Connection
```go
// internal/config/database.go
type DatabaseConfig struct {
    Host     string
    Port     string
    User     string
    Password string
    Name     string
    SSLMode  string
}

func (c *DatabaseConfig) GetDSN() string {
    return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
        c.Host, c.Port, c.User, c.Password, c.Name, c.SSLMode)
}
```

## 🚀 Implementation Steps

### 1. Setup Project
```bash
mkdir buildcorp-backend
cd buildcorp-backend
go mod init github.com/wannn28/buildcorp/backend
go get -u github.com/gin-gonic/gin
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
go get -u github.com/golang-jwt/jwt/v5
go get -u golang.org/x/crypto/bcrypt
```

### 2. Database Migration
```bash
# Install golang-migrate
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Run migrations
migrate -path migrations -database "postgres://user:pass@localhost:5432/buildcorp_db?sslmode=disable" up
```

### 3. Run Application
```bash
go run cmd/server/main.go
```

## 📊 API Documentation

### Swagger Setup
```go
import "github.com/swaggo/gin-swagger"
import "github.com/swaggo/files"

// main.go
import _ "github.com/wannn28/buildcorp/backend/docs"

func main() {
    // ... other code
    
    // Swagger documentation
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}
```

### Generate Swagger Docs
```bash
go install github.com/swaggo/swag/cmd/swag@latest
swag init -g cmd/server/main.go
```

## 🔒 Security Features

### 1. Password Security
- Bcrypt hashing (cost: 12)
- Password complexity validation
- Rate limiting untuk login attempts

### 2. JWT Security
- Secure random secret key
- Token expiration (24h access, 7d refresh)
- Refresh token rotation

### 3. Input Validation
- Sanitasi input HTML
- Validasi file upload
- SQL injection prevention (GORM)

### 4. CORS Configuration
```go
config := cors.DefaultConfig()
config.AllowOrigins = []string{"http://localhost:3000", "https://buildcorp.com"}
config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
```

## 📈 Performance & Monitoring

### 1. Database Optimization
- Index pada kolom yang sering di-query
- Connection pooling
- Query optimization

### 2. Caching
- Redis untuk session storage
- In-memory cache untuk static data
- HTTP response caching

### 3. Monitoring
- Prometheus metrics
- Health check endpoints
- Request/response logging

## 🧪 Testing

### Test Structure
```
tests/
├── unit/
│   ├── handlers/
│   ├── services/
│   └── repository/
├── integration/
│   └── api/
└── fixtures/
    ├── projects.json
    └── users.json
```

### Run Tests
```bash
# Unit tests
go test ./internal/...

# Integration tests
go test ./tests/integration/...

# Coverage
go test -cover ./internal/...
```

## 🚢 Deployment

### Docker
```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main cmd/server/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
COPY --from=builder /app/uploads ./uploads
EXPOSE 8080
CMD ["./main"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_PORT=5432
      - DB_USER=buildcorp_user
      - DB_PASSWORD=secure_password
      - DB_NAME=buildcorp_db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=buildcorp_user
      - POSTGRES_PASSWORD=secure_password
      - POSTGRES_DB=buildcorp_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 🔄 Frontend Integration

### Update React Admin Panel
```typescript
// src/services/api.ts
const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Projects
  getProjects: () => fetch(`${API_BASE_URL}/projects`),
  createProject: (data: Project) => fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  
  // Company Info
  getCompanyInfo: () => fetch(`${API_BASE_URL}/company/info`),
  updateCompanyInfo: (data: CompanyInfo) => fetch(`${API_BASE_URL}/company/info`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  
  // ... other endpoints
};
```

## 📝 Next Steps

### Phase 1: Basic API
- [ ] Setup project structure
- [ ] Database schema & migrations
- [ ] Basic CRUD endpoints
- [ ] Authentication system

### Phase 2: File Management
- [ ] File upload system
- [ ] Image processing
- [ ] Document management

### Phase 3: Advanced Features
- [ ] Caching system
- [ ] Search & filtering
- [ ] Bulk operations
- [ ] Export functionality

### Phase 4: Production Ready
- [ ] Monitoring & logging
- [ ] Performance optimization
- [ ] Security hardening
- [ ] CI/CD pipeline

---

**Note**: Dokumentasi ini adalah blueprint untuk backend Golang. Implementasi dapat disesuaikan dengan kebutuhan spesifik perusahaan dan skala aplikasi.
