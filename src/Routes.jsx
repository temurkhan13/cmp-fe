import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layout";
import Components from "./components";
import data from "./data";
import Layout from "./modules/dashboard/Layout";

const Routess = () => {
  return (
    <>
      <Router>
        <Components.Feature.ScrollToTop />
        <Routes>
          <Route path="" element={<AuthLayout />}>
            {data.routes.authRoutesData.map((el) => (
              <Route path={el.path} element={<el.element />} key={uuidv4()} />
            ))}
          </Route>
          <Route path="/dashboard" element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
};
export default Routess;
