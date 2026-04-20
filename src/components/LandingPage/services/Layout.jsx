import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';
import '../landing-page.scss';

const Layout = () => {
  return (
    <div className="landing-layout">
      <Navbar />
      <main className="landing-layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
