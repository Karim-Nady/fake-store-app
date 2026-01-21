import { PackageOpen } from 'lucide-react';

/**
 * EmptyState Component
 * Displays a message when no content is available
 * 
 * @param {Object} props
 * @param {React.Component} [props.icon] - Icon component
 * @param {string} [props.title] - Title
 * @param {string} [props.description] - Description
 * @param {React.ReactNode} [props.action] - Action button/link
 */
const EmptyState = ({
    icon: Icon = PackageOpen,
    title = 'No items found',
    description,
    action
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="rounded-full bg-neutral-100 p-6 mb-4">
                <Icon className="h-12 w-12 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-neutral-600 max-w-sm mb-6">{description}</p>
            )}
            {action}
        </div>
    );
};

export default EmptyState;
