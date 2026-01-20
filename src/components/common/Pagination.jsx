import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const visiblePages = pages.filter((page) => {
        if (totalPages <= 7) return true;
        if (page === 1 || page === totalPages) return true;
        if (page >= currentPage - 1 && page <= currentPage + 1) return true;
        return false;
    });

    return (
        <div className="flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {visiblePages.map((page, index) => {
                const prevPage = visiblePages[index - 1];
                const showEllipsis = prevPage && page - prevPage > 1;

                return (
                    <div key={page} className="flex items-center gap-2">
                        {showEllipsis && <span className="text-neutral-400">...</span>}
                        <Button
                            variant={currentPage === page ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    </div>
                );
            })}

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
};

export default Pagination;

