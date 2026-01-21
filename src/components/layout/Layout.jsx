import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ToastContainer from '../common/Toast';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container-custom py-8">
                <Outlet />
            </main>
            <Footer />
            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Layout;