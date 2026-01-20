
import { cn } from '../../utils/cn';

const Badge = ({ children, variant = 'primary', className }) => {
    const variants = {
        primary: 'badge-primary',
        success: 'badge-success',
        danger: 'badge-danger',
        warning: 'badge-warning',
    };

    return (
        <span className={cn('badge', variants[variant], className)}>
            {children}
        </span>
    );
};

export default Badge;

