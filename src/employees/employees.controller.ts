import { Controller, Get, Post, Param, Delete, Put, HttpStatus, HttpException, Body, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger"
import { EmployeesService } from "./employees.service"
import { CreateEmployeeDto } from "./dto/create-employee.dto"
import { UpdateEmployeeDto } from "./dto/update-employee.dto"
import { GetEmployeesQueryDto } from "./dto/get-employees-query.dto"

@ApiTags("employees")
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new employee" })
  @ApiResponse({ status: 201, description: "Employee created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      return await this.employeesService.create(createEmployeeDto)
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        throw new HttpException("Employee with this email already exists", HttpStatus.CONFLICT)
      }
      throw new HttpException("Failed to create employee", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all employees with pagination and filtering" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "department", required: false, type: String })
  @ApiQuery({ name: "location", required: false, type: String })
  @ApiResponse({ status: 200, description: "Employees retrieved successfully" })
  async findAll(@Query() query: GetEmployeesQueryDto) {
    return await this.employeesService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee found' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async findOne(@Param('id') id: string) {
    const employee = await this.employeesService.findOne(id);
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }

  @Put(":id")
  @ApiOperation({ summary: "Update employee by ID" })
  @ApiResponse({ status: 200, description: "Employee updated successfully" })
  @ApiResponse({ status: 404, description: "Employee not found" })
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employee = await this.employeesService.update(id, updateEmployeeDto)
      if (!employee) {
        throw new HttpException("Employee not found", HttpStatus.NOT_FOUND)
      }
      return employee
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error
      }
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        throw new HttpException("Employee with this email already exists", HttpStatus.CONFLICT)
      }
      throw new HttpException("Failed to update employee", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async remove(@Param('id') id: string) {
    const result = await this.employeesService.remove(id);
    if (!result) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Employee deleted successfully' };
  }
}