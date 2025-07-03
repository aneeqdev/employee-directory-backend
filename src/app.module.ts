import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { EmployeesModule } from "./employees/employees.module"
import { HealthModule } from "./health/health.module"
import { Employee } from "./employees/entities/employee.entity"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: process.env.NODE_ENV === "production" ? "/tmp/employees.db" : "employees.db",
      entities: [Employee],
      synchronize: true, // Don't use in production normally, but OK for demo
      logging: false,
    }),
    EmployeesModule,
    HealthModule,
  ],
})
export class AppModule {}
