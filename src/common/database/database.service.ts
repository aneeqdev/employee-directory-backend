import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getEmployees(query: any = {}) {
    const { page = 1, limit = 10, search, department, location } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.employeeRepository.createQueryBuilder("employee");

    if (search) {
      queryBuilder.where(
        "(employee.firstName LIKE :search OR employee.lastName LIKE :search OR employee.email LIKE :search OR employee.title LIKE :search)",
        { search: `%${search}%` },
      );
    }

    if (department && department.toLowerCase() !== 'all') {
      queryBuilder.andWhere("employee.department = :department", { department });
    }

    if (location && location.toLowerCase() !== 'all') {
      queryBuilder.andWhere("employee.location = :location", { location });
    }

    queryBuilder.orderBy("employee.createdAt", "DESC");
    queryBuilder.skip(skip).take(limit);

    const [employees, totalItems] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: employees,
      currentPage: page,
      totalPages,
      totalItems,
      limit,
    };
  }

  async getEmployeeById(id: string) {
    return await this.employeeRepository.findOne({ where: { id } });
  }

  async countEmployees() {
    return await this.employeeRepository.count();
  }

  async getDatabaseInfo() {
    return {
      environment: process.env.NODE_ENV,
      databaseType: process.env.NODE_ENV === 'production' ? 'PostgreSQL' : 'SQLite',
      databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    };
  }
} 