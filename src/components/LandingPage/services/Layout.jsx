import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="md:px-10 px-5">
      <Navbar />
      <main className="flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
