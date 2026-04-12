import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ position: 'relative', overflow: 'visible' }}>
      <Navbar />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
