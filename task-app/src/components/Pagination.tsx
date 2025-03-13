import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;

  // Create page buttons with logic to show ellipsis for many pages
  const renderPageButtons = () => {
    const pages = [];
    
    // Always show first page
    pages.push(
      <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
        <button className="page-link" onClick={() => onPageChange(1)}>1</button>
      </li>
    );

    // Show ellipsis if needed
    if (currentPage > 3) {
      pages.push(<li key="ellipsis-1" className="page-item disabled"><span className="page-link">...</span></li>);
    }

    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(i)}>{i}</button>
          </li>
        );
      }
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(<li key="ellipsis-2" className="page-item disabled"><span className="page-link">...</span></li>);
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(
        <li key={totalPages} className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav>
      <ul className="pagination justify-content-center mt-4">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo; Prev</button>
        </li>

        {renderPageButtons()}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next &raquo;</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
