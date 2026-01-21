import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart, Star, TrendingUp } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency, truncateText } from '../../utils/formatters';
import { cn } from '../../utils/cn';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useNavigate } from 'react-router-dom';


/**
 * Enhanced ProductCard Component
 * Wishlist, quick view, better animations, sale badges
 * 
 * @param {Object} props
 * @param {Object} props.product - Product object
 * @param {Function} [props.onWishlist] - Add to wishlist callback
 * @param {Function} [props.onQuickView] - Quick view callback
 * @param {boolean} [props.showWishlist=true] - Show wishlist button
 * @param {boolean} [props.isNew=false] - Show "New" badge
 * @param {number} [props.discount] - Discount percentage for sale badge
 */
const ProductCard = ({
    product,
    onWishlist,
    showWishlist = false,
    isNew = false,
    discount,
}) => {
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);
    const [isAdding, setIsAdding] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAdding(true);
        addItem(product);

        setTimeout(() => {
            setIsAdding(false);
        }, 600);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsWishlisted(!isWishlisted);
        if (onWishlist) {
            onWishlist(product);
        }
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/products/${product.id}`);
    };

    return (
        <Link to={`/products/${product.id}`}>
            <div className="card group cursor-pointer h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-square bg-neutral-50 rounded-lg overflow-hidden mb-4">
                    {/* Product Image */}
                    {!imageError ? (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-400">
                            <span className="text-sm">Image unavailable</span>
                        </div>
                    )}

                    {/* Badges - Top Left */}
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                        {isNew && (
                            <Badge variant="success" size="sm">
                                New
                            </Badge>
                        )}
                        {discount && (
                            <Badge variant="danger" size="sm">
                                {discount}% OFF
                            </Badge>
                        )}
                        <Badge variant="primary" className="capitalize text-xs">
                            {product.category}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3rem]">
                        {truncateText(product.title, 60)}
                    </h3>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            'h-3.5 w-3.5 transition-colors',
                                            i < Math.floor(product.rating.rate)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-neutral-300'
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-neutral-700 font-medium">
                                {product.rating.rate}
                            </span>
                            <span className="text-xs text-neutral-400">
                                ({product.rating.count})
                            </span>
                        </div>
                    )}

                    {/* Price Section */}
                    <div className="mt-auto">
                        <div className="flex items-baseline gap-2 mb-3">
                            <p className="text-2xl font-bold text-primary-600">
                                {formatCurrency(product.price)}
                            </p>
                            {discount && (
                                <p className="text-sm text-neutral-500 line-through">
                                    {formatCurrency(product.price * (1 + discount / 100))}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons - Desktop Only (Mobile uses Quick Add on hover) */}
                        <div className="hidden sm:flex gap-2">
                            <Button
                                variant="primary"
                                size="sm"
                                className="flex-1"
                                onClick={handleAddToCart}
                                disabled={isAdding}
                            >
                                <ShoppingCart className="h-4 w-4" />
                                {isAdding ? 'Added!' : 'Add to Cart'}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleQuickView}
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Mobile: Single Add Button */}
                        <div className="sm:hidden">
                            <Button
                                variant="primary"
                                size="sm"
                                className="w-full"
                                onClick={handleAddToCart}
                                disabled={isAdding}
                            >
                                <ShoppingCart className="h-4 w-4" />
                                {isAdding ? 'Added!' : 'Add to Cart'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;