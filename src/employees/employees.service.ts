import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import type { CreateEmployeeDto } from "./dto/create-employee.dto"
import type { UpdateEmployeeDto } from "./dto/update-employee.dto"
import type { GetEmployeesQueryDto } from "./dto/get-employees-query.dto"
import { Employee } from "./entities/employee.entity"
import type { PaginatedResponse } from "./interfaces/paginated-response.interface"
import { DatabaseService } from "../common/database/database.service"

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly databaseService: DatabaseService
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto)
    return await this.employeeRepository.save(employee)
  }

  async findAll(query: GetEmployeesQueryDto): Promise<PaginatedResponse<Employee>> {
    return await this.databaseService.getEmployees(query);
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.databaseService.getEmployeeById(id);

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`)
    }

    return employee
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id)

    Object.assign(employee, updateEmployeeDto)
    return await this.employeeRepository.save(employee)
  }

  async remove(id: string): Promise<boolean> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    })

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`)
    }

    await this.employeeRepository.remove(employee)
    return true
  }

  async count(): Promise<number> {
    return await this.databaseService.countEmployees()
  }
}