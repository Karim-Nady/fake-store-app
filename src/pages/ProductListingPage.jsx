import { useState, useEffect, useMemo } from 'react';
import { useProductStore } from '../store/useProductStore';
import { productService } from '../services/productService';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/Toast';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import ProductSkeleton from '../components/products/ProductSkeleton';
import { Package } from 'lucide-react';

const PRODUCTS_PER_PAGE = 10;

const ProductListingPage = () => {
    const { products, setProducts, loading, error, setLoading, setError } = useProductStore();

    // Filter & Sort States
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    // Get unique categories from products
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map(p => p.category))];
        return uniqueCategories;
    }, [products]);

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                // Keep original order
                break;
        }

        return result;
    }, [products, selectedCategory, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return filteredAndSortedProducts.slice(startIndex, endIndex);
    }, [filteredAndSortedProducts, currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, sortBy]);

    // Scroll to top on page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Loading state
    if (loading && products.length === 0) {
        return (
            <div className="animate-fade-in">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900">Our Products</h1>
                    <p className="mt-2 text-neutral-600">Loading amazing products for you...</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="animate-fade-in">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900">Our Products</h1>
                </div>
                <ErrorMessage message={error} onRetry={fetchProducts} />
            </div>
        );
    }

    // Empty state
    if (products.length === 0) {
        return (
            <div className="animate-fade-in">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900">Our Products</h1>
                </div>
                <EmptyState
                    icon={Package}
                    title="No products available"
                    description="We couldn't find any products at the moment. Please try again later."
                />
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-neutral-900">Our Products</h1>
                <p className="mt-2 text-neutral-600">
                    Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
                </p>
            </div>

            {/* Filters */}
            <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
            />

            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
                <EmptyState
                    icon={Package}
                    title="No products found"
                    description="Try adjusting your filters to see more products."
                />
            ) : (
                <>
                    <ProductGrid products={paginatedProducts} />

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductListingPage;

