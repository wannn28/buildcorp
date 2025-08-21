# BuildCorp Backend Setup Guide

## 🚀 Quick Start

### Prerequisites
- Go 1.21 or higher
- PostgreSQL 15 or higher
- Git

### 1. Clone and Setup Project
```bash
# Clone the repository
git clone <your-repo-url>
cd buildcorp-backend

# Install dependencies
go mod tidy

# Copy environment file
cp env.example .env
```

### 2. Configure Environment
Edit `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=buildcorp_user
DB_PASSWORD=your_secure_password
DB_NAME=buildcorp_db
DB_SSL_MODE=disable

JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
```

### 3. Setup Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE buildcorp_db;
CREATE USER buildcorp_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE buildcorp_db TO buildcorp_user;
\q

# Run migrations
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
migrate -path migrations -database "postgres://buildcorp_user:your_secure_password@localhost:5432/buildcorp_db?sslmode=disable" up
```

### 4. Run Application
```bash
go run cmd/server/main.go
```

Server will start on `http://localhost:8080`

## 📁 Project Structure

```
backend/
├── cmd/
│   └── server/
│       └── main.go          # Main application entry point
├── internal/
│   ├── config/              # Configuration management
│   ├── database/            # Database connection & initialization
│   ├── handlers/            # HTTP request handlers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models & structs
│   ├── repository/          # Data access layer
│   ├── services/            # Business logic layer
│   └── utils/               # Utility functions
├── migrations/              # Database migration files
├── uploads/                 # File upload directory
├── go.mod                   # Go module file
├── go.sum                   # Go module checksums
├── .env                     # Environment variables
└── env.example              # Example environment file
```

## 🗄️ Database Setup

### PostgreSQL Installation

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### macOS
```bash
brew install postgresql
brew services start postgresql
```

#### Windows
Download from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

### Create Database
```sql
-- Connect as postgres user
sudo -u postgres psql

-- Create database and user
CREATE DATABASE buildcorp_db;
CREATE USER buildcorp_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE buildcorp_db TO buildcorp_user;
ALTER USER buildcorp_user CREATEDB;
\q
```

### Run Migrations
```bash
# Install migrate tool
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Run migrations
migrate -path migrations -database "postgres://buildcorp_user:your_secure_password@localhost:5432/buildcorp_db?sslmode=disable" up

# Rollback if needed
migrate -path migrations -database "postgres://buildcorp_user:your_secure_password@localhost:5432/buildcorp_db?sslmode=disable" down
```

## 🔐 Authentication

### Default Admin User
After running migrations, a default admin user is created:
- **Username**: `admin`
- **Password**: `admin123`

### JWT Configuration
- **Access Token**: 24 hours
- **Refresh Token**: 7 days
- **Algorithm**: HS256

## 📡 API Endpoints

### Base URL
```
http://localhost:8080/api
```

### Authentication
```
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
GET    /auth/profile
```

### Projects
```
GET    /projects
GET    /projects/:id
POST   /projects
PUT    /projects/:id
DELETE /projects/:id
POST   /projects/:id/images
DELETE /projects/:id/images/:imageId
```

### Company Information
```
GET    /company/info
PUT    /company/info
GET    /company/values
POST   /company/values
PUT    /company/values/:id
DELETE /company/values/:id
```

### Services
```
GET    /services
GET    /services/:id
POST   /services
PUT    /services/:id
DELETE /services/:id
```

## 🧪 Testing

### Run Tests
```bash
# Unit tests
go test ./internal/...

# Integration tests
go test ./tests/integration/...

# With coverage
go test -cover ./internal/...
```

### Test Database
```bash
# Create test database
createdb buildcorp_test

# Set test environment
export DB_NAME=buildcorp_test
go test ./...
```

## 🐳 Docker Setup

### Docker Compose
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker
```bash
# Build image
docker build -t buildcorp-backend .

# Run container
docker run -p 8080:8080 --env-file .env buildcorp-backend
```

## 📊 API Documentation

### Swagger UI
After starting the server, visit:
```
http://localhost:8080/swagger/index.html
```

### Generate Swagger Docs
```bash
# Install swag
go install github.com/swaggo/swag/cmd/swag@latest

# Generate docs
swag init -g cmd/server/main.go
```

## 🔒 Security Features

### Password Security
- Bcrypt hashing (cost: 12)
- Password complexity validation
- Rate limiting for login attempts

### JWT Security
- Secure random secret key
- Token expiration
- Refresh token rotation

### Input Validation
- Request validation using Gin binding
- SQL injection prevention (GORM)
- File upload validation

## 📈 Performance & Monitoring

### Database Optimization
- Connection pooling
- Indexed queries
- Efficient relationships

### Caching
- Redis integration (planned)
- In-memory caching
- HTTP response caching

### Monitoring
- Health check endpoint: `/health`
- Request/response logging
- Performance metrics

## 🚢 Deployment

### Production Environment
```env
ENVIRONMENT=production
DB_HOST=your_production_db_host
DB_PASSWORD=your_production_password
JWT_SECRET=your_production_jwt_secret
```

### Environment Variables
- `ENVIRONMENT`: Set to "production" for production mode
- `SERVER_HOST`: Set to "0.0.0.0" for external access
- `CORS_ALLOWED_ORIGINS`: Configure allowed frontend domains

### Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check connection
psql -h localhost -U buildcorp_user -d buildcorp_db
```

#### 2. Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080

# Kill process
kill -9 <PID>
```

#### 3. Permission Denied
```bash
# Check file permissions
ls -la

# Fix permissions
chmod 755 cmd/server/main.go
```

#### 4. Go Module Issues
```bash
# Clean module cache
go clean -modcache

# Reinstall dependencies
go mod download
```

### Logs
```bash
# View application logs
tail -f logs/app.log

# View database logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

## 📝 Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Test locally
go run cmd/server/main.go

# Commit changes
git add .
git commit -m "Add new feature"

# Push and create PR
git push origin feature/new-feature
```

### 2. Database Changes
```bash
# Create new migration
migrate create -ext sql -dir migrations -seq add_new_table

# Edit migration files
# Test migration
migrate -path migrations -database "postgres://..." up

# Commit migration files
git add migrations/
git commit -m "Add database migration for new table"
```

### 3. API Changes
```bash
# Update models
# Update handlers
# Update routes
# Test endpoints
# Update Swagger docs
swag init -g cmd/server/main.go
```

## 🤝 Contributing

### Code Style
- Follow Go conventions
- Use meaningful variable names
- Add comments for complex logic
- Write tests for new features

### Commit Messages
```
feat: add new project endpoint
fix: resolve authentication issue
docs: update API documentation
refactor: improve database queries
test: add integration tests
```

## 📞 Support

### Getting Help
- Check this documentation
- Review API documentation at `/swagger`
- Check application logs
- Create issue in repository

### Contact
- **Email**: support@buildcorp.com
- **Repository**: [GitHub Issues](https://github.com/wannn28/buildcorp/backend/issues)

---

**Note**: This is a development setup guide. For production deployment, ensure proper security measures, monitoring, and backup strategies are in place.
