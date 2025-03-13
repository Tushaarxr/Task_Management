'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { fetchTask, editTask } from '../../../../redux/features/tasks/taskSlice';
import TaskForm from '../../../../components/TaskForm';
import { UpdateTaskDto } from '../../../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedTask, status, error } = useAppSelector((state) => state.tasks);
  
  const taskId = params.id as string;
  
  useEffect(() => {
    dispatch(fetchTask(taskId));
  }, [dispatch, taskId]);
  
  const handleSubmit = async (taskData: UpdateTaskDto) => {
    try {
      await dispatch(editTask({ id: taskId, task: taskData })).unwrap();
      router.push(`/tasks/${taskId}`);
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  if (status === 'loading') {
    return <div className="d-flex justify-content-center p-4"><span className="text-muted">Loading task...</span></div>;
  }
  
  if (status === 'failed') {
    return <div className="alert alert-danger p-4">Error: {error}</div>;
  }
  
  if (!selectedTask) {
    return <div className="text-center p-4">Task not found</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Edit Task</h1>
      <div className="card shadow-sm p-4">
        <TaskForm 
          task={selectedTask} 
          onSubmit={handleSubmit} 
          isLoading={status ==='pending'} 
        />
      </div>
    </div>
  );
}
