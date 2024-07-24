import React, { useRef, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { BiPlus, BiPlusCircle } from 'react-icons/bi';
import NodeItem from './NodeItem';
import { v4 as uuidv4 } from 'uuid';

const Node = ({ data }) => {
  const [nodeData, setNodeData] = useState(data.nodeData);
  const [hideLabelInput, setHideLabelInput] = useState(false);
  const inputRef = useRef();

  const updateNodeDataWithPropertyName = (id, property, newValue) => {
    const updatedArray = nodeData.map((item) =>
      item.id === id ? { ...item, [property]: newValue } : item
    );
    setNodeData(updatedArray);
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div
        style={{
          padding: 10,
          border: '1px solid rgba(10, 10, 10, 1)',
          background: 'white',
          borderRadius: 5,
          width: '250px',
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
          <div style={{ width: '100%', textAlign: 'start' }}>
            {!hideLabelInput ? (
              <input
                ref={inputRef}
                style={{
                  border: 'none',
                  width: '100%',
                  outline: 'none',
                  borderRadius: '6px',
                  padding: '5px',
                  background: 'rgba(0, 0, 0, 0.05)',
                }}
                onBlur={() => {
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
                  color: 'rgba(10, 10, 10, 1)',
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

          <>
            {nodeData.map((data, index) => (
              <NodeItem
                key={data.id}
                nodeData={data}
                updateNodeDataWithPropertyName={updateNodeDataWithPropertyName}
              ></NodeItem>
            ))}
          </>

          <div
            style={{
              cursor: 'pointer',
              width: '100%',
              height: '36px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '6px',
              gap: '12px',

              background: 'rgba(0, 0, 0, 0.05)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setNodeData((prev) => [
                ...prev,
                { id: uuidv4(), heading: '', description: '', isEditing: true },
              ]);
            }}
          >
            <BiPlus size={20}></BiPlus>
          </div>
          {/* <div style={{ position: 'absolute', top:'100' }}> */}
          <BiPlusCircle
            onClick={data.onAddChild}
            size={30}
            color="rgba(0, 102, 255, 1)"
          >
            Add Child
          </BiPlusCircle>
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
