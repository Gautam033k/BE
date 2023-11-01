import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  employee_id: number;
  @Column()
  employee_name: string;
  @Column()
  employee_designation: string;
  @Column()
  employee_experience: number;
}