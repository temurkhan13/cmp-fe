import PropTypes from 'prop-types';
import Components from '..';

const MessageItemText = (props) => {
  return (
    <div className="messageItem">
      <header>
        <img src={props.image} alt="profile" />
      </header>
      <section>
        <Components.Feature.Text className="titory--bold">
          {props.name}
        </Components.Feature.Text>
        <Components.Feature.Text className="secondry">
          {props.text}
        </Components.Feature.Text>
      </section>
    </div>
  );
};

MessageItemText.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MessageItemText;
