import { Controller, Get, Res } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { HealthService } from "./health.service"
import { Response } from "express"

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

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
}