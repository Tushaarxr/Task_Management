
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  fetchAllTasks, 
  removeTask, 
  setCurrentPage,
  setSearchTerm,
  setStatusFilter,
  clearFilters,
  selectPaginatedTasks
} from '../redux/features/tasks/taskSlice';
import TaskItem from './TaskItem';
import Pagination from './Pagination';
import SearchFilters from './SearchFilters';

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, error, currentPage, itemsPerPage, totalItems } = useAppSelector((state) => state.tasks);
  const paginatedTasks = useAppSelector(selectPaginatedTasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllTasks());
    }
  }, [dispatch, status]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(removeTask(id));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (searchTerm: string) => {
    dispatch(setSearchTerm(searchTerm));
  };

  const handleFilterStatus = (status: string) => {
    dispatch(setStatusFilter(status));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  if (status === 'loading' && paginatedTasks.length === 0) {
    return <div className="d-flex justify-content-center p-4">Loading tasks...</div>;
  }

  if (status === 'failed') {
    return <div className="text-danger p-4">Error: {error}</div>;
  }

  return (
    <div>
      <SearchFilters 
        onSearch={handleSearch} 
        onFilterStatus={handleFilterStatus}
        onClearFilters={handleClearFilters}
      />

      {paginatedTasks.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted">No tasks found. Create a new task to get started!</p>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {paginatedTasks.map((task) => (
              <div key={task._id} className="col-12 col-md-6 col-lg-4">
                <TaskItem task={task} onDelete={handleDelete} />
              </div>
            ))}
          </div>

          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default TaskList;
