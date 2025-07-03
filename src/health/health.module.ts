import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HealthController } from "./health.controller"
import { HealthService } from "./health.service"
import { Employee } from "../employees/entities/employee.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
