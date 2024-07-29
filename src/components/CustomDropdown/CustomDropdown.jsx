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
      className={activeIcon === 'dots' ? 'active' : ''}
      onClick={() => handleIconClick('dots')}
      icon={
        <BsThreeDots
          style={{
            color: activeIcon === 'dots' ? 'white' : 'black',
            fontSize: '2.8rem',
          }}
        />
      }
      style={
        activeIcon === 'dots' ? styles.dropdownBtnActive : styles.dropdownBtn
      }
    >
      <Dropdown.Item style={{ borderRadius: '0.5rem' }}>
        <HiAdjustmentsHorizontal
          style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}
        />
        Customization
        <MdOutlineKeyboardArrowRight
          style={{ marginLeft: 'auto', fontSize: '1.6rem' }}
        />
        <Dropdown.Submenu>
          <Dropdown.Item>
            Change Tone
            <MdOutlineKeyboardArrowRight
              style={{ marginLeft: 'auto', fontSize: '1.6rem' }}
            />
            <Dropdown.Submenu>
              <Dropdown.Item>
                Normal
                <IoIosCheckmark
                  style={{ marginLeft: 'auto', fontSize: '2rem' }}
                />
              </Dropdown.Item>
              <hr style={styles.straightLine} />
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
              style={{ marginLeft: 'auto', fontSize: '1.6rem' }}
            />
            <Dropdown.Submenu>
              <Dropdown.Item>
                Auto
                <IoIosCheckmark
                  style={{ marginLeft: 'auto', fontSize: '2rem' }}
                />
              </Dropdown.Item>
              <hr style={styles.straightLine} />
              <Dropdown.Item>Small</Dropdown.Item>
              <Dropdown.Item>Medium</Dropdown.Item>
              <Dropdown.Item>Comprehensive</Dropdown.Item>
            </Dropdown.Submenu>
          </Dropdown.Item>
        </Dropdown.Submenu>
      </Dropdown.Item>
      <hr style={styles.straightLine} />
      <Dropdown.Item>
        <button style={styles.clickBtn} onClick={handleOpenMoveToModal}>
          <RiFolderTransferFill
            style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}
          />
          Move to
        </button>
        <CustomModal
          isOpen={isMoveToModalOpen}
          onClose={handleCloseMoveToModal}
          onProceed={handleProceedMoveTo}
          heading="Move to folder"
          bodyContent={<MoveToModal folders={folders} />}
          cancelText="Cancel"
          proceedText="Move"
        />
      </Dropdown.Item>
      <Dropdown.Item>
        <MdInsertLink style={{ marginRight: '0.5rem', fontSize: '1.5rem' }} />
        Copy link
      </Dropdown.Item>
      <hr style={styles.straightLine} />
      <Dropdown.Item>
        <button style={styles.clickBtn} onClick={handleOpenMoveToTrashModal}>
          <IoMdTrash style={{ marginRight: '0.5rem', fontSize: '1.5rem' }} />
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

const styles = {
  dropdownBtnActive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.8rem',
    padding: '0.8rem',
    cursor: 'pointer',
    border: 'none',
  },
  dropdownBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '0.8rem',
    cursor: 'pointer',
    fontSize: '2rem',
    transition: 'opacity 0.2s ease-in-out',
  },
  clickBtn: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
  },
  straightLine: {
    borderTop: '0.0625rem solid lightgray',
  },
};

CustomDropdown.propTypes = {
  activeIcon: PropTypes.string,
  handleIconClick: PropTypes.func.isRequired,
};

export default CustomDropdown;
