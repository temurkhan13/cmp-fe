import { useState } from 'react';
import PropTypes from 'prop-types';

import Header from '@components/dashboard/Header';
import FileStructure from '../../components/dashboard/FileStructure';

import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import { PiFilesFill } from 'react-icons/pi';
import { FaFolderOpen, FaNetworkWired } from 'react-icons/fa';
import { BiSolidCollection, BiSolidFolderOpen } from 'react-icons/bi';

const cardData = [
  {
    icon: <BiSolidCollection style={{ fontSize: '2rem' }} />,
    title: 'Total WorkSpaces',
    count: 30,
    hoverColor: '#e0f7fa',
  },
  {
    icon: <PiFilesFill style={{ fontSize: '2rem' }} />,
    title: 'Total Assessments',
    count: 30,
    hoverColor: '#ffebee',
  },
  {
    icon: <BiSolidFolderOpen style={{ fontSize: '2rem' }} />,
    title: 'Total chat Assistants',
    count: 30,
    hoverColor: '#f3e5f5',
  },
  {
    icon: <FaNetworkWired style={{ fontSize: '2rem' }} />,
    title: 'Total Wireframes',
    count: 30,
    hoverColor: '#fff3e0',
  },
];

const DashboardHomeComp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [folders, setFolders] = useState([
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'Artificial',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
    {
      name: 'AI Research',
      details: {
        section1: {
          heading: 'Heading 1 - 1',
          recentFiles: [
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Logos_1' },
            { name: 'UI_1' },
            { name: 'Mockups_1' },
            { name: 'Illustrations_1' },
            { name: 'Animations_1' },
          ],
        },
        section2: {
          heading: 'Heading 2 - 1',
          recentFiles: [
            { name: 'API_Doc_1.docx' },
            { name: 'Backend_Arch_1.pptx' },
            { name: 'DesignSpec_1.pdf' },
            { name: 'Wireframe_1.sketch' },
          ],
          folders: [
            { name: 'Frontend_1' },
            { name: 'Backend_1' },
            { name: 'Database_1' },
            { name: 'APIs_1' },
            { name: 'Testing_1' },
          ],
        },
      },
    },
  ]);

  const mockFiles = [
    { name: 'AI Overview' },
    { name: 'Machine Learning Basics' },
    { name: 'Advanced Neural Networks' },
    { name: 'Introduction to NLP' },
    { name: 'AI in Robotics' },
    { name: 'Reinforcement Learning Concepts' },
    { name: 'AI and Ethics' },
    { name: 'AI in Healthcare Applications' },
    { name: 'AI in Financial Services' },
    { name: 'Data Science Techniques' },
    { name: 'Predictive Modeling' },
    { name: 'AI and Privacy' },
    { name: 'Computer Vision Applications' },
    { name: 'Deep Learning Explained' },
    { name: 'AI for Beginners' },
    { name: 'AI Research Papers' },
    { name: 'Natural Language Processing Guide' },
    { name: 'Understanding AI Algorithms' },
    { name: 'AI in Marketing' },
    { name: 'AI in Education' },
    { name: 'AI Overview' },
    { name: 'Machine Learning Basics' },
    { name: 'Advanced Neural Networks' },
    { name: 'Introduction to NLP' },
    { name: 'AI in Robotics' },
    { name: 'Reinforcement Learning Concepts' },
    { name: 'AI and Ethics' },
    { name: 'AI in Healthcare Applications' },
    { name: 'AI in Financial Services' },
    { name: 'Data Science Techniques' },
    { name: 'Predictive Modeling' },
    { name: 'AI and Privacy' },
    { name: 'Computer Vision Applications' },
    { name: 'Deep Learning Explained' },
    { name: 'AI for Beginners' },
    { name: 'AI Research Papers' },
    { name: 'Natural Language Processing Guide' },
    { name: 'Understanding AI Algorithms' },
    { name: 'AI in Marketing' },
  ];

  const toggleModal = (folder) => {
    setSelectedFolder(folder);
    setIsModalOpen(!isModalOpen);
  };

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  const handleNewWorkspaceSubmit = () => {
    if (newWorkspaceName.trim()) {
      const newFolder = { name: newWorkspaceName, items: [] };
      setFolders([...folders, newFolder]);
      setNewWorkspaceName('');
      setIsNewWorkspaceModalOpen(false);
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="counting-cards">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="card"
            style={{ '--hover-color': card.hoverColor }}
          >
            <p className="count-heading">
              {card.icon}
              {card.title}
            </p>
            <p className="counts">{card.count}</p>
          </div>
        ))}
      </div>

      <div className="collection">
        <p className="collection-heading">WorkSpaces</p>
        <button
          className="workspace-btn"
          onClick={() => setIsNewWorkspaceModalOpen(true)}
        >
          New WorkSpace <AiOutlinePlus style={{ fontSize: '2rem' }} />
        </button>
        <div className="icons">
          {folders.map((folder, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="icon-container">
                <BiSolidCollection
                  onClick={() => toggleModal(folder)}
                  className="collection-icon"
                />
              </div>
              <span style={{ fontSize: '1.3rem' }} title={folder.name}>
                {truncateString(folder.name, 8)}
              </span>
            </div>
          ))}
        </div>

        {isModalOpen && selectedFolder && (
          <div className="modal">
            <div className="modal-wrapper">
              <h3 className="modal-heading">{selectedFolder.name}</h3>
              <button
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'lightgray',
                  width: '3rem',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.8rem',
                  borderRadius: '50%',
                }}
                className="modal-closebtn"
                onClick={() => setIsModalOpen(false)}
              >
                <RxCross2 />
              </button>
            </div>
            <div style={{ display: 'flex' }}>
              <ul>
                <div className="modal-sections">
                  <div className="section1">
                    <span className="section-heading">
                      {selectedFolder.details.section1.heading}
                    </span>
                    {selectedFolder.details.section1.recentFiles.map(
                      (item, index) => (
                        <ul key={index}>
                          <li className="section-list-item">
                            <FaFolderOpen
                              style={{
                                marginRight: '8px',
                                fontSize: '1.5rem',
                                color: 'gray',
                              }}
                            />
                            {item.name}
                          </li>
                        </ul>
                      )
                    )}
                    <div className="section-folders">
                      {selectedFolder.details.section1.folders.map(
                        (folder, i) => (
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.2rem',
                            }}
                          >
                            <FaFolderOpen
                              style={{
                                marginLeft: '8px',
                                fontSize: '4.5rem',
                                color: 'gray',
                              }}
                            />
                            <div title={folder.name}>
                              {truncateString(folder.name, 6)}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="section2">
                    <span className="section-heading">
                      {selectedFolder.details.section2.heading}
                    </span>
                    {selectedFolder.details.section2.recentFiles.map(
                      (item2, indx) => (
                        <ul key={indx}>
                          <li className="section-list-item">
                            <FaFolderOpen
                              style={{
                                marginRight: '8px',
                                fontSize: '1.5rem',
                                color: 'gray',
                              }}
                            />
                            {item2.name}
                          </li>
                        </ul>
                      )
                    )}
                    <div className="section-folders">
                      {selectedFolder.details.section2.folders.map(
                        (folder2, i) => (
                          <div key={i}>
                            <FaFolderOpen
                              style={{
                                marginLeft: '8px',
                                fontSize: '4.5rem',
                                color: 'gray',
                              }}
                            />
                            <div title={folder2.name}>
                              {truncateString(folder2.name, 6)}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="files-and-folders">
        <div className="files">
          <p className="files-heading">AI Assessments</p>
          <div className="heading">
            <p>Recent</p>
            <p className="see-less">See less</p>
          </div>
          <div className="file-list">
            {mockFiles.map((file, index) => (
              <div key={index} className="file-item">
                <PiFilesFill style={{ fontSize: '6rem', color: 'gray' }} />
                <span title={file.name}>{truncateString(file.name, 6)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="folders">
          <p className="files-heading">AI Assistant</p>
          <FileStructure />
        </div>
      </div>

      {isNewWorkspaceModalOpen && (
        <div className="modal">
          <div className="modal-wrapper">
            <h3 className="modal-heading">Create New WorkSpace</h3>
            <button
              className="modal-closebtn"
              onClick={() => setIsNewWorkspaceModalOpen(false)}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            className="workspace-input"
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            placeholder="Enter workspace name"
          />
          <button
            onClick={handleNewWorkspaceSubmit}
            className="create-workspace-btn"
          >
            Create
          </button>
        </div>
      )}
      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
          .counting-cards{
          display:flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom:1rem;
          }
          .card{
          display:flex;
          flex-direction: column;
          padding:2rem 0;
          cursor:pointer;
          align-items: center;
          justify-content: space-around;
          width:25rem;
          background-color: white;
          box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px;
          transition:all 0.1s linear;
          border-radius:1rem;
          &:hover{
            background-color: var(--hover-color);
          }
          }
          .count-heading{
          font-size: 1.5rem;
          font-weight: 500;
          display:flex;
          align-items: center;
          justify-content: center;
          }
          .counts{
          font-size: 2.5rem;
          font-weight:500;
          color:#0B1444;
          }
        .collection{
          }
          .icons {
          padding:0 3rem;
          display: flex;
          flex-wrap: wrap;
          color:gray;
          font-size:6rem;
          gap: 0.3rem;
        }
          .workspace-btn{
          display: flex;
          align-items: center;
          justify-content: center;
          gap:0.5rem;
          border:none;
          outline:none;
          margin-left:1rem;
          margin-bottom:2rem;
          border-radius:1rem;
          font-size:1.5rem;
          font-weight:600;
          padding:1rem 2rem;
          background-color:#C3E11D;
            }
          .collection-heading{
          font-size: 2.5rem;
          display:flex;
          align-items: center;
          justify-content: center;
          margin-top:2rem;
          margin:0 1rem;
          margin-bottom:2rem;
          font-weight: 600;
          background-color:#f2f9cf;
          color:#0B1444;
          padding:5rem;
          border-radius:1rem;
          }
        .icon-container {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem;
          border-radius: 0.5rem;
        }
        .three-dots {
          position: absolute;
          top: 0;
          left: 5.5rem;
          color:black;
          font-size: 1.3rem;
          cursor: pointer;
        }
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          box-shadow: 0 0 24px rgba(0, 0, 0, 0.5);
          border-radius:1rem;
        }
          .modal-wrapper{
          display:flex;
          align-items:center;
          justify-content: space-between;
          gap:2rem;

          }
          .modal-heading{
          font-size: 2rem;
          padding:1rem 0;
          }
          .modal-sections{
          display:flex;
          gap:2rem;
          }
          }
          .modal-closebtn{
          border:none;
          outline:none;
          background-color: lightgray;
          display:flex;
          font-size:2rem;
          padding:0.5rem;
          border-radius:50%;
          }
          .section-list-item{
          display:flex;
          align-items: center;
          list-style:none;
          padding:1rem 1.5rem;
          font-size:1.5rem;
          cursor:pointer;
          border-radius:0.8rem;
          &:hover{
          background-color: lightgray;
          }
          }
          .section2{
          border-left:2px solid #ccc;
          padding-left:2rem;
          }
          .section-folders{
          display:flex;
          align-items: center;
          gap:1.5rem;

          }
          .files{
          width:50%;
          border-right:2px solid lightgray;
        //   padding:0 2rem;
          }
          .files-heading{
          font-size: 2.5rem;
          display:flex;
          font-weight:600;
        //   margin-top:3rem;
          margin-bottom:2rem;
          padding:0 2rem;
          }
        .file-list {
          display: flex;
          flex-wrap:wrap;
          flex-direction: row;
          justify-content:center;
        //   gap: 1rem;
        }
        .file-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: gray;
          cursor: pointer;
          font-size: 1.25rem;
          gap: 1rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
          &:hover {
            background-color: lightgray;
          }
        }
        .file-item span {
          margin-left: 8px;
        }
          .section-heading{
          font-size: 1.5rem;
          font-weight: bold;
          }
          .folders{
          width:50%;
        //   padding:0 2rem;
          }
          input {
            width: 100%;
            padding: 0.5rem;
            margin: 1rem 0;
            border: 1px solid #ccc;
            border-radius: 0.25rem;
          }
            .workspace-input{
            border:1px solid #ccc;
            border-radius:1rem;
            outline:none;
            padding:1rem 1rem;
            }
          .create-workspace-btn{
          gap:0.5rem;
          border:none;
          outline:none;
          font-weight:600;
          font-size:1.5rem;
          padding:1rem 2rem;
          margin-bottom:2rem;
          border-radius:1rem;
          background-color:#C3E11D;
            }
          .collection-icon{
          cursor:pointer;
          transition:all 0.2s linear;
          &:hover{
          transform: scaleY(1.05);
          color:#000;
          }
          }
          .files-and-folders{
          margin-top:5em;
          display:flex;
          
          }
      `}</style>
    </div>
  );
};

DashboardHomeComp.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  additionalComponent: PropTypes.node,
};

export default DashboardHomeComp;
