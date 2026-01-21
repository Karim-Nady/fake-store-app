import { api } from './api';

export const authService = {
    /**
     * Get all users
     * @returns {Promise<Array>} List of all users
     */
    async getAllUsers() {
        return api.get('/users');
    },

    /**
     * Get a single user by ID
     * @param {number|string} id - User ID
     * @returns {Promise<Object>} User object
     */
    async getUser(id) {
        return api.get(`/users/${id}`);
    },

    /**
     * Register a new user
     * @param {Object} userData - User data
     * @param {string} userData.email - User email
     * @param {string} userData.username - Username
     * @param {string} userData.password - Password
     * @param {Object} userData.name - Name object
     * @param {string} userData.name.firstname - First name
     * @param {string} userData.name.lastname - Last name
     * @param {Object} userData.address - Address object
     * @param {string} userData.phone - Phone number
     * @returns {Promise<Object>} Created user (with fake ID)
     */
    async register(userData) {
        return api.post('/users', userData);
    },

    /**
     * Login user
     * @param {Object} credentials - Login credentials
     * @param {string} credentials.username - Username
     * @param {string} credentials.password - Password
     * @returns {Promise<Object>} Login response with token
     */
    async login(credentials) {
        const response = await api.post('/auth/login', credentials);

        // Store token if present
        if (response.token) {
            localStorage.setItem('auth-token', response.token);
        }

        return response;
    },

    /**
     * Update user profile
     * @param {number|string} id - User ID
     * @param {Object} profileData - Updated profile data
     * @returns {Promise<Object>} Updated user (not persisted in API)
     */
    async updateProfile(id, profileData) {
        return api.put(`/users/${id}`, profileData);
    },

    /**
     * Delete user profile
     * @param {number|string} id - User ID
     * @returns {Promise<Object>} Deletion confirmation (not persisted in API)
     */
    async deleteProfile(id) {
        return api.delete(`/users/${id}`);
    },

    /**
     * Logout user (client-side only)
     */
    logout() {
        localStorage.removeItem('auth-token');
    }
};