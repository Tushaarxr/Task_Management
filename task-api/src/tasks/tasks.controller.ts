// src/tasks/tasks.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ValidationPipe,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  import { Task } from './schemas/task.schema';
  
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    create(@Body(ValidationPipe) createTaskDto: CreateTaskDto): Promise<Task> {
      return this.tasksService.create(createTaskDto);
    }
  
    @Get()
    findAll(): Promise<Task[]> {
      return this.tasksService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Task> {
      return this.tasksService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
      return this.tasksService.update(id, updateTaskDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.tasksService.remove(id);
    }
  }