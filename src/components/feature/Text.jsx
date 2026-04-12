import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

const Text = (props) => {
  const sanitizedHtml = props.dangerouslySetInnerHTML
    ? { __html: DOMPurify.sanitize(props.dangerouslySetInnerHTML.__html || '') }
    : undefined;

  return (
    <p
      className={`text text-${props.className}`}
      dangerouslySetInnerHTML={sanitizedHtml}
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
