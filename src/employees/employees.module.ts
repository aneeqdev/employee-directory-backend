import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { EmployeesService } from "./employees.service"
import { EmployeesController } from "./employees.controller"
import { Employee } from "./entities/employee.entity"
import { DatabaseModule } from "../common/database/database.module"

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), DatabaseModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
