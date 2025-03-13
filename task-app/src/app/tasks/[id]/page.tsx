'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchTask, removeTask } from '../../../redux/features/tasks/taskSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedTask, status, error } = useAppSelector((state) => state.tasks);
  
  const taskId = params.id as string;
  
  useEffect(() => {
    dispatch(fetchTask(taskId));
  }, [dispatch, taskId]);
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(removeTask(taskId)).unwrap()
        .then(() => router.push('/'))
        .catch((err) => console.error('Failed to delete task:', err));
    }
  };
  
  if (status === 'loading') {
    return <div className="d-flex justify-content-center p-4">Loading task details...</div>;
  }
  
  if (status === 'failed') {
    return <div className="text-danger p-4">Error: {error}</div>;
  }
  
  if (!selectedTask) {
    return <div className="text-center p-4">Task not found</div>;
  }
  
  const getStatusColor = (status: String) => {
    switch (status) {
      case 'pending':
        return 'badge bg-warning text-dark';
      case 'in-progress':
        return 'badge bg-primary';
      case 'completed':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  };
  
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4">Task Details</h1>
        <div>
          <Link href={`/tasks/${taskId}/edit`}>
            <button className="btn btn-primary me-2">Edit</button>
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>
      
      <div className="card shadow-sm p-4">
        <div className="mb-3">
          <span className={getStatusColor(selectedTask.status)}>{selectedTask.status}</span>
        </div>
        
        <h2 className="h5 mb-3">{selectedTask.title}</h2>
        
        <div className="mt-3">
          <h3 className="h6">Description</h3>
          <p className="text-muted">{selectedTask.description}</p>
        </div>
        
        {selectedTask.createdAt && (
          <div className="mt-4 text-muted small">
            <p>Created: {new Date(selectedTask.createdAt).toLocaleString()}</p>
            {selectedTask.updatedAt && selectedTask.updatedAt !== selectedTask.createdAt && (
              <p>Last Updated: {new Date(selectedTask.updatedAt).toLocaleString()}</p>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <button onClick={() => router.push('/')} className="btn btn-link">&larr; Back to Tasks</button>
      </div>
    </div>
  );
}
