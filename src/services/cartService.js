import { api } from './api';

export const cartService = {
    /**
     * Get all carts with optional filters
     * @param {Object} params - Query parameters
     * @param {number} params.limit - Limit number of results
     * @param {string} params.sort - Sort order ('asc' or 'desc')
     * @param {string} params.startdate - Start date (YYYY-MM-DD)
     * @param {string} params.enddate - End date (YYYY-MM-DD)
     * @returns {Promise<Array>} List of carts
     */
    async getAllCarts(params = {}) {
        return api.get('/carts', { params });
    },

    /**
     * Get a single cart by ID
     * @param {number|string} cartId - Cart ID
     * @returns {Promise<Object>} Cart object
     */
    async getCart(cartId) {
        return api.get(`/carts/${cartId}`);
    },

    /**
     * Get carts for a specific user
     * @param {number|string} userId - User ID
     * @returns {Promise<Array>} List of user's carts
     */
    async getUserCarts(userId) {
        return api.get(`/carts/user/${userId}`);
    },

    /**
     * Create a new cart (returns fake ID - not persisted)
     * @param {number} userId - User ID
     * @param {Array} products - Array of product objects
     * @param {number} products[].productId - Product ID
     * @param {number} products[].quantity - Product quantity
     * @param {string} date - Cart date (optional, defaults to current date)
     * @returns {Promise<Object>} Created cart with fake ID
     */
    async addToCart(userId, products, date = new Date().toISOString()) {
        return api.post('/carts', {
            userId,
            date,
            products
        });
    },

    /**
     * Update a cart (not persisted in API)
     * @param {number|string} cartId - Cart ID
     * @param {number} userId - User ID
     * @param {Array} products - Array of product objects
     * @param {string} date - Cart date (optional)
     * @returns {Promise<Object>} Updated cart
     */
    async updateCart(cartId, userId, products, date = new Date().toISOString()) {
        return api.put(`/carts/${cartId}`, {
            userId,
            date,
            products
        });
    },

    /**
     * Partially update a cart (not persisted in API)
     * @param {number|string} cartId - Cart ID
     * @param {Object} cartData - Partial cart data
     * @returns {Promise<Object>} Updated cart
     */
    async patchCart(cartId, cartData) {
        return api.patch(`/carts/${cartId}`, cartData);
    },

    /**
     * Delete a cart (not persisted in API)
     * @param {number|string} cartId - Cart ID
     * @returns {Promise<Object>} Deleted cart
     */
    async deleteCart(cartId) {
        return api.delete(`/carts/${cartId}`);
    }
};