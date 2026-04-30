import PropTypes from 'prop-types';
import Questionnaire from '../../modules/assessment/Questionnaire';
import Modal from './Modal';

const QuestionnaireModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="User Questionnaire">
    <Questionnaire handleCloseImproveResponseModal={onClose} />
  </Modal>
);

QuestionnaireModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default QuestionnaireModal;
