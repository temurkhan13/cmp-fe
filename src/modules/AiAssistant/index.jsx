// AI-Assistant-chat
import AssistantChat from "./Assistantchat/Chat";

// AiAssistant-Dashboard
import AiAssistant from "./dashboard/pages/AiAssistant";
import Dashboard from "./dashboard/pages/Dashboard";
import DigitalPlaybook from "./dashboard/pages/DigitalPlaybook";
import Feedback from "./dashboard/pages/Feedback";
import HelpCenter from "./dashboard/pages/HelpCenter";
import MyAssistant from "./dashboard/pages/MyAssistant";
import PlanBilling from "./dashboard/pages/PlanBilling";
import Trash from "./dashboard/pages/Trash";

const AiAssistantRoutes = [
  { path: "/assistant-chat", element: <AssistantChat /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboard/AiAssistant", element: <AiAssistant /> },
  { path: "/dashboard/DigitalPlaybook", element: <DigitalPlaybook /> },
  { path: "/dashboard/MyAssistant", element: <MyAssistant /> },
  { path: "/dashboard/PlanBilling", element: <PlanBilling /> },
  { path: "/dashboard/HelpCenter", element: <HelpCenter /> },
  { path: "/dashboard/feedback", element: <Feedback /> },
  { path: "/dashboard/Trash", element: <Trash /> },
];

export default AiAssistantRoutes;
