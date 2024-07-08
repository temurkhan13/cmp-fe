import Components from "@components";
import React, { useState } from 'react';

const AiAssistantChat = () => {


 

  return (
    <div className="assessmentChat">
      <Components.Common.Header />
      <section>
        <Components.Assistant.NewChat />
        
        <Components.Assistant.MessagesSection />
        
        <Components.Assistant.Assessments />
      </section>
    </div>
  );
};

export default AiAssistantChat;
