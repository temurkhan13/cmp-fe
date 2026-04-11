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
    <div
      className="node"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div
        style={{
          border: '1px solid rgba(10, 10, 10, 1)',
          background: 'white',
          borderRadius: 5,
          width: '250px',
          minHeight: '200px',
          //   position:'relative'
        }}
      >
        {!data.isRoot ? (
          <Handle
            type="target"
            position={Position.Top}
            style={{ background: '#555' }}
          />
        ) : null}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexDirection: 'column',
          }}
        >
          <div
            className="custom-drag-handle"
            style={{
              width: '100%',
              textAlign: 'start',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              background: 'black',
              padding: '5px',
            }}
          >
            {!hideLabelInput ? (
              <input
                ref={inputRef}
                style={{
                  border: 'none',
                  width: '100%',
                  outline: 'none',
                  borderRadius: '6px',
                  padding: '5px',
                  background: 'black',
                  color: 'white',
                }}
                value={localLabel}
                onChange={(e) => setLocalLabel(e.target.value)}
                onBlur={handleHeadingChangeBlur}
                placeholder="Add page title here"
              ></input>
            ) : (
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  textAlign: 'start',
                  wordWrap: 'break-word',
                }}
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
            style={{
              width: '100%',
              height: '100%',
              padding: '10px',
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
            }}
          >
            {nodeData?.map((data, index) => (
              <li
                style={{ listStyleType: 'none', marginBottom: '10px' }}
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
              style={{
                cursor: 'pointer',
                width: '95%',
                height: '36px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '6px',
                gap: '12px',
                padding: '10px',

                background: 'rgba(0, 0, 0, 0.05)',
              }}
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
                style={{
                  width: '95%',
                  background: isLoading ? '#a8c016' : '#C3E11B',
                  border: 'none',
                  padding: '5px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginTop: '5px',
                  cursor: isLoading ? 'wait' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                }}
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

          <Handle type="source" position={Position.Bottom} style={{}} />
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
