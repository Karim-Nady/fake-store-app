import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { toast } from '../store/useToastStore';
import Button from '../components/common/Button';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/common/EmptyState';

const CartPage = () => {
    const navigate = useNavigate();
    const { items, itemCount, total, updateQuantity, removeFromCart, clearCart } = useCart();

    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
        toast.success('Item removed from cart');
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            toast.info('Cart cleared');
        }
    };

    const handleCheckout = () => {
        toast.info('Checkout feature coming soon!', { duration: 3000 });
    };

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
                            onClick={handleClearCart}
                            className="text-danger-600 hover:bg-danger-50"
                        >
                            <Trash2 className="h-5 w-5" />
                            <span className="hidden sm:inline">Clear Cart</span>
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
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </div>

                    {/* Order Summary - Now using CartSummary component */}
                    <div className="lg:col-span-1">
                        <CartSummary
                            subtotal={total}
                            itemCount={itemCount}
                            onCheckout={handleCheckout}
                            tax={0.1}
                            shipping={0}
                            discount={0}
                            sticky={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;