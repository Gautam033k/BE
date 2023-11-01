import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('get-all-users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('get-by-email')
  findOne(@Body('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Delete('delete-user/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
