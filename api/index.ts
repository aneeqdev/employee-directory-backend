import { NestFactory } from "@nestjs/core"
import { ValidationPipe, Logger } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import helmet from "helmet"
import { AppModule } from "../src/app.module"
import { GlobalExceptionFilter } from "../src/common/filters/global-exception.filter"
import { LoggingInterceptor } from "../src/common/interceptors/logging.interceptor"

let app: any

async function bootstrap() {
  if (!app) {
    const logger = new Logger("Bootstrap")

    try {
      app = await NestFactory.create(AppModule, {
        logger: ["error", "warn", "log", "debug", "verbose"],
      })

      // Temporarily disable helmet for CORS debugging
      // app.use(helmet())

      // Aggressive CORS configuration - allow all origins temporarily
      app.enableCors({
        origin: true, // Allow all origins
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"],
        exposedHeaders: ["Content-Length", "Content-Type"],
        preflightContinue: false,
        optionsSuccessStatus: 204
      })

      // Add CORS middleware manually for additional debugging
      app.use((req: any, res: any, next: any) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept')
        
        if (req.method === 'OPTIONS') {
          res.sendStatus(204)
        } else {
          next()
        }
      })

      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        }),
      )

      app.useGlobalFilters(new GlobalExceptionFilter())
      app.useGlobalInterceptors(new LoggingInterceptor())
      app.setGlobalPrefix("api/v1")

      // Add a root route handler
      app.use("/", (req: any, res: any, next: any) => {
        if (req.path === "/" && req.method === "GET") {
          return res.json({
            message: "Employee Directory API",
            version: "1.0.0",
            status: "running",
            environment: process.env.NODE_ENV || "development",
            cors: "enabled",
            endpoints: {
              health: "/api/v1/health",
              employees: "/api/v1/employees",
              swagger: "/api/docs"
            },
            timestamp: new Date().toISOString()
          })
        }
        next()
      })

      const config = new DocumentBuilder()
        .setTitle("Employee Directory API")
        .setDescription("A comprehensive API for managing employee directory")
        .setVersion("1.0")
        .addTag("employees", "Employee management operations")
        .addTag("health", "Health check endpoints")
        .build()

      const document = SwaggerModule.createDocument(app, config)
      SwaggerModule.setup("api/docs", app, document)

      await app.init()

      logger.log(`🚀 Application is ready for serverless deployment`)
      logger.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`)
      logger.log(`🌐 CORS: Enabled for all origins`)
    } catch (error) {
      logger.error("Failed to start application:", error)
      throw error
    }
  }
  return app
}

export default async function handler(req: any, res: any) {
  try {
    // Add CORS headers at the handler level
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept')
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(204).end()
      return
    }

    const app = await bootstrap()
    const expressInstance = app.getHttpAdapter().getInstance()
    return expressInstance(req, res)
  } catch (error) {
    console.error("Handler error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
