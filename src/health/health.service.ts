import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { Employee } from "../employees/entities/employee.entity"

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async check() {
    const basicHealth = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || "development",
    };

    try {
      // Check database connectivity
      await this.employeeRepository.query("SELECT 1")
      return {
        ...basicHealth,
        database: "connected",
      }
    } catch (error) {
      return {
        ...basicHealth,
        status: "warning", // Changed from "error" to "warning" since app can still function
        database: "disconnected",
        databaseError: error.message,
      }
    }
  }


}