import { IsNotEmpty, IsString } from 'class-validator';
export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}