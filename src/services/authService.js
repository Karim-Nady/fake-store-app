import { api } from './api';

export const authService = {
    async getAllUsers() {
        return api.get('/users');
    },

    async getUser(id) {
        return api.get(`/users/${id}`);
    },

    async register(userData) {
        return api.post('/users', userData);
    },

    async login(credentials) {
        return api.post('/auth/login', credentials);
    },

    async updateProfile(id, profileData) {
        return api.put(`/users/${id}`, profileData);
    },

    async deleteProfile(id) {
        return api.delete(`/users/${id}`);
    },

};
