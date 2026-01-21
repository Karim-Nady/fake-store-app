import { useState } from 'react';
import { Trash2, Plus, Minus, Heart } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { cn } from '../../utils/cn';
import Card from '../common/Card';

/**
 * Enhanced CartItem Component
 * Smooth animations, wishlist support, better mobile UX
 * 
 * @param {Object} props
 * @param {Object} props.item - Cart item object
 * @param {Function} props.onUpdateQuantity - Quantity update callback
 * @param {Function} props.onRemove - Remove item callback
 * @param {Function} [props.onWishlist] - Add to wishlist callback
 * @param {boolean} [props.showWishlist=false] - Show wishlist button
 */
const CartItem = ({
    item,
    onUpdateQuantity,
    onRemove,
    onWishlist,
    showWishlist = false,
}) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleQuantityChange = async (newQuantity) => {
        if (newQuantity < 1) {
            handleRemove();
        } else {
            setIsUpdating(true);
            await onUpdateQuantity(item.id, newQuantity);
            // Visual feedback delay
            setTimeout(() => setIsUpdating(false), 300);
        }
    };

    const handleRemove = () => {
        setIsRemoving(true);
        // Animate out before removing
        setTimeout(() => {
            onRemove(item.id);
        }, 300);
    };

    const handleWishlist = () => {
        if (onWishlist) {
            onWishlist(item);
        }
    };

    return (
        <Card
            className={cn(
                'p-4 transition-all duration-300',
                'hover:shadow-lg',
                isRemoving && 'opacity-0 scale-95',
                isUpdating && 'ring-2 ring-primary-300'
            )}
        >
            <div className="flex gap-4">
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-neutral-50 rounded-lg overflow-hidden relative group">
                    {!imageError ? (
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-2 transition-transform group-hover:scale-110"
                            loading="lazy"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-400">
                            <span className="text-xs">No image</span>
                        </div>
                    )}

                    {/* Stock Badge */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs bg-success-100 text-success-800 px-2 py-0.5 rounded-full font-medium border border-success-200">
                            In Stock
                        </span>
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-neutral-900 line-clamp-2 mb-1 hover:text-primary-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-neutral-600 capitalize">
                                {item.category}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 flex-shrink-0">
                            {/* Wishlist Button */}
                            {showWishlist && onWishlist && (
                                <button
                                    onClick={handleWishlist}
                                    className="text-neutral-400 hover:text-danger-500 transition-colors p-1 rounded hover:bg-danger-50"
                                    aria-label="Add to wishlist"
                                >
                                    <Heart className="h-5 w-5" />
                                </button>
                            )}

                            {/* Remove Button */}
                            <button
                                onClick={handleRemove}
                                className="text-neutral-400 hover:text-danger-600 transition-colors p-1 rounded hover:bg-danger-50"
                                aria-label="Remove item"
                                disabled={isRemoving}
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Price per unit - Mobile */}
                    <div className="sm:hidden mb-3">
                        <p className="text-sm text-neutral-600">
                            {formatCurrency(item.price)} each
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-neutral-600 hidden sm:inline">Qty:</span>
                            <div className={cn(
                                'flex items-center border rounded-lg transition-all',
                                isUpdating
                                    ? 'border-primary-400 shadow-sm'
                                    : 'border-neutral-300'
                            )}>
                                <button
                                    onClick={() => handleQuantityChange(item.quantity - 1)}
                                    className={cn(
                                        'px-3 py-2 hover:bg-neutral-100 transition-all',
                                        'disabled:opacity-50 disabled:cursor-not-allowed',
                                        'active:scale-95'
                                    )}
                                    aria-label="Decrease quantity"
                                    disabled={isUpdating || item.quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>

                                <span className={cn(
                                    'px-4 py-2 font-semibold min-w-[50px] text-center',
                                    'transition-all',
                                    isUpdating && 'text-primary-600'
                                )}>
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() => handleQuantityChange(item.quantity + 1)}
                                    className={cn(
                                        'px-3 py-2 hover:bg-neutral-100 transition-all',
                                        'disabled:opacity-50 disabled:cursor-not-allowed',
                                        'active:scale-95'
                                    )}
                                    aria-label="Increase quantity"
                                    disabled={isUpdating || item.quantity >= 99}
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            <p className="text-xl sm:text-2xl font-bold text-primary-600">
                                {formatCurrency(item.price * item.quantity)}
                            </p>
                            <p className="text-sm text-neutral-600 hidden sm:block">
                                {formatCurrency(item.price)} each
                            </p>
                        </div>
                    </div>

                    {/* Savings Badge - if applicable */}
                    {item.originalPrice && item.originalPrice > item.price && (
                        <div className="mt-2 inline-block">
                            <span className="text-xs bg-success-100 text-success-800 px-2 py-1 rounded-md font-medium">
                                Save {formatCurrency(item.originalPrice - item.price)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile: Swipe hint */}
            <div className="sm:hidden mt-3 pt-3 border-t border-neutral-200">
                <p className="text-xs text-neutral-500 text-center">
                    Tap trash icon to remove • Adjust quantity with +/- buttons
                </p>
            </div>
        </Card>
    );
};

export default CartItem;