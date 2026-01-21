
/**
 * ProductSkeleton Component
 * Loading placeholder for product cards
 */
const ProductSkeleton = () => {
    return (
        <div className="card p-4 animate-pulse">
            <div className="aspect-square bg-neutral-200 rounded-lg mb-4" />
            <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-neutral-200 rounded w-1/2 mb-4" />
            <div className="h-8 bg-neutral-200 rounded w-full" />
        </div>
    );
};

export default ProductSkeleton;
