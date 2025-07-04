import { NestFactory } from "@nestjs/core"
import { Module, Controller, Get, Res } from "@nestjs/common"
import { Response } from "express"

@Controller("test")
class TestController {
  @Get()
  async test(@Res() res: Response) {
    return res.json({
      status: "ok",
      message: "Test endpoint working",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      debug: {
        DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
        NODE_ENV: process.env.NODE_ENV,
      }
    });
  }
}

@Module({
  controllers: [TestController],
})
class TestModule {}

async function bootstrap() {
  const app = await NestFactory.create(TestModule);
  app.setGlobalPrefix("api/v1");
  await app.init();
  return app;
}

export default async function handler(req: any, res: any) {
  try {
    const app = await bootstrap();
    const expressInstance = app.getHttpAdapter().getInstance();
    return expressInstance(req, res);
  } catch (error) {
    console.error("Test handler error:", error);
    res.status(500).json({ 
      error: "Internal server error", 
      message: error.message,
      stack: error.stack 
    });
  }
} 