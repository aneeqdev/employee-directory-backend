# Employee Directory Backend

A comprehensive NestJS backend API for managing employee directory with authentication, authorization, and CRUD operations.

## Features

- 🔐 JWT Authentication & Authorization
- 👥 Employee Management (CRUD operations)
- 👤 User Management
- 📊 Pagination & Filtering
- 🏥 Health Check Endpoints
- 📚 Swagger API Documentation
- 🛡️ Security (Helmet, CORS, Rate Limiting)
- 🗄️ Database Migrations
- 🌱 Database Seeding

## Tech Stack

- **Framework**: NestJS
- **Database**: SQLite (local) / PostgreSQL (Neon) (production)
- **ORM**: TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Deployment**: Vercel

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-directory-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run database migrations**
   ```bash
   npm run migration:run
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`

## Production Deployment (Vercel)

### Prerequisites

For production deployment, you need a cloud database. This application is configured to use **Neon PostgreSQL** (cloud PostgreSQL).

### 1. Set up Neon PostgreSQL Database

1. **Create a Neon account** at [neon.tech](https://neon.tech)

2. **Create a new project** in the Neon dashboard

3. **Get your database connection string** from the Neon dashboard

### 2. Deploy to Vercel

1. **Connect your repository to Vercel**

2. **Set environment variables in Vercel dashboard:**
   ```
   NODE_ENV=production
   DATABASE_URL=postgres://your-username:your-password@your-host/your-database?sslmode=require
   JWT_SECRET=your-jwt-secret
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### 3. Run Migrations on Production

After deployment, run migrations on your production database:

```bash
# Set environment variables locally
export DATABASE_URL=postgres://your-username:your-password@your-host/your-database?sslmode=require

# Run migrations
npm run migration:run
```

### 4. Migrate Data from SQLite to PostgreSQL (if needed)

If you have existing data in your local SQLite database, you can migrate it to PostgreSQL:

```bash
# Set the production DATABASE_URL
export DATABASE_URL=postgres://your-username:your-password@your-host/your-database?sslmode=require

# Run the migration script
npm run migrate:sqlite-to-postgres
```

## API Endpoints

### Health Check
- `GET /api/v1/health` - Full health check (includes database)
- `GET /api/v1/health/basic` - Basic health check (no database required)

### Authentication
- `POST /api/v1/auth/login` - User login

### Employees
- `GET /api/v1/employees` - Get all employees (with pagination)
- `POST /api/v1/employees` - Create new employee
- `GET /api/v1/employees/:id` - Get employee by ID
- `PUT /api/v1/employees/:id` - Update employee
- `DELETE /api/v1/employees/:id` - Delete employee

### Documentation
- `GET /api/v1/docs` - Swagger API documentation

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment (development/production) | No | development |
| `DATABASE_URL` | PostgreSQL database URL (production) | Yes (prod) | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `ALLOWED_ORIGINS` | CORS allowed origins | No | localhost:3000 |

## Database Configuration

The application automatically detects the environment and configures the database accordingly:

- **Development**: Uses local SQLite file (`employees.db`)
- **Production**: Uses Neon PostgreSQL cloud database (requires `DATABASE_URL`)

## Troubleshooting

### Common Issues

1. **Database connection errors in production**
   - Ensure `DATABASE_URL` is set correctly
   - Verify the database URL starts with `postgres://`
   - Check SSL configuration

2. **Health check failing**
   - Use `/api/v1/health/basic` for basic status
   - Check database connectivity with `/api/v1/health`

3. **Migration errors**
   - Ensure database is accessible
   - Check environment variables are set correctly

### Local Development Issues

1. **Port already in use**
   - Change the port in `main.ts` or kill the existing process

2. **Database file not found**
   - Run migrations: `npm run migration:run`
   - Check file permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
