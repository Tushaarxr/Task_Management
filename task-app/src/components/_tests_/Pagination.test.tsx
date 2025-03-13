import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  const mockPageChange = jest.fn();
  
  beforeEach(() => {
    mockPageChange.mockClear();
  });
  
  test('renders correctly with multiple pages', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={2} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Should show pages 1, 2, 3
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    
    // Current page should have different styling (we can check for class)
    const currentPageButton = screen.getByText('2');
    expect(currentPageButton).toHaveClass('bg-blue-500');
    
    // Prev and Next buttons should be enabled
    expect(screen.getByText(/Prev/i)).not.toBeDisabled();
    expect(screen.getByText(/Next/i)).not.toBeDisabled();
  });
  
  test('disables prev button on first page', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={1} 
        onPageChange={mockPageChange} 
      />
    );
    
    const prevButton = screen.getByText(/Prev/i);
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass('cursor-not-allowed');
  });
  
  test('disables next button on last page', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={3} 
        onPageChange={mockPageChange} 
      />
    );
    
    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass('cursor-not-allowed');
  });
  
  test('calls onPageChange when page button is clicked', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={1} 
        onPageChange={mockPageChange} 
      />
    );
    
    fireEvent.click(screen.getByText('2'));
    expect(mockPageChange).toHaveBeenCalledWith(2);
  });
  
  test('does not render when only one page exists', () => {
    const { container } = render(
      <Pagination 
        totalItems={10} 
        itemsPerPage={10} 
        currentPage={1} 
        onPageChange={mockPageChange} 
      />
    );
    
    expect(container).toBeEmptyDOMElement();
  });
  
  test('shows ellipsis for many pages', () => {
    render(
      <Pagination 
        totalItems={100} 
        itemsPerPage={10} 
        currentPage={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Should show ellipsis before and after current page area
    const ellipses = screen.getAllByText('...');
    expect(ellipses.length).toBe(2);
  });
});