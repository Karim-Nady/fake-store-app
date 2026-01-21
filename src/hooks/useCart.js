import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { cartService } from '../services/cartService';
import { useState } from 'react';

export const useCart = () => {
    const {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
    } = useCartStore();

    const { user, isAuthenticated } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddToCart = (product) => {
        addItem(product);
    };

    const handleRemoveFromCart = (productId) => {
        removeItem(productId);
    };

    const handleUpdateQuantity = (productId, quantity) => {
        if (quantity < 0) return;
        if (quantity === 0) {
            handleRemoveFromCart(productId);
            return;
        }
        updateQuantity(productId, quantity);
    };

    const syncCartToAPI = async () => {
        if (!isAuthenticated || !user) {
            console.warn('User must be logged in to sync cart');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const products = items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            }));

            const response = await cartService.addToCart(user.id, products);

            return { success: true, data: response };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const loadCartFromAPI = async () => {
        if (!isAuthenticated || !user) return;

        setLoading(true);
        setError(null);

        try {
            const carts = await cartService.getUserCarts(user.id);

            if (carts.length > 0) {
                const latestCart = carts[0];
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const checkout = async () => {
        setLoading(true);
        setError(null);

        try {
            clearCart();

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        items,
        itemCount: getItemCount(),
        total: getTotal(),
        loading,
        error,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateQuantity: handleUpdateQuantity,
        clearCart,
        syncCartToAPI,
        loadCartFromAPI,
        checkout,
    };
};