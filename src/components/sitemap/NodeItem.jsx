import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { BiCheckCircle, BiCopy, BiEdit } from 'react-icons/bi';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { HexColorPicker } from 'react-colorful';
import useOutsideClick from '../../hooks/useOutsideClick';

function NodeItem({ nodeData, updateNodeDataWithPropertyName, addNodeChild, onDelete, onMoveUp, onMoveDown }) {
  const { id, heading, description, color, isEditing } = nodeData ?? {};
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef();

  const close = useCallback(() => setShowContextMenu(false), []);
  useOutsideClick(close);
  return (
    <div
      onClick={(e) => {
        close();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setShowContextMenu(true);
      }}
      style={{
        position: 'relative',
        background: isEditing ? 'rgba(0, 102, 255, 0.21)' : color,
        padding: '5px',
        width: '100%',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '5px',
          cursor: 'pointer',
        }}
      >
        {isEditing ? (
          <BiCheckCircle
            color="green"
            size={15}
            onClick={() =>
              updateNodeDataWithPropertyName(id, 'isEditing', false)
            }
          ></BiCheckCircle>
        ) : (
          <BiEdit
            color="rgba(0, 102, 255, 1)"
            size={15}
            onClick={() =>
              updateNodeDataWithPropertyName(id, 'isEditing', true)
            }
          ></BiEdit>
        )}
      </div>
      {!isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              color: 'rgba(10, 10, 10, 1)',
              fontWeight: '500',
              fontSize: '14px',
              wordWrap: 'break-word',
            }}
          >
            {heading}
          </span>
          <span
            style={{
              color: 'rgba(10, 10, 10, 0.68)',
              fontWeight: '400',
              fontSize: '12px',
              wordWrap: 'break-word',
            }}
          >
            {description}
          </span>
        </div>
      ) : (
        <div>
          <textarea
            style={{
              border: 'none',
              width: '100%',
              outline: 'none',
              borderRadius: '6px',
              padding: '5px',
              background: 'rgba(0, 102, 255, 0.21)',
            }}
            value={heading}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              updateNodeDataWithPropertyName(id, 'isEditing', false)
            }
            onChange={(e) =>
              updateNodeDataWithPropertyName(id, 'heading', e.target.value)
            }
            placeholder="Section name"
          ></textarea>
          <textarea
            style={{
              border: 'none',
              marginTop: '5px',
              width: '100%',
              outline: 'none',
              borderRadius: '6px',
              padding: '5px',
              background: 'rgba(0, 102, 255, 0.21)',
              color: 'rgba(0, 102, 255, 1)',
              height: '100px',
            }}
            onKeyDown={(e) => {
              e.key === 'Enter' &&
                updateNodeDataWithPropertyName(id, 'isEditing', false);
            }}
            value={description}
            onChange={(e) =>
              updateNodeDataWithPropertyName(id, 'description', e.target.value)
            }
            placeholder="Add description"
          ></textarea>
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
}) => {
  const { id, heading, description, color: nodeColor, isEditing } = nodeData;

  const [color, setColor] = useState(nodeColor);
  const popover = useRef();
  const [isOpen, toggle] = useState(false);
  return (
    <div
      onDrag={(e) => {
        e.stopPropagation();
      }}
      style={{
        position: 'absolute',
        top: '-15px',
        left: '50px',
        background: 'rgba(0, 0, 0, 0.05)',
        padding: '5px 10px',
        borderRadius: '5px',
        zIndex: '999',
        backgroundColor: 'white',
        color: 'rgba(10, 10, 10, 0.68)',
        fontWeight: '500',
        fontSize: '12px',
        border: '1px solid rgba(10, 10, 10, 0.1)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            addNodeChild(heading, description, color, isEditing);
          }}
        >
          <BiCopy></BiCopy>
          <span>Duplicate</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (onMoveUp) onMoveUp(id);
          }}
        >
          <BsArrowUp></BsArrowUp>
          <span>Up</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (onMoveDown) onMoveDown(id);
          }}
        >
          <BsArrowDown></BsArrowDown>
          <span>Down</span>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                backgroundColor: color,
                width: '31px',
                height: '31px',
                borderRadius: '50%',
                border: '1px solid black',
                cursor: 'pointer',
              }}
              onClick={() => toggle(!isOpen)}
            />

            {isOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% - 2px)',
                  left: 0,
                }}
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
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#c00',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete(id);
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
