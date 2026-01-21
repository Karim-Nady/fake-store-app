import { useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';
import { cn } from '../../utils/cn';

const Toast = ({ toast, onClose }) => {
    const icons = {
        success: CheckCircle,
        error: XCircle,
        warning: AlertCircle,
        info: Info,
    };

    const Icon = icons[toast.type];

    const styles = {
        success: 'bg-success-50 text-success-900 border-success-200',
        error: 'bg-danger-50 text-danger-900 border-danger-200',
        warning: 'bg-warning-50 text-warning-900 border-warning-200',
        info: 'bg-primary-50 text-primary-900 border-primary-200',
    };

    const iconStyles = {
        success: 'text-success-600',
        error: 'text-danger-600',
        warning: 'text-warning-600',
        info: 'text-primary-600',
    };

    return (
        <div
            className={cn(
                'flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm animate-slide-up',
                styles[toast.type]
            )}
        >
            <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconStyles[toast.type])} />
            <div className="flex-1 min-w-0">
                {toast.title && (
                    <p className="font-semibold mb-1">{toast.title}</p>
                )}
                <p className="text-sm">{toast.message}</p>
            </div>
            <button
                onClick={onClose}
                className="flex-shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
};

const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
            <div className="pointer-events-auto space-y-2">
                {toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                ))}
            </div>
        </div>
    );
};

export default ToastContainer;
