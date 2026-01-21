import { XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Enhanced ErrorMessage Component
 * Multiple variants, severity levels, dismissible, and retry functionality
 * 
 * @param {Object} props
 * @param {string} props.message - Error message text
 * @param {'error'|'warning'|'info'} [props.severity='error'] - Message severity level
 * @param {'inline'|'card'|'banner'} [props.variant='card'] - Display variant
 * @param {string} [props.title] - Optional title
 * @param {Function} [props.onRetry] - Retry callback
 * @param {Function} [props.onDismiss] - Dismiss callback
 * @param {boolean} [props.dismissible=false] - Show dismiss button
 * @param {string} [props.className] - Additional CSS classes
 */
const ErrorMessage = ({
    message,
    severity = 'error',
    variant = 'card',
    title,
    onRetry,
    onDismiss,
    dismissible = false,
    className,
}) => {
    // Icons for severity levels
    const icons = {
        error: XCircle,
        warning: AlertTriangle,
        info: Info,
    };

    const Icon = icons[severity];

    // Color schemes
    const colorSchemes = {
        error: {
            bg: 'bg-danger-50',
            border: 'border-danger-200',
            text: 'text-danger-900',
            icon: 'text-danger-600',
            button: 'text-danger-700 hover:text-danger-800',
        },
        warning: {
            bg: 'bg-warning-50',
            border: 'border-warning-200',
            text: 'text-warning-900',
            icon: 'text-warning-600',
            button: 'text-warning-700 hover:text-warning-800',
        },
        info: {
            bg: 'bg-primary-50',
            border: 'border-primary-200',
            text: 'text-primary-900',
            icon: 'text-primary-600',
            button: 'text-primary-700 hover:text-primary-800',
        },
    };

    const colors = colorSchemes[severity];

    // Variant styles
    const variants = {
        inline: 'p-3 rounded-lg',
        card: 'p-4 rounded-xl shadow-sm',
        banner: 'p-4 rounded-none border-l-4',
    };

    return (
        <div
            className={cn(
                'flex items-start gap-3 border',
                colors.bg,
                colors.border,
                variants[variant],
                'animate-slide-down',
                className
            )}
        >
            {/* Icon */}
            <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', colors.icon)} />

            {/* Content */}
            <div className="flex-1 min-w-0">
                {title && (
                    <p className={cn('font-semibold mb-1', colors.text)}>
                        {title}
                    </p>
                )}
                <p className={cn('text-sm', colors.text)}>
                    {message}
                </p>

                {/* Retry Button */}
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className={cn(
                            'mt-3 text-sm font-medium transition-colors',
                            colors.button
                        )}
                    >
                        Try again →
                    </button>
                )}
            </div>

            {/* Dismiss Button */}
            {dismissible && onDismiss && (
                <button
                    onClick={onDismiss}
                    className={cn(
                        'flex-shrink-0 transition-opacity hover:opacity-70',
                        colors.icon
                    )}
                    aria-label="Dismiss"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;