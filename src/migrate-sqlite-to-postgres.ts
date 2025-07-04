import { DataSource } from 'typeorm';
import { Employee } from './employees/entities/employee.entity';
import { User } from './users/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';

// SQLite source configuration
const sqliteConfig = {
  type: 'sqlite' as const,
  database: 'employees.db',
  entities: [Employee, User],
  synchronize: false,
  logging: true,
};

// PostgreSQL target configuration
const postgresConfig = {
  type: 'postgres' as const,
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Employee, User],
  synchronize: true, // Enable synchronize to create tables
  logging: true,
};

async function migrateData() {
  console.log('🚀 Starting migration from SQLite to PostgreSQL...');
  
  // Check if SQLite database exists
  const sqlitePath = path.join(process.cwd(), 'employees.db');
  if (!fs.existsSync(sqlitePath)) {
    console.error('❌ SQLite database not found at:', sqlitePath);
    process.exit(1);
  }

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  let sqliteDataSource: DataSource;
  let postgresDataSource: DataSource;

  try {
    // Initialize SQLite source
    console.log('📦 Initializing SQLite source...');
    sqliteDataSource = new DataSource(sqliteConfig);
    await sqliteDataSource.initialize();
    console.log('✅ SQLite source initialized');

    // Initialize PostgreSQL target
    console.log('📦 Initializing PostgreSQL target...');
    postgresDataSource = new DataSource(postgresConfig);
    await postgresDataSource.initialize();
    console.log('✅ PostgreSQL target initialized');
    console.log('✅ Tables created in PostgreSQL');

    // Create repositories
    const sqliteEmployeeRepo = sqliteDataSource.getRepository(Employee);
    const sqliteUserRepo = sqliteDataSource.getRepository(User);
    const postgresEmployeeRepo = postgresDataSource.getRepository(Employee);
    const postgresUserRepo = postgresDataSource.getRepository(User);

    // Migrate Users
    console.log('👥 Migrating users...');
    const users = await sqliteUserRepo.find();
    console.log(`Found ${users.length} users to migrate`);
    
    if (users.length > 0) {
      await postgresUserRepo.save(users);
      console.log('✅ Users migrated successfully');
    }

    // Migrate Employees
    console.log('👨‍💼 Migrating employees...');
    const employees = await sqliteEmployeeRepo.find();
    console.log(`Found ${employees.length} employees to migrate`);
    
    if (employees.length > 0) {
      await postgresEmployeeRepo.save(employees);
      console.log('✅ Employees migrated successfully');
    }

    // Verify migration
    console.log('🔍 Verifying migration...');
    const postgresUserCount = await postgresUserRepo.count();
    const postgresEmployeeCount = await postgresEmployeeRepo.count();
    
    console.log(`📊 Migration Summary:`);
    console.log(`  Users: ${users.length} → ${postgresUserCount}`);
    console.log(`  Employees: ${employees.length} → ${postgresEmployeeCount}`);

    if (postgresUserCount === users.length && postgresEmployeeCount === employees.length) {
      console.log('✅ Migration completed successfully!');
    } else {
      console.log('⚠️  Migration completed with discrepancies');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    // Close connections
    if (sqliteDataSource?.isInitialized) {
      await sqliteDataSource.destroy();
      console.log('🔌 SQLite connection closed');
    }
    if (postgresDataSource?.isInitialized) {
      await postgresDataSource.destroy();
      console.log('🔌 PostgreSQL connection closed');
    }
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData()
    .then(() => {
      console.log('🎉 Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

export { migrateData }; 