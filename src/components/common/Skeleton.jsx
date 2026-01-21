import { cn } from '../../utils/cn';

// Product Card Skeleton (already exists but enhanced)
export const ProductCardSkeleton = () => {
    return (
        <div className="card p-4 animate-pulse">
            <div className="aspect-square bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg mb-4" />
            <div className="space-y-3">
                <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-3/4" />
                <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-1/2" />
                <div className="h-3 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-2/3" />
                <div className="h-10 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-full" />
            </div>
        </div>
    );
};

/**
 * ProductDetailsSkeleton Component
 * Loading state for product details page
 */
export const ProductDetailsSkeleton = () => {
    return (
        <div className="animate-fade-in">
            <div className="max-w-6xl mx-auto">
                <div className="skeleton h-10 w-32 mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image skeleton */}
                    <div className="card p-8">
                        <div className="aspect-square bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg" />
                    </div>

                    {/* Content skeleton */}
                    <div className="space-y-6">
                        <div className="skeleton h-6 w-24 rounded-full" />
                        <div className="skeleton h-10 w-full" />
                        <div className="skeleton h-6 w-48" />
                        <div className="skeleton h-20 w-full" />
                        <div className="skeleton h-32 w-full" />
                        <div className="flex gap-4">
                            <div className="skeleton h-12 flex-1" />
                            <div className="skeleton h-12 flex-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * CartItemSkeleton Component
 * Loading state for cart items
 */
export const CartItemSkeleton = () => {
    return (
        <div className="card p-4 animate-pulse">
            <div className="flex gap-4">
                <div className="w-24 h-24 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-3/4" />
                    <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-1/2" />
                    <div className="flex justify-between items-center">
                        <div className="h-10 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-32" />
                        <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-24" />
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * FormSkeleton Component
 * Loading state for forms
 */
export const FormSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div key={i}>
                    <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-24 mb-2" />
                    <div className="h-11 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-full" />
                </div>
            ))}
            <div className="h-12 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded w-full" />
        </div>
    );
};

/**
 * TextSkeleton Component
 * Loading state for text blocks
 * 
 * @param {Object} props
 * @param {number} [props.lines=3] - Number of lines to show
 * @param {string} [props.className] - Additional classes
 */
export const TextSkeleton = ({ lines = 3, className }) => {
    return (
        <div className={cn('space-y-2 animate-pulse', className)}>
            {[...Array(lines)].map((_, i) => (
                <div
                    key={i}
                    className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded"
                    style={{ width: i === lines - 1 ? '70%' : '100%' }}
                />
            ))}
        </div>
    );
};

/**
 * GridSkeleton Component
 * Renders a grid of skeletons (defaulting to product cards)
 * 
 * @param {Object} props
 * @param {number} [props.count=8] - Number of items
 * @param {React.Component} [props.children] - Skeleton component to repeat
 */
export const GridSkeleton = ({ count = 8, children: SkeletonComponent = ProductCardSkeleton }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(count)].map((_, i) => (
                <SkeletonComponent key={i} />
            ))}
        </div>
    );
};