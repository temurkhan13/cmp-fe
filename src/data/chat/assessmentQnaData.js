const assessmentQnaData = [
  'Change Vision/Case for Change',
  'Change Approach/Strategy',
  'Change Impact Assessment',
  'Stakeholder Assessment/Map',
  'Training Needs Assessment',
  'Transition to Sustain',
  'ADKAR Assessment',
  "What's Changing and What is Not - Summary",
  'Training Plan',
  'Communications Plan',
  'Engagement & Change Plan',
  'Readiness Assessment',
  'Health Check',
  'Managing Resistance',
  'Key Messages by Stakeholder Group',
  'Briefing Messages',
  'Communications Messages',
  "FAQ's",
  'Champions Survey',
  'User Feedback Survey',
  'Training Feedback Survey',
  'Post Go Live Feedback Survey',
  'Change KPIs/User Adoption Statistics',
  'Benefits',
];

const assessmentDescriptions = {
  'Change Vision/Case for Change':
    'ChangeAI will generate the rationale behind the change for your transformation. It will define the future state and benefits of implementing the change. A change vision/case for change will help in securing stakeholder buy-in and guiding the overall change process. At the end you will receive an editable, tailored Change Vision/Case for Change for your transformation.',
  'Change Approach/Strategy':
    'ChangeAI will outline the methodology and strategic approach to implementing change on your transformation programme. It ensures that all steps are planned and aligned with organisational goals for a seamless transition. At the end you will receive an editable, tailored Change Approach for your transformation.',
  'Change Impact Assessment':
    'ChangeAI will identify the effects of the change on various aspects of the organisation, including processes, systems, and roles. It helps in planning mitigations for potential negative impacts. At the end you will receive an editable, tailored Change Impact Assessment for your transformation.',
  'Stakeholder Assessment/Map':
    'ChangeAI will map out the stakeholders affected by the change, analysing their interests and influence. It helps in developing targeted communication and engagement strategies. At the end you will receive an editable Stakeholder Assessment and Map for your transformation.',
  'ADKAR Assessment':
    'ChangeAI will use the ADKAR model to generate individual readiness for change based on Awareness, Desire, Knowledge, Ability, and Reinforcement. It is crucial for personalising change management strategies and developing key messages. At the end you will receive an editable ADKAR for your transformation.',
  'Training Needs Assessment':
    'ChangeAI will determine the training needs of your stakeholders to ensure they have the necessary skills and knowledge to adapt to the change. It helps in developing effective training programs. At the end you will receive an editable Training Needs Assessment for your transformation.',
  "What's Changing and What is Not - Summary":
    'ChangeAI will provide a clear distinction between elements that will change and those that will remain the same, helping stakeholders understand the scope of the change. At the end you will receive an editable summary of What\'s Changing and What\'s Not for your transformation.',
  'Training Plan':
    'ChangeAI will outline the detailed training approach, schedule, and resources required to equip stakeholders with the necessary skills for the change. At the end you will receive an editable Training Plan for your transformation.',
  'Communications Plan':
    'ChangeAI will generate a multi-channel communications plan, which covers all necessary aspects for effectively conveying the change to your impacted stakeholder groups. At the end you will receive an editable, tailored Communications Plan for your transformation.',
  'Engagement & Change Plan':
    'ChangeAI will generate this plan to help you engage stakeholders and manage your change workstream throughout the transformation to ensure their involvement and support. At the end you will receive an editable, tailored Engagement & Change Plan for your transformation.',
  'Benefits':
    'ChangeAI will generate a set of benefits that you can use to monitor and report against key benefits related to the adoption and success of the change. At the end you will receive an editable set of Benefits for your transformation.',
  'Change KPIs/User Adoption Statistics':
    'ChangeAI will generate user adoption statistics you can use to measure the change adoption and effectiveness. At the end you will receive an editable set of Change KPIs to measure user adoption for your transformation.',
  'Key Messages by Stakeholder Group':
    'ChangeAI will generate key messages tailored and relevant to your key stakeholder groups, addressing their specific needs and concerns. At the end you will receive an editable, tailored set of Key Messages by Stakeholder Group for your transformation.',
  'Briefing Messages':
    'ChangeAI will generate content that you can use when briefing stakeholders to help keep them informed. At the end you will receive an editable, tailored set of Briefing Messages for your transformation.',
  'Communications Messages':
    'ChangeAI will generate content for important communication messages you will need to send to impacted stakeholder groups in the countdown to launch. At the end you will receive an editable set of tailored Communications Messages for your transformation.',
  'Health Check':
    'ChangeAI will generate this periodic health check to ensure that the change process is on track and that any issues are identified and addressed promptly. At the end you will receive an editable Health Check assessment for your transformation.',
  "FAQ's":
    'ChangeAI will create frequently answered questions (FAQs) to provide clear information to stakeholders about your transformation. Answer the questions or upload a document and ChangeAI will generate FAQs from it. At the end you will receive an editable, tailored list of FAQs for your transformation.',
  'Readiness Assessment':
    'ChangeAI will generate the preparedness of your organisation or impacted stakeholders for the upcoming change, identifying areas that need more focus. At the end you will receive an editable Readiness Assessment for your transformation.',
  'Managing Resistance':
    'ChangeAI will provide you with a strategy to overcome potential resistance to change to help you manage and mitigate anticipated resistance effectively. At the end you will receive editable guidelines for Managing Resistance for your transformation.',
  'Champions Survey':
    'ChangeAI will generate a survey that you can use to gather feedback and insights from change champions to assess their engagement and the effectiveness of the change management. At the end you will receive an editable Champions Survey for your transformation.',
  'User Feedback Survey':
    'ChangeAI will generate a survey that you can use to collect feedback from users affected by the change to understand their perception of the change management covering engagement, communications and training and help you gather suggestions for improvement. At the end you will receive an editable User Feedback Survey for your transformation.',
  'Training Feedback Survey':
    'ChangeAI will generate a survey that you can use to obtain feedback on training sessions and materials to ensure they meet the needs of your impacted stakeholders. At the end you will receive an editable Training Feedback Survey for your transformation.',
  'Post Go Live Feedback Survey':
    'ChangeAI will generate a survey that you can use to understand the effectiveness and adoption of the change post launch, identifying any areas that need further attention. At the end you will receive an editable Post-Go Live Feedback Survey for your transformation.',
  'Transition to Sustain':
    'ChangeAI will generate a summary of topics you will need to consider when transitioning your transformation to business as usual. At the end you will receive an editable summary of these key topics.',
};

const assessmentPhases = {
  'Change Vision/Case for Change': 'Discovery',
  'Change Approach/Strategy': 'Discovery',
  'Change Impact Assessment': 'Discovery',
  'Stakeholder Assessment/Map': 'Discovery',
  'ADKAR Assessment': 'Discovery',
  'Training Needs Assessment': 'Design',
  "What's Changing and What is Not - Summary": 'Design',
  'Training Plan': 'Design',
  'Communications Plan': 'Design',
  'Engagement & Change Plan': 'Design',
  'Benefits': 'Benefits',
  'Change KPIs/User Adoption Statistics': 'Benefits',
  'Key Messages by Stakeholder Group': 'Deploy',
  'Briefing Messages': 'Deploy',
  'Communications Messages': 'Deploy',
  'Health Check': 'Deploy',
  "FAQ's": 'Deploy',
  'Readiness Assessment': 'Adopt',
  'Managing Resistance': 'Adopt',
  'Champions Survey': 'Adopt',
  'User Feedback Survey': 'Adopt',
  'Training Feedback Survey': 'Adopt',
  'Post Go Live Feedback Survey': 'Adopt',
  'Transition to Sustain': 'Run',
};

export { assessmentDescriptions, assessmentPhases };
export default assessmentQnaData;
