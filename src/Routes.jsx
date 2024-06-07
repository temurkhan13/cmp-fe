import { v4 as uuidv4 } from "uuid";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layout";
import Components from "./components";
import data from "./data";
import Chat from "./modules/AiAssistant/chat/Chat";

import AiAssistant from "./modules/AiAssistant/dashboard/pages/AiAssistant";
import MyAssistant from "./modules/AiAssistant/dashboard/pages/MyAssistant";
import DigitalPlaybook from "./modules/AiAssistant/dashboard/pages/DigitalPlaybook";
import PlanBilling from "./modules/AiAssistant/dashboard/pages/PlanBilling";
import HelpCenter from "./modules/AiAssistant/dashboard/pages/HelpCenter";
import Feedback from "./modules/AiAssistant/dashboard/pages/Feedback";
import Trash from "./modules/AiAssistant/dashboard/pages/Trash";
import Sidebar from "./layout/DashboardLayout";
import Dashboard from "./modules/AiAssistant/dashboard/pages/Dashboard";

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

          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/Sidebar" element={<Sidebar />} />
          <Route path="/dashboard/AiAssistant" element={<AiAssistant />} />
          <Route path="/dashboard/MyAssistant" element={<MyAssistant />} />
          <Route
            path="/dashboard/DigitalPlaybook"
            element={<DigitalPlaybook />}
          />
          <Route path="/dashboard/PlanBilling" element={<PlanBilling />} />
          <Route path="/dashboard/HelpCenter" element={<HelpCenter />} />
          <Route path="/dashboard/feedback" element={<Feedback />} />
          <Route path="/dashboard/Trash" element={<Trash />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </HashRouter>
    </>
  );
};
export default Routess;
