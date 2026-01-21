import { useState } from 'react';
import { cn } from '../../utils/cn';
import ProductCard from './ProductCard';
import ProductCardList from './ProductCardList';

/**
 * Enhanced ProductGrid Component
 * Supports grid/list view modes, stagger animations
 * 
 * @param {Object} props
 * @param {Array} props.products - Array of product objects
 * @param {Function} [props.onWishlist] - Wishlist callback passed to cards
 * @param {'grid'|'list'} [props.defaultView='grid'] - Default view mode
 * @param {string} [props.className] - Additional CSS classes
 */
const ProductGrid = ({
    products,
    onWishlist,
    defaultView = 'grid',
    className,
}) => {
    const [viewMode, setViewMode] = useState(defaultView);

    // Grid layout classes
    const gridClasses = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6';

    // List layout classes
    const listClasses = 'grid grid-cols-1 gap-4';

    return (
        <div className={cn('mb-8', className)}>
            {/* Products Grid/List */}
            <div className={viewMode === 'grid' ? gridClasses : listClasses}>
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className="animate-fade-in"
                        style={{
                            animationDelay: `${index * 50}ms`,
                            animationFillMode: 'both',
                        }}
                    >
                        {viewMode === 'grid' ? (
                            <ProductCard
                                product={product}
                                onWishlist={onWishlist}
                            />
                        ) : (
                            <ProductCardList
                                product={product}
                                onWishlist={onWishlist}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;