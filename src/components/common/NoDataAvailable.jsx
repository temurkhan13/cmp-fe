import PropTypes from 'prop-types';
import { FaCircleExclamation } from 'react-icons/fa6';

const NoDataAvailable = ({ message }) => (
  <div className="no-data">
    <FaCircleExclamation className="no-data-icon" />
    <p>{message}</p>
  </div>
);

NoDataAvailable.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NoDataAvailable;
