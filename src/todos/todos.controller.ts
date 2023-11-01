import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('create-todo/:userId')
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Param('userId') userId: number,
  ) {
    console.log(createTodoDto);
    return this.todosService.create(createTodoDto, userId);
  }

  @Get('find-non-completed-todo/:userId')
  findAllNotCompletedTodo(@Param('userId') userId: number) {
    return this.todosService.findAllNotCompletedTodo(userId);
  }
  @Get('find-all-todo/:userId')
  findAllTodo(@Param('userId') userId: number) {
    return this.todosService.findAllTodo(userId);
  }
  

  @Get('find-completed-todo/:userId')
  findAllCompletedTodo(@Param('userId') userId: number) {
    return this.todosService.findAllCompletedTodo(userId);
  }

  @Patch('update-todo-status/:id')
  update(@Param('id') id: string) {
    return this.todosService.update(+id);
  }

  @Delete('delete-todo/:id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
