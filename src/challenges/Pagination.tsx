/**
 * Pagination Component
 * 
 * A pagination component that demonstrates:
 * - useMemo hook for optimized calculations
 * - Managing multiple state values
 * - Array slicing for data pagination
 * - Boundary checking for navigation
 */

import { useMemo, useState } from 'react';

/**
 * Default sample data for demonstration
 */
const defaultData = [
  'React Fundamentals',
  'State Management',
  'Component Lifecycle',
  'Hooks Deep Dive',
  'Custom Hooks',
  'Context API',
  'Redux Basics',
  'React Router',
  'Testing Components',
  'Performance Optimization',
  'Server Side Rendering',
  'Code Splitting',
  'Error Boundaries',
  'Suspense',
  'Concurrent Features',
];

/**
 * Props interface for Pagination component
 */
interface PaginationProps {
  data?: string[];
}

const Pagination = ({ data = defaultData }: PaginationProps) => {
  // State for items per page
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // State for current page (1-indexed)
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Calculate total number of pages
   */
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  /**
   * Memoized visible rows for current page
   * Recalculates when data, itemsPerPage, or currentPage changes
   */
  const visibleRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, itemsPerPage, currentPage]);

  /**
   * Handle items per page change
   * Resets to page 1 when changing items per page
   */
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(50, Number(e.target.value)));
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  /**
   * Navigate to previous page
   */
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  /**
   * Navigate to next page
   */
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  /**
   * Check if we're on the first page
   */
  const isFirstPage = currentPage <= 1;

  /**
   * Check if we're on the last page
   */
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="bg-bg-primary rounded-xl border border-border p-6">
      {/* Controls section */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <label htmlFor="itemsPerPage" className="text-sm text-text-muted">
            Items per page:
          </label>
          <input
            id="itemsPerPage"
            type="number"
            min="1"
            max="50"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="w-20 px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <div className="text-sm text-text-muted">
          Total: <span className="font-medium text-text-primary">{data.length}</span> items
        </div>
      </div>

      {/* Data display */}
      <div className="min-h-[200px] mb-6">
        {visibleRows.length > 0 ? (
          <ul className="space-y-2">
            {visibleRows.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 px-4 py-3 bg-bg-secondary rounded-lg border border-border hover:border-primary transition-colors"
              >
                <span className="w-8 h-8 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </span>
                <span className="text-text-primary">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-text-muted">
            No items to display
          </div>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <button
          onClick={handlePrevious}
          disabled={isFirstPage}
          className="px-4 py-2 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Previous page"
        >
          ← Previous
        </button>

        <div className="flex items-center gap-2">
          <span className="text-text-muted text-sm">Page</span>
          <span className="px-3 py-1 bg-bg-secondary border border-border rounded-lg text-text-primary font-medium">
            {currentPage}
          </span>
          <span className="text-text-muted text-sm">of {totalPages}</span>
        </div>

        <button
          onClick={handleNext}
          disabled={isLastPage}
          className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;