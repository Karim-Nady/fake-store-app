import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const TextArea = forwardRef(
    ({ label, error, helperText, className, rows = 4, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="label" htmlFor={props.id}>
                        {label}
                        {props.required && <span className="text-danger-500 ml-1">*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    rows={rows}
                    className={cn('input resize-none', error && 'input-error', className)}
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

TextArea.displayName = 'TextArea';

export default TextArea;