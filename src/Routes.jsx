import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthLayout, PlainsLayout } from './layout';
import LandingPage from './components/LandingPage/LandingPage';
import Components from './components';
import data from './data';
import Layout from './components/LandingPage/services/Layout';
import Loader from './components/common/Loader';
import PrivacyPolicy from './components/LandingPage/components/PrivacyPolicy';
import Terms from './components/LandingPage/components/Terms';
import NotFound from './components/common/NotFound';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.2,
  ease: 'easeOut',
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <LandingPage />
                </Suspense>
              }
            />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
          <Route path="" element={<AuthLayout />}>
            {data.routes.authRoutesData.map((el) => (
              <Route path={el.path} element={<el.element />} key={el.path} />
            ))}
          </Route>
          <Route path="" element={<PlainsLayout />}>
            {data.routes.plainRoutesData.map((el) => (
              <Route path={el.path} element={<el.element />} key={el.path} />
            ))}
          </Route>

          {data.routes.assessmentRoutesData.map((el) => (
            <Route path={el.path} element={<el.element />} key={el.path} />
          ))}
          {data.routes.assisstantRoutesData.map((el) => (
            <Route path={el.path} element={<el.element />} key={el.path} />
          ))}
          {data.routes.dashboardRoutesData.map((el) => (
            <Route path={el.path} element={<el.element />} key={el.path} />
          ))}
          {data.routes.sitemapRoutesData.map((el) => (
            <Route path={el.path} element={<el.element />} key={el.path} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const Routess = () => {
  return (
    <Router>
      <Components.Feature.ScrollToTop />
      <ErrorBoundary>
        <AnimatedRoutes />
      </ErrorBoundary>
    </Router>
  );
};
export default Routess;
