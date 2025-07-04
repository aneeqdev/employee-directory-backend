import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"
import { ApiProperty } from "@nestjs/swagger"

@Entity("employees")
export class Employee {
  @ApiProperty({ description: "Unique identifier for the employee" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Index()
  @Column({ length: 50 })
  firstName: string

  @Index()
  @Column({ length: 50 })
  lastName: string

  @ApiProperty({ description: "Email address of the employee" })
  @Column({ unique: true, length: 100 })
  email: string

  @ApiProperty({ description: "Phone number of the employee" })
  @Column({ length: 20 })
  phone: string

  @ApiProperty({ description: "Job title of the employee" })
  @Column({ length: 100 })
  title: string

  @Index()
  @Column({ length: 50 })
  department: string

  @Index()
  @Column({ length: 100 })
  location: string

  @ApiProperty({ description: "Hire date of the employee" })
  @Column({ type: "date" })
  hireDate: string

  @ApiProperty({ description: "Salary of the employee" })
  @Column({ type: "decimal", precision: 10, scale: 2 })
  salary: number

  @ApiProperty({ description: "Avatar URL of the employee", required: false })
  @Column({ nullable: true })
  avatar?: string

  @ApiProperty({ description: "Date when the employee record was created" })
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty({ description: "Date when the employee record was last updated" })
  @UpdateDateColumn()
  updatedAt: Date
}
