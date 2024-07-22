import { useState } from 'react';
import PropTypes from 'prop-types';

import Header from '@components/dashboard/Header';
// import RecentCard from '../../components/dashboard/RecentCard';
import card1 from '../../assets/dashboard/card1.svg';
import FileStructure from '../../components/dashboard/FileStructure';

import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import { PiFilesFill } from 'react-icons/pi';
import { FaFolderOpen, FaNetworkWired } from 'react-icons/fa';
import { BiSolidCollection, BiSolidFolderOpen } from 'react-icons/bi';
import { BsWindowStack } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import { TiPlus } from 'react-icons/ti';
import { BsFilterLeft } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsFilterCircle } from 'react-icons/bs';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { TfiMenuAlt } from 'react-icons/tfi';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import { CgMenuGridR } from 'react-icons/cg';

const cardData = [
  {
    icon: <BiSolidCollection style={{ fontSize: '3.5rem', color: 'gray ' }} />,
    title: 'WorkSpaces',
    count: 30,
    background: card1,
  },
  {
    icon: <PiFilesFill style={{ fontSize: '3.5rem', color: 'gray' }} />,
    title: 'Assessments',
    count: 30,
    background: card1,
  },
  {
    icon: <BiSolidFolderOpen style={{ fontSize: '3.5rem', color: 'gray' }} />,
    title: 'Chat Assistants',
    count: 30,
    background: card1,
  },
  {
    icon: <FaNetworkWired style={{ fontSize: '3.5rem', color: 'gray' }} />,
    title: 'Wireframes',
    count: 30,
    background: card1,
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
            className="dashboard-card"
            style={{
              background: `url(${card.background}) no-repeat`,
              backgroundSize: 'cover',
            }}
          >
            <div className="count-heading">
              <div>{card.icon}</div>
              <div>{card.title}</div>
            </div>
            <div
              className="counts"
              style={{
                fontSize: `${
                  String(card.count).length > 3 ? '2.8rem' : '5rem'
                }`,
              }}
            >
              {card.count}
            </div>
          </div>
        ))}
      </div>

      <div className="collection">
        {/* <p>WorkSpace</p> */}
        <div className="workspace-header">
          <p className="collection-heading">Workspaces</p>
          <button
            className="workspace-btn"
            onClick={() => setIsNewWorkspaceModalOpen(true)}
          >
            New WorkSpace <AiOutlinePlus style={{ fontSize: '2rem' }} />
          </button>
        </div>
        {/* <hr className="straight-line" /> */}

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
                <BsWindowStack
                  onClick={() => toggleModal(folder)}
                  className="collection-icon"
                />
                <span style={{ fontSize: '1.3rem' }} title={folder.name}>
                  {truncateString(folder.name, 8)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedFolder && (
          <div className="modal">
            <div className="modal-wrapper">
              <h3 className="modal-heading">{selectedFolder.name}</h3>
              <button
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
                    <div className="section-heading">
                      {selectedFolder.details.section1.heading}
                      <Link
                        to="/assisstant/chat"
                        target="_blank"
                        className="link_chat"
                      >
                        New Assisstant <GoPlus style={{ fontSize: '2rem' }} />
                      </Link>
                    </div>
                    <div className="folder-wrapper">
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
                    </div>
                    <hr />
                    <div className="section-folders">
                      {selectedFolder.details.section1.folders.map(
                        (folder, i) => (
                          <div key={i} className="folder-icon">
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
                    <div className="section-heading">
                      {selectedFolder.details.section2.heading}
                      <Link
                        to="/assessment/chat"
                        target="_blank"
                        className="link_chat"
                      >
                        New Assessment <GoPlus style={{ fontSize: '2rem' }} />
                      </Link>
                    </div>
                    <div className="folder-wrapper">
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
                    </div>
                    <hr />
                    <div className="section-folders">
                      {selectedFolder.details.section2.folders.map(
                        (folder2, i) => (
                          <div key={i} className="folder-icon">
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
      <section className="generate" style={{ marginTop: '2rem' }}>
        <div className="container">
          <div className="left-buttons">
            <button className="arrow-btn">
              <SlArrowLeft />
            </button>
            <button className="arrow-btn">
              <SlArrowRight />
            </button>
            <p className="assistant-heading">AI Assistant</p>
          </div>

          <div className="center-buttons">
            <div className="left-buttons">
              <CgMenuGridR className="icon" />
              <TfiMenuAlt className="icon-small" />
            </div>
            <div className="right-buttons">
              <BsFilterLeft className="filter-icon" />
              <MdOutlineKeyboardArrowDown className="icon-small" />
            </div>
            <div className="right-buttons">
              <BsFilterCircle className="icon-small" />
              <MdOutlineKeyboardArrowDown className="icon-small" />
            </div>
            <div className="right-buttons">
              <HiAdjustmentsHorizontal className="adjustments-icon" />
            </div>
            <div>
              <Link
                to="/assisstant/chat"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <button className="ass-btn-ass">
                  <TiPlus />
                  New Assistant
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <RecentCard /> */}

      <div className="folders">
        <p className="files-heading"></p>
        <FileStructure />
      </div>
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
              {/* <span
                style={{
                  color: 'rgba(0, 102, 255, 1)',
                }}
              >
                2 Files
              </span> */}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="files-and-folders"></div> */}

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
          // flex-direction:column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom:1rem;
          margin:1rem 2rem;
           @media screen and (max-width: 1240px) {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
           }
          }
          .dashboard-card{
          display:flex;
          flex-direction: column;
          padding:1rem;
          align-items: center;
          justify-content: space-around;
          width:30rem;
          height:15rem;
          background-position:right;
          transition:all 0.1s linear; 
          border-radius:2rem !important;
          background-color: white !important;
           @media screen and (max-width: 1240px) {
            width: auto;
            height:20rem;
           }
          }
          .count-heading{
          font-size: 2rem;
          font-weight: 500;
          display:flex;
          flex-direction:row-reverse;  
          align-items: flex-start;
          width:100%;
          padding:0 1rem;
          justify-content: space-between;
          }
          .counts{
          font-weight: bold;
    color: gray;
    width: 100%;
    margin-left: 2rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
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
          border-radius:1rem;
          font-size:1.5rem;
          font-weight:600;
          padding:1rem 2rem;
          background-color:#C3E11D;
            }
          .collection-heading{
          font-size: 2.5rem;
          font-weight: 500;
          }
          .workspace-header{
          display:flex;
          align-items: center;
          justify-content: space-between;
          padding:2rem 2rem;
          // background-color:lightgray;
          border-radius:1.5rem;
          margin:1rem 2rem;
          // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          border:1px solid lightgray;
          }
          .straight-line{
          width:95%;
          margin:auto;
          margin-bottom:1.5rem;
          color:#ccc;
          }
        .icon-container {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          padding:0.5rem 1rem;
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
          padding-bottom:1rem;
          }
          .modal-sections{
          display:flex;
          gap:1rem;
          }
          
          .modal-closebtn{
          border:none;
          outline:none;
          background-color: lightgray;
          display:flex;
          font-size:2rem;
          padding:0.5rem;
          border-radius:50%;
          margin-bottom:1rem;
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
          background-color: #f1f1f1;
          }
          }
           .section1,
          .section2{
          border:1px solid #ccc;
          padding:1rem;
          border-radius:1rem;
          }
          .section-folders {
         display: flex;
         align-items: center;
        
         gap: 1rem;
         width: 35rem;
         overflow-x: auto;
         scrollbar-width: thin;
         scrollbar-color: gray transparent;
         }
          .files{
          // width:50%;
          padding:0 2rem;
          border-right:2px solid lightgray;
          }
          .files-heading{
          font-size: 2.5rem;
          display:flex;
          font-weight:600;
          margin-top:2rem;
          padding:0 3rem;
          }
        .file-list {
          display: flex;
          flex-wrap:wrap;
          flex-direction: row;
          // justify-content:center;
          gap: 1rem;
        }
        .file-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: gray;
          cursor: pointer;
          font-size: 1.25rem;
          gap: 0.1rem;
          padding: 0.5rem;
          border-radius: 0.8rem;
          &:hover {
            background-color: #f0f0f0;
          }
        }
        .file-item span {
          margin-left: 8px;
        }
          .section-heading{
          font-size: 1.5rem;
          font-weight: bold;
          display:flex;
          justify-content:space-between;
          }
          .folders{
          // width:50%;
          // gap:1rem;
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
          .folder-wrapper{
          height:18rem;
          overflow-y:auto;
         scrollbar-width: thin;
         scrollbar-color: lightgray transparent;
        //  border:1px solid lightgray;
        //  padding:1rem;
        //  border-radius:1rem;
         margin-top:1rem;
          }
            .folder-icon{
            padding:0.5rem;
            border-radius:0.8rem;
            display:flex;
            flex-direction: column;
            align-items: center;
            font-size:1.3rem;
            &:hover{
            background-color:#f0f0f0;
            cursor:pointer;
            }
            }
            .link_chat{
            display:flex;
            align-items:center;
            justify-content: center;
            text-decoration:none;
            border:none;
            outline:none;
            color:#0B1444;
            padding:0.5rem 1rem;
            border-radius:0.5rem;
            background-color:#C3E11D;
            }
            .generate {
  background-color: rgba(249, 249, 249, 1);
}

.generate .container {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  padding: 1%;
  height: 10vh;
}

.generate .arrow-btn {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  background: transparent;
}

.generate .assistant-heading {
  font-family: 'Poppins';
  font-size: 20px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0.12px;
  text-align: left;
  color: black;
}

.generate .ass-btn-ass {
  background-color: rgba(10, 10, 10, 1);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  color: white;
  border-radius: 8px;
  margin-left: 10px;
  padding: 10px 20px;
}

.generate .left-buttons,
.generate .center-buttons,
.generate .right-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.generate .center-buttons {
  justify-content: space-between;
}

.generate .icon {
  font-size: 26px;
}

.generate .icon-small {
  margin-right: 30px;
  margin-left: 5px;
  font-size: 18px;
}

.generate .filter-icon {
  font-size: 22px;
}

.generate .adjustments-icon {
  margin-right: 30px;
  font-size: 22px;
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
