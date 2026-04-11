import { Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthLayout, PlainsLayout } from './layout';
import LandingPage from './components/LandingPage/LandingPage';
import Components from './components';
import data from './data';
import Layout from './components/LandingPage/services/Layout';
import Loader from './components/common/Loader';
import PrivacyPolicy from './components/LandingPage/components/PrivacyPolicy';
import Terms from './components/LandingPage/components/Terms';

const Routess = () => {
  return (
    <>
      <Router>
        <Components.Feature.ScrollToTop />
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
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
          <Route path="" element={<AuthLayout />}>
            {data.routes.authRoutesData.map((el) => (
              <Route path={el.path} element={<el.element />} key={uuidv4()} />
            ))}
          </Route>
          <Route path="" element={<PlainsLayout />}>
            {data.routes.plainRoutesData.map((el) => (
              <Route path={el.path} element={<el.element />} key={uuidv4()} />
            ))}
          </Route>

          {data.routes.assessmentRoutesData.map((el) => (
            <Route path={el.path} element={<el.element />} key={uuidv4()} />
          ))}
          {data.routes.assisstantRoutesData.map((el) => (
            <Route path={el.path} element={<el.element />} key={uuidv4()} />
          ))}
          {data.routes.dashboardRoutesData.map((el) => (
            <Route path={el.path} element={<el.element />} key={uuidv4()} />
          ))}
          {data.routes.sitemapRoutesData.map((el) => (
            <Route path={el.path} element={<el.element />} key={uuidv4()} />
          ))}
        </Routes>
      </Router>
    </>
  );
};
export default Routess;
