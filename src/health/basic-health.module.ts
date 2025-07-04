import { Module } from "@nestjs/common"
import { BasicHealthController } from "./basic-health.controller"

@Module({
  controllers: [BasicHealthController],
})
export class BasicHealthModule {} 