import { v4 as uuidv4 } from "uuid";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layout";
import Components from "./components";
import data from "./data";

const Routess = () => {
  return (
    <>
      <HashRouter>
        <Components.Feature.ScrollToTop />
        <Routes>
          <Route path="" element={<AuthLayout />}>
            {data.routes.authRoutesData.map((el) => (
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
        </Routes>
      </HashRouter>
    </>
  );
};
export default Routess;
