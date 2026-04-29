import PropTypes from 'prop-types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AnchoredMenu from '../dropdowns/AnchoredMenu';
import { truncateText } from '../../utils/helperFunction';

const IconCard = ({
  icon,
  label,
  truncateAt = 10,
  menuItems,
  hoverFadeKebab = false,
}) => {
  const kebabClassName = hoverFadeKebab
    ? 'cmp-dropdown-anchor-corner cmp-dropdown-anchor-corner--hover-fade'
    : 'cmp-dropdown-anchor-corner';

  return (
    <div className="cmp-icon-card">
      <AnchoredMenu
        align="right"
        className={kebabClassName}
        trigger={({ onClick }) => (
          <BsThreeDotsVertical
            size={18}
            className="cursor-pointer"
            onClick={onClick}
          />
        )}
        items={menuItems}
      />
      <div className="card-icon">{icon}</div>
      <p className="cmp-icon-card__label" title={label}>
        {truncateText(label, truncateAt)}
      </p>
    </div>
  );
};

IconCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  truncateAt: PropTypes.number,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node.isRequired,
      icon: PropTypes.node,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.oneOf(['default', 'danger']),
    })
  ).isRequired,
  hoverFadeKebab: PropTypes.bool,
};

export default IconCard;
