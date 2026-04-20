import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { Handle, Position } from '@xyflow/react';
import { BiPlus, BiPlusCircle } from 'react-icons/bi';
import NodeItem from './NodeItem';
import { v4 as uuidv4 } from 'uuid';
import { useReorder } from '../../hooks/useReorder';
import './node.scss';
const Node = ({ data }) => {
  const [nodeData, setNodeData] = useState(data.nodeData);
  const [hideLabelInput, setHideLabelInput] = useState(data.label.length !== 0);
  const [isLoading, setIsLoading] = useState(false);
  const [localLabel, setLocalLabel] = useState(data.label);
  const inputRef = useRef();

  const [
    draggedIndex,
    draggedOverIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragedEnd,
  ] = useReorder();

  const updateNodeDataWithPropertyName = async (id, property, newValue) => {
    const updatedArray = nodeData.map((item) =>
      item.id === id ? { ...item, [property]: newValue } : item
    );
    setNodeData(updatedArray);

    if (property === 'isEditing' && !newValue) {
      const updateType =
        data.label === 'Playbook Introduction' ? 'nodeData' : 'nodes';
      await data.updateNodeById(
        data.siteMapId,
        data.stageId,
        updateType,
        data.id,
        updatedArray
      );
    }
  };

  const addNodeChild = (
    heading = '',
    description = '',
    color = '#0000000c',
    isEditing = false,
    afterId = null
  ) => {
    setNodeData((prev) => {
      const newItem = { id: uuidv4(), heading, description, color, isEditing };
      if (afterId) {
        const index = prev.findIndex((item) => item.id === afterId);
        if (index >= 0) {
          const updated = [...prev];
          updated.splice(index + 1, 0, newItem);
          return updated;
        }
      }
      return [...prev, newItem];
    });
  };

  const deleteNodeItem = (itemId) => {
    setNodeData((prev) => prev.filter((item) => item.id !== itemId));
  };

  const moveNodeItem = (itemId, direction) => {
    setNodeData((prev) => {
      const index = prev.findIndex((item) => item.id === itemId);
      if (index < 0) return prev;
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.splice(newIndex, 0, moved);
      return updated;
    });
  };

  const handleHeadingChangeBlur = async () => {
    if (
      localLabel !== data.label &&
      !['Discovery', 'Adopt', 'Deploy', 'Design', 'Run'].includes(data.label)
    ) {
      await data.updateNodeLabelById(
        data.siteMapId,
        data.stageId,
        'nodes',
        data.id,
        localLabel
      );
    }
    if (localLabel.length !== 0) {
      setHideLabelInput(true);
    }
  };

  useEffect(() => {
    setNodeData(data.nodeData);
  }, [data.nodeData]);

  return (
    <div className="node node-wrapper">
      <div className="node-container">
        {!data.isRoot ? (
          <Handle
            type="target"
            position={Position.Top}
            className="node-handle-target"
          />
        ) : null}
        <div className="node-inner">
          <div className="custom-drag-handle node-header">
            {!hideLabelInput ? (
              <input
                ref={inputRef}
                className="node-label-input"
                value={localLabel}
                onChange={(e) => setLocalLabel(e.target.value)}
                onBlur={handleHeadingChangeBlur}
                placeholder="Add page title here"
              ></input>
            ) : (
              <span
                className="node-label-text"
                onClick={() => {
                  setHideLabelInput(false);
                  setTimeout(() => {
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }, 0);
                }}
              >
                {data.label}
              </span>
            )}
          </div>

          <ul
            className="node-items-list"
            onMouseEnter={(e) => {
              e.stopPropagation();
            }}
          >
            {nodeData?.map((data, index) => (
              <li
                className="node-item-li"
                key={data?.id}
                draggable
                onMouseEnter={(e) => {
                  e.stopPropagation();
                }}
                onDragStart={(e) => {
                  e.stopPropagation();
                  handleDragStart(index);
                }}
                onDrop={(e) => {
                  e.stopPropagation();

                  handleDrop(e, nodeData, setNodeData);
                }}
                onDragOver={(e) => {
                  e.stopPropagation();
                  handleDragOver(e, index);
                }}
                onDragEnd={(e) => {
                  e.stopPropagation();
                  handleDragedEnd();
                }}
              >
                <NodeItem
                  key={data?.id}
                  nodeData={data}
                  addNodeChild={addNodeChild}
                  updateNodeDataWithPropertyName={
                    updateNodeDataWithPropertyName
                  }
                  onDelete={deleteNodeItem}
                  onMoveUp={(id) => moveNodeItem(id, -1)}
                  onMoveDown={(id) => moveNodeItem(id, 1)}
                ></NodeItem>
              </li>
            ))}
          </ul>

          <div className="button-wrapper">
            <div
              className="node-add-btn"
              onClick={(e) => {
                e.stopPropagation();
                addNodeChild();
              }}
            >
              <BiPlus size={20}></BiPlus>
            </div>
            {/* <div style={{ position: 'absolute', top:'100' }}> */}
            {data.nodeData.length === 0 && data.showGenerateAIButton && (
              <button
                className={`node-generate-btn ${isLoading ? 'node-generate-btn--loading' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (data.nodeData.length === 0 && !data.isRoot) {
                    setIsLoading(true);
                    data.fetchNodeData(
                      data.label,
                      data.id,
                      data.nodeData,
                      data.siteMapId
                    );
                  }
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate with AI'}
              </button>
            )}
            {/* <BiPlusCircle
              style={{
                cursor: 'pointer',
                padding: '10px',
                fontSize: '50px',
              }}
              onClick={(e) => {
                e.stopPropagation();
                data.onAddChild();
              }}
              color="rgba(0, 102, 255, 1)"
            >
              Add Child
            </BiPlusCircle> */}
          </div>

          <Handle type="source" position={Position.Bottom} />
        </div>
      </div>
    </div>
  );
};

Node.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    nodeData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        heading: PropTypes.string,
        description: PropTypes.string,
        color: PropTypes.string,
        isEditing: PropTypes.bool,
      })
    ).isRequired,
    isRoot: PropTypes.bool,
    updateNodeLabelById: PropTypes.func.isRequired,
    updateNodeById: PropTypes.func.isRequired,
    onAddChild: PropTypes.func,
    fetchNodeData: PropTypes.func,
    stageId: PropTypes.string,
    siteMapId: PropTypes.string,
    showGenerateAIButton: PropTypes.bool,
  }).isRequired,
};
export default Node;
