import { useState } from 'react';
import Components from '..';
import assets from '../../assets';
import Dropdown from 'react-multilevel-dropdown';
import { BiSearch } from 'react-icons/bi';
import { MdPeople } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaUserPlus } from 'react-icons/fa6';
import { RiFolderTransferFill } from 'react-icons/ri';
import { MdInsertLink } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { IoIosCheckmark } from 'react-icons/io';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';

const Header = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
    setShowDropdown(icon === 'dots' ? !showDropdown : false);
  };

  return (
    <div className="topbar">
      <div>
        <Components.Feature.HeaderDropDown />
        <Components.Feature.Button className="secondry">
          Untitled
        </Components.Feature.Button>
      </div>
      <section>
        <div>
          <span
            className={activeIcon === 'search' ? 'active' : ''}
            onClick={() => handleIconClick('search')}
          >
            <BiSearch />
          </span>
          <span
            className={activeIcon === 'people' ? 'active' : ''}
            onClick={() => handleIconClick('people')}
          >
            <MdPeople />
          </span>
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
              activeIcon === 'dots'
                ? styles.dropdownBtnActive
                : styles.dropdownBtn
            }
          >
            <Dropdown.Item style={{ borderRadius: '0.5rem' }}>
              <HiAdjustmentsHorizontal style={{ marginRight: '0.5rem' }} />
              Customization
              <MdOutlineKeyboardArrowRight
                style={{ margin: 'auto', fontSize: '1.6rem' }}
              />
              <Dropdown.Submenu>
                <Dropdown.Item>
                  Change Tone
                  <MdOutlineKeyboardArrowRight
                    style={{ margin: 'auto', fontSize: '1.6rem' }}
                  />
                  <Dropdown.Submenu>
                    <Dropdown.Item>
                      Normal
                      <IoIosCheckmark
                        style={{ margin: 'auto', fontSize: '2rem' }}
                      />
                    </Dropdown.Item>
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
                    style={{ margin: 'auto', fontSize: '1.6rem' }}
                  />
                  <Dropdown.Submenu>
                    <Dropdown.Item>
                      Auto
                      <IoIosCheckmark
                        style={{ margin: 'auto', fontSize: '2rem' }}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item>Small</Dropdown.Item>
                    <Dropdown.Item>Medium</Dropdown.Item>
                    <Dropdown.Item>Comprehensive</Dropdown.Item>
                  </Dropdown.Submenu>
                </Dropdown.Item>
              </Dropdown.Submenu>
            </Dropdown.Item>
            <Dropdown.Item>
              <RiFolderTransferFill style={{ marginRight: '0.5rem' }} />
              Move to
            </Dropdown.Item>
            <Dropdown.Item>
              <MdInsertLink style={{ marginRight: '0.5rem' }} />
              Copy link
            </Dropdown.Item>
            <Dropdown.Item>
              <IoMdTrash style={{ marginRight: '0.5rem' }} />
              Move to trash
            </Dropdown.Item>
          </Dropdown>
          <div className="shareBtn">
            <FaUserPlus />
            <span>Share</span>
          </div>
        </div>
        <img src={assets.common.profile} alt="profile" />
      </section>
    </div>
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
};

export default Header;
