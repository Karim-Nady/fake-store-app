import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Package, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import Button from '../common/Button';
import { useState } from 'react';

/**
 * Header Component
 * Main navigation bar with logo, cart icon, and auth controls
 * 
 * @component
 */
const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuthStore();
    const itemCount = useCartStore((state) => state.getItemCount());
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-neutral-200/60 z-50 transition-all duration-300">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary-600 text-white p-1.5 rounded-lg group-hover:bg-primary-700 transition-colors">
                            <Package className="h-6 w-6" />
                        </div>
                        <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
                            FakeStore
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors py-2 border-b-2 border-transparent hover:border-primary-600"
                        >
                            Explore Products
                        </Link>
                        {isAuthenticated && (
                            <Link
                                to="/create-product"
                                className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors py-2 border-b-2 border-transparent hover:border-primary-600"
                            >
                                Sell Product
                            </Link>
                        )}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Cart */}
                        <Link to="/cart" className="relative group">
                            <Button variant="ghost" size="sm" className="relative hover:bg-neutral-100 rounded-full h-10 w-10 p-0 flex items-center justify-center">
                                <ShoppingCart className="h-5 w-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                                        {itemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        <div className="h-6 w-px bg-neutral-200 mx-1 hidden sm:block"></div>

                        {/* Auth */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-neutral-700 hidden sm:block">
                                    Hi, {user?.username || 'User'}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="border-neutral-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                                >
                                    <LogOut className="h-4 w-4 sm:mr-2" />
                                    <span className="hidden sm:inline">Logout</span>
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button variant="primary" size="sm" className="shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>Login</span>
                                </Button>
                            </Link>
                        )}

                        {/* Mobile Menu Button - Visible only on mobile */}
                        <button
                            className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-neutral-100 py-4 space-y-2 animate-fade-in-down">
                        <Link
                            to="/"
                            className="block px-4 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-600 font-medium rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Explore Products
                        </Link>
                        {isAuthenticated && (
                            <Link
                                to="/create-product"
                                className="block px-4 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-600 font-medium rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sell Product
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;