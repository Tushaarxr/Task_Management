'use client';

import React, { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import TaskList from '../components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const { totalItems, searchTerm, statusFilter } = useAppSelector((state) => state.tasks);

  // Load Bootstrap JavaScript for components like modals, tooltips, etc.
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  // Create filter message if filters are active
  const getFilterMessage = () => {
    const filters = [];

    if (searchTerm) {
      filters.push(`search: "${searchTerm}"`);
    }

    if (statusFilter) {
      filters.push(`status: ${statusFilter}`);
    }

    if (filters.length === 0) return '';

    return `(filtered by ${filters.join(', ')})`;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-4">
        <h1 className="text-primary">Tasks</h1>
        {(searchTerm || statusFilter) && (
          <div className="mt-2 mt-md-0 text-muted">
            Showing {totalItems} result{totalItems !== 1 ? 's' : ''} {getFilterMessage()}
          </div>
        )}
      </div>
      <TaskList />
    </div>
  );
}
