import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency } from '../../utils/formatters';
import { cn } from '../../utils/cn';
/**
 * ProductCardList - Horizontal layout for list view
 * Internal component used by ProductGrid
 */
const ProductCardList = ({ product, onWishlist }) => {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdding, setIsAdding] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsWishlisted(!isWishlisted);
        if (onWishlist) {
            onWishlist(product);
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAdding(true);
        addItem(product);
        setTimeout(() => setIsAdding(false), 600);
    };

    return (
        <Link to={`/products/${product.id}`}>
            <div className="card group p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-neutral-100">
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image Container */}
                    <div className="relative w-full sm:w-48 h-48 flex-shrink-0 bg-neutral-50 rounded-lg overflow-hidden group-hover:bg-white transition-colors">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                        />
                        {/* Wishlist Button (Mobile/Desktop overlay) */}
                        <button
                            onClick={handleWishlist}
                            className={cn(
                                "absolute top-2 right-2 p-2 rounded-full shadow-sm transition-all duration-300",
                                "bg-white/80 backdrop-blur-sm sm:opacity-0 sm:group-hover:opacity-100",
                                isWishlisted ? "text-red-500 bg-red-50" : "text-neutral-400 hover:text-red-500 hover:bg-neutral-100"
                            )}
                        >
                            <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                        </button>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                                <Badge variant="neutral" size="xs" className="mb-2 capitalize">
                                    {product.category}
                                </Badge>
                                <h3 className="font-semibold text-lg text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                                    {product.title}
                                </h3>
                            </div>
                            <div className="text-left sm:text-right">
                                <p className="text-2xl font-bold text-primary-600">
                                    {formatCurrency(product.price)}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-neutral-600 line-clamp-2 mb-6 flex-1">
                            {product.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                            {/* Rating */}
                            {product.rating && (
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    'h-4 w-4',
                                                    i < Math.floor(product.rating.rate)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-neutral-300'
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-neutral-700">
                                        {product.rating.rate}
                                    </span>
                                    <span className="text-sm text-neutral-500">
                                        ({product.rating.count} reviews)
                                    </span>
                                </div>
                            )}

                            {/* Actions */}
                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className="w-full sm:w-auto min-w-[140px]"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                {isAdding ? 'Added' : 'Add to Cart'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default ProductCardList;

