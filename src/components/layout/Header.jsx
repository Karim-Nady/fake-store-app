import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Plus } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import Button from '../common/Button';

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuthStore();
    const itemCount = useCartStore((state) => state.getItemCount());

    const handleLogout = () => {
        logout(); // This now properly clears the auth-token for Axios
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-primary-600">
                        FakeStore
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-neutral-700 hover:text-primary-600 transition-colors">
                            Products
                        </Link>
                        {isAuthenticated && (
                            <Link to="/create-product" className="text-neutral-700 hover:text-primary-600 transition-colors">
                                Create Product
                            </Link>
                        )}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Cart */}
                        <Link to="/cart" className="relative">
                            <Button variant="ghost" size="sm">
                                <ShoppingCart className="h-5 w-5" />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* Auth */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-neutral-700 hidden sm:block">
                                    {user?.username || 'User'}
                                </span>
                                <Button variant="ghost" size="sm" onClick={handleLogout}>
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button variant="primary" size="sm">
                                    <User className="h-5 w-5" />
                                    <span className="hidden sm:inline">Login</span>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;