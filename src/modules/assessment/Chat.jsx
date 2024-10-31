// import { useState } from 'react';
// import Components from '../../components';
// import data from '../../data';

// const Chat = () => {
//   const [selectedAssessment, setSelectedAssessment] = useState(null);

//   const handleAssessmentSelect = (assessment) => {
//     setSelectedAssessment(assessment);
//   };

//   return (
//     <div className="assessmentChat">
//       <Components.Common.Header />
//       <section>
//         <NewChat data={data.chat.newChatDummyData} />
//         <MessagesSection
//           data={data.chat.dummyChatData}
//           selectedAssessment={selectedAssessment}
//         />
//         <Assessments
//           onAssessmentSelect={handleAssessmentSelect}
//         />
//       </section>
//     </div>
//   );
// };

// export default Chat;

import Components from '../../components';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetWorkspacesQuery } from '../../redux/api/workspaceApi';
import data from '../../data';

import {
  setSelectedWorkspace,
  selectWorkspace,
  setCurrentAssessmentId, setCurrentChatId
} from '../../redux/slices/workspacesSlice';
import { selectAllWorkspaces } from '../../redux/selectors/selectors';
import {
  Assessments,
  MessagesSection,
  NewChat,
} from '../../components/assessment';
import { fetchFolderData, setSelectedFolder } from '../../redux/slices/folderSlice.js';

const Chat = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams(); // Extract chatId from the URL
  const userId = useSelector((state) => state.auth.user?.id) || localStorage.getItem('userId');
  

  const { data: workspaces, error, isLoading } = useGetWorkspacesQuery(userId);
  const workspacess = useSelector(selectAllWorkspaces);
  const selectedWorkspace = useSelector(selectWorkspace);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const handleAssessmentSelect = (assessment) => {
    setSelectedAssessment(assessment);
  };



  // Handle initial data loading and workspace selection
  useEffect(() => {
    if (chatId) {
      dispatch(setCurrentAssessmentId(chatId));
    }

    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      dispatch(setSelectedWorkspace(workspaces[0]));
    }

    if (selectedWorkspace?.folders?.length > 0) {
      console.log(selectedWorkspace.folders,'dataaa');
      handleFolderSelection(selectedWorkspace.folders[0], selectedWorkspace.id);
    }

  }, [workspaces, selectedWorkspace, dispatch, chatId]);


  const handleFolderSelection = async (folder, workspaceId = null) => {
    const activeWorkspaceId = workspaceId || selectedWorkspace?.id;
    if (!activeWorkspaceId) {
      // handleError("No workspace ID available.");
      return;
    }

    dispatch(setSelectedFolder(folder)); // Set the selected folder in Redux store

    try {
      console.log(folder,'....................')
      await dispatch(fetchFolderData({ workspaceId: activeWorkspaceId, folderId: folder._id || folder.id })).unwrap();
    } catch (err) {
      // handleError('Failed to fetch folder data.');
    }
  };

  return (
    <div className="assessmentChat">
      <Components.Common.Header
        activeWorkspace={selectedWorkspace}
        workspaces={workspacess}
      />
      <section>
        <NewChat data={data.chat.newChatDummyData} />

        <MessagesSection handleAssessmentSelect={handleAssessmentSelect} selectedAssessment={selectedAssessment} />

        <Assessments onAssessmentSelect={handleAssessmentSelect} />
      </section>
    </div>
  );
};

export default Chat;
