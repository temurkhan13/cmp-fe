import { useState } from 'react';
import Components from '..';
import assets from '../../assets';

import UserDropdown from '../CustomDropdown/UserDropdown';
import ShareModal from '../customModal/Sharemodal';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import SearchDropdown from '../CustomDropdown/SearchDropdown';

import { BiSearch } from 'react-icons/bi';
import { FaUserPlus } from 'react-icons/fa6';

const items = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cantaloupe',
  'Cherry',
  'Clementine',
  'Coconut',
  'Cranberry',
  'Date',
  'Dragonfruit',
  'Durian',
  'Elderberry',
  'Fig',
  'Grape',
  'Grapefruit',
  'Guava',
  'Honeydew',
  'Kiwifruit',
  'Kumquat',
  'Lemon',
  'Lime',
  'Lychee',
  'Mango',
  'Nectarine',
  'Orange',
  'Papaya',
  'Passionfruit',
  'Peach',
  'Pear',
  'Pineapple',
  'Plum',
  'Pomegranate',
  'Raspberry',
  'Redcurrant',
  'Satsuma',
  'Strawberry',
  'Tangerine',
  'Watermelon',
];

const Header = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleIconClick = (icon) => {
    setActiveIcon(activeIcon === icon ? null : icon);
  };
  const handleClose = () => {
    setActiveIcon(null);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const members = [
    { name: 'Imran', role: 'owner' },
    { name: 'Jerald Huels', role: 'edit' },
    { name: 'Sherrimac Gyver', role: 'view' },
    { name: 'New Member', role: 'remove' },
  ];

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
          {activeIcon === 'search' && (
            <SearchDropdown
              title="Search"
              items={items}
              visible={activeIcon === 'search'}
              onClose={handleClose}
            />
          )}
          {/* <span
            className={activeIcon === 'people' ? 'active' : ''}
            onClick={() => handleIconClick('people')}
          > */}
          <UserDropdown
            activeIcon={activeIcon}
            handleIconClick={handleIconClick}
          />
          {/* </span> */}
          <CustomDropdown
            activeIcon={activeIcon}
            handleIconClick={handleIconClick}
          />
          <div className="shareBtn" onClick={handleOpenModal}>
            <FaUserPlus />
            <span>Share</span>
          </div>
          {isModalOpen && (
            <ShareModal members={members} onClose={handleCloseModal} />
          )}
        </div>
        <img src={assets.common.profile} alt="profile" />
      </section>
    </div>
  );
};

export default Header;
