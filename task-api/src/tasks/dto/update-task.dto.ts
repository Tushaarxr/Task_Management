// src/tasks/dto/update-task.dto.ts
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: TaskStatus;
}