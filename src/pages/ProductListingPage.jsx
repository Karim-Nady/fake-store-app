import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import { productService } from '../services/productService';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import ProductSkeleton from '../components/products/ProductSkeleton';
import { Package } from 'lucide-react';

const PRODUCTS_PER_PAGE = 10;

const ProductListingPage = () => {
    const { products, setProducts, loading, error, setLoading, setError } = useProductStore();

    // Filter States
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
    const [sortBy, setSortBy] = useState('default');
    const [selectedRating, setSelectedRating] = useState(null);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(1000);
    const [currentPage, setCurrentPage] = useState(1);

    // Scroll to products section
    const productsRef = useRef(null);

    // Sync state with URL params
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam && categoryParam !== selectedCategory) {
            setSelectedCategory(categoryParam);
            // Scroll to products when engaging from external link (footer)
            setTimeout(() => {
                productsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else if (!categoryParam && selectedCategory !== 'all') {
            setSelectedCategory('all');
            setTimeout(() => {
                productsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [searchParams]);

    // Update URL when category changes
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category });
        }
        // Also scroll on manual filter change
        productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Calculate min/max prices from products
    const { minPrice, maxPrice } = useMemo(() => {
        if (products.length === 0) return { minPrice: 0, maxPrice: 1000 };

        const prices = products.map(p => p.price);
        return {
            minPrice: Math.floor(Math.min(...prices)),
            maxPrice: Math.ceil(Math.max(...prices)),
        };
    }, [products]);

    // Initialize price range when products load
    useEffect(() => {
        if (products.length > 0 && priceMin === 0 && priceMax === 1000) {
            setPriceMin(minPrice);
            setPriceMax(maxPrice);
        }
    }, [products, minPrice, maxPrice]);

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

    // Get unique categories
    const categories = useMemo(() => {
        return [...new Set(products.map(p => p.category))];
    }, [products]);

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by price range
        result = result.filter(p => p.price >= priceMin && p.price <= priceMax);

        // Filter by rating
        if (selectedRating !== null) {
            result = result.filter(p =>
                p.rating && p.rating.rate >= selectedRating
            );
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
            case 'rating-desc':
                result.sort((a, b) => {
                    const ratingA = a.rating?.rate || 0;
                    const ratingB = b.rating?.rate || 0;
                    return ratingB - ratingA;
                });
                break;
            default:
                // Keep original order
                break;
        }

        return result;
    }, [products, selectedCategory, sortBy, selectedRating, priceMin, priceMax]);

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
    }, [selectedCategory, sortBy, selectedRating, priceMin, priceMax]);

    // Scroll to top on page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle price range change
    const handlePriceChange = (min, max) => {
        setPriceMin(min);
        setPriceMax(max);
    };

    // Calculate active filter count
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (selectedCategory !== 'all') count++;
        if (priceMin !== minPrice || priceMax !== maxPrice) count++;
        if (selectedRating !== null) count++;
        return count;
    }, [selectedCategory, priceMin, priceMax, selectedRating, minPrice, maxPrice]);

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

    // Error state with retry
    if (error) {
        return (
            <div className="animate-fade-in">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900">Our Products</h1>
                </div>
                <EmptyState
                    icon={Package}
                    title="Failed to load products"
                    description={error}
                    action={
                        <button
                            onClick={fetchProducts}
                            className="btn btn-primary"
                        >
                            Try Again
                        </button>
                    }
                />
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
            <div className="mb-8" ref={productsRef}>
                <h1 className="text-3xl font-bold text-neutral-900">Our Products</h1>
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-neutral-600">
                        Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
                    </p>

                    {/* Active Filters Summary (Desktop) */}
                    {(activeFilterCount > 0 || sortBy !== 'default') && (
                        <div className="hidden lg:flex items-center gap-2">
                            <span className="text-sm text-neutral-500 mr-2">
                                {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
                            </span>
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setPriceMin(minPrice);
                                    setPriceMax(maxPrice);
                                    setSelectedRating(null);
                                    setSortBy('default');
                                    setCurrentPage(1);
                                }}
                                className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced Filters & Layout */}
            <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                sortBy={sortBy}
                onSortChange={setSortBy}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceMin={priceMin}
                priceMax={priceMax}
                onPriceChange={handlePriceChange}
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                activeFilterCount={activeFilterCount}
            >
                {/* Products Grid or Empty State */}
                {filteredAndSortedProducts.length === 0 ? (
                    <EmptyState
                        icon={Package}
                        title="No products found"
                        description="Try adjusting your filters to see more products."
                        action={
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setPriceMin(minPrice);
                                    setPriceMax(maxPrice);
                                    setSelectedRating(null);
                                    setSortBy('default');
                                }}
                                className="btn btn-primary"
                            >
                                Clear All Filters
                            </button>
                        }
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
            </ProductFilters>
        </div>
    );
};

export default ProductListingPage;