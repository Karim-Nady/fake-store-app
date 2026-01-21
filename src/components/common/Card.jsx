import { cn } from '../../utils/cn';

/**
 * Enhanced Card Component
 * Supports multiple variants, padding sizes, and interactive states
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {'default'|'elevated'|'outlined'|'ghost'} [props.variant='default'] - Card style variant
 * @param {'sm'|'md'|'lg'|'none'} [props.padding='md'] - Padding size
 * @param {boolean} [props.hoverable=false] - Enable hover effect
 * @param {boolean} [props.clickable=false] - Add cursor pointer
 * @param {React.ReactNode} [props.header] - Optional header content
 * @param {React.ReactNode} [props.footer] - Optional footer content
 * @param {string} [props.className] - Additional CSS classes
 */
const Card = ({
    children,
    variant = 'default',
    padding = 'md',
    hoverable = false,
    clickable = false,
    header,
    footer,
    className,
    ...props
}) => {
    // Variant styles
    const variants = {
        default: 'bg-white border border-neutral-200 shadow-sm',
        elevated: 'bg-white shadow-lg',
        outlined: 'bg-white border-2 border-neutral-300',
        ghost: 'bg-transparent',
    };

    // Padding variants
    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    // Hover effects
    const hoverEffects = hoverable
        ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200'
        : 'transition-shadow duration-200';

    return (
        <div
            className={cn(
                'rounded-xl',
                variants[variant],
                !header && !footer && paddings[padding],
                hoverEffects,
                clickable && 'cursor-pointer',
                className
            )}
            {...props}
        >
            {/* Header Section */}
            {header && (
                <div
                    className={cn(
                        'border-b border-neutral-200',
                        paddings[padding],
                        'rounded-t-xl'
                    )}
                >
                    {header}
                </div>
            )}

            {/* Main Content */}
            <div className={cn(header || footer ? paddings[padding] : '')}>
                {children}
            </div>

            {/* Footer Section */}
            {footer && (
                <div
                    className={cn(
                        'border-t border-neutral-200',
                        paddings[padding],
                        'rounded-b-xl bg-neutral-50'
                    )}
                >
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;