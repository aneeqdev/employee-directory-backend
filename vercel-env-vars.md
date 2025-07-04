# Vercel Environment Variables for Production

Add these environment variables in your Vercel dashboard:

## Required Environment Variables

### Database Configuration
```
DATABASE_URL=postgres://neondb_owner:npg_0McAtZGYR5pI@ep-autumn-bush-admf4bd5-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Application Configuration
```
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
```

### CORS Configuration
```
ALLOWED_ORIGINS=https://client-employee-directory-next.vercel.app,https://client-employee-dire-git-2c8494-zainnaeem-invozonedevs-projects.vercel.app,https://client-employee-directory-next-q0tx3oh3j.vercel.app
```

### Logging Configuration
```
LOG_LEVEL=info
```

## Optional Environment Variables

### Additional CORS Origins (if needed)
```
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://another-domain.com
```

### Port Configuration (usually not needed for Vercel)
```
PORT=3000
```

## Neon PostgreSQL Connection Details

Your Neon PostgreSQL database credentials:

- **Host**: ep-autumn-bush-admf4bd5-pooler.c-2.us-east-1.aws.neon.tech
- **Database**: neondb
- **Username**: neondb_owner
- **Password**: npg_0McAtZGYR5pI
- **SSL**: Required

## Alternative Connection Strings

### Pooled Connection (Recommended)
```
DATABASE_URL=postgres://neondb_owner:npg_0McAtZGYR5pI@ep-autumn-bush-admf4bd5-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Non-pooled Connection (for migrations)
```
DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_0McAtZGYR5pI@ep-autumn-bush-admf4bd5.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## Security Notes

1. **JWT_SECRET**: Generate a strong random string for production
2. **DATABASE_URL**: Keep this secure and never commit to version control
3. **ALLOWED_ORIGINS**: Only include domains you trust
4. **SSL**: Always use SSL in production (sslmode=require)

## Testing the Connection

After setting up the environment variables, you can test the connection by:

1. Deploying to Vercel
2. Checking the health endpoint: `https://your-api.vercel.app/api/v1/health`
3. Running migrations: `npm run migration:run`
4. Migrating data if needed: `npm run migrate:sqlite-to-postgres` 