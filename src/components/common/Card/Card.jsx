import PropTypes from 'prop-types';
import { FiMoreVertical } from 'react-icons/fi';
import AnchoredMenu from '../../dropdowns/AnchoredMenu';
import Button from '../Button';

const VARIANTS = ['horizontal', 'vertical'];

const Card = ({
  variant = 'horizontal',
  icon,
  title,
  meta,
  description,
  badge,
  footerRight,
  menuItems,
  onClick,
  className = '',
}) => {
  const hasMenu = Array.isArray(menuItems) && menuItems.length > 0;
  const isClickable = typeof onClick === 'function';

  const classes = ['cmp-card', `cmp-card--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (e) => {
    if (!isClickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      className={classes}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {variant === 'horizontal' ? (
        <>
          {icon && <div className="cmp-card__icon">{icon}</div>}
          {badge && <div className="cmp-card__badge">{badge}</div>}
          <div className="cmp-card__body">
            <div className="cmp-card__text">
              <h3 className="cmp-card__title">{title}</h3>
              {meta && <p className="cmp-card__meta">{meta}</p>}
            </div>
            {footerRight && (
              <div className="cmp-card__footer-right">{footerRight}</div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="cmp-card__header">
            {icon && <span className="cmp-card__icon">{icon}</span>}
            <span className="cmp-card__title">{title}</span>
          </div>
          {meta && <span className="cmp-card__meta">{meta}</span>}
          {description && (
            <p className="cmp-card__description">{description}</p>
          )}
          {badge && <div className="cmp-card__badge">{badge}</div>}
          {footerRight && (
            <div className="cmp-card__footer-right">{footerRight}</div>
          )}
        </>
      )}

      {hasMenu && (
        <AnchoredMenu
          align="right"
          className="cmp-dropdown-anchor-corner"
          trigger={({ onClick: triggerClick }) => (
            <Button
              variant="icon"
              ariaLabel="More options"
              className="cmp-card__menu-btn"
              onClick={(e) => {
                e.stopPropagation();
                triggerClick();
              }}
            >
              <FiMoreVertical size={16} />
            </Button>
          )}
          items={menuItems}
        />
      )}
    </div>
  );
};

Card.propTypes = {
  variant: PropTypes.oneOf(VARIANTS),
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  meta: PropTypes.node,
  description: PropTypes.string,
  badge: PropTypes.node,
  footerRight: PropTypes.node,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      variant: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Card;
