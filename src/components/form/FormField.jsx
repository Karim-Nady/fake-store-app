import { cn } from '../../utils/cn';

/**
 * FormField Wrapper Component
 * Eliminates redundancy between Input, TextArea, and Select components
 * Provides consistent label, error, and helper text rendering
 * 
 * @param {Object} props
 * @param {string} [props.label] - Field label
 * @param {string} [props.error] - Error message
 * @param {string} [props.helperText] - Helper text shown when no error
 * @param {boolean} [props.required] - Whether field is required
 * @param {string} [props.id] - Field ID for label association
 * @param {React.ReactNode} props.children - Input element
 * @param {string} [props.className] - Additional wrapper classes
 */
const FormField = ({
    label,
    error,
    helperText,
    required,
    id,
    children,
    className,
}) => {
    return (
        <div className={cn('w-full', className)}>
            {/* Label */}
            {label && (
                <label className="label" htmlFor={id}>
                    {label}
                    {required && <span className="text-danger-500 ml-1">*</span>}
                </label>
            )}

            {/* Input Element */}
            {children}

            {/* Error Message */}
            {error && (
                <p className="mt-1 text-sm text-danger-600 animate-slide-down">
                    {error}
                </p>
            )}

            {/* Helper Text */}
            {helperText && !error && (
                <p className="mt-1 text-sm text-neutral-500">
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default FormField;