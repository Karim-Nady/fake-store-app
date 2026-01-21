import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn, User, Lock, AlertCircle, ShoppingBag } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToastStore } from '../store/useToastStore';
import Button from '../components/common/Button';
import Input from '../components/form/Input';
import Card from '../components/common/Card';

const LoginPage = () => {
    const location = useLocation();
    const { isAuthenticated, login, loading, error } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        const from = location.state?.from?.pathname || '/';
        await login(
            {
                username: data.username,
                password: data.password,
            },
            from
        );
    };

    const { addToast } = useToastStore();

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 animate-fade-in">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <div className="mx-auto w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-4">
                            <ShoppingBag className="h-8 w-8 text-white" />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-neutral-600">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Login Form */}
                <Card className="p-8">
                    {/* Error Alert */}
                    {error && (
                        <div className="alert alert-danger mb-6 animate-slide-down">
                            <AlertCircle className="h-5 w-5" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Username */}
                        <div>
                            <Input
                                label="Username"
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                autoComplete="username"
                                error={errors.username?.message}
                                required
                                disabled={loading}
                                {...register('username', {
                                    required: 'Username is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Username must be at least 3 characters',
                                    },
                                })}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Input
                                label="Password"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                error={errors.password?.message}
                                required
                                disabled={loading}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 4,
                                        message: 'Password must be at least 4 characters',
                                    },
                                })}
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            loading={loading}
                            disabled={loading}
                        >
                            <LogIn className="h-5 w-5" />
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 pt-6 border-t border-neutral-200">
                        <p className="text-sm font-semibold text-neutral-900 mb-3">
                            Demo Credentials:
                        </p>
                        <div className="bg-neutral-50 rounded-lg p-4 space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-neutral-600" />
                                <span className="text-neutral-600">Username:</span>
                                <code className="font-mono bg-white px-2 py-1 rounded border border-neutral-200">
                                    mor_2314
                                </code>
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-neutral-600" />
                                <span className="text-neutral-600">Password:</span>
                                <code className="font-mono bg-white px-2 py-1 rounded border border-neutral-200">
                                    83r5^_
                                </code>
                            </div>
                        </div>
                    </div>
                </Card>
                {/* Back to Home */}
                <div className="text-center mt-4">
                    <Link
                        to="/"
                        className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;