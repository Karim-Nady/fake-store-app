import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
    const navigate = useNavigate();
    const { user, token, isAuthenticated, login: setAuthState, logout: clearAuthState } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (credentials, redirectTo = '/') => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.login(credentials);

            const userData = {
                username: credentials.username,
            };

            setAuthState(userData, response.token);
            navigate(redirectTo);

            return { success: true };
        } catch (err) {
            setError(err.message || 'Login failed');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout user and redirect to login
     */
    const logout = () => {
        clearAuthState();
        navigate('/login');
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.register(userData);
            return { success: true, data: response };
        } catch (err) {
            setError(err.message || 'Registration failed');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        register,
    };
};