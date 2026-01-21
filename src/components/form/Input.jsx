import { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';
import FormField from './FormField';
import { X, Eye, EyeOff } from 'lucide-react';

/**
 * Enhanced Input Component with FormField wrapper
 * Supports prefix/suffix icons, clearable functionality, size variants
 * 
 * @param {Object} props
 * @param {string} [props.label] - Field label
 * @param {string} [props.error] - Error message
 * @param {string} [props.helperText] - Helper text
 * @param {React.ReactNode} [props.prefix] - Icon or element to show before input
 * @param {React.ReactNode} [props.suffix] - Icon or element to show after input
 * @param {boolean} [props.clearable] - Show clear button when input has value
 * @param {Function} [props.onClear] - Clear button callback
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Input size
 * @param {string} [props.className] - Additional CSS classes
 */
const Input = forwardRef(
    (
        {
            label,
            error,
            helperText,
            prefix,
            suffix,
            clearable = false,
            onClear,
            size = 'md',
            type = 'text',
            className,
            value,
            onChange,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const inputType = isPassword && showPassword ? 'text' : type;

        // Size variants
        const sizes = {
            sm: 'h-9 text-xs',
            md: 'h-11 text-sm',
            lg: 'h-12 text-base',
        };

        const iconSizes = {
            sm: 'h-3.5 w-3.5',
            md: 'h-4 w-4',
            lg: 'h-5 w-5',
        };

        const handleClear = () => {
            if (onClear) {
                onClear();
            } else if (onChange) {
                // If no custom onClear, create synthetic event
                onChange({ target: { value: '' } });
            }
        };

        const hasClearButton = clearable && value;
        const hasSuffix = suffix || isPassword || hasClearButton;

        return (
            <FormField
                label={label}
                error={error}
                helperText={helperText}
                required={props.required}
                id={props.id}
            >
                <div className="relative">
                    {/* Prefix Icon */}
                    {prefix && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                            {typeof prefix === 'string' ? (
                                <span className={iconSizes[size]}>{prefix}</span>
                            ) : (
                                <div className={iconSizes[size]}>{prefix}</div>
                            )}
                        </div>
                    )}

                    {/* Input Element */}
                    <input
                        ref={ref}
                        type={inputType}
                        className={cn(
                            'input',
                            sizes[size],
                            prefix && 'pl-10',
                            hasSuffix && 'pr-10',
                            error && 'input-error',
                            className
                        )}
                        value={value}
                        onChange={onChange}
                        {...props}
                    />

                    {/* Suffix Icons/Buttons */}
                    {hasSuffix && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {/* Clear Button */}
                            {hasClearButton && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 rounded hover:bg-neutral-100"
                                    tabIndex={-1}
                                >
                                    <X className={iconSizes[size]} />
                                </button>
                            )}

                            {/* Password Toggle */}
                            {isPassword && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 rounded hover:bg-neutral-100"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className={iconSizes[size]} />
                                    ) : (
                                        <Eye className={iconSizes[size]} />
                                    )}
                                </button>
                            )}

                            {/* Custom Suffix */}
                            {suffix && !isPassword && !hasClearButton && (
                                <div className="text-neutral-400">
                                    {typeof suffix === 'string' ? (
                                        <span className={iconSizes[size]}>{suffix}</span>
                                    ) : (
                                        <div className={iconSizes[size]}>{suffix}</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </FormField>
        );
    }
);

Input.displayName = 'Input';

export default Input;