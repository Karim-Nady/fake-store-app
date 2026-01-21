
import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useProductStore } from '../store/useProductStore';

export const useCategories = () => {
    const { categories, setCategories } = useProductStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getCategories();
            setCategories(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { categories, loading, error };
};
