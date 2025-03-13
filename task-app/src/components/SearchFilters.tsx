import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SearchFiltersProps {
  onSearch: (searchTerm: string) => void;
  onFilterStatus: (status: string) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onSearch, 
  onFilterStatus,
  onClearFilters
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Debounce search to avoid too many requests while typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setSelectedStatus(status);
    onFilterStatus(status);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('');
    onClearFilters();
  };

  return (
    <div className="card p-3 mb-4">
      <div className="row g-3 align-items-center">
        {/* Search Input */}
        <div className="col-md">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="col-md-auto">
          <select 
            className="form-select"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="col-md-auto">
          <button className="btn btn-secondary" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
