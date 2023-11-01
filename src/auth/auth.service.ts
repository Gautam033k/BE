import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/login.entity';
import { Employees } from './entities/employees.entity';
import { CreateLoginDto } from './dto/login.dto';
import { EmployeeDto } from './dto/employee.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
    private readonly jwtService: JwtService,
  ) {}
  async login(createLoginDto: CreateLoginDto) {
    console.log('1');
    const { username, password } = createLoginDto;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      console.log("1")
      throw new UnauthorizedException('Username not found');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('invalid username or password');
    }
    const token = this.jwtService.sign(
      {
        authenticated: true,
        id: user.id,
        username: user.username,
        role: user.role,
      },
      { secret: 'loginsecret', expiresIn: '1d' },
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'user logged In successfully',
      data: {
        token: token,
      },
    };
  }
  async createEmployee(employeeDto: EmployeeDto) {
    const { employee_name, employee_designation, employee_experience } =
      employeeDto;
    const isAlreadyExist = await this.employeeRepository.findOne({
      where: { employee_name: employee_name },
    });
    if (isAlreadyExist) {
      return {
        message: 'employee already exist',
      };
    }
    const saveEmployee = {
      employee_name: employee_name,
      employee_designation: employee_designation,
      employee_experience: employee_experience,
    };
    await this.employeeRepository.save(saveEmployee);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'employee created successfully',
      data: {
        employee_name: employee_name,
      },
    };
  }
  async fetchEmployees() {
    const employees = await this.employeeRepository.find();
    return {
      employees: employees,
    };
  }
}







