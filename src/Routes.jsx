import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layout";
import Components from "./components";
import data from "./data";
import AssistantChat from "./modules/AiAssistant/Assistantchat/Chat";
import AssessmentChat from "./modules/Assessment/AssessmentChat/Chat";

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
      <Router>
        <Components.Feature.ScrollToTop />
        <Routes>
          <Route path="" element={<AuthLayout />}>
            {data.routes.authRoutesData.map((el) => (
              <Route path={el.path} element={<el.element />} key={uuidv4()} />
            ))}
          </Route>
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
          <Route path="/assistant-chat" element={<AssistantChat />} />
          <Route path="/assessment-chat" element={<AssessmentChat />} />
        </Routes>
      </Router>
    </>
  );
};
export default Routess;
