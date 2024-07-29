import PropTypes from 'prop-types';

const Text = (props) => {
  return (
    <p
      className={`text text-${props.className}`}
      dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
      data-aos={props.animation}
      data-aos-duration={props.duration}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </p>
  );
};

Text.propTypes = {
  className: PropTypes.string.isRequired,
  dangerouslySetInnerHTML: PropTypes.oneOfType([
    PropTypes.shape({ __html: PropTypes.string }),
  ]),
  animation: PropTypes.string,
  duration: PropTypes.number,
  onClick: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default Text;
