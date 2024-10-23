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
  setCurrentAssessmentId,
} from '../../redux/slices/workspacesSlice';
import { selectAllWorkspaces } from '../../redux/selectors/selectors';
import {
  Assessments,
  MessagesSection,
  NewChat,
} from '../../components/assessment';

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

  useEffect(() => {
    if (chatId) {
      dispatch(setCurrentAssessmentId(chatId));
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
        <NewChat data={data.chat.newChatDummyData} />

        <MessagesSection handleAssessmentSelect={handleAssessmentSelect} selectedAssessment={selectedAssessment} />

        <Assessments onAssessmentSelect={handleAssessmentSelect} />
      </section>
    </div>
  );
};

export default Chat;
