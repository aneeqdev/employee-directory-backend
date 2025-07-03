import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import type { CreateEmployeeDto } from "./dto/create-employee.dto"
import type { UpdateEmployeeDto } from "./dto/update-employee.dto"
import type { GetEmployeesQueryDto } from "./dto/get-employees-query.dto"
import { Employee } from "./entities/employee.entity"
import type { PaginatedResponse } from "./interfaces/paginated-response.interface"

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto)
    return await this.employeeRepository.save(employee)
  }

  async findAll(query: GetEmployeesQueryDto): Promise<PaginatedResponse<Employee>> {
    const { page = 1, limit = 10, search, department, location } = query
    const skip = (page - 1) * limit

    const queryBuilder = this.employeeRepository.createQueryBuilder("employee")

    // Search functionality
    if (search) {
      queryBuilder.where(
        "(employee.firstName LIKE :search OR employee.lastName LIKE :search OR employee.email LIKE :search OR employee.title LIKE :search)",
        { search: `%${search}%` },
      )
    }

    // Department filter
    if (department) {
      queryBuilder.andWhere("employee.department = :department", { department })
    }

    // Location filter
    if (location) {
      queryBuilder.andWhere("employee.location = :location", { location })
    }

    // Order by creation date (newest first)
    queryBuilder.orderBy("employee.createdAt", "DESC")

    // Apply pagination
    queryBuilder.skip(skip).take(limit)

    const [employees, totalItems] = await queryBuilder.getManyAndCount()
    const totalPages = Math.ceil(totalItems / limit)

    return {
      data: employees,
      currentPage: page,
      totalPages,
      totalItems,
      limit,
    }
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    })

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
    return await this.employeeRepository.count()
  }
}