import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ToastContainer from '../common/Toast';

/**
 * Layout Component
 * Main application layout wrapper
 * 
 * @component
 */
const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="layout-content">
                <Outlet />
            </main>
            <Footer />
            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Layout;