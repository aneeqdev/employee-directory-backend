import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Employee } from '../employees/entities/employee.entity';
import { User } from '../users/entities/user.entity';

// Determine database configuration based on environment
const getDatabaseConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const databaseUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  
  // If TURSO_DATABASE_URL is provided (Turso), use it
  if (databaseUrl && databaseUrl.startsWith('libsql://')) {
    return {
      type: 'sqlite' as const,
      url: databaseUrl,
      extra: {
        authToken: process.env.TURSO_AUTH_TOKEN,
      },
    };
  }
  
  // Fallback to local SQLite
  return {
    type: 'sqlite' as const,
    database: isProduction ? '/tmp/employees.db' : 'employees.db',
  };
};

export const AppDataSource = new DataSource({
  ...getDatabaseConfig(),
  entities: [Employee, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Disabled for production safety
  logging: process.env.NODE_ENV === 'development',
} as DataSourceOptions);

// For NestJS module configuration
export const getTypeOrmConfig = (configService: ConfigService): DataSourceOptions => ({
  ...getDatabaseConfig(),
  entities: [Employee, User],
  synchronize: configService.get('NODE_ENV') !== 'production', // Only enable in development
  logging: configService.get('NODE_ENV') === 'development',
} as DataSourceOptions); 