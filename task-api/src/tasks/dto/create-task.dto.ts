// src/tasks/dto/create-task.dto.ts
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}