import { Outlet } from 'react-router-dom';
import Components from '../components';
import assets from '../assets';

const PlansLayout = () => {
  return (
    <Components.Feature.Container className="main">
      <div className="plansLayout">
        <img src={assets.common.logo} alt="logo" />
        <section>
          <Outlet />
        </section>
      </div>
    </Components.Feature.Container>
  );
};

export default PlansLayout;
