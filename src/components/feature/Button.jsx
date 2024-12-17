import PropTypes from 'prop-types';

const Button = ({
  onClick,
  className = '',
  type = 'button',
  icon,
  children,
}) => {
  return (
    <button onClick={onClick} className={`btn--${className}`} type={type}>
      {icon && <img src={icon} alt="icon" />}
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
