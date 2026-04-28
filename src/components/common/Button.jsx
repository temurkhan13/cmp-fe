import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const VARIANTS = ['primary', 'secondary', 'destructive', 'ghost', 'link', 'icon', 'toggle'];
const SIZES = ['sm', 'md', 'lg'];

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    active = false,
    block = false,
    disabled = false,
    loading = false,
    type = 'button',
    iconLeft = null,
    iconRight = null,
    ariaLabel,
    className = '',
    style,
    onClick,
    children,
    ...rest
  },
  ref,
) {
  if (variant === 'icon' && !ariaLabel && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn('[Button] variant="icon" requires an ariaLabel for accessibility.');
  }

  const classes = [
    'cmp-btn',
    `cmp-btn--${variant}`,
    `cmp-btn--${size}`,
    block ? 'cmp-btn--block' : '',
    variant === 'toggle' && active ? 'is-active' : '',
    loading ? 'cmp-btn--loading' : '',
    disabled ? 'cmp-btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      style={style}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-pressed={variant === 'toggle' ? active : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <span className="cmp-btn__spinner" aria-hidden="true" />
      ) : (
        iconLeft && <span className="cmp-btn__icon">{iconLeft}</span>
      )}
      {children}
      {!loading && iconRight && <span className="cmp-btn__icon">{iconRight}</span>}
    </button>
  );
});

Button.propTypes = {
  variant: PropTypes.oneOf(VARIANTS),
  size: PropTypes.oneOf(SIZES),
  active: PropTypes.bool,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  ariaLabel: requireAriaLabelForIcon,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

function requireAriaLabelForIcon(props, propName, componentName) {
  if (props.variant === 'icon' && (props[propName] === undefined || props[propName] === '')) {
    return new Error(
      `${componentName}: \`ariaLabel\` is required when variant="icon" (icon-only buttons must be accessible).`,
    );
  }
  if (props[propName] !== undefined && typeof props[propName] !== 'string') {
    return new Error(`${componentName}: \`ariaLabel\` must be a string.`);
  }
  return null;
}

export default Button;
