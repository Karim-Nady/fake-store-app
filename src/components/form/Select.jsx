import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import FormField from './FormField';
import { ChevronDown } from 'lucide-react';

/**
 * Enhanced Select Component
 * Uses FormField wrapper to eliminate redundancy
 * 
 * @param {Object} props
 * @param {string} [props.label] - Field label
 * @param {string} [props.error] - Error message
 * @param {string} [props.helperText] - Helper text
 * @param {Array<{value: string, label: string, disabled?: boolean}>} [props.options=[]] - Select options
 * @param {string} [props.placeholder='Select an option'] - Placeholder text
 * @param {boolean} [props.loading] - Loading state
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Input size
 * @param {string} [props.className] - Additional CSS classes
 */
const Select = forwardRef(
    (
        {
            label,
            error,
            helperText,
            options = [],
            placeholder = 'Select an option',
            loading = false,
            size = 'md',
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        // Size variants
        const sizes = {
            sm: 'h-9 text-xs',
            md: 'h-11 text-sm',
            lg: 'h-12 text-base',
        };

        return (
            <FormField
                label={label}
                error={error}
                helperText={helperText}
                required={props.required}
                id={props.id}
            >
                <div className="relative">
                    {/* Select Element */}
                    <select
                        ref={ref}
                        className={cn(
                            'input appearance-none pr-10',
                            sizes[size],
                            error && 'input-error',
                            (disabled || loading) && 'cursor-not-allowed',
                            className
                        )}
                        disabled={disabled || loading}
                        {...props}
                    >
                        <option value="" disabled>{loading ? 'Loading...' : placeholder}</option>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Dropdown Icon */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {loading ? (
                            <svg
                                className="animate-spin h-4 w-4 text-neutral-400"
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
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        ) : (
                            <ChevronDown
                                className={cn(
                                    'h-4 w-4 text-neutral-400 transition-transform',
                                    (disabled || loading) && 'opacity-50'
                                )}
                            />
                        )}
                    </div>
                </div>
            </FormField>
        );
    }
);

Select.displayName = 'Select';

export default Select;