
import { useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center animate-fade-in">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-primary-600">404</h1>
                    <div className="mt-4">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                            Page Not Found
                        </h2>
                        <p className="text-neutral-600 max-w-md mx-auto">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button variant="primary" onClick={() => navigate('/')}>
                        <Home className="h-5 w-5" />
                        Go Home
                    </Button>
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;