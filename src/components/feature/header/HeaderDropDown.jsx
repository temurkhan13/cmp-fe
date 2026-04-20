import { useState } from 'react';
import assets from '../../../assets';
import { useNavigate } from 'react-router-dom';

import Dropdown from 'react-multilevel-dropdown';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { BsArrowReturnLeft } from 'react-icons/bs';

const HeaderDropDown = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  const handleGoToDashboardClick = () => {
    // setShowIcon(!showIcon);
    navigate('/dashboard');
  };

  const headerTitle = (
    <div className="header-dropdown__title">
      <img src={assets.common.icon} alt="icon" />
      {isOpen ? (
        <RiArrowDownSLine size={20} className="header-dropdown__arrow-icon" />
      ) : (
        <RiArrowUpSLine size={20} className="header-dropdown__arrow-icon" />
      )}
    </div>
  );

  return (
    <div className="header-dropdown">
      <Dropdown
        onClick={toggleDropdown}
        position="right"
        title={headerTitle}
        className="header-dropdown__button"
      >
        <Dropdown.Item onClick={handleGoToDashboardClick}>
          Go to Dashboard
          {showIcon && <BsArrowReturnLeft className="header-dropdown__return-icon" />}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default HeaderDropDown;
