import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HealthController } from "./health.controller"
import { HealthService } from "./health.service"
import { Employee } from "../employees/entities/employee.entity"
import { DatabaseModule } from "../common/database/database.module"

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), DatabaseModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
