import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Request interceptor - add auth token if exists
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            // Server responded with error status
            const errorMessage = error.response.data?.message ||
                error.response.statusText ||
                'An error occurred';

            // Handle specific status codes
            switch (error.response.status) {
                case 401:
                    // Unauthorized - clear auth and redirect to login
                    localStorage.removeItem('auth-token');
                    window.location.href = '/login';
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
            }

            return Promise.reject(new Error(errorMessage));
        } else if (error.request) {
            // Request made but no response
            return Promise.reject(new Error('No response from server'));
        } else {
            // Error in request setup
            return Promise.reject(error);
        }
    }
);

class ApiService {
    async get(endpoint, config = {}) {
        return axiosInstance.get(endpoint, config);
    }

    async post(endpoint, data, config = {}) {
        return axiosInstance.post(endpoint, data, config);
    }

    async put(endpoint, data, config = {}) {
        return axiosInstance.put(endpoint, data, config);
    }

    async patch(endpoint, data, config = {}) {
        return axiosInstance.patch(endpoint, data, config);
    }

    async delete(endpoint, config = {}) {
        return axiosInstance.delete(endpoint, config);
    }
}

export const api = new ApiService();
export default axiosInstance;