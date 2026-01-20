
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(
    ({ label, error, helperText, className, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="label" htmlFor={props.id}>
                        {label}
                        {props.required && <span className="text-danger-500 ml-1">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn('input', error && 'input-error', className)}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-danger-600">{error}</p>}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;