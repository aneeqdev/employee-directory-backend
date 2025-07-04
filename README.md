# Employee Directory API

A comprehensive REST API for managing employee directory built with NestJS, TypeScript, and TypeORM. This API provides full CRUD operations, advanced search capabilities, pagination, and filtering for employee management systems.

## 🚀 Features

- **Complete Employee Management**: Create, read, update, and delete employee records
- **Advanced Search & Filtering**: Search by name, email, title with department and location filters
- **Pagination Support**: Efficient data loading with customizable page sizes
- **Data Validation**: Comprehensive input validation using class-validator
- **Database Flexibility**: SQLite for development, PostgreSQL for production
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Health Monitoring**: Built-in health check endpoints
- **Error Handling**: Global exception handling with detailed error responses
- **Logging**: Structured logging with Winston
- **CORS Support**: Configurable cross-origin resource sharing
- **Rate Limiting**: Built-in throttling protection
- **Serverless Ready**: Optimized for Vercel deployment

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Deployment**: Vercel (Serverless)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (for production)

## 🔧 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd employee-directory-api
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   Create a \`.env\` file in the root directory:
   \`\`\`env
   NODE_ENV=development
   PORT=3001
   
   # Production Database (PostgreSQL)
   DATABASE_URL=postgresql://username:password@host:port/database
   
   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
   
   # Logging
   LOG_LEVEL=info
   LOG_FORMAT=simple
   \`\`\`

## 🚀 Running the Application

### Development Mode
\`\`\`bash
npm run start:dev
\`\`\`

### Production Mode
\`\`\`bash
npm run build
npm run start:prod
\`\`\`

The API will be available at:
- **Local**: http://localhost:3001
- **API Base**: http://localhost:3001/api/v1
- **Swagger Docs**: http://localhost:3001/api/v1/docs

## 📚 API Documentation

### Base URL
- **Development**: \`http://localhost:3001/api/v1\`
- **Production**: \`https://your-domain.vercel.app/api/v1\`

### Authentication
Currently, the API doesn't require authentication, but it's structured to easily add authentication middleware.

### Endpoints

#### Health Check
- **GET** \`/health\` - Comprehensive health check with database connectivity
- **GET** \`/health/basic\` - Basic health check without database dependency
- **GET** \`/health/debug\` - Debug information for troubleshooting

#### Employees

##### Get All Employees
\`\`\`http
GET /employees?page=1&limit=10&search=john&department=Engineering&location=NewYork
\`\`\`

**Query Parameters:**
- \`page\` (optional): Page number (default: 1)
- \`limit\` (optional): Items per page (default: 10, max: 100)
- \`search\` (optional): Search in name, email, or title
- \`department\` (optional): Filter by department
- \`location\` (optional): Filter by location

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@company.com",
      "phone": "+1234567890",
      "title": "Software Engineer",
      "department": "Engineering",
      "location": "New York",
      "hireDate": "2024-01-15",
      "salary": 75000,
      "avatar": "https://example.com/avatar.jpg",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "currentPage": 1,
  "totalPages": 5,
  "totalItems": 50,
  "limit": 10
}
\`\`\`

##### Get Employee by ID
\`\`\`http
GET /employees/{id}
\`\`\`

##### Create Employee
\`\`\`http
POST /employees
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "phone": "+1234567890",
  "title": "Software Engineer",
  "department": "Engineering",
  "location": "New York",
  "hireDate": "2024-01-15",
  "salary": 75000,
  "avatar": "https://example.com/avatar.jpg"
}
\`\`\`

##### Update Employee
\`\`\`http
PUT /employees/{id}
Content-Type: application/json

{
  "title": "Senior Software Engineer",
  "salary": 85000
}
\`\`\`

##### Delete Employee
\`\`\`http
DELETE /employees/{id}
\`\`\`

### Error Responses

The API returns consistent error responses:

\`\`\`json
{
  "statusCode": 400,
  "timestamp": "2024-01-15T10:00:00Z",
  "path": "/api/v1/employees",
  "method": "POST",
  "message": "Validation failed",
  "error": "Bad Request"
}
\`\`\`

## 🗄️ Database

### Development
Uses SQLite database (\`employees.db\`) for local development.

### Production
Uses PostgreSQL database via Neon or other PostgreSQL providers.

### Migrations
\`\`\`bash
# Generate migration
npm run migration:generate -- -n MigrationName

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
\`\`\`

### Entity Schema

**Employee Entity:**
- \`id\`: UUID (Primary Key)
- \`firstName\`: String (50 chars, indexed)
- \`lastName\`: String (50 chars, indexed)
- \`email\`: String (100 chars, unique)
- \`phone\`: String (20 chars)
- \`title\`: String (100 chars)
- \`department\`: String (50 chars, indexed)
- \`location\`: String (100 chars, indexed)
- \`hireDate\`: Date
- \`salary\`: Decimal (10,2)
- \`avatar\`: String (optional)
- \`createdAt\`: DateTime
- \`updatedAt\`: DateTime

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Deploy**
   \`\`\`bash
   vercel
   \`\`\`

3. **Environment Variables**
   Set the following environment variables in Vercel dashboard:
   - \`DATABASE_URL\`: PostgreSQL connection string
   - \`ALLOWED_ORIGINS\`: Comma-separated list of allowed origins
   - \`NODE_ENV\`: production

### Manual Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start production server**
   \`\`\`bash
   npm run start:prod
   \`\`\`

## 🧪 Testing

\`\`\`bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
\`\`\`

## 📊 Monitoring & Logging

### Health Checks
- \`/health\` - Full health check including database connectivity
- \`/health/basic\` - Basic application health
- \`/health/debug\` - Debug information

### Logging
- Structured logging with Winston
- Different log levels (error, warn, info, debug, verbose)
- Request/response logging
- Error tracking with stack traces

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Configurable cross-origin requests
- **Rate Limiting**: Request throttling
- **Input Validation**: Comprehensive data validation
- **SQL Injection Protection**: TypeORM query builder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 API Validation Rules

### Employee Creation/Update
- **firstName/lastName**: 2-50 characters, required
- **email**: Valid email format, unique, max 100 characters
- **phone**: Valid phone number format
- **title**: Max 100 characters, required
- **department**: Max 50 characters, required
- **location**: Max 100 characters, required
- **hireDate**: Valid date string (YYYY-MM-DD)
- **salary**: Positive number
- **avatar**: Optional URL string

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL environment variable
   - Ensure database server is running
   - Verify network connectivity

2. **Swagger Not Loading**
   - Check if running on correct port
   - Verify \`/api/v1/docs\` endpoint
   - Check browser console for errors

3. **CORS Errors**
   - Update ALLOWED_ORIGINS environment variable
   - Check frontend domain configuration

4. **Migration Errors**
   - Ensure database is accessible
   - Check migration files syntax
   - Verify TypeORM configuration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- TypeORM for database abstraction
- All contributors and maintainers

---

**Made with ❤️ using NestJS and TypeScript**
\`\`\`
