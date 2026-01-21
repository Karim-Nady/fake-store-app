import { create } from 'zustand';

let toastId = 0;

export const useToastStore = create((set) => ({
    toasts: [],

    addToast: (toast) => {
        const id = toastId++;
        const newToast = {
            id,
            type: 'info', // info, success, error, warning
            duration: 5000,
            ...toast,
        };

        set((state) => ({
            toasts: [...state.toasts, newToast],
        }));

        // Auto remove after duration
        if (newToast.duration > 0) {
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t) => t.id !== id),
                }));
            }, newToast.duration);
        }

        return id;
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },

    clearToasts: () => {
        set({ toasts: [] });
    },
}));

// Convenience functions
export const toast = {
    success: (message, options = {}) =>
        useToastStore.getState().addToast({ type: 'success', message, ...options }),
    error: (message, options = {}) =>
        useToastStore.getState().addToast({ type: 'error', message, ...options }),
    info: (message, options = {}) =>
        useToastStore.getState().addToast({ type: 'info', message, ...options }),
    warning: (message, options = {}) =>
        useToastStore.getState().addToast({ type: 'warning', message, ...options }),
};