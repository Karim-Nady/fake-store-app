import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * RatingFilter Component
 * Interactive star rating filter
 * 
 * @param {Object} props
 * @param {number|null} props.value - Currently selected rating (null for none)
 * @param {Function} props.onChange - Callback when rating changes: (rating) => void
 * @param {string} [props.className] - Additional CSS classes
 */
const RatingFilter = ({ value, onChange, className }) => {
    const ratings = [5, 4, 3, 2, 1];

    const handleClick = (rating) => {
        // Toggle: if same rating clicked, clear filter
        onChange(value === rating ? null : rating);
    };

    return (
        <div className={cn('space-y-2', className)}>
            <label className="text-sm font-medium text-neutral-700 block mb-3">
                Customer Rating
            </label>

            <div className="space-y-2">
                {ratings.map((rating) => (
                    <button
                        key={rating}
                        onClick={() => handleClick(rating)}
                        className={cn(
                            'w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all',
                            'hover:bg-neutral-50 group',
                            value === rating
                                ? 'bg-primary-50 border-2 border-primary-600 ring-2 ring-primary-100'
                                : 'border-2 border-transparent hover:border-neutral-200'
                        )}
                    >
                        {/* Stars */}
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className={cn(
                                        'h-4 w-4 transition-colors',
                                        index < rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-neutral-300'
                                    )}
                                />
                            ))}
                        </div>

                        {/* Label */}
                        <span
                            className={cn(
                                'text-sm font-medium transition-colors',
                                value === rating
                                    ? 'text-primary-900'
                                    : 'text-neutral-700 group-hover:text-neutral-900'
                            )}
                        >
                            {rating === 5 ? '5 stars' : `${rating} stars & up`}
                        </span>

                        {/* Selected Indicator */}
                        {value === rating && (
                            <div className="ml-auto">
                                <div className="w-2 h-2 rounded-full bg-primary-600" />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Clear Button */}
            {value !== null && (
                <button
                    onClick={() => onChange(null)}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors mt-2"
                >
                    Clear rating filter
                </button>
            )}
        </div>
    );
};

export default RatingFilter;