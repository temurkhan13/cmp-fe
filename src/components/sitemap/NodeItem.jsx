import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { BiCheckCircle, BiCopy, BiEdit } from 'react-icons/bi';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { HexColorPicker } from 'react-colorful';
import useOutsideClick from '../../hooks/useOutsideClick';
import './sitemap.scss';

function NodeItem({ nodeData, updateNodeDataWithPropertyName, addNodeChild, onDelete, onMoveUp, onMoveDown }) {
  const { id, heading, description, color: rawColor, isEditing } = nodeData ?? {};
  const color = rawColor || '#f0f0f0';
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef();

  const close = useCallback(() => setShowContextMenu(false), []);
  useOutsideClick(contextMenuRef, close);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') close(); };
    if (showContextMenu) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [showContextMenu, close]);

  return (
    <div
      onClick={() => close()}
      onContextMenu={(e) => {
        e.preventDefault();
        setShowContextMenu(true);
      }}
      className={`node-item ${isEditing ? 'node-item--editing' : ''}`}
      style={{ background: isEditing ? undefined : color }}
    >
      <div className="node-item__toolbar">
        {isEditing ? (
          <BiCheckCircle
            color="green"
            size={15}
            onClick={() => updateNodeDataWithPropertyName(id, 'isEditing', false)}
          />
        ) : (
          <BiEdit
            color="rgba(0, 102, 255, 1)"
            size={15}
            onClick={() => updateNodeDataWithPropertyName(id, 'isEditing', true)}
          />
        )}
      </div>
      {!isEditing ? (
        <div className="node-item__content">
          <span className="node-item__heading">{heading}</span>
          <span className="node-item__desc">{description}</span>
        </div>
      ) : (
        <div>
          <textarea
            className="node-item__textarea"
            value={heading}
            onKeyDown={(e) =>
              e.key === 'Enter' && updateNodeDataWithPropertyName(id, 'isEditing', false)
            }
            onChange={(e) => updateNodeDataWithPropertyName(id, 'heading', e.target.value)}
            placeholder="Section name"
          />
          <textarea
            className="node-item__textarea node-item__textarea--desc"
            onKeyDown={(e) => {
              e.key === 'Enter' && updateNodeDataWithPropertyName(id, 'isEditing', false);
            }}
            value={description}
            onChange={(e) => updateNodeDataWithPropertyName(id, 'description', e.target.value)}
            placeholder="Add description"
          />
        </div>
      )}
      {showContextMenu ? (
        <div ref={contextMenuRef}>
          <ContextMenu
            id={id}
            updateNodeDataWithPropertyName={updateNodeDataWithPropertyName}
            addNodeChild={addNodeChild}
            nodeData={nodeData}
            onDelete={onDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onClose={close}
          />
        </div>
      ) : null}
    </div>
  );
}

const ContextMenu = ({
  nodeData,
  updateNodeDataWithPropertyName,
  addNodeChild,
  onDelete,
  onMoveUp,
  onMoveDown,
  onClose,
}) => {
  const { id, heading, description, color: nodeColor } = nodeData;

  const [color, setColor] = useState(nodeColor || '#f0f0f0');
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  return (
    <div
      onDrag={(e) => e.stopPropagation()}
      className="ctx-menu"
    >
      <div className="ctx-menu__row">
        <div
          className="ctx-menu__action"
          onClick={(e) => {
            e.stopPropagation();
            addNodeChild(heading, description, nodeColor || '#f0f0f0', false, id);
            if (onClose) onClose();
          }}
        >
          <BiCopy />
          <span>Duplicate</span>
        </div>
        <div
          className="ctx-menu__action"
          onClick={(e) => {
            e.stopPropagation();
            if (onMoveUp) onMoveUp(id);
            if (onClose) onClose();
          }}
        >
          <BsArrowUp />
          <span>Up</span>
        </div>
        <div
          className="ctx-menu__action"
          onClick={(e) => {
            e.stopPropagation();
            if (onMoveDown) onMoveDown(id);
            if (onClose) onClose();
          }}
        >
          <BsArrowDown />
          <span>Down</span>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <div className="ctx-menu__color-wrapper">
            <div
              className="ctx-menu__color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => toggle(!isOpen)}
            />
            {isOpen && (
              <div
                className="ctx-menu__color-popover"
                ref={popover}
                onClick={(e) => e.stopPropagation()}
              >
                <HexColorPicker
                  color={color}
                  onChange={(c) => {
                    updateNodeDataWithPropertyName(id, 'color', c);
                    setColor(c);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className="ctx-menu__action ctx-menu__action--delete"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete(id);
            if (onClose) onClose();
          }}
        >
          <RiDeleteBin2Fill />
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

ContextMenu.propTypes = {
  nodeData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
  }).isRequired,
  updateNodeDataWithPropertyName: PropTypes.func.isRequired,
  addNodeChild: PropTypes.func.isRequired,
};

NodeItem.propTypes = {
  nodeData: PropTypes.object.isRequired,
  updateNodeDataWithPropertyName: PropTypes.func.isRequired,
  addNodeChild: PropTypes.func.isRequired,
};

export default NodeItem;
