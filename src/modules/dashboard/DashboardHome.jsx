import DashboardLayout from "../../layout/DashboardLayout";
import Header from "../../components/dashboard/Header";
import AssistantBar from "../../components/dashboard/AssistantBar";
import FileStructure from "../../components/dashboard/FileStructure";
import FolderStructure from "../../components/dashboard/FolderStructure";

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <Header />
      <AssistantBar />
      <FileStructure />
      <FolderStructure />
    </DashboardLayout>
  );
};

export default DashboardHome;
