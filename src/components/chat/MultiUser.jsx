import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import styles from '../../style/chat/chatHeader.module.scss';
import PropTypes from 'prop-types';

const MultiUser = ({ closeButton }) => {
  return (
    <div className={styles.dropdownContent}>
      <div className={styles.subSearchBar}>
        <input type="text" placeholder="Search" />
        <IoMdClose
          onClick={closeButton}
          style={{
            background: 'lightgray',
            padding: '7px',
            borderRadius: '30px',
            position: 'absolute',
            top: 5,
            right: 10,
            fontSize: '30px',
          }}
        />
      </div>
      <hr />
      <div className={styles.subSearchBabody}>
        <div className={styles.subSearchBabodyInput}>
          <IoSearchOutline className={styles.subSearchBaICons} />
          <input type="text" placeholder="Find any word" />
          <span
            style={{
              fontSize: '14px',
            }}
          >
            1/4
          </span>
          <span className={styles.subSearchBaICons}></span>
          <IoIosArrowUp className={styles.subSearchBaICons} />
          <IoIosArrowDown className={styles.subSearchBaICons} />
        </div>
      </div>
    </div>
  );
};

MultiUser.propTypes = {
  closeButton: PropTypes.func.isRequired,
};
export default MultiUser;
