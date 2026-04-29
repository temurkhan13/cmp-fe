import { useState } from 'react';
import assets from '../../../assets';
import { useNavigate } from 'react-router-dom';

import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { BsArrowReturnLeft } from 'react-icons/bs';
import AnchoredMenu from '../../dropdowns/AnchoredMenu';
import Button from '../../common/Button';

const HeaderDropDown = () => {
  const navigate = useNavigate();
  const [showIcon] = useState(false);

  const handleGoToDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="header-dropdown">
      <AnchoredMenu
        align="left"
        trigger={({ onClick, isOpen }) => (
          <Button
            variant="ghost"
            className="header-dropdown__button"
            onClick={onClick}
          >
            <div className="header-dropdown__title">
              <img src={assets.common.icon} alt="icon" />
              {isOpen ? (
                <RiArrowDownSLine size={20} className="header-dropdown__arrow-icon" />
              ) : (
                <RiArrowUpSLine size={20} className="header-dropdown__arrow-icon" />
              )}
            </div>
          </Button>
        )}
        items={[
          {
            key: 'dashboard',
            label: (
              <>
                Go to Dashboard
                {showIcon && <BsArrowReturnLeft className="header-dropdown__return-icon" />}
              </>
            ),
            onClick: handleGoToDashboardClick,
          },
        ]}
      />
    </div>
  );
};

export default HeaderDropDown;
