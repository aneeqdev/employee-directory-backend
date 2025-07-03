import { ApiProperty } from "@nestjs/swagger"
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsDateString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from "class-validator"
import { Transform } from "class-transformer"

export class CreateEmployeeDto {
  @ApiProperty({ description: "First name of the employee", example: "John" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName: string

  @ApiProperty({ description: "Last name of the employee", example: "Doe" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName: string

  @ApiProperty({ description: "Email address of the employee", example: "john.doe@company.com" })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string

  @ApiProperty({ description: "Phone number of the employee", example: "+1234567890" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[+]?[1-9][\d]{0,15}$/, {
    message: "Phone number must be a valid format",
  })
  phone: string

  @ApiProperty({ description: "Job title of the employee", example: "Software Engineer" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string

  @ApiProperty({ description: "Department of the employee", example: "Engineering" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  department: string

  @ApiProperty({ description: "Location of the employee", example: "New York" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  location: string

  @ApiProperty({ description: "Hire date of the employee", example: "2024-01-15" })
  @IsDateString()
  @IsNotEmpty()
  hireDate: string

  @ApiProperty({ description: "Salary of the employee", example: 75000 })
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number.parseFloat(value))
  salary: number

  @ApiProperty({ description: "Avatar URL of the employee", required: false })
  @IsOptional()
  @IsString()
  avatar?: string
}
