import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { EmployeesModule } from "./employees/employees.module"
import { Employee } from "./employees/entities/employee.entity"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "employees.db",
      entities: [Employee],
      synchronize: true, // Don't use in production
      logging: false,
    }),
    EmployeesModule,
  ],
})
export class AppModule {}
