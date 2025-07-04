import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { EmployeesModule } from "./employees/employees.module"
import { HealthModule } from "./health/health.module"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { Employee } from "./employees/entities/employee.entity"
import { User } from "./users/entities/user.entity"
import { getTypeOrmConfig } from "./config/typeorm.config"
import { LoggerService } from "./common/logger/logger.service"
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 1 minute in ms
          limit: 100,
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    EmployeesModule,
    HealthModule,
    AuthModule,
    UsersModule,
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
