import Components from '../..';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiArrowLeftDoubleLine } from 'react-icons/ri';
import PropTypes from 'prop-types';

const NewChat = ({ data }) => {
  return (
    <div className="newChat" style={{ display: 'none' }}>
      <div>
        <div>
          <HiOutlinePlusSm />
          <Components.Feature.Text className="secondry">
            New Chat
          </Components.Feature.Text>
        </div>
        <RiArrowLeftDoubleLine />
      </div>
      {data.map((item, index) => (
        <section key={index}>
          <Components.Feature.Text className="middium--light">
            {item.date}
          </Components.Feature.Text>
          <div>
            {item.message.map((msg, msgIndex) => (
              <Components.Feature.Text className="secondry" key={msgIndex}>
                {msg.text}
              </Components.Feature.Text>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

NewChat.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      message: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default NewChat;
