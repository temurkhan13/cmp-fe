import { useEffect, useState } from 'react';

import Component from '@components';
import useManagerChat from '@hooks/useManagerChat';
import DashboardLayout from '@layout/DashboardLayout';
import RecentCards from '../../components/dashboard/RecentCard';

const AiAssistant = () => {
  const { managerData, error } = useManagerChat();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (managerData) {
      setIsLoading(false);
    }
  }, [managerData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const recentChats = managerData.folders.flatMap((folder) =>
    folder.chats.map((chat) => [folder.name, chat])
  );

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <Component.Dashboard.Header />
      </div>
      <Component.Dashboard.AssistantBar />
      <RecentCards chats={recentChats} />
      <Component.Dashboard.FileStructure />
      {/* <Component.Dashboard.FolderStructure /> */}
      <div></div>
    </DashboardLayout>
  );
};

export default AiAssistant;
