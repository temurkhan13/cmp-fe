import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { TbMenu2 } from 'react-icons/tb';
import { FaSignOutAlt } from 'react-icons/fa';
import Components from '@components';
import { ShareModal, QuestionnaireModal } from '../modal';
import AnchoredMenu from './AnchoredMenu';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';

const Header = ({ onMenuToggle }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isImproveResponseModalOpen, setIsImproveResponseModalOpen] =
    useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(selectWorkspace);

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedFolder');
    localStorage.removeItem('selectedWorkspace');
    navigate('/log-in');
  };

  const handleCloseShareModal = () => setIsShareModalOpen(false);

  const handleOpenImproveResponseModal = () =>
    setIsImproveResponseModalOpen(true);
  const handleCloseImproveResponseModal = () =>
    setIsImproveResponseModalOpen(false);

  const [photoPath, setPhotoPath] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setPhotoPath(storedUser.photoPath);
      setUser(storedUser);
    }
  }, []);

  const getInitials = () => {
    if (!user) {
      return 'N/A';
    }
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''
      }`.toUpperCase();
  };

  return (
    <div className="topbar">
      <div>
        {onMenuToggle && (
          <Button
            variant="icon"
            ariaLabel="Toggle sidebar"
            className="header-hamburger"
            onClick={onMenuToggle}
          >
            <TbMenu2 />
          </Button>
        )}
        <Components.Feature.HeaderDropDown />
        <div className="selected-workspace-name chatpage-header">
          <p>
            Workspace <span className="workspace-badge">{selectedWorkspace?.workspaceName}</span>
          </p>
        </div>
      </div>
      <section>
        <div>
          <span
            className="improve-response"
            onClick={handleOpenImproveResponseModal}
          >
            Survey Info
          </span>
        </div>
        <AnchoredMenu
          align="right"
          trigger={({ onClick }) =>
            photoPath ? (
              <img
                src={
                  photoPath ||
                  'https://avatar.iran.liara.run/public/boy?username=Ash'
                }
                alt="profile"
                className="ProfileImage topbar-profile-img"
                onClick={onClick}
                onError={(e) =>
                (e.target.src =
                  'https://avatar.iran.liara.run/public/boy?username=Ash')
                }
              />
            ) : (
              <div onClick={onClick} className="initials-placeholder">
                {getInitials()}
              </div>
            )
          }
          items={[
            {
              key: 'logout',
              label: 'Logout',
              icon: <FaSignOutAlt />,
              onClick: handleLogout,
            },
          ]}
          className={'header-avatar'}
        />
      </section>
      {isShareModalOpen && <ShareModal onClose={handleCloseShareModal} />}
      <QuestionnaireModal
        isOpen={isImproveResponseModalOpen}
        onClose={handleCloseImproveResponseModal}
      />
    </div>
  );
};

Header.propTypes = {
  activeWorkspace: PropTypes.shape({
    workspaceName: PropTypes.string,
  }),
  workspaces: PropTypes.arrayOf(
    PropTypes.shape({
      workspaceId: PropTypes.string,
      workspaceName: PropTypes.string,
    })
  ),
  onMenuToggle: PropTypes.func,
};

export default Header;
