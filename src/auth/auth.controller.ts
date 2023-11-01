import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/login.dto';
import { EmployeeDto } from './dto/employee.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() createLoginDto: CreateLoginDto) {
    return this.authService.login(createLoginDto);
  }
  @Post('/create-employee')
  createEmployee(@Body() employeeDto: EmployeeDto) {
    return this.authService.createEmployee(employeeDto);
  }
  @Get('/fetch-employees')
  fetchEmployees() {
    return this.authService.fetchEmployees();
  }
}