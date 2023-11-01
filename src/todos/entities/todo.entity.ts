import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({type:'date'})
  date: string;

  @Column({ default: false })
  completed: boolean;

  //   many todos can belong to single user
  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
