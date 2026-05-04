import PropTypes from 'prop-types';

import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';
import { MdDelete } from 'react-icons/md';
import { useMemo } from 'react';

import './sitemap.scss';

function Edge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges, getNodes } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const { isRootOrChildEdge } = useMemo(() => {
    const nodes = getNodes();
    const rootNode = nodes.find((node) => node.data.isRoot);

    return {
      isRootOrChildEdge:
        rootNode &&
        (id.startsWith(`${rootNode.id}-`) || id.endsWith(`-${rootNode.id}`)),
    };
  }, [getNodes, id]);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer className="edge-renderer">
        {!isRootOrChildEdge && (
          <MdDelete
            className="sitemap-edge-delete nodrag nopan delete"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            size={20}
            onClick={() => {
              setEdges((es) => es.filter((e) => e.id !== id));
            }}
          />
        )}
      </EdgeLabelRenderer>
    </>
  );
}

Edge.propTypes = {
  id: PropTypes.string.isRequired,
  sourceX: PropTypes.number.isRequired,
  sourceY: PropTypes.number.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
};

export default Edge;
