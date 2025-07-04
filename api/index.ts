import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { ExpressAdapter } from "@nestjs/platform-express"
import { AppModule } from "../src/app.module"
import express from "express"

const server = express()

async function createNestServer(expressInstance: express.Express) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // Enable CORS
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend-domain.vercel.app", // Replace with your frontend URL
      /\.vercel\.app$/,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })

  // Set global prefix to match main.ts
  app.setGlobalPrefix("api/v1")

  return app.init()
}

createNestServer(server)
  .then(() => console.log("Nest Ready"))
  .catch((err) => console.error("Nest broken", err))

export default server
