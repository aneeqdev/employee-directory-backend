import { Controller, Get, Res } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { HealthService } from "./health.service"
import { Response } from "express"
import { DatabaseService } from "../common/database/database.service"

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly databaseService: DatabaseService
  ) {}

  @Get()
  @ApiOperation({ summary: "Health check endpoint" })
  @ApiResponse({ status: 200, description: "Service is healthy" })
  @ApiResponse({ status: 503, description: "Service is unhealthy" })
  async check(@Res() res: Response) {
    const result = await this.healthService.check()
    if (result.status === 'ok') {
      return res.status(200).json(result)
    } else {
      return res.status(503).json(result)
    }
  }

  @Get('debug')
  @ApiOperation({ summary: "Debug endpoint to check database connection" })
  @ApiResponse({ status: 200, description: "Debug information" })
  async debug() {
    try {
      const count = await this.databaseService.countEmployees();
      const dbInfo = await this.databaseService.getDatabaseInfo();
      return {
        message: 'Debug endpoint working',
        timestamp: new Date().toISOString(),
        employeeCount: count,
        ...dbInfo
      };
    } catch (error) {
      return {
        message: 'Debug endpoint error',
        error: error.message,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      };
    }
  }

}