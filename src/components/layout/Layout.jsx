import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container-custom py-8">
                <Outlet />
            </main>
            <footer className="bg-neutral-900 text-white py-8">
                <div className="container-custom">
                    <p className="text-center text-sm text-neutral-400">
                        © 2024 Fake Store. Frontend Technical Assessment.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
