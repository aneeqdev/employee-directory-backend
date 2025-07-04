import { Controller, Get, Res } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { Response } from "express"

@ApiTags("health")
@Controller("health")
export class BasicHealthController {
  @Get("basic")
  @ApiOperation({ summary: "Basic health check endpoint (no database)" })
  @ApiResponse({ status: 200, description: "Application is running" })
  async basicCheck(@Res() res: Response) {
    const result = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      message: "Application is running",
      version: "1.0.0",
    };
    return res.status(200).json(result);
  }
} 