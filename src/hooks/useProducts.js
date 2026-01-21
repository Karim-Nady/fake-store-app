import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useProductStore } from '../store/useProductStore';

export const useProducts = () => {
    const { products, setProducts, setLoading, setError } = useProductStore();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            fetchProducts();
            setInitialized(true);
        }
    }, [initialized]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { products, refetch: fetchProducts };
};
