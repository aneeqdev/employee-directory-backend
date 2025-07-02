import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString, IsNumber, Min, Max } from "class-validator"
import { Transform, Type } from "class-transformer"

export class GetEmployeesQueryDto {
  @ApiPropertyOptional({ description: "Page number", example: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1

  @ApiPropertyOptional({ description: "Number of items per page", example: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10

  @ApiPropertyOptional({ description: "Search term for name, email, or title", example: "john" })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  search?: string

  @ApiPropertyOptional({ description: "Filter by department", example: "Engineering" })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  department?: string

  @ApiPropertyOptional({ description: "Filter by location", example: "New York" })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  location?: string
}
