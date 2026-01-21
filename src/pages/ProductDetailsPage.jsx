// ==========================================
// FILE: src/pages/ProductDetailsPage.jsx
// ==========================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Package, Tag } from 'lucide-react';
import { productService } from '../services/productService';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency, capitalizeFirst } from '../utils/formatters';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/Toast';
import Card from '../components/common/Card';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getProduct(id);
            setProduct(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch product details');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        setIsAdding(true);

        // Add product multiple times based on quantity
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }

        // Visual feedback
        setTimeout(() => {
            setIsAdding(false);
        }, 800);
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= 99) {
            setQuantity(newQuantity);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="animate-fade-in">
                <div className="max-w-6xl mx-auto">
                    {/* Back button skeleton */}
                    <div className="skeleton h-10 w-32 mb-8" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image skeleton */}
                        <div className="skeleton aspect-square rounded-xl" />

                        {/* Content skeleton */}
                        <div className="space-y-4">
                            <div className="skeleton h-8 w-3/4" />
                            <div className="skeleton h-6 w-1/2" />
                            <div className="skeleton h-32 w-full" />
                            <div className="skeleton h-12 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="animate-fade-in max-w-2xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="mb-8"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Products
                </Button>
                <ErrorMessage message={error} onRetry={fetchProduct} />
            </div>
        );
    }

    // No product found
    if (!product) {
        return (
            <div className="animate-fade-in max-w-2xl mx-auto text-center py-12">
                <Package className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    Product Not Found
                </h2>
                <p className="text-neutral-600 mb-6">
                    The product you're looking for doesn't exist.
                </p>
                <Button variant="primary" onClick={() => navigate('/')}>
                    <ArrowLeft className="h-5 w-5" />
                    Back to Products
                </Button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="mb-8 hover:bg-neutral-100"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Products
                </Button>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <Card className="p-8 lg:p-12">
                            <div className="aspect-square relative">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </Card>

                        {/* Additional Info Cards - Desktop */}
                        <div className="hidden lg:grid grid-cols-2 gap-4">
                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary-100 rounded-lg">
                                        <Tag className="h-5 w-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-600">Category</p>
                                        <p className="font-semibold text-neutral-900 capitalize">
                                            {product.category}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-success-100 rounded-lg">
                                        <Package className="h-5 w-5 text-success-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-600">Stock</p>
                                        <p className="font-semibold text-success-600">In Stock</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        {/* Category Badge - Mobile */}
                        <div className="lg:hidden">
                            <Badge variant="primary" className="capitalize">
                                {product.category}
                            </Badge>
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                                {product.title}
                            </h1>

                            {/* Rating */}
                            {product.rating && (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.floor(product.rating.rate)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-neutral-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-neutral-900">
                                            {product.rating.rate}
                                        </span>
                                        <span className="text-neutral-500">
                                            ({product.rating.count} reviews)
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Price */}
                        <div className="border-t border-b border-neutral-200 py-6">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-primary-600">
                                    {formatCurrency(product.price)}
                                </span>
                                <span className="text-neutral-500 line-through">
                                    {formatCurrency(product.price * 1.2)}
                                </span>
                                <Badge variant="success">20% OFF</Badge>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
                                Description
                            </h2>
                            <p className="text-neutral-700 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div>
                            <label className="label mb-3">Quantity</label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-neutral-300 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="px-4 py-2 hover:bg-neutral-100 transition-colors"
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-6 py-2 font-semibold min-w-[60px] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="px-4 py-2 hover:bg-neutral-100 transition-colors"
                                        disabled={quantity >= 99}
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-sm text-neutral-600">
                                    {quantity} {quantity === 1 ? 'item' : 'items'}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3 pt-4">
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full"
                                onClick={handleAddToCart}
                                loading={isAdding}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {isAdding ? 'Added to Cart!' : 'Add to Cart'}
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full"
                                onClick={() => navigate('/cart')}
                            >
                                View Cart
                            </Button>
                        </div>

                        {/* Additional Info - Mobile */}
                        <div className="lg:hidden grid grid-cols-2 gap-4 pt-6 border-t border-neutral-200">
                            <div className="text-center p-4 bg-neutral-50 rounded-lg">
                                <Package className="h-6 w-6 text-success-600 mx-auto mb-2" />
                                <p className="text-xs text-neutral-600">Stock Status</p>
                                <p className="font-semibold text-success-600">In Stock</p>
                            </div>
                            <div className="text-center p-4 bg-neutral-50 rounded-lg">
                                <Tag className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                                <p className="text-xs text-neutral-600">Category</p>
                                <p className="font-semibold text-neutral-900 capitalize">
                                    {product.category}
                                </p>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="pt-6 border-t border-neutral-200">
                            <h3 className="font-semibold text-neutral-900 mb-3">Features</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 mt-1">✓</span>
                                    <span className="text-neutral-700">Free shipping on orders over $50</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 mt-1">✓</span>
                                    <span className="text-neutral-700">30-day money-back guarantee</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 mt-1">✓</span>
                                    <span className="text-neutral-700">Secure checkout</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 mt-1">✓</span>
                                    <span className="text-neutral-700">24/7 customer support</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Products Section - Placeholder */}
                <div className="mt-16 pt-16 border-t border-neutral-200">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                        You May Also Like
                    </h2>
                    <div className="bg-neutral-50 rounded-xl p-12 text-center">
                        <p className="text-neutral-600">
                            Related products feature coming soon...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;