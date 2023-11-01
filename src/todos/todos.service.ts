import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UsersService,
  ) {}
  async create(createTodoDto: CreateTodoDto, userId: number) {
    const todos = createTodoDto.todos;
    const savedTodos = [];
    console.log(todos);
    for (const todo of todos) {
      const newTodo = new Todo();
      newTodo.title = todo;
      newTodo.date = new Date().toLocaleString();
      newTodo.user = await this.userService.findUserById(userId);
      savedTodos.push(await this.todoRepository.save(newTodo));
    }

    return savedTodos;
  }
  async findAllNotCompletedTodo(userId: number) {
    return await this.todoRepository.find({
      where: {
        user: { id: userId },
        completed: false,
      },
      relations: ['user'],
    });
  }

  async findAllCompletedTodo(userId: number) {
    return await this.todoRepository.find({
      where: {
        user: { id: userId },
        completed: true,
      },
      relations: ['user'],
    });
  }
  async findAllTodo(userId: number) {
    const currentDate = new Date().toISOString().split('T')[0];
    return await this.todoRepository.find({
      where: {
        user: { id: userId },
        date:currentDate,
      },  
      relations: ['user'],
    });
  }

  async update(id: number) {
    const todo = await this.todoRepository.findOne({where:{id:id}});

    if (!todo) {
      throw new Error(`Todo with ID ${id} not found`);
    }

    todo.completed = !todo.completed;

    await this.todoRepository.save(todo);

    return todo;
  }

  async remove(id: number) {
    return await this.todoRepository.delete(id);
  }
}
