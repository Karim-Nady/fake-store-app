const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com';

class ApiService {
    async get(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async put(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async delete(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    // Products
    async getProducts() {
        return this.get('/products');
    }

    async getProduct(id) {
        return this.get(`/products/${id}`);
    }

    async getCategories() {
        return this.get('/products/categories');
    }

    async createProduct(productData) {
        return this.post('/products', productData);
    }

    // Auth
    async login(credentials) {
        return this.post('/auth/login', credentials);
    }
}

export const api = new ApiService();