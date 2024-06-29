import { useState } from 'react';
import Components from '../../components';
import data from '../../data';

const Chat = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const handleAssessmentSelect = (assessment) => {
    setSelectedAssessment(assessment);
  };

  return (
    <div className="assessmentChat">
      <Components.Common.Header />
      <section>
        <Components.UI.NewChat data={data.chat.newChatDummyData} />
        <Components.UI.MessagesSection
          data={data.chat.dummyChatData}
          selectedAssessment={selectedAssessment}
        />
        <Components.UI.Assessments
          onAssessmentSelect={handleAssessmentSelect}
        />
      </section>
    </div>
  );
};

export default Chat;
