import PropTypes from 'prop-types';

const Heading = (props) => {
  return (
    <h1
      className={`heading-${props.className}`}
      data-aos={props.animation}
      data-aos-duration={props.duration}
      id={props.id}
    >
      {props.children}
    </h1>
  );
};

Heading.propTypes = {
  className: PropTypes.string.isRequired,
  animation: PropTypes.string,
  duration: PropTypes.number,
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Heading;
