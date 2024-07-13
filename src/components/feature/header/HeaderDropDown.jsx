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
          Go to Dashboard{' '}
          {showIcon && <BsArrowReturnLeft style={{ marginLeft: 'auto' }} />}
        </Dropdown.Item>
        <Dropdown.Item>
          File{' '}
          <MdOutlineKeyboardArrowRight
            style={{ marginLeft: 'auto', fontSize: '1.6rem' }}
          />
          <Dropdown.Submenu position="right">
            <Dropdown.Item>New File</Dropdown.Item>
            <Dropdown.Item>Duplicate</Dropdown.Item>
          </Dropdown.Submenu>
        </Dropdown.Item>
        <Dropdown.Item>Comment</Dropdown.Item>
        <Dropdown.Item>Share</Dropdown.Item>
        <Dropdown.Item>Copy link</Dropdown.Item>
        <Dropdown.Item>Move to trash</Dropdown.Item>
      </Dropdown>
    </div>
  );
};

const styles = {
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  dropdownButtonActive: {
    border: '0.1rem solid lightgray',
    borderRadius: '1rem',
    background: 'white',
    padding: '2.4rem 1rem',
    boxShadow: 'none',
  },
};

export default HeaderDropDown;
