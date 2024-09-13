import Components from '../../components';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetWorkspacesQuery } from '../../redux/api/workspaceApi';

import {
  setSelectedWorkspace,
  selectWorkspace,
  setCurrentChatId,
} from '../../redux/slices/workspacesSlice';
import { selectAllWorkspaces } from '../../redux/selectors/selectors';
import {
  AssistantSidebar,
  MessagesSection,
  NewChat,
} from '../../components/assisstent';

const AiAssistantChat = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams(); // Extract chatId from the URL
  const { data: workspaces, error, isLoading } = useGetWorkspacesQuery();
  const workspacess = useSelector(selectAllWorkspaces);
  const selectedWorkspace = useSelector(selectWorkspace);

  useEffect(() => {
    if (chatId) {
      dispatch(setCurrentChatId(chatId));
    }
    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      const firstWorkspace = workspaces[0];
      dispatch(setSelectedWorkspace(firstWorkspace));
    }
  }, [workspaces, selectedWorkspace, dispatch, chatId]);

  return (
    <div className="assessmentChat">
      <Components.Common.Header
        activeWorkspace={selectedWorkspace}
        workspaces={workspacess}
      />
      <section>
        <NewChat />

        <MessagesSection />

        <AssistantSidebar />
      </section>
    </div>
  );
};

export default AiAssistantChat;
