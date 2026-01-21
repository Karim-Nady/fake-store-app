import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Package } from 'lucide-react';
import { productService } from '../services/productService';
import { useProductStore } from '../store/useProductStore';
import { toast } from '../store/useToastStore';
import Button from '../components/common/Button';
import Input from '../components/form/Input';
import TextArea from '../components/form/TextArea';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CreateProductPage = () => {
    const navigate = useNavigate();
    const { addProduct } = useProductStore();

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            title: '',
            description: '',
            price: '',
            category: '',
            image: '',
        },
    });

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
            const data = await productService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            toast.error('Failed to load categories. Using defaults.');
            // Fallback categories if API fails
            setCategories(['electronics', 'jewelery', "men's clothing", "women's clothing"]);
        } finally {
            setLoadingCategories(false);
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            // Convert price to number
            const productData = {
                ...data,
                price: parseFloat(data.price),
            };

            // Submit to API
            const response = await productService.createProduct(productData);

            // Add to local store
            addProduct({ ...productData, id: response.id });

            // Show success toast
            toast.success('Product created successfully!', {
                title: 'Success',
                duration: 3000,
            });

            // Reset form
            reset();

            // Redirect after brief delay
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            toast.error(error.message || 'Failed to create product. Please try again.', {
                title: 'Error',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Watch image URL for preview
    const imageUrl = watch('image');

    return (
        <div className="animate-fade-in">
            <div className="max-w-3xl mx-auto">
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

                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-primary-100 rounded-xl">
                            <Package className="h-6 w-6 text-primary-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-neutral-900">
                            Create New Product
                        </h1>
                    </div>
                    <p className="text-neutral-600">
                        Fill in the details below to add a new product to the store.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <Card className="p-6 lg:p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Title */}
                                <div>
                                    <Input
                                        label="Product Title"
                                        id="title"
                                        placeholder="Enter product title"
                                        error={errors.title?.message}
                                        required
                                        disabled={isSubmitting}
                                        {...register('title', {
                                            required: 'Product title is required',
                                            minLength: {
                                                value: 3,
                                                message: 'Title must be at least 3 characters',
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: 'Title must not exceed 100 characters',
                                            },
                                        })}
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <TextArea
                                        label="Description"
                                        id="description"
                                        placeholder="Enter detailed product description"
                                        rows={5}
                                        error={errors.description?.message}
                                        required
                                        disabled={isSubmitting}
                                        {...register('description', {
                                            required: 'Product description is required',
                                            minLength: {
                                                value: 10,
                                                message: 'Description must be at least 10 characters',
                                            },
                                            maxLength: {
                                                value: 1000,
                                                message: 'Description must not exceed 1000 characters',
                                            },
                                        })}
                                    />
                                </div>

                                {/* Price and Category Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Price */}
                                    <div>
                                        <Input
                                            label="Price"
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            error={errors.price?.message}
                                            required
                                            disabled={isSubmitting}
                                            {...register('price', {
                                                required: 'Price is required',
                                                min: {
                                                    value: 0.01,
                                                    message: 'Price must be greater than 0',
                                                },
                                                max: {
                                                    value: 999999,
                                                    message: 'Price must be less than 1,000,000',
                                                },
                                                validate: (value) => {
                                                    const num = parseFloat(value);
                                                    if (isNaN(num)) return 'Please enter a valid number';
                                                    if (num <= 0) return 'Price must be a positive number';
                                                    return true;
                                                },
                                            })}
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="label" htmlFor="category">
                                            Category
                                            <span className="text-danger-500 ml-1">*</span>
                                        </label>
                                        {loadingCategories ? (
                                            <div className="flex items-center justify-center h-[42px] border border-neutral-300 rounded-lg">
                                                <LoadingSpinner size="sm" />
                                            </div>
                                        ) : (
                                            <>
                                                <select
                                                    id="category"
                                                    className={`input ${errors.category ? 'input-error' : ''}`}
                                                    disabled={isSubmitting}
                                                    {...register('category', {
                                                        required: 'Category is required',
                                                    })}
                                                >
                                                    <option value="">Select a category</option>
                                                    {categories.map((cat) => (
                                                        <option key={cat} value={cat}>
                                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.category && (
                                                    <p className="mt-1 text-sm text-danger-600">
                                                        {errors.category.message}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div>
                                    <Input
                                        label="Image URL"
                                        id="image"
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        helperText="Enter a valid image URL"
                                        error={errors.image?.message}
                                        required
                                        disabled={isSubmitting}
                                        {...register('image', {
                                            required: 'Image URL is required',
                                            pattern: {
                                                value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/i,
                                                message: 'Please enter a valid image URL (jpg, png, gif, svg)',
                                            },
                                        })}
                                    />
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-neutral-200">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="flex-1"
                                        loading={isSubmitting}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Creating Product...' : 'Create Product'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        onClick={() => navigate('/')}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>

                    {/* Preview Section */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                                Preview
                            </h3>
                            <Card className="p-4">
                                <div className="aspect-square bg-neutral-50 rounded-lg overflow-hidden mb-4">
                                    {imageUrl && !errors.image ? (
                                        <img
                                            src={imageUrl}
                                            alt="Product preview"
                                            className="w-full h-full object-contain p-4"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-center">
                                                <Package className="h-12 w-12 text-neutral-300 mx-auto mb-2" />
                                                <p className="text-sm text-neutral-500">
                                                    Image preview
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-semibold text-neutral-900 line-clamp-2 min-h-[3rem]">
                                        {watch('title') || 'Product title will appear here'}
                                    </h4>
                                    <p className="text-sm text-neutral-600 line-clamp-3 min-h-[3.75rem]">
                                        {watch('description') || 'Product description will appear here'}
                                    </p>
                                    <div className="pt-2 border-t border-neutral-200">
                                        <p className="text-2xl font-bold text-primary-600">
                                            ${watch('price') || '0.00'}
                                        </p>
                                        {watch('category') && (
                                            <p className="text-sm text-neutral-600 capitalize mt-1">
                                                {watch('category')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Tips Card */}
                            <Card className="p-4 mt-4 bg-primary-50 border border-primary-200">
                                <h4 className="font-semibold text-primary-900 mb-2">
                                    💡 Tips
                                </h4>
                                <ul className="text-sm text-primary-800 space-y-1">
                                    <li>• Use clear, descriptive titles</li>
                                    <li>• Include detailed descriptions</li>
                                    <li>• Use high-quality image URLs</li>
                                    <li>• Set competitive prices</li>
                                </ul>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProductPage;