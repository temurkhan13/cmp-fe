import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import FileStructure from "../../components/dashboard/FileStructure";
import FolderStructure from "../../components/dashboard/FolderStructure";
import AssistantBar from "../../components/dashboard/AssistantBar";

const Layout = () => {
  return (
    <div className="LayOutContiner">
      <Header />
      <Sidebar />
      <AssistantBar />
      <FolderStructure />
      <FileStructure />
    </div>
  );
};

export default Layout;
