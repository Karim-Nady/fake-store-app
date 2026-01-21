import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from './Button';

/**
 * Enhanced Pagination Component
 * Supports compact mode, items per page, jump to page, and better mobile UX
 * 
 * @param {Object} props
 * @param {number} props.currentPage - Current active page (1-indexed)
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Page change callback
 * @param {boolean} [props.compact=false] - Compact mode for mobile
 * @param {boolean} [props.showFirstLast=true] - Show first/last page buttons
 * @param {boolean} [props.showItemsPerPage=false] - Show items per page selector
 * @param {number} [props.itemsPerPage=10] - Current items per page
 * @param {Function} [props.onItemsPerPageChange] - Items per page change callback
 * @param {Array<number>} [props.itemsPerPageOptions=[10,20,50]] - Items per page options
 * @param {number} [props.totalItems] - Total items count for display
 * @param {string} [props.className] - Additional CSS classes
 */
const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    compact = false,
    showFirstLast = true,
    showItemsPerPage = false,
    itemsPerPage = 10,
    onItemsPerPageChange,
    itemsPerPageOptions = [10, 20, 50],
    totalItems,
    className,
}) => {
    const [jumpToPage, setJumpToPage] = useState('');

    // Generate page numbers with ellipsis logic
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = compact ? 3 : 7;

        if (totalPages <= maxVisible) {
            // Show all pages if total is small
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Always show first page
        pages.push(1);

        // Calculate range around current page
        const leftOffset = Math.floor((maxVisible - 3) / 2);
        const rightOffset = Math.ceil((maxVisible - 3) / 2);

        let start = Math.max(2, currentPage - leftOffset);
        let end = Math.min(totalPages - 1, currentPage + rightOffset);

        // Adjust if at boundaries
        if (currentPage <= leftOffset + 1) {
            end = Math.min(totalPages - 1, maxVisible - 1);
        }
        if (currentPage >= totalPages - rightOffset) {
            start = Math.max(2, totalPages - maxVisible + 2);
        }

        // Add ellipsis before range if needed
        if (start > 2) {
            pages.push('ellipsis-start');
        }

        // Add range
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Add ellipsis after range if needed
        if (end < totalPages - 1) {
            pages.push('ellipsis-end');
        }

        // Always show last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    const handleJumpToPage = (e) => {
        e.preventDefault();
        const page = parseInt(jumpToPage);
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
            setJumpToPage('');
        }
    };

    // Compact mobile version
    if (compact) {
        return (
            <div className={cn('flex items-center justify-between gap-2', className)}>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <span className="text-sm text-neutral-700 font-medium">
                    Page {currentPage} of {totalPages}
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        );
    }

    return (
        <div className={cn('space-y-4', className)}>
            {/* Main Pagination Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2">
                {/* First Page */}
                {showFirstLast && (
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(1)}
                        className="hidden sm:flex"
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                )}

                {/* Previous */}
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                </Button>

                {/* Page Numbers */}
                {pageNumbers.map((page, index) => {
                    if (typeof page === 'string' && page.startsWith('ellipsis')) {
                        return (
                            <span
                                key={page}
                                className="px-2 text-neutral-400 select-none"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <Button
                            key={page}
                            variant={currentPage === page ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => onPageChange(page)}
                            className="min-w-[40px]"
                        >
                            {page}
                        </Button>
                    );
                })}

                {/* Next */}
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last Page */}
                {showFirstLast && (
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(totalPages)}
                        className="hidden sm:flex"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Additional Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                {/* Total Items Display */}
                {totalItems && (
                    <div className="text-neutral-600">
                        Showing{' '}
                        <span className="font-medium text-neutral-900">
                            {(currentPage - 1) * itemsPerPage + 1}
                        </span>
                        {' '}-{' '}
                        <span className="font-medium text-neutral-900">
                            {Math.min(currentPage * itemsPerPage, totalItems)}
                        </span>
                        {' '}of{' '}
                        <span className="font-medium text-neutral-900">
                            {totalItems}
                        </span>
                        {' '}results
                    </div>
                )}

                {/* Jump to Page */}
                <form onSubmit={handleJumpToPage} className="flex items-center gap-2">
                    <span className="text-neutral-600 whitespace-nowrap">Go to:</span>
                    <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={jumpToPage}
                        onChange={(e) => setJumpToPage(e.target.value)}
                        placeholder="Page"
                        className="input w-24 h-8 text-sm text-center"
                    />
                    <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        disabled={!jumpToPage}
                    >
                        Go
                    </Button>
                </form>

                {/* Items Per Page */}
                {showItemsPerPage && onItemsPerPageChange && (
                    <div className="flex items-center gap-2">
                        <span className="text-neutral-600 whitespace-nowrap">Per page:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            className="input h-8 text-sm pr-8"
                        >
                            {itemsPerPageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pagination;