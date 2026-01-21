import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../utils/formatters';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';

const CartPage = () => {
    const navigate = useNavigate();
    const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore();

    const total = getTotal();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    // Empty cart state
    if (items.length === 0) {
        return (
            <div className="animate-fade-in">
                <div className="max-w-4xl mx-auto">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="mb-8 hover:bg-neutral-100"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Back to Products
                    </Button>

                    <EmptyState
                        icon={ShoppingCart}
                        title="Your cart is empty"
                        description="Looks like you haven't added any items to your cart yet. Start shopping to add products!"
                        action={
                            <Button variant="primary" onClick={() => navigate('/')}>
                                <ShoppingBag className="h-5 w-5" />
                                Start Shopping
                            </Button>
                        }
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="mb-4 hover:bg-neutral-100"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Back to Products
                    </Button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900">Shopping Cart</h1>
                            <p className="text-neutral-600 mt-2">
                                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={clearCart}
                            className="text-danger-600 hover:bg-danger-50"
                        >
                            <Trash2 className="h-5 w-5" />
                            Clear Cart
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-neutral-900 mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-neutral-700">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-700">
                                        <span>Shipping</span>
                                        <span className="text-success-600">Free</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-700">
                                        <span>Tax (estimated)</span>
                                        <span>{formatCurrency(total * 0.1)}</span>
                                    </div>
                                    <div className="border-t border-neutral-200 pt-3">
                                        <div className="flex justify-between text-lg font-bold text-neutral-900">
                                            <span>Total</span>
                                            <span className="text-primary-600">
                                                {formatCurrency(total * 1.1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full mb-3"
                                    onClick={() => alert('Checkout feature coming soon!')}
                                >
                                    Proceed to Checkout
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full"
                                    onClick={() => navigate('/')}
                                >
                                    Continue Shopping
                                </Button>

                                {/* Promotions */}
                                <div className="mt-6 pt-6 border-t border-neutral-200">
                                    <h3 className="font-semibold text-neutral-900 mb-3">
                                        Promotions
                                    </h3>
                                    <ul className="space-y-2 text-sm text-neutral-600">
                                        <li className="flex items-start gap-2">
                                            <span className="text-success-600">✓</span>
                                            <span>Free shipping on all orders</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-success-600">✓</span>
                                            <span>30-day money-back guarantee</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-success-600">✓</span>
                                            <span>Secure checkout</span>
                                        </li>
                                    </ul>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Cart Item Component
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

export default CartPage;