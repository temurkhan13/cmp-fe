import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Node from './Node';
import { useCallback, useEffect, useState } from 'react';
import Dagre from '@dagrejs/dagre';
import { v4 as uuidv4 } from 'uuid';
const nodeTypes = {
  custom: Node,
};

const SitemapLayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const getLayoutedElements = (nodes, edges, options) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) =>
      g.setNode(node.id, {
        ...node,
        width: node.measured?.width ?? 0,
        height: node.measured?.height ?? 0,
      })
    );

    Dagre.layout(g);

    return {
      nodes: nodes.map((node) => {
        const position = g.node(node.id);
        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        const x = position.x - (node.measured?.width ?? 0) / 2;
        const y = position.y - (node.measured?.height ?? 0) / 2;

        return { ...node, position: { x, y } };
      }),
      edges,
    };
  };

  const onLayout = useCallback(
    (direction) => {
      console.log(nodes);
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );

  const updateNodeLabelById = (id, newLabel) => {
    setNodes((prev) => [
      ...prev.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
            },
          };
        }
        return node;
      }),
    ]);
  };

  const addChildNode = (parentId, parentPosition) => {
    const newNodeId = uuidv4();
    const newNode = {
      id: newNodeId,
      type: 'custom',
      position: { x: parentPosition.x + 0, y: parentPosition.y + 200 },
      data: {
        id: newNodeId,
        label: '',
        onAddChild: () =>
          addChildNode(newNodeId, {
            x: parentPosition.x + 0,
            y: parentPosition.y + 200,
          }),
        isRoot: false,
        updateNodeLabelById: updateNodeLabelById,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      { id: `e${parentId}-${newNodeId}`, source: parentId, target: newNodeId },
    ]);
  };

  const onInit = () => {
    const id = uuidv4();
    const initialNode = [
      {
        id,
        type: 'custom',
        position: { x: 0, y: 0 },
        data: {
          id,
          label: '',
          description: 'This is the parent node',
          onAddChild: () => {},
          isRoot: true,
        },
      },
    ];

    initialNode[0].data.onAddChild = () => addChildNode(id, { x: 0, y: 0 });
    initialNode[0].data.updateNodeLabelById = updateNodeLabelById;
    setNodes(initialNode);
  };

  useEffect(() => {
    onInit();
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      nodeTypes={nodeTypes}
    >
      <Panel position="top-left">
        <button
          onClick={() => onLayout('TB')}
          style={{
            background: 'white',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Layout
        </button>
        {/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */}
      </Panel>
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default SitemapLayoutFlow;
