import { cn } from '../../utils/cn';

/**
 * Enhanced LoadingSpinner Component
 * Multiple spinner types, colors, and optional text label
 * 
 * @param {Object} props
 * @param {'spinner'|'dots'|'pulse'|'bars'} [props.type='spinner'] - Spinner animation type
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {'primary'|'white'|'neutral'} [props.color='primary'] - Spinner color
 * @param {string} [props.text] - Optional loading text
 * @param {boolean} [props.overlay=false] - Show as full-page overlay
 * @param {string} [props.className] - Additional CSS classes
 */
const LoadingSpinner = ({
    type = 'spinner',
    size = 'md',
    color = 'primary',
    text,
    overlay = false,
    className,
}) => {
    // Size variants
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };

    const dotSizes = {
        sm: 'h-1.5 w-1.5',
        md: 'h-2.5 w-2.5',
        lg: 'h-3.5 w-3.5',
        xl: 'h-4 w-4',
    };

    const barSizes = {
        sm: 'h-3 w-1',
        md: 'h-6 w-1.5',
        lg: 'h-8 w-2',
        xl: 'h-10 w-2.5',
    };

    const textSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
    };

    // Color variants
    const colors = {
        primary: 'border-primary-600',
        white: 'border-white',
        neutral: 'border-neutral-600',
    };

    const dotColors = {
        primary: 'bg-primary-600',
        white: 'bg-white',
        neutral: 'bg-neutral-600',
    };

    // Spinner (default circular spinner)
    const SpinnerType = () => (
        <div
            className={cn(
                'animate-spin rounded-full border-4 border-neutral-200',
                'border-t-transparent',
                sizes[size],
                colors[color]
            )}
            style={{ borderTopColor: 'transparent' }}
        />
    );

    // Dots (three pulsing dots)
    const DotsType = () => (
        <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={cn(
                        'rounded-full animate-pulse',
                        dotSizes[size],
                        dotColors[color]
                    )}
                    style={{
                        animationDelay: `${i * 150}ms`,
                    }}
                />
            ))}
        </div>
    );

    // Pulse (single pulsing circle)
    const PulseType = () => (
        <div
            className={cn(
                'rounded-full animate-pulse',
                sizes[size],
                dotColors[color]
            )}
        />
    );

    // Bars (three bouncing bars)
    const BarsType = () => (
        <div className="flex items-end gap-1">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={cn(
                        'rounded-sm animate-bounce',
                        barSizes[size],
                        dotColors[color]
                    )}
                    style={{
                        animationDelay: `${i * 150}ms`,
                    }}
                />
            ))}
        </div>
    );

    // Select spinner type
    const SpinnerComponent = {
        spinner: SpinnerType,
        dots: DotsType,
        pulse: PulseType,
        bars: BarsType,
    }[type];

    // Content
    const Content = () => (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-3',
                className
            )}
        >
            <SpinnerComponent />
            {text && (
                <p className={cn('font-medium text-neutral-700', textSizes[size])}>
                    {text}
                </p>
            )}
        </div>
    );

    // Overlay variant
    if (overlay) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <Content />
            </div>
        );
    }

    return <Content />;
};

export default LoadingSpinner;