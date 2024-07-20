import React from 'react';
import { BiCheck, BiCheckCircle, BiCross, BiEdit, BiPen } from 'react-icons/bi';
import { IoClose, IoCloseCircle } from 'react-icons/io5';

function NodeItem({ nodeData, updateNodeDataWithPropertyName }) {
  const { id, heading, description, isEditing } = nodeData;
  return (
    <div
      style={{
        background: isEditing
          ? 'rgba(0, 102, 255, 0.21)'
          : 'rgba(0, 0, 0, 0.05)',
        padding: '5px',
        width: '100%',
        borderRadius: '6px',
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
          <input
            style={{
              border: 'none',
              width: '100%',
              outline: 'none',
              borderRadius: '6px',
              padding: '5px',
              background: 'rgba(0, 102, 255, 0.21)',
            }}
            value={heading}
            onChange={(e) =>
              updateNodeDataWithPropertyName(id, 'heading', e.target.value)
            }
            placeholder="Section name"
          ></input>
          <textarea
            style={{
              border: 'none',
              resize: 'none',
              marginTop: '5px',
              width: '100%',
              outline: 'none',
              borderRadius: '6px',
              padding: '5px',
              background: 'rgba(0, 102, 255, 0.21)',
              color: 'rgba(0, 102, 255, 1)',
            }}
            value={description}
            onChange={(e) =>
              updateNodeDataWithPropertyName(id, 'description', e.target.value)
            }
            placeholder="Add description"
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default NodeItem;
