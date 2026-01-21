import { forwardRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import FormField from './FormField';

/**
 * Enhanced TextArea Component with FormField wrapper
 * Supports character counter, auto-resize, resize variants
 * 
 * @param {Object} props
 * @param {string} [props.label] - Field label
 * @param {string} [props.error] - Error message
 * @param {string} [props.helperText] - Helper text
 * @param {number} [props.rows=4] - Number of rows
 * @param {number} [props.maxLength] - Maximum character count
 * @param {boolean} [props.showCounter=false] - Show character counter
 * @param {'none'|'vertical'|'both'} [props.resize='none'] - Resize behavior
 * @param {boolean} [props.autoResize=false] - Auto-resize based on content
 * @param {'sm'|'md'|'lg'} [props.size='md'] - TextArea size
 * @param {string} [props.className] - Additional CSS classes
 */
const TextArea = forwardRef(
    (
        {
            label,
            error,
            helperText,
            rows = 4,
            maxLength,
            showCounter = false,
            resize = 'none',
            autoResize = false,
            size = 'md',
            className,
            value,
            onChange,
            ...props
        },
        ref
    ) => {
        const [charCount, setCharCount] = useState(0);
        const [textareaRef, setTextareaRef] = useState(null);

        // Update character count
        useEffect(() => {
            if (value) {
                setCharCount(value.length);
            } else {
                setCharCount(0);
            }
        }, [value]);

        // Auto-resize functionality
        useEffect(() => {
            if (autoResize && textareaRef) {
                textareaRef.style.height = 'auto';
                textareaRef.style.height = `${textareaRef.scrollHeight}px`;
            }
        }, [value, autoResize, textareaRef]);

        // Size variants
        const sizes = {
            sm: 'text-xs py-2',
            md: 'text-sm py-2.5',
            lg: 'text-base py-3',
        };

        // Resize variants
        const resizeClasses = {
            none: 'resize-none',
            vertical: 'resize-y',
            both: 'resize',
        };

        // Calculate if approaching max length
        const approachingMax = maxLength && charCount > maxLength * 0.9;
        const exceedingMax = maxLength && charCount > maxLength;

        // Enhanced helper text with counter
        const enhancedHelperText = showCounter || maxLength
            ? (
                <div className="flex items-center justify-between">
                    <span>{helperText}</span>
                    <span
                        className={cn(
                            'text-xs font-medium',
                            exceedingMax && 'text-danger-600',
                            approachingMax && !exceedingMax && 'text-warning-600'
                        )}
                    >
                        {charCount}
                        {maxLength && ` / ${maxLength}`}
                    </span>
                </div>
            )
            : helperText;

        const handleChange = (e) => {
            if (onChange) {
                onChange(e);
            }
        };

        const combinedRef = (node) => {
            setTextareaRef(node);
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };

        return (
            <FormField
                label={label}
                error={error}
                helperText={enhancedHelperText}
                required={props.required}
                id={props.id}
            >
                <textarea
                    ref={combinedRef}
                    rows={autoResize ? 1 : rows}
                    maxLength={maxLength}
                    className={cn(
                        'input',
                        sizes[size],
                        resizeClasses[resize],
                        autoResize && 'overflow-hidden',
                        error && 'input-error',
                        className
                    )}
                    value={value}
                    onChange={handleChange}
                    {...props}
                />
            </FormField>
        );
    }
);

TextArea.displayName = 'TextArea';

export default TextArea;