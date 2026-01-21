import { api } from './api';

export const productService = {
    async getProducts() {
        return api.get('/products');
    },

    async getProduct(id) {
        return api.get(`/products/${id}`);
    },

    async createProduct(productData) {
        return api.post('/products', productData);
    },

    async updateProduct(id, productData) {
        return api.put(`/products/${id}`, productData);
    },

    async deleteProduct(id) {
        return api.delete(`/products/${id}`);
    },

};
