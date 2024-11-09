import React, { useEffect, useRef, useState } from 'react';
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
  const inputRef = useRef();

  const [
    draggedIndex,
    draggedOverIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragedEnd,
  ] = useReorder();

  const updateNodeDataWithPropertyName = (id, property, newValue) => {
    const updatedArray = nodeData.map((item) =>
      item.id === id ? { ...item, [property]: newValue } : item
    );
    setNodeData(updatedArray);
  };

  const addNodeChild = (
    heading = '',
    description = '',
    color = '#0000000c',
    isEditing = false
  ) => {
    setNodeData((prev) => [
      ...prev,
      { id: uuidv4(), heading, description, color, isEditing },
    ]);
  };

  useEffect(() => {
    setNodeData(data.nodeData);
  }, [data.nodeData]);

  console.log("YOOO")
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
                onBlur={(event) => {
                  alert(event?.target?.value)
                  if (data.label.length !== 0) {
                    setHideLabelInput(true);
                  }
                }}
                value={data.label}
                onChange={(e) => {
                  data.updateNodeLabelById(data.id, e.target.value);
                }}
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
                  inputRef.current.focus();
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
                  console.log('Clicked');
                }}
                onDragStart={(e) => {
                  console.log(e);
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
                  background: '#C3E11B',
                  border: 'none',
                  padding: '5px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginTop: '5px',
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
                Generate with AI
              </button>
            )}
            <BiPlusCircle
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
            </BiPlusCircle>
          </div>

          {/* </div> */}
          <Handle type="source" position={Position.Bottom} style={{}} />
        </div>
      </div>
      {/* <div>
          <button
            style={{ marginTop: 20 }}
            onClick={e => {
              e.stopPropagation();
              console.log('Add Item');
              setItems(prev => [...prev, 'Item']);
            }}
          >
            Add Item
          </button>
        </div> */}
    </div>
  );
};

export default Node;
