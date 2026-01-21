import { api } from './api';

export const productService = {
    /**
     * Get all products with optional filters
     * @param {Object} params - Query parameters
     * @param {number} params.limit - Limit number of results
     * @param {string} params.sort - Sort order ('asc' or 'desc')
     * @returns {Promise<Array>} List of products
     */
    async getProducts(params = {}) {
        return api.get('/products', { params });
    },

    /**
     * Get a single product by ID
     * @param {number|string} id - Product ID
     * @returns {Promise<Object>} Product object
     */
    async getProduct(id) {
        return api.get(`/products/${id}`);
    },

    /**
     * Get all product categories
     * @returns {Promise<Array>} List of category names
     */
    async getCategories() {
        return api.get('/products/categories');
    },

    /**
     * Get products by category
     * @param {string} category - Category name (e.g., 'electronics', 'jewelery', "men's clothing", "women's clothing")
     * @param {Object} params - Query parameters
     * @param {string} params.sort - Sort order ('asc' or 'desc')
     * @returns {Promise<Array>} List of products in category
     */
    async getProductsByCategory(category, params = {}) {
        return api.get(`/products/category/${category}`, { params });
    },

    /**
     * Create a new product (returns fake ID - not persisted)
     * @param {Object} productData - Product data
     * @param {string} productData.title - Product title
     * @param {number} productData.price - Product price
     * @param {string} productData.description - Product description
     * @param {string} productData.image - Product image URL
     * @param {string} productData.category - Product category
     * @returns {Promise<Object>} Created product with fake ID
     */
    async createProduct(productData) {
        return api.post('/products', productData);
    },

    /**
     * Update a product (not persisted in API)
     * @param {number|string} id - Product ID
     * @param {Object} productData - Updated product data
     * @returns {Promise<Object>} Updated product
     */
    async updateProduct(id, productData) {
        return api.put(`/products/${id}`, productData);
    },

    /**
     * Partially update a product (not persisted in API)
     * @param {number|string} id - Product ID
     * @param {Object} productData - Partial product data to update
     * @returns {Promise<Object>} Updated product
     */
    async patchProduct(id, productData) {
        return api.patch(`/products/${id}`, productData);
    },

    /**
     * Delete a product (not persisted in API)
     * @param {number|string} id - Product ID
     * @returns {Promise<Object>} Deleted product
     */
    async deleteProduct(id) {
        return api.delete(`/products/${id}`);
    }
};