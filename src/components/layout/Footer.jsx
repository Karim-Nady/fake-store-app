import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, Package, Check, Loader2 } from 'lucide-react';
import Button from '../common/Button';

/**
 * Footer Component
 * Application footer with links, social icons, and newsletter subscription
 * 
 * @component
 */
const Footer = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubscribed(true);
            setEmail('');
        }, 1500);
    };

    return (
        <footer className="bg-neutral-950 text-white pt-16 pb-8 border-t border-neutral-800">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            <div className="bg-primary-600 text-white p-1.5 rounded-lg group-hover:bg-primary-500 transition-colors">
                                <Package className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold">FakeStore</span>
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                            Your one-stop destination for premium products. We bring quality and style right to your doorstep with our curated collection.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors bg-neutral-900 p-2 rounded-full hover:bg-neutral-800">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors bg-neutral-900 p-2 rounded-full hover:bg-neutral-800">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors bg-neutral-900 p-2 rounded-full hover:bg-neutral-800">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors bg-neutral-900 p-2 rounded-full hover:bg-neutral-800">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-neutral-100">Shop</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">All Products</Link></li>
                            <li><Link to="/?category=electronics" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Electronics</Link></li>
                            <li><Link to="/?category=jewelery" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Jewelery</Link></li>
                            <li><Link to="/?category=men's clothing" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Men's Fashion</Link></li>
                            <li><Link to="/?category=women's clothing" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Women's Fashion</Link></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-neutral-100">Support</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Help Center</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Terms of Service</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Shipping Information</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Returns & Exchanges</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-neutral-100">Stay Connected</h3>
                        <p className="text-neutral-400 text-sm mb-4">
                            Subscribe to our newsletter for the latest updates and exclusive offers.
                        </p>

                        {subscribed ? (
                            <div className="bg-success-900/30 border border-success-800 rounded-lg p-4 flex items-start gap-3 animate-fade-in">
                                <div className="bg-success-500/20 p-1.5 rounded-full mt-0.5">
                                    <Check className="h-4 w-4 text-success-400" />
                                </div>
                                <div>
                                    <p className="text-success-400 font-medium text-sm">Successfully Subscribed!</p>
                                    <p className="text-neutral-400 text-xs mt-1">Thank you for joining our newsletter.</p>
                                </div>
                            </div>
                        ) : (
                            <form className="space-y-3" onSubmit={handleSubscribe}>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition-all"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="sm"
                                    fullWidth
                                    className="group"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Subscribing...
                                        </>
                                    ) : (
                                        <>
                                            <span>Subscribe</span>
                                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-neutral-500 text-sm">
                        © {new Date().getFullYear()} FakeStore. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-neutral-600 text-xs">Designed for Frontend Assessment</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;