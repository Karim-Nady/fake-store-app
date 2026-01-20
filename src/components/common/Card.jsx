import { cn } from '../../utils/cn';

const Card = ({ children, className, hoverable = false, ...props }) => {
    return (
        <div
            className={cn(
                'card p-6',
                hoverable && 'cursor-pointer transform hover:scale-[1.02] transition-transform',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;