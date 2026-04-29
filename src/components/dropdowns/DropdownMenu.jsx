import PropTypes from 'prop-types';
import Button from '../common/Button';

const DropdownMenu = ({ isOpen, onClose, items }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="cmp-dropdown">
        {items.map((item, index) => {
          const itemClass =
            item.variant === 'danger'
              ? 'cmp-dropdown-item cmp-dropdown-item-danger'
              : 'cmp-dropdown-item';
          return (
            <Button
              key={item.key ?? index}
              variant="ghost"
              block
              className={itemClass}
              iconLeft={item.icon}
              onClick={item.onClick}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
      <div className="cmp-dropdown-overlay" onClick={onClose} />
    </>
  );
};

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node.isRequired,
      icon: PropTypes.node,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.oneOf(['default', 'danger']),
    })
  ).isRequired,
};

export default DropdownMenu;
