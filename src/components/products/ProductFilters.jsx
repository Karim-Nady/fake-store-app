import { SlidersHorizontal } from 'lucide-react';
import Select from '../common/Select';
import { capitalizeFirst } from '../../utils/formatters';

const ProductFilters = ({
    categories,
    selectedCategory,
    onCategoryChange,
    sortBy,
    onSortChange,
}) => {
    const categoryOptions = [
        { value: 'all', label: 'All Categories' },
        ...categories.map((cat) => ({
            value: cat,
            label: capitalizeFirst(cat),
        })),
    ];

    const sortOptions = [
        { value: 'default', label: 'Default' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' },
    ];

    return (
        <div className="card p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Filter Icon & Label */}
                <div className="flex items-center gap-2 text-neutral-700 font-medium">
                    <SlidersHorizontal className="h-5 w-5" />
                    <span className="hidden sm:inline">Filters</span>
                </div>

                {/* Category Filter */}
                <div className="flex-1 w-full sm:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="input w-full"
                    >
                        {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Filter */}
                <div className="flex-1 w-full sm:w-auto">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="input w-full"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;