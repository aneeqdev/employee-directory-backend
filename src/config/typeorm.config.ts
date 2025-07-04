import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Employee } from '../employees/entities/employee.entity';
import { User } from '../users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.NODE_ENV === 'production' ? '/tmp/employees.db' : 'employees.db',
  entities: [Employee, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Disabled for production safety
  logging: process.env.NODE_ENV === 'development',
} as DataSourceOptions);

// For NestJS module configuration
export const getTypeOrmConfig = (configService: ConfigService): DataSourceOptions => ({
  type: 'sqlite',
  database: configService.get('NODE_ENV') === 'production' ? '/tmp/employees.db' : 'employees.db',
  entities: [Employee, User],
  synchronize: configService.get('NODE_ENV') !== 'production', // Only enable in development
  logging: configService.get('NODE_ENV') === 'development',
} as DataSourceOptions); 