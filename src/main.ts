import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import { LoggerService } from "./common/logger/logger.service"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  })

  // Enable CORS for Vercel deployment
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://employee-directory-frontend-two.vercel.app",
    "https://employee-directory-frontend-git-master-aneeq-ahmads-projects.vercel.app",
    "https://employee-directory-frontend-17t9apev6-aneeq-ahmads-projects.vercel.app",
    /\.vercel\.app$/,
  ]

  app.enableCors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // API prefix
  app.setGlobalPrefix("api/v1")

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Employee Directory API")
    .setDescription("API for managing employee directory")
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/v1/docs", app, document)

  // For Vercel, we need to export the app instead of listening
  if (process.env.NODE_ENV === "production" && process.env.VERCEL) {
    return app
  }
  
  const port = process.env.PORT || 3001
  await app.listen(port)

  // Use the logger directly since it's already configured
  const logger = new LoggerService()
  logger.log(`🚀 Application is running on: http://localhost:${port}`, 'Bootstrap')
  logger.log(`📚 Swagger docs available at: http://localhost:${port}/api/v1/docs`, 'Bootstrap')
}

bootstrap()
