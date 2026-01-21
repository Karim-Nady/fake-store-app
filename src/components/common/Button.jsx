import { cn } from '../../utils/cn';
import { useState } from 'react';

/**
 * Enhanced Button Component with modern UI/UX features
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary'|'secondary'|'danger'|'success'|'outline'|'ghost'} [props.variant='primary'] - Button style variant
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Button size
 * @param {boolean} [props.loading=false] - Loading state
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.fullWidth=false] - Full width button
 * @param {'left'|'right'|'only'} [props.iconPosition='left'] - Icon position relative to text
 * @param {boolean} [props.ripple=true] - Enable ripple effect on click
 * @param {string} [props.className] - Additional CSS classes
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    iconPosition = 'left',
    ripple = true,
    className,
    onClick,
    ...props
}) => {
    const [rippleArray, setRippleArray] = useState([]);

    // Base styles
    const baseStyles = 'btn relative overflow-hidden';

    // Variant styles
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        success: 'btn-success',
        outline: 'btn-outline',
        ghost: 'btn-ghost',
    };

    // Size styles
    const sizes = {
        sm: 'px-3 py-1.5 text-xs gap-1.5',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2.5',
    };

    // Loading spinner sizes
    const spinnerSizes = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
    };

    // Get appropriate spinner color based on variant
    const getSpinnerColor = () => {
        if (variant === 'outline' || variant === 'ghost') {
            return 'border-current';
        }
        return 'border-white border-t-transparent';
    };

    // Handle ripple effect
    const handleRipple = (e) => {
        if (!ripple || disabled || loading) return;

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const newRipple = {
            x,
            y,
            size,
            id: Date.now(),
        };

        setRippleArray([...rippleArray, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRippleArray((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
    };

    // Handle click with ripple
    const handleClick = (e) => {
        handleRipple(e);
        if (onClick && !disabled && !loading) {
            onClick(e);
        }
    };

    // Extract icon and text from children
    const childrenArray = Array.isArray(children) ? children : [children];
    const icon = childrenArray.find((child) => child?.type?.displayName === 'Lucide Icon' || child?.props?.className?.includes('lucide'));
    const text = childrenArray.filter((child) => child !== icon);
    const isIconOnly = icon && (!text || text.every(t => !t));

    // Render children based on icon position
    const renderContent = () => {
        if (loading) {
            return (
                <>
                    <svg
                        className={cn(
                            'animate-spin',
                            spinnerSizes[size],
                            iconPosition !== 'only' && '-ml-1'
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className={getSpinnerColor()}
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    {!isIconOnly && text}
                </>
            );
        }

        if (isIconOnly) {
            return icon;
        }

        if (iconPosition === 'right') {
            return (
                <>
                    {text}
                    {icon}
                </>
            );
        }

        // Default: icon on left
        return (
            <>
                {icon}
                {text}
            </>
        );
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                isIconOnly && 'aspect-square p-2',
                'transition-all duration-200',
                className
            )}
            disabled={disabled || loading}
            onClick={handleClick}
            {...props}
        >
            {/* Ripple effect */}
            {ripple && rippleArray.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                />
            ))}

            {/* Content */}
            <span className="relative flex items-center justify-center gap-inherit">
                {renderContent()}
            </span>
        </button>
    );
};

export default Button;