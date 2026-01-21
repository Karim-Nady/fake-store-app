import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * FilterChip Component
 * Displays an active filter with remove functionality
 * 
 * @param {Object} props
 * @param {string} props.label - Filter label
 * @param {Function} props.onRemove - Remove callback
 * @param {'sm'|'md'} [props.size='md'] - Chip size
 * @param {string} [props.className] - Additional CSS classes
 */
const FilterChip = ({ label, onRemove, size = 'md', className }) => {
    const sizes = {
        sm: 'px-2 py-1 text-xs gap-1',
        md: 'px-3 py-1.5 text-sm gap-1.5',
    };

    const iconSizes = {
        sm: 'h-3 w-3',
        md: 'h-3.5 w-3.5',
    };

    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full',
                'bg-primary-100 text-primary-800 border border-primary-200',
                'transition-all duration-200',
                'hover:bg-primary-200 hover:border-primary-300',
                sizes[size],
                className
            )}
        >
            <span className="font-medium">{label}</span>
            <button
                onClick={onRemove}
                className={cn(
                    'rounded-full hover:bg-primary-300 transition-colors p-0.5',
                    'focus:outline-none focus:ring-2 focus:ring-primary-400'
                )}
                aria-label={`Remove ${label} filter`}
            >
                <X className={iconSizes[size]} />
            </button>
        </div>
    );
};

export default FilterChip;