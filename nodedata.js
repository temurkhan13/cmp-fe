const res = {
  message: 'Generate a sitemap',
  stages: [
    {
      _id: '66b0d3458fa73c66f119979f',
      stage: 'Playbook Introduction',
      response: {
        message: {
          'Playbook Introduction': {
            Adopt: '',
            Deploy: '',
            Design: '',
            Discovery: '',

            Run: '',
          },
        },
      },
    },
  ],
  id: '66b0d3408fa73c66f119979d',
};

const formatted = [
    id: '66b0d3408fa73c66f119979d',
  {
    stage: 'Playbook Introduction',
    nodeData: [
      {
        heading: 'How to use playbook',
        description:
          'Each section of the playbook is summarized to guide users through the change management steps effectively.',
      },
      {
        heading: 'Playbook Content',
        description:
          'The main sections of the playbook are Discovery, Design, Deploy, Adopt, and Run.',
      },
      {
        heading: 'Purpose & Introduction',
        description:
          'This playbook serves as a comprehensive guide to the change management process from start to finish.',
      },
    ],
    nodes: [
      {
        heading: 'Adopt',
      },
      {
        heading: 'Deploy',
      },
    ],
  },
  {
    stage: 'Discovery',
    nodeData: [
      {
        heading: 'About',
        description: 'Content',
      },

    ],
    nodes: [
      {
        heading: 'Adopt',
        NodeData:[
            {
                heading: 'About',
                description:'Content'
            }
        ]
      },
      {
        heading: 'Deploy',
      },
    ],
  },

];
