import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { EmployeesController } from '../../src/employees/employees.controller';
import { EmployeesService } from '../../src/employees/employees.service';
import { CreateEmployeeDto } from '../../src/employees/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../src/employees/dto/update-employee.dto';
import { GetEmployeesQueryDto } from '../../src/employees/dto/get-employees-query.dto';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  const mockEmployeesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockEmployeesService,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      const createEmployeeDto: CreateEmployeeDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        title: 'Software Engineer',
        department: 'Engineering',
        location: 'New York',
        hireDate: '2023-01-15',
        salary: 75000,
      };

      const expectedEmployee = { id: '1', ...createEmployeeDto };
      mockEmployeesService.create.mockResolvedValue(expectedEmployee);

      const result = await controller.create(createEmployeeDto);

      expect(service.create).toHaveBeenCalledWith(createEmployeeDto);
      expect(result).toEqual(expectedEmployee);
    });

    it('should handle unique constraint error', async () => {
      const createEmployeeDto: CreateEmployeeDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        title: 'Software Engineer',
        department: 'Engineering',
        location: 'New York',
        hireDate: '2023-01-15',
        salary: 75000,
      };

      const error = { code: 'SQLITE_CONSTRAINT_UNIQUE' };
      mockEmployeesService.create.mockRejectedValue(error);

      await expect(controller.create(createEmployeeDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return paginated employees', async () => {
      const query: GetEmployeesQueryDto = { page: 1, limit: 10 };
      const expectedResult = {
        data: [
          { id: '1', firstName: 'John', lastName: 'Doe' },
          { id: '2', firstName: 'Jane', lastName: 'Smith' },
        ],
        currentPage: 1,
        totalPages: 1,
        totalItems: 2,
        limit: 10,
      };

      mockEmployeesService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return an employee by id', async () => {
      const employee = { id: '1', firstName: 'John', lastName: 'Doe' };
      mockEmployeesService.findOne.mockResolvedValue(employee);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(employee);
    });

    it('should throw HttpException when employee not found', async () => {
      mockEmployeesService.findOne.mockResolvedValue(null);

      await expect(controller.findOne('999')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      const updateDto: UpdateEmployeeDto = { firstName: 'Jane' };
      const updatedEmployee = { id: '1', firstName: 'Jane', lastName: 'Doe' };

      mockEmployeesService.update.mockResolvedValue(updatedEmployee);

      const result = await controller.update('1', updateDto);

      expect(service.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(updatedEmployee);
    });

    it('should throw HttpException when employee not found', async () => {
      const updateDto: UpdateEmployeeDto = { firstName: 'Jane' };
      mockEmployeesService.update.mockResolvedValue(null);

      await expect(controller.update('999', updateDto)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove an employee', async () => {
      mockEmployeesService.remove.mockResolvedValue(true);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual({ message: 'Employee deleted successfully' });
    });

    it('should throw HttpException when employee not found', async () => {
      mockEmployeesService.remove.mockResolvedValue(false);

      await expect(controller.remove('999')).rejects.toThrow();
    });
  });
}); 