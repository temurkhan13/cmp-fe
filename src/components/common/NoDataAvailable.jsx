import PropTypes from 'prop-types';
import { FaCircleExclamation } from 'react-icons/fa6';

const NoDataAvailable = ({ message }) => (
  <div className="no-data">
    <FaCircleExclamation className="icon" />
    <p>{message}</p>
    <style>{`
      .no-data {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: gray;
        font-size: 1.5rem;
        padding: 2rem;
      }
      .icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
    `}</style>
  </div>
);

NoDataAvailable.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NoDataAvailable;
