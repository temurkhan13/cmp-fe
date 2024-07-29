import PropTypes from 'prop-types';

const Container = (props) => {
  return (
    <div className={`container container-${props.className} ${props.class}`}>
      {props.children}
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  class: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  className: '',
  class: '',
};

export default Container;
