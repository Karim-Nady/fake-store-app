import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency, truncateText } from '../../utils/formatters';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault(); // Prevent navigation when clicking button
        setIsAdding(true);
        addItem(product);

        // Visual feedback
        setTimeout(() => {
            setIsAdding(false);
        }, 500);
    };

    return (
        <Link to={`/products/${product.id}`}>
            <div className="card group cursor-pointer h-full flex flex-col overflow-hidden">
                {/* Image */}
                <div className="relative aspect-square bg-neutral-50 rounded-lg overflow-hidden mb-4">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                        <Badge variant="primary" className="capitalize text-xs">
                            {product.category}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {truncateText(product.title, 60)}
                    </h3>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center gap-1 mb-3">
                            <div className="flex items-center">
                                <span className="text-yellow-500 text-sm">★</span>
                                <span className="text-sm text-neutral-700 ml-1">
                                    {product.rating.rate}
                                </span>
                            </div>
                            <span className="text-xs text-neutral-400">
                                ({product.rating.count})
                            </span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="mt-auto">
                        <p className="text-2xl font-bold text-primary-600 mb-3">
                            {formatCurrency(product.price)}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2">
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
                            <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;