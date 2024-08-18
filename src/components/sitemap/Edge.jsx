import React from 'react';

import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';
import { MdDelete } from 'react-icons/md';

import './edge.scss';

function Edge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer className="edge-renderer">
        <MdDelete
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            cursor: 'pointer',
          }}
          size={20}
          className="nodrag nopan delete"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        ></MdDelete>
      </EdgeLabelRenderer>
    </>
  );
}

export default Edge;
