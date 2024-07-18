import { useState } from 'react';
import assets from '../../../assets';

import Dropdown from 'react-multilevel-dropdown';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const HeaderDropDown = () => {
  const [isOpen, setOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  const handleGoToDashboardClick = () => {
    setShowIcon(!showIcon);
  };

  const headerTitle = (
    <div style={styles.headerTitle}>
      <img src={assets.common.icon} alt="icon" />
      {isOpen ? (
        <RiArrowDownSLine size={20} style={{ marginBottom: '0.15rem' }} />
      ) : (
        <RiArrowUpSLine size={20} style={{ marginBottom: '0.15rem' }} />
      )}
    </div>
  );

  return (
    <div className="header-dropdown">
      <Dropdown
        onClick={toggleDropdown}
        position="right"
        title={headerTitle}
        style={styles.dropdownButtonActive}
      >
        <Dropdown.Item onClick={handleGoToDashboardClick}>
          Go to Dashboard
          {showIcon && <BsArrowReturnLeft />}
        </Dropdown.Item>
        <Dropdown.Item>New Workspace</Dropdown.Item>
        <Dropdown.Item>Recent Workspaces list</Dropdown.Item>
      </Dropdown>
    </div>
  );
};

const styles = {
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '0.5rem',
  },
  dropdownButtonActive: {
    border: '0.1rem solid lightgray',
    borderRadius: '1.5rem',
    background: 'white',
    padding: '2.4rem 1rem',
    boxShadow: 'none',
  },
};

export default HeaderDropDown;
