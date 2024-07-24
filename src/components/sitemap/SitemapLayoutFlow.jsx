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
import assets from '../../assets';
import { BiLoader, BiSend } from 'react-icons/bi';
import { LuLoader2 } from 'react-icons/lu';
const nodeTypes = {
  custom: Node,
};

const SitemapLayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [layouted, setLayouted] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [isPromptVisible, setPromptVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  const addChildNode = (
    parentId,
    parentPosition,
    label = '',
    nodeData = [],
    nodeKey = uuidv4()
  ) => {
    const newNodeId = nodeKey;
    const position = { x: parentPosition.x + 0, y: parentPosition.y + 200 };
    const newNode = {
      id: newNodeId,
      type: 'custom',
      position,
      data: {
        id: newNodeId,
        label,
        nodeData,
        onAddChild: () =>
          addChildNode(newNodeId, {
            x: position.x + 0,
            y: position.y + 200,
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
    setLayouted(false);
  };

  function extractStructuredData(jsonData) {
    const result = {
      parent: jsonData.message,
      stages: jsonData.stages.map((stage) => {
        const { stage: stageName, response } = stage;
        return {
          stage: stageName,
          sections: Object.entries(response.message[stageName]).map(
            ([sectionName, content]) => {
              return {
                name: sectionName,
                content: content,
              };
            }
          ),
        };
      }),
    };
    return result;
  }

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const onInit = async () => {
    if (prompt === '') {
      alert('Please enter a message');
      return;
    }
    setIsLoading(true);
    const payload = {
      user_id: '11',
      chat_id: '22',
      message: prompt,
      sitemapName: 'Playbook Introduction',
    };

    let res = await postData(
      'http://139.59.4.99:3000/api/dpb/sitemap',
      payload
    );

    setIsLoading(false);
    setPromptVisible(false);
    const structuredData = extractStructuredData(res);
    let { parent, stages } = structuredData;

    const id = uuidv4();
    const initialNode = [
      {
        id,
        type: 'custom',
        position: { x: 0, y: 0 },
        data: {
          id,
          label: Object.keys(parent).at(0),
          nodeData: Object.entries(parent[Object.keys(parent).at(0)])
            .filter(([k, v]) => v !== '')
            .reverse()
            .map(([k, v]) => {
              return {
                id: uuidv4(),
                heading: k,
                description: v,
                isEditing: false,
              };
            }),
          description: 'This is the parent node',
          onAddChild: () => {},
          isRoot: true,
        },
      },
    ];
    initialNode[0].data.onAddChild = () => addChildNode(id, { x: 0, y: 0 });
    initialNode[0].data.updateNodeLabelById = updateNodeLabelById;
    setNodes(initialNode);

    stages.forEach((stage) => {
      let nodeKey = uuidv4();
      let nodesData = [
        {
          isEditing: false,
          id: uuidv4(),
        },
      ];
      stage.sections.forEach((section) => {
        if (section.name === 'About') {
          nodesData[0].heading = section.content;
        } else if (section.name === 'Content') {
          nodesData[0].description = section.content;
        } else {
          addChildNode(
            nodeKey,
            { x: 0, y: 0 },
            section.name,
            Object.entries(section.content)
              .reverse()
              .map(([k, v]) => {
                return {
                  id: uuidv4(),
                  heading: k,
                  description: v,
                  isEditing: false,
                };
              })
          );
        }
      });
      addChildNode(id, { x: 0, y: 0 }, stage.stage, nodesData, nodeKey);
    });
  };
  // useEffect(() => {
  //   onInit();
  // }, []);

  useEffect(() => {
    if (!layouted) {
      setTimeout(() => {
        onLayout('TB');
      }, 1000);
      setLayouted(true);
    }
  }, [layouted, onLayout, nodes, edges]);

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
      <Panel position="top-right">
        <div style={{ display: 'flex', gap: 10 }}>
          {isPromptVisible ? (
            <div
              style={{
                width: '525px',
                height: '338px',
                border: '1px solid rgba(10, 10, 10, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '10px',
                borderRadius: '6px',
                background: 'white',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '20%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <img src={assets.common.icon} alt="icon" />
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                  }}
                >
                  Change AI
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '80%',
                  position: 'relative',
                }}
              >
                <textarea
                  style={{
                    border: 'none',
                    width: '100%',
                    outline: 'none',
                    resize: 'none',
                    borderRadius: '6px',
                    height: '100%',
                    padding: '10px',
                    border: '1px solid rgba(10, 10, 10, 0.1)',
                  }}
                  placeholder="Message ChangeAI to generate a sitemap"
                  onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
                {!isLoading ? (
                  <BiSend
                    onClick={onInit}
                    style={{
                      position: 'absolute',
                      left: '93%',
                      bottom: 10,
                      cursor: 'pointer',
                    }}
                    size={25}
                    color="rgba(10, 10, 10, 0.21)"
                  ></BiSend>
                ) : (
                  <BiLoader
                    size={25}
                    style={{
                      position: 'absolute',
                      left: '93%',
                      bottom: 10,
                      cursor: 'pointer',
                    }}
                  ></BiLoader>
                )}
              </div>
            </div>
          ) : null}
          <div
            style={{
              width: '40px',
              height: '40px',
              marginTop: '10px',
              cursor: 'pointer',
            }}
            onClick={() => setPromptVisible(!isPromptVisible)}
          >
            <img
              src={assets.common.icon}
              alt="logo"
              style={{ width: '100%', height: '100p%' }}
            />
          </div>
        </div>

        {/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */}
      </Panel>
      {/* <Background /> */}
      <Controls />
    </ReactFlow>
  );
};

export default SitemapLayoutFlow;
