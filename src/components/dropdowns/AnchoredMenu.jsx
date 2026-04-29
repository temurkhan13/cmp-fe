import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';

const AnchoredMenu = ({ align, trigger, items, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const wrapperClass = className
    ? `cmp-dropdown-anchor ${className}`
    : 'cmp-dropdown-anchor';
  const menuClass = `cmp-dropdown-anchored cmp-dropdown-anchored-${align}`;

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      {trigger({ onClick: toggle, isOpen })}
      {isOpen && (
        <div className={menuClass} onClick={(e) => e.stopPropagation()}>
          {items.map((item, index) => (
            <Button
              key={item.key ?? index}
              variant="ghost"
              className={item.variant === 'danger' ? 'cmp-dropdown-item-danger' : undefined}
              iconLeft={item.icon}
              onClick={() => {
                close();
                item.onClick();
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

AnchoredMenu.propTypes = {
  align: PropTypes.oneOf(['left', 'right']).isRequired,
  trigger: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node.isRequired,
      icon: PropTypes.node,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.oneOf(['default', 'danger']),
    })
  ).isRequired,
  className: PropTypes.string,
};

export default AnchoredMenu;
