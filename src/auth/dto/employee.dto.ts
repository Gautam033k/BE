import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  employee_name: string;
  @IsString()
  @IsNotEmpty()
  employee_designation: string;
  @IsNumber()
  @IsNotEmpty()
  employee_experience: number;
}