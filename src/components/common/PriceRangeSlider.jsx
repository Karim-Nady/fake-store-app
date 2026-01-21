import { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatters';
import { cn } from '../../utils/cn';

/**
 * PriceRangeSlider Component
 * Dual-handle slider for price range filtering
 * 
 * @param {Object} props
 * @param {number} props.min - Minimum price value
 * @param {number} props.max - Maximum price value
 * @param {number} props.minValue - Current minimum selected value
 * @param {number} props.maxValue - Current maximum selected value
 * @param {Function} props.onChange - Callback when range changes: (min, max) => void
 * @param {number} [props.step=1] - Step increment
 * @param {string} [props.className] - Additional CSS classes
 */
const PriceRangeSlider = ({
    min,
    max,
    minValue,
    maxValue,
    onChange,
    step = 1,
    className,
}) => {
    const [localMin, setLocalMin] = useState(minValue);
    const [localMax, setLocalMax] = useState(maxValue);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setLocalMin(minValue);
        setLocalMax(maxValue);
    }, [minValue, maxValue]);

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), localMax - step);
        setLocalMin(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), localMin + step);
        setLocalMax(value);
    };

    const handleMinRelease = () => {
        onChange(localMin, localMax);
        setIsDragging(false);
    };

    const handleMaxRelease = () => {
        onChange(localMin, localMax);
        setIsDragging(false);
    };

    // Calculate percentage for visual representation
    const minPercent = ((localMin - min) / (max - min)) * 100;
    const maxPercent = ((localMax - min) / (max - min)) * 100;

    return (
        <div className={cn('w-full', className)}>
            {/* Value Display */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-600">Min:</span>
                    <span className="text-sm font-semibold text-neutral-900">
                        {formatCurrency(localMin)}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-600">Max:</span>
                    <span className="text-sm font-semibold text-neutral-900">
                        {formatCurrency(localMax)}
                    </span>
                </div>
            </div>

            {/* Slider Container */}
            <div className="relative pt-2 pb-4">
                {/* Track Background */}
                <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-neutral-200 rounded-full" />

                {/* Active Track */}
                <div
                    className="absolute top-1/2 h-2 -translate-y-1/2 bg-primary-600 rounded-full transition-all"
                    style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`,
                    }}
                />

                {/* Min Range Input */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={localMin}
                    onChange={handleMinChange}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={handleMinRelease}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={handleMinRelease}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110"
                    style={{ zIndex: localMin > max - 100 ? 5 : 3 }}
                />

                {/* Max Range Input */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={localMax}
                    onChange={handleMaxChange}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={handleMaxRelease}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={handleMaxRelease}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110"
                    style={{ zIndex: 4 }}
                />
            </div>

            {/* Quick Presets */}
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => {
                        setLocalMin(min);
                        setLocalMax(max);
                        onChange(min, max);
                    }}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                    Reset
                </button>
                <button
                    onClick={() => {
                        const newMax = Math.min(100, max);
                        setLocalMin(min);
                        setLocalMax(newMax);
                        onChange(min, newMax);
                    }}
                    className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                    Under $100
                </button>
                <button
                    onClick={() => {
                        const newMin = Math.max(100, min);
                        setLocalMin(newMin);
                        setLocalMax(max);
                        onChange(newMin, max);
                    }}
                    className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                    $100+
                </button>
            </div>
        </div>
    );
};

export default PriceRangeSlider;