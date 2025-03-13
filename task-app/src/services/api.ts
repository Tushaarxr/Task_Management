// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed';
}

export interface TaskQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const fetchTasks = async (params?: TaskQueryParams): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${API_URL}/tasks`, { params });
  return response.data;
};

export const fetchTaskById = async (id: string): Promise<Task> => {
  const response = await axios.get<Task>(`${API_URL}/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: CreateTaskDto): Promise<Task> => {
  const response = await axios.post<Task>(`${API_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (id: string, task: UpdateTaskDto): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};