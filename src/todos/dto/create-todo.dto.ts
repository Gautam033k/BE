import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Todo } from '../entities/todo.entity';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsArray()
  @IsString({ each: true })
  todos: string[];
}
