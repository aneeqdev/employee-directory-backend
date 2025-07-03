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
    try {
      // Check database connectivity
      await this.employeeRepository.query("SELECT 1")

      return {
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: "connected",
        memory: process.memoryUsage(),
      }
    } catch (error) {
      return {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error.message,
        database: "disconnected",
      }
    }
  }
}