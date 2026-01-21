import { api } from './api';

export const cartService = {
    async getAllCarts() {
        return api.get('/carts');
    },

    async getCart(cartId) {
        return api.get(`/carts/${cartId}`);
    },

    async addToCart(userId, products) {
        return api.post('/carts', {
            userId,
            products
        });
    },

    async updateCart(cartId, userId, products) {
        return api.put(`/carts/${cartId}`, {
            userId,
            products
        });
    },

    async deleteCart(cartId) {
        return api.delete(`/carts/${cartId}`);
    }
};
