import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Employee } from '../employees/entities/employee.entity';

// Determine database configuration based on environment
const getDatabaseConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const postgresUrl = process.env.DATABASE_URL;
  
  // Debug logging
  console.log('🔍 Database Configuration Debug:');
  console.log('  NODE_ENV:', process.env.NODE_ENV);
  console.log('  DATABASE_URL:', postgresUrl ? 'SET' : 'NOT SET');
  console.log('  isProduction:', isProduction);
  
  // Production: use PostgreSQL database (Neon)
  if (isProduction && postgresUrl) {
    console.log('🚀 Using PostgreSQL database (production)');
    console.log('🔍 PostgreSQL URL:', postgresUrl);
    
    return {
      type: 'postgres' as const,
      url: postgresUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
  
  // Development: use local SQLite
  console.log('🔧 Using local SQLite database (development)');
  return {
    type: 'sqlite' as const,
    database: 'employees.db',
  };
};

export const AppDataSource = new DataSource({
  ...getDatabaseConfig(),
  entities: [Employee],
  migrations: ['src/migrations/*.ts'],
  synchronize: process.env.NODE_ENV !== 'production', // Only in development
  logging: process.env.NODE_ENV === 'development',
} as DataSourceOptions);

// For NestJS module configuration
export const getTypeOrmConfig = (configService: ConfigService): DataSourceOptions => {
  try {
    console.log('🔧 Configuring TypeORM with ConfigService');
    console.log('🔍 Environment variables from ConfigService:');
    console.log('  NODE_ENV:', configService.get('NODE_ENV'));
    console.log('  DATABASE_URL:', configService.get('DATABASE_URL') ? 'SET' : 'NOT SET');
    
    const config = {
      ...getDatabaseConfig(),
      entities: [Employee],
      synchronize: configService.get('NODE_ENV') !== 'production', // Only in development
      logging: configService.get('NODE_ENV') === 'development',
    } as DataSourceOptions;
    
    console.log('✅ TypeORM configuration created successfully');
    console.log('🔍 Final config type:', config.type);
    console.log('🔍 Final config details:', JSON.stringify(config, null, 2));
    
    return config;
  } catch (error) {
    console.error('❌ Database configuration error:', error.message);
    throw error;
  }
}; 