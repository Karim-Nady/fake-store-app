import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

/**
 * Enhanced Badge Component
 * Supports sizes, icons, dismissible, dot, and outlined variants
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge content
 * @param {'primary'|'success'|'danger'|'warning'|'neutral'} [props.variant='primary'] - Badge color variant
 * @param {'xs'|'sm'|'md'|'lg'} [props.size='md'] - Badge size
 * @param {React.ReactNode} [props.icon] - Icon element to display
 * @param {boolean} [props.dot=false] - Show dot instead of text
 * @param {boolean} [props.outlined=false] - Outlined variant
 * @param {boolean} [props.dismissible=false] - Show close button
 * @param {Function} [props.onDismiss] - Dismiss callback
 * @param {string} [props.className] - Additional CSS classes
 */
const Badge = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    dot = false,
    outlined = false,
    dismissible = false,
    onDismiss,
    className,
}) => {
    // Size variants
    const sizes = {
        xs: 'px-1.5 py-0.5 text-xs gap-1',
        sm: 'px-2 py-0.5 text-xs gap-1',
        md: 'px-2.5 py-1 text-sm gap-1.5',
        lg: 'px-3 py-1.5 text-base gap-2',
    };

    // Icon sizes
    const iconSizes = {
        xs: 'h-2.5 w-2.5',
        sm: 'h-3 w-3',
        md: 'h-3.5 w-3.5',
        lg: 'h-4 w-4',
    };

    // Solid variants
    const solidVariants = {
        primary: 'bg-primary-100 text-primary-800 border-primary-200',
        success: 'bg-success-100 text-success-800 border-success-200',
        danger: 'bg-danger-100 text-danger-800 border-danger-200',
        warning: 'bg-warning-100 text-warning-800 border-warning-200',
        neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    };

    // Outlined variants
    const outlinedVariants = {
        primary: 'bg-white text-primary-700 border-2 border-primary-500',
        success: 'bg-white text-success-700 border-2 border-success-500',
        danger: 'bg-white text-danger-700 border-2 border-danger-500',
        warning: 'bg-white text-warning-700 border-2 border-warning-500',
        neutral: 'bg-white text-neutral-700 border-2 border-neutral-500',
    };

    // Dot colors
    const dotColors = {
        primary: 'bg-primary-500',
        success: 'bg-success-500',
        danger: 'bg-danger-500',
        warning: 'bg-warning-500',
        neutral: 'bg-neutral-500',
    };

    const variantStyles = outlined ? outlinedVariants[variant] : solidVariants[variant];

    // Dot badge
    if (dot) {
        return (
            <span
                className={cn(
                    'inline-flex items-center justify-center',
                    'rounded-full',
                    sizes[size],
                    className
                )}
            >
                <span
                    className={cn(
                        'rounded-full',
                        dotColors[variant],
                        size === 'xs' ? 'h-1.5 w-1.5' : 'h-2 w-2'
                    )}
                />
            </span>
        );
    }

    return (
        <span
            className={cn(
                'inline-flex items-center justify-center',
                'rounded-full font-medium',
                'border transition-all duration-200',
                sizes[size],
                variantStyles,
                className
            )}
        >
            {/* Icon */}
            {icon && (
                <span className={iconSizes[size]}>
                    {icon}
                </span>
            )}

            {/* Content */}
            {children}

            {/* Dismiss Button */}
            {dismissible && onDismiss && (
                <button
                    onClick={onDismiss}
                    className="ml-1 hover:opacity-70 transition-opacity rounded-full p-0.5 hover:bg-black/10"
                    aria-label="Dismiss"
                >
                    <X className={iconSizes[size]} />
                </button>
            )}
        </span>
    );
};

export default Badge;