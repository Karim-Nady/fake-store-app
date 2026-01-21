import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: (userData, token) => {
                localStorage.setItem('auth-token', token);

                set({
                    user: userData,
                    token,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                authService.logout();

                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            },

            updateUser: (userData) => {
                set((state) => ({
                    user: { ...state.user, ...userData },
                }));
            },

            hydrate: () => {
                const state = useAuthStore.getState();
                if (state.token) {
                    localStorage.setItem('auth-token', state.token);
                }
            },
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (state) => {
                if (state?.token) {
                    localStorage.setItem('auth-token', state.token);
                }
            },
        }
    )
);