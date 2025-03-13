'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addNewTask } from '../../../redux/features/tasks/taskSlice';
import TaskForm from '../../../components/TaskForm';
import { CreateTaskDto } from '../../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NewTaskPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.tasks);

  const handleSubmit = async (taskData: CreateTaskDto) => {
    try {
      await dispatch(addNewTask(taskData)).unwrap();
      router.push('/');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="h3 mb-4">Create New Task</h1>
      <TaskForm 
        onSubmit={handleSubmit} 
        isLoading={status === 'loading'} 
      />
    </div>
  );
}
