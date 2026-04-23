import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthLayout, PlainsLayout } from './layout';
import LandingPage from './components/LandingPage/LandingPage';
import Components from './components';
import data from './data';
import Layout from './components/LandingPage/services/Layout';
import Loader from './components/common/Loaders';
import PrivacyPolicy from './components/LandingPage/components/PrivacyPolicy';
import Terms from './components/LandingPage/components/Terms';
import NotFound from './components/common/NotFound';
import ErrorBoundary from './components/common/ErrorBoundary';
import CommandPalette from './components/common/CommandPalette';
import { motion } from 'framer-motion';

const PageFade = ({ children }) => (
  <Suspense fallback={<Loader />}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  </Suspense>
);

const Routess = () => {
  return (
    <Router>
      <Components.Feature.ScrollToTop />
      <CommandPalette />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <LandingPage />
                </Suspense>
              }
            />
            <Route path="privacy-policy" element={<PageFade><PrivacyPolicy /></PageFade>} />
            <Route path="terms" element={<PageFade><Terms /></PageFade>} />
          </Route>
          <Route path="" element={<AuthLayout />}>
            {data.routes.authRoutesData.map((el) => (
              <Route path={el.path} element={<PageFade><el.element /></PageFade>} key={el.path} />
            ))}
          </Route>
          <Route path="" element={<PlainsLayout />}>
            {data.routes.plainRoutesData.map((el) => (
              <Route path={el.path} element={<PageFade><el.element /></PageFade>} key={el.path} />
            ))}
          </Route>

          {data.routes.assessmentRoutesData.map((el) => (
            <Route path={el.path} element={<PageFade><el.element /></PageFade>} key={el.path} />
          ))}
          {data.routes.assistantRoutesData.map((el) => (
            <Route path={el.path} element={<PageFade><el.element /></PageFade>} key={el.path} />
          ))}
          {data.routes.dashboardRoutesData.map((el) => (
            <Route path={el.path} element={<PageFade><el.element /></PageFade>} key={el.path} />
          ))}
          {data.routes.sitemapRoutesData.map((el) => (
            <Route path={el.path} element={<PageFade><el.element /></PageFade>} key={el.path} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};
export default Routess;
