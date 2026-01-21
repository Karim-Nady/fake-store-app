import { useState, useEffect } from 'react';
import { X, Filter, Check } from 'lucide-react';
import { capitalizeFirst } from '../../utils/formatters';
import { cn } from '../../utils/cn';
import Select from '../form/Select';
import Button from '../common/Button';
import PriceRangeSlider from '../common/PriceRangeSlider';
import RatingFilter from '../common/RatingFilter';

/**
 * Enhanced ProductFilters Component
 * Comprehensive filtering with category pills, price range, rating, and sorting
 * Includes mobile-optimized slide-out panel
 */
const ProductFilters = ({
    categories,
    selectedCategory,
    onCategoryChange,
    sortBy,
    onSortChange,
    minPrice = 0,
    maxPrice = 1000,
    priceMin,
    priceMax,
    onPriceChange,
    selectedRating,
    onRatingChange,
    activeFilterCount = 0,
    children
}) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Lock body scroll when mobile panel is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileOpen]);

    const sortOptions = [
        { value: 'default', label: 'Recommended' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' },
        { value: 'rating-desc', label: 'Highest Rated' },
    ];

    // Calculate active filters for display
    const getActiveFilters = () => {
        const filters = [];

        if (selectedCategory !== 'all') {
            filters.push({
                id: 'category',
                label: capitalizeFirst(selectedCategory),
                onRemove: () => onCategoryChange('all'),
            });
        }

        if (priceMin !== minPrice || priceMax !== maxPrice) {
            filters.push({
                id: 'price',
                label: `$${priceMin} - $${priceMax}`,
                onRemove: () => onPriceChange(minPrice, maxPrice),
            });
        }

        if (selectedRating !== null) {
            filters.push({
                id: 'rating',
                label: `${selectedRating}+ stars`,
                onRemove: () => onRatingChange(null),
            });
        }

        return filters;
    };

    const activeFilters = getActiveFilters();

    const handleClearAll = () => {
        onCategoryChange('all');
        onPriceChange(minPrice, maxPrice);
        onRatingChange(null);
        onSortChange('default');
    };

    const hasActiveFilters = activeFilters.length > 0 || sortBy !== 'default';

    // Shared Filter Content
    const FilterContent = ({ isMobile = false }) => (
        <div className={cn('space-y-8', isMobile && 'p-6')}>
            {/* Sort Options - Now in Sidebar */}
            <div>
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                    Sort By
                </h3>
                <Select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    options={sortOptions}
                    size="sm"
                    fullWidth
                    placeholder="Sort by"
                    className="border-neutral-200 focus:border-primary-500 focus:ring-primary-500"
                />
            </div>

            <div className="h-px bg-neutral-100" />

            {/* Category Filter - List/Pills Style */}
            <div>
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                    Categories
                </h3>
                <div className="space-y-2">
                    <button
                        onClick={() => onCategoryChange('all')}
                        className={cn(
                            'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group',
                            selectedCategory === 'all'
                                ? 'bg-primary-50 text-primary-700 font-medium'
                                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                        )}
                    >
                        <span>All Categories</span>
                        {selectedCategory === 'all' && <Check className="h-4 w-4" />}
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={cn(
                                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group',
                                selectedCategory === cat
                                    ? 'bg-primary-50 text-primary-700 font-medium'
                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                            )}
                        >
                            <span>{capitalizeFirst(cat)}</span>
                            {selectedCategory === cat && <Check className="h-4 w-4" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-neutral-100" />

            {/* Price Range Filter */}
            <div>
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                    Price Range
                </h3>
                <div className="px-2">
                    <PriceRangeSlider
                        min={minPrice}
                        max={maxPrice}
                        minValue={priceMin}
                        maxValue={priceMax}
                        onChange={onPriceChange}
                        step={10}
                    />
                </div>
            </div>

            <div className="h-px bg-neutral-100" />

            {/* Rating Filter */}
            <div>
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                    Rating
                </h3>
                <RatingFilter value={selectedRating} onChange={onRatingChange} />
            </div>

            {/* Mobile: Apply Button */}
            {isMobile && (
                <div className="pt-8 mt-auto">
                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={() => setIsMobileOpen(false)}
                        className="shadow-lg shadow-primary-600/20"
                    >
                        Show Results
                        {activeFilters.length > 0 && ` (${activeFilters.length})`}
                    </Button>
                </div>
            )}
        </div>
    );

    return (
        <>
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6 flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => setIsMobileOpen(true)}
                    className="flex-1 mr-4"
                >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters & Sort
                    {hasActiveFilters && (
                        <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-primary-100 text-primary-700 rounded-full">
                            {activeFilters.length + (sortBy !== 'default' ? 1 : 0)}
                        </span>
                    )}
                </Button>

                {/* Active Filter Chips (Mobile) */}
                {activeFilters.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        className="text-xs text-red-600 hover:text-red-700 font-medium px-2"
                    >
                        Reset
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Desktop Sidebar Filters */}
                <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                            <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                Filters
                            </h2>
                            {hasActiveFilters && (
                                <button
                                    onClick={handleClearAll}
                                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Reset All
                                </button>
                            )}
                        </div>
                        <div className="p-5">
                            <FilterContent />
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 w-full min-w-0">
                    {children}
                </div>
            </div>

            {/* Mobile Slide-out Filter Panel */}
            {isMobileOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white z-50 shadow-2xl animate-slide-in-right flex flex-col">
                        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white">
                            <h2 className="text-lg font-bold text-neutral-900">Filters</h2>
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <FilterContent isMobile />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductFilters;