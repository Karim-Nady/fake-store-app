import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Select = forwardRef(
    ({ label, error, options = [], className, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="label" htmlFor={props.id}>
                        {label}
                        {props.required && <span className="text-danger-500 ml-1">*</span>}
                    </label>
                )}
                <select
                    ref={ref}
                    className={cn('input', error && 'input-error', className)}
                    {...props}
                >
                    <option value="">Select an option</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <p className="mt-1 text-sm text-danger-600">{error}</p>}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
