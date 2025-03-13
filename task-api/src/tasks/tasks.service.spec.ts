// src/tasks/tasks.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TasksService } from './tasks.service';
import { Task, TaskDocument, TaskStatus } from './schemas/task.schema';
import { NotFoundException } from '@nestjs/common';

const mockTask = {
  _id: 'some-test-id',
  title: 'Test Task',
  description: 'Test Description',
  status: TaskStatus.PENDING,
};

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<TaskDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTask),
            constructor: jest.fn().mockResolvedValue(mockTask),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
            exec: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<TaskDocument>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const newTask = {
        title: 'New Task',
        description: 'New Description',
        status: TaskStatus.PENDING,
      };
      
      const mockTaskInstance = { ...mockTask, save: jest.fn().mockResolvedValueOnce(mockTask) };
      (model as any).new = jest.fn().mockReturnValue(mockTaskInstance);
      
      const result = await service.create(newTask);
      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([mockTask]),
      } as any);
      
      const result = await service.findAll();
      expect(result).toEqual([mockTask]);
    });
  });

  describe('findOne', () => {
    it('should find and return a task', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockTask),
      } as any);
      
      const result = await service.findOne('some-test-id');
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);
      
      await expect(service.findOne('nonexistent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // Tests for update and remove methods would follow the same pattern
});