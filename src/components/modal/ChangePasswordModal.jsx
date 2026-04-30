import PropTypes from 'prop-types';
import ChangePassword from '../dashboard/ChangePassword';
import Modal from './Modal';

const ChangePasswordModal = ({ isOpen, onClose, onChangePassword }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
    <ChangePassword onChangePassword={onChangePassword} />
  </Modal>
);

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func,
};

export default ChangePasswordModal;
