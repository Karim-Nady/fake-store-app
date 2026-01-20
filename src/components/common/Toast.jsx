import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="alert alert-danger flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
                <p className="font-medium">Error</p>
                <p className="mt-1 text-sm">{message}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-2 text-sm font-medium hover:underline"
                    >
                        Try again
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;
