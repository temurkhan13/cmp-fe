import React, { Suspense, lazy } from 'react';
import './landing-page.scss';
import Loader from '../../components/common/Loader';

// Lazy load Home
const Home = lazy(() => import('./pages/Home'));

const LandingPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  );
};

export default LandingPage;
