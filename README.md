# Employee Directory Backend API

A production-ready employee directory backend API built with NestJS, featuring comprehensive CRUD operations, authentication, authorization, and modern development practices. Optimized for Vercel deployment.

## 🚀 Features

### Core Functionality
- **Complete CRUD Operations**: Add, view, edit, and delete employees
- **Advanced Search & Filtering**: Real-time search across multiple fields with pagination
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Admin and user roles with secure password hashing
- **API Documentation**: Complete Swagger/OpenAPI documentation

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin and user permissions
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Comprehensive DTO validation
- **CORS Protection**: Configurable cross-origin resource sharing
- **SQL Injection Protection**: TypeORM with parameterized queries

### Development & Production Features
- **Production-Grade Logging**: Winston with structured logging and log rotation
- **Database Migrations**: TypeORM migrations for schema management
- **Environment Configuration**: Comprehensive environment variable management
- **Vercel Deployment**: Optimized for serverless deployment
- **CI/CD Pipeline**: GitHub Actions for automated testing
- **Comprehensive Testing**: Unit, integration, and e2e tests

## 🛠 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **TypeORM** - Object-relational mapping
- **SQLite** - Lightweight database (PostgreSQL for production)
- **JWT** - JSON Web Tokens for authentication
- **Winston** - Production logging
- **Swagger** - API documentation
- **Jest** - Testing framework

### Deployment
- **Vercel** - Serverless deployment platform
- **GitHub Actions** - CI/CD pipeline
- **Environment Management** - Configurable deployment

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Vercel CLI (for deployment)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd employee-directory-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the environment template and configure your variables:
```bash
cp env.example .env
```

Edit `.env` with your configuration:
```env
# Database Configuration
DATABASE_URL=sqlite://employees.db
NODE_ENV=development

# Server Configuration
PORT=3001

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-domain.vercel.app

# Logging Configuration
LOG_LEVEL=info
LOG_FORMAT=json
```

### 4. Database Setup
Run migrations to set up the database schema:
```bash
npm run migration:run
```

Seed the database with sample data:
```bash
npm run seed
```

### 5. Run the Development Server
```bash
npm run start:dev
```

Open [http://localhost:3001](http://localhost:3001) to access the API.

### 6. Access API Documentation
Visit [http://localhost:3001/api/v1/docs](http://localhost:3001/api/v1/docs) for interactive Swagger documentation.

## 🏗 Project Structure

```
employee-directory-backend/
├── src/
│   ├── auth/                    # Authentication & authorization
│   │   ├── guards/             # JWT and role guards
│   │   ├── decorators/         # Custom decorators
│   │   ├── dto/                # Auth DTOs
│   │   ├── auth.controller.ts  # Auth endpoints
│   │   ├── auth.service.ts     # Auth business logic
│   │   ├── jwt.strategy.ts     # JWT strategy
│   │   └── auth.module.ts      # Auth module
│   ├── users/                  # User management
│   │   ├── entities/           # User entity
│   │   ├── dto/                # User DTOs
│   │   ├── users.controller.ts # User endpoints
│   │   ├── users.service.ts    # User business logic
│   │   └── users.module.ts     # User module
│   ├── employees/              # Employee management
│   │   ├── entities/           # Employee entity
│   │   ├── dto/                # Employee DTOs
│   │   ├── interfaces/         # Response interfaces
│   │   ├── employees.controller.ts # Employee endpoints
│   │   ├── employees.service.ts    # Employee business logic
│   │   └── employees.module.ts     # Employee module
│   ├── health/                 # Health checks
│   ├── common/                 # Shared utilities
│   │   └── logger/             # Winston logger service
│   ├── config/                 # Configuration files
│   │   └── typeorm.config.ts   # Database configuration
│   ├── migrations/             # Database migrations
│   ├── app.module.ts           # Root module
│   └── main.ts                 # Application entry point
├── test/                       # Test files
│   ├── employees/              # Employee tests
│   └── app.e2e-spec.ts         # E2E tests
├── logs/                       # Application logs
├── .github/workflows/          # CI/CD pipeline
└── README.md                   # Project documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login

### Users (Admin Only)
- `POST /api/v1/users` - Create new user
- `GET /api/v1/users` - Get all users (Admin only)

### Employees
- `GET /api/v1/employees` - List employees with search, filtering, and pagination
- `POST /api/v1/employees` - Create new employee (Admin only)
- `GET /api/v1/employees/:id` - Get specific employee
- `PUT /api/v1/employees/:id` - Update employee (Admin only)
- `DELETE /api/v1/employees/:id` - Delete employee (Admin only)

### Health
- `GET /api/v1/health` - Health check endpoint

## 🔐 Authentication

### Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### Using JWT Token
```bash
curl -X GET http://localhost:3001/api/v1/employees \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:cov
```

### Run E2E Tests
```bash
npm run test:e2e
```

## 🩺 Health/Readiness/Liveness Probes

The health endpoint at `/api/v1/health` returns HTTP 200 if the service is healthy and HTTP 503 if unhealthy (e.g., database is down). This endpoint is suitable for use as a readiness/liveness probe in Vercel or any orchestrator.

## 📈 Vercel Deployment

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy to Vercel
```bash
vercel
```

### 3. Environment Variables in Vercel
Set the following environment variables in your Vercel dashboard:

```env
NODE_ENV=production
DATABASE_URL=your-production-database-url
JWT_SECRET=your-super-secure-production-jwt-secret
JWT_EXPIRES_IN=24h
LOG_LEVEL=warn
LOG_FORMAT=json
ALLOWED_ORIGINS=https://your-production-domain.com
VERCEL=true
```

### 4. Custom Build Command
Vercel will automatically use the `vercel-build` script from package.json:
```json
"vercel-build": "npm run build && npm run seed:prod"
```

### 5. Production Database
For production, consider using:
- **Vercel Postgres** - Managed PostgreSQL database
- **Neon** - Serverless PostgreSQL
- **Supabase** - Open source Firebase alternative

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  role VARCHAR DEFAULT 'user',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Employees Table
```sql
CREATE TABLE employees (
  id VARCHAR PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  title VARCHAR(100) NOT NULL,
  department VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  hireDate DATE NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  avatar VARCHAR,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Development

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format
```

### Database Operations
```bash
# Seed database
npm run seed

# Generate migration
npm run migration:generate -- src/migrations/MigrationName

# Run migrations
npm run migration:run
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin and user permissions
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Comprehensive DTO validation with class-validator
- **SQL Injection Protection**: TypeORM with parameterized queries
- **CORS Protection**: Configurable cross-origin resource sharing
- **Environment Variable Protection**: Secure configuration management

## 📈 Monitoring & Logging

- **Structured Logging**: Winston with JSON format in production
- **Log Rotation**: Daily log files with compression
- **Health Checks**: Health check endpoint for monitoring
- **Error Tracking**: Comprehensive error handling and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@example.com or create an issue in the repository.

---

**Note**: This is a production-ready backend API optimized for Vercel deployment. Make sure to:
- Change default JWT secrets in production
- Use a production-grade database (PostgreSQL recommended)
- Configure proper CORS origins
- Set up monitoring and alerting
- Implement rate limiting for production use
