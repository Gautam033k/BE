import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/login.entity';
import { JwtModule } from '@nestjs/jwt';
import { Employees } from './entities/employees.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Employees]),
    JwtModule.register({
      secret: 'loginsecret',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
