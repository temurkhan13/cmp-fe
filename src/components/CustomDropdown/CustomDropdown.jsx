import { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-multilevel-dropdown';
import CustomModal from '../customModal/CustomModal';
import MoveToModal from '../customModal/MoveToModal';

import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { IoIosCheckmark } from 'react-icons/io';
import { RiFolderTransferFill } from 'react-icons/ri';
import { MdInsertLink } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { BsThreeDots } from 'react-icons/bs';

import './custom-dropdown.scss';

const CustomDropdown = ({ activeIcon, handleIconClick }) => {
  const [isMoveToModalOpen, setMoveToModalOpen] = useState(false);
  const [isMoveToTrashModalOpen, setMoveToTrashModalOpen] = useState(false);

  const handleOpenMoveToModal = () => {
    setMoveToModalOpen(true);
  };
  const handleCloseMoveToModal = () => {
    setMoveToModalOpen(false);
  };
  const handleProceedMoveTo = () => {
    setMoveToModalOpen(false);
  };
  const handleOpenMoveToTrashModal = () => {
    setMoveToTrashModalOpen(true);
  };
  const handleCloseMoveToTrashModal = () => {
    setMoveToTrashModalOpen(false);
  };
  const handleProceedMoveToTrash = () => {
    setMoveToTrashModalOpen(false);
  };

  const folders = [
    {
      name: 'NeuralNet',
      subfolders: [
        {
          name: 'DeepLearning 1',
          subfolders: [],
        },
        {
          name: 'DeepLearning 2',
          subfolders: [],
        },
      ],
    },
    {
      name: 'MachineLearning',
      subfolders: [
        {
          name: 'SupervisedLearning 1',
          subfolders: [],
        },
        {
          name: 'SupervisedLearning 2',
          subfolders: [],
        },
      ],
    },
    {
      name: 'AI Model',
      subfolders: [
        {
          name: 'UnsupervisedLearning 1',
          subfolders: [],
        },
        {
          name: 'UnsupervisedLearning 2',
          subfolders: [],
        },
      ],
    },
    {
      name: 'Algorithm',
      subfolders: [
        {
          name: 'ReinforcementLearning 1',
          subfolders: [],
        },
        {
          name: 'ReinforcementLearning 2',
          subfolders: [],
        },
      ],
    },
    {
      name: 'ArtificialIntelligence',
      subfolders: [
        {
          name: 'NeuralNetwork 1',
          subfolders: [],
        },
        {
          name: 'NeuralNetwork 2',
          subfolders: [],
        },
      ],
    },
    {
      name: 'DataScience',
      subfolders: [],
    },
  ];

  return (
    <Dropdown
      title={<BsThreeDots fontSize={20} />}
      className={`${activeIcon === 'dots' ? 'active custom-dropdown-btn-active' : 'custom-dropdown-btn'}`}
      onClick={() => handleIconClick('dots')}
      icon={
        <BsThreeDots
          className={activeIcon === 'dots' ? 'custom-dropdown-dots-icon-active' : 'custom-dropdown-dots-icon'}
        />
      }
    >
      <Dropdown.Item className="custom-dropdown-item-rounded">
        <HiAdjustmentsHorizontal
          className="custom-dropdown-icon-right"
        />
        Customization
        <MdOutlineKeyboardArrowRight
          className="custom-dropdown-arrow-right"
        />
        <Dropdown.Submenu>
          <Dropdown.Item>
            Change Tone
            <MdOutlineKeyboardArrowRight
              className="custom-dropdown-arrow-right"
            />
            <Dropdown.Submenu>
              <Dropdown.Item>
                Normal
                <IoIosCheckmark
                  className="custom-dropdown-checkmark"
                />
              </Dropdown.Item>
              <hr className="custom-dropdown-straight-line" />
              <Dropdown.Item>Professional</Dropdown.Item>
              <Dropdown.Item>Casual</Dropdown.Item>
              <Dropdown.Item>Relax</Dropdown.Item>
              <Dropdown.Item>Friendly</Dropdown.Item>
              <Dropdown.Item>Straightforward</Dropdown.Item>
            </Dropdown.Submenu>
          </Dropdown.Item>
          <Dropdown.Item>
            Response Length
            <MdOutlineKeyboardArrowRight
              className="custom-dropdown-arrow-right"
            />
            <Dropdown.Submenu>
              <Dropdown.Item>
                Auto
                <IoIosCheckmark
                  className="custom-dropdown-checkmark"
                />
              </Dropdown.Item>
              <hr className="custom-dropdown-straight-line" />
              <Dropdown.Item>Small</Dropdown.Item>
              <Dropdown.Item>Medium</Dropdown.Item>
              <Dropdown.Item>Comprehensive</Dropdown.Item>
            </Dropdown.Submenu>
          </Dropdown.Item>
        </Dropdown.Submenu>
      </Dropdown.Item>
      {/*<hr className="custom-dropdown-straight-line" />*/}
      {/*<Dropdown.Item>*/}
        {/*<button className="custom-dropdown-click-btn" onClick={handleOpenMoveToModal}>*/}
        {/*  <RiFolderTransferFill*/}
        {/*    className="custom-dropdown-icon-right"*/}
        {/*  />*/}
        {/*  Move to*/}
        {/*</button>*/}
      {/*  <CustomModal*/}
      {/*    isOpen={isMoveToModalOpen}*/}
      {/*    onClose={handleCloseMoveToModal}*/}
      {/*    onProceed={handleProceedMoveTo}*/}
      {/*    heading="Move to folder"*/}
      {/*    bodyContent={<MoveToModal folders={folders} />}*/}
      {/*    cancelText="Cancel"*/}
      {/*    proceedText="Move"*/}
      {/*  />*/}
      {/*</Dropdown.Item>*/}
      {/*<Dropdown.Item>*/}
      {/*  <MdInsertLink className="custom-dropdown-icon-right" />*/}
      {/*  Copy link*/}
      {/*</Dropdown.Item>*/}
      {/*<hr className="custom-dropdown-straight-line" />*/}
      <Dropdown.Item>
        <button className="custom-dropdown-click-btn" onClick={handleOpenMoveToTrashModal}>
          <IoMdTrash className="custom-dropdown-icon-right" />
          Move to trash
        </button>
        <CustomModal
          isOpen={isMoveToTrashModalOpen}
          onClose={handleCloseMoveToTrashModal}
          onProceed={handleProceedMoveToTrash}
          heading="Move to trash"
          bodyContent={
            <div>
              Are you sure you want to move this file to the
              <br /> trash? It will remain there for 30 days before being
              <br />
              permanently deleted.
            </div>
          }
          cancelText="Cancel"
          proceedText="Proceed"
        />
      </Dropdown.Item>
    </Dropdown>
  );
};

CustomDropdown.propTypes = {
  activeIcon: PropTypes.string,
  handleIconClick: PropTypes.func.isRequired,
};

export default CustomDropdown;
