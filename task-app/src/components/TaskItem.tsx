import React from 'react';
import Link from 'next/link';
import { Task } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'pending':
      return 'badge bg-warning text-dark rounded-pill';
    case 'in-progress':
      return 'badge bg-primary rounded-pill';
    case 'completed':
      return 'badge bg-success rounded-pill';
    default:
      return 'badge bg-secondary rounded-pill';
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title">{task.title}</h5>
            <p
              className="card-text text-muted mt-1"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {task.description}
            </p>
          </div>
          <span className={getStatusBadgeClass(task.status)}>
            {task.status}
          </span>
        </div>

        <div className="mt-4 d-flex">
          <Link href={`/tasks/${task._id}`} passHref>
            <button className="btn btn-outline-secondary me-2">
              View
            </button>
          </Link>
          <Link href={`/tasks/${task._id}/edit`} passHref>
            <button className="btn btn-primary me-2">
              Edit
            </button>
          </Link>
          <button 
            onClick={() => onDelete(task._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
