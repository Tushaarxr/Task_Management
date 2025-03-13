import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchFilters from '../SearchFilters';

describe('SearchFilters Component', () => {
  const mockSearch = jest.fn();
  const mockFilterStatus = jest.fn();
  const mockClearFilters = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    render(
      <SearchFilters 
        onSearch={mockSearch} 
        onFilterStatus={mockFilterStatus}
        onClearFilters={mockClearFilters} 
      />
    );
  });
  
  test('renders correctly with search input and status filter', () => {
    expect(screen.getByPlaceholderText(/search tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/all statuses/i)).toBeInTheDocument();
    expect(screen.getByText(/clear filters/i)).toBeInTheDocument();
  });
  
  test('calls onSearch with debounce when typing in search field', async () => {
    const searchInput = screen.getByPlaceholderText(/search tasks/i);
    
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    // Debounce should delay the call
    expect(mockSearch).not.toHaveBeenCalledWith('test search');
    
    // After debounce time it should be called
    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('test search');
    }, { timeout: 350 });
  });
  
  test('calls onFilterStatus when selecting a status', () => {
    const statusSelect = screen.getByRole('combobox');
    
    fireEvent.change(statusSelect, { target: { value: 'pending' } });
    
    expect(mockFilterStatus).toHaveBeenCalledWith('pending');
  });
  
  test('calls onClearFilters when clicking clear button', () => {
    const clearButton = screen.getByText(/clear filters/i);
    
    fireEvent.click(clearButton);
    
    expect(mockClearFilters).toHaveBeenCalled();
  });
});