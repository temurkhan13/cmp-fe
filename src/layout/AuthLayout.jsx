import { Outlet } from 'react-router-dom';
import assets from '../assets';
import '../modules/auth/auth-styles.scss';

const AuthLayout = () => {
  const divStyle = {
    backgroundImage: `url("${assets.auth.banner}")`,
  };
  return (
    <div className="authLayout">
      <section>
        <div>
          <img src={assets.common.logo} alt="logo" />
          <Outlet />
        </div>
      </section>
      <div style={divStyle}></div>
    </div>
  );
};

export default AuthLayout;
