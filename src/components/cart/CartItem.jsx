import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import Card from '../common/Card';


const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            onRemove(item.id);
        } else {
            onUpdateQuantity(item.id, newQuantity);
        }
    };

    return (
        <Card className="p-4 hover:shadow-card-hover transition-shadow">
            <div className="flex gap-4">
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-neutral-50 rounded-lg overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-2"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-neutral-900 line-clamp-2">
                            {item.title}
                        </h3>
                        <button
                            onClick={() => onRemove(item.id)}
                            className="text-neutral-400 hover:text-danger-600 transition-colors flex-shrink-0"
                            aria-label="Remove item"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>

                    <p className="text-sm text-neutral-600 capitalize mb-3">
                        {item.category}
                    </p>

                    <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-neutral-300 rounded-lg">
                            <button
                                onClick={() => handleQuantityChange(item.quantity - 1)}
                                className="px-3 py-1.5 hover:bg-neutral-100 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1.5 font-semibold min-w-[50px] text-center">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => handleQuantityChange(item.quantity + 1)}
                                className="px-3 py-1.5 hover:bg-neutral-100 transition-colors"
                                aria-label="Increase quantity"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            <p className="text-xl font-bold text-primary-600">
                                {formatCurrency(item.price * item.quantity)}
                            </p>
                            <p className="text-sm text-neutral-600">
                                {formatCurrency(item.price)} each
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CartItem;