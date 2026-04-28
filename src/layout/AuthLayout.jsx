import { Outlet, useLocation } from 'react-router-dom';
import assets from '../assets';
import '../modules/auth/auth-styles.scss';

const AuthLayout = () => {
  const divStyle = {
    backgroundImage: `url("${assets.auth.banner}")`,
  };

  const location = useLocation();
  const isSignUp = location.pathname === '/sign-up';

  return (
    <div className="authLayout">
      <section>
        <div className={`auth-content ${isSignUp ? 'auth-content--signup' : ''}`}>
          <img className="auth-logo" src={assets.common.logo} alt="logo" />
          <Outlet />
        </div>
      </section>
      <div style={divStyle}></div>
    </div>
  );
};

export default AuthLayout;
