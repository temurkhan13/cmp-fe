import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Node from './Node';
import { useCallback, useEffect, useState } from 'react';
import Dagre from '@dagrejs/dagre';
import { v4 as uuidv4 } from 'uuid';
import assets from '../../assets';
import { FaHistory } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { SideBarModal } from '../../components/common';
import VersionHistory from '../assisstent/assistantModal/VersionHistory';
import Comments from '../assisstent/assistantModal/Comments';
import Loading from './Loading';
import Edge from './Edge';
import config from '../../config/config';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice';

const nodeTypes = {
  custom: Node,
};
const edgeTypes = {
  'custom-edge': Edge,
};

const DEFAULT_NODE = [
  {
    id: 'root',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      id: 'root',
      label: 'Add Title',
      nodeData: [],
      onAddChild: () => {},
      isRoot: true,
      updateNodeLabelById: () => {},
      fetchNodeData: () => {},
      siteMapId: '',
      showGenerateAIButton: false,
    },
  },
];

const SitemapLayoutFlow = ({ id }) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [layouted, setLayouted] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [isPromptVisible, setPromptVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isVersionHistoryModalOpen, setIsVersionHistoryModalOpen] =
    useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [shouldGetSitemap, setShouldGetSitemap] = useState(false);
  const [convertingPlaybook, setConvertingPlaybook] = useState(false);

  const userData = localStorage.getItem('user');
  const authToken = localStorage.getItem('token');

  const selectedWorkspace = useSelector(selectWorkspace);
  const navigate = useNavigate();

  // Redirect invalid sitemap URLs to list page
  useEffect(() => {
    if (id === 'undefined' || id === 'null') {
      navigate('/sitemap/list', { replace: true });
    }
  }, [id, navigate]);

  const closeModal = () => {
    setIsVersionHistoryModalOpen(false);
    setIsCommentsModalOpen(false);
  };
  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const estimateNodeSize = (node) => {
    // Use measured dimensions if available (after React Flow renders)
    if (node.measured?.width && node.measured?.height) {
      return { width: node.measured.width + 20, height: node.measured.height + 20 };
    }
    // Estimate based on content — node width is 250px (from Node.jsx)
    const nodeWidth = 280;
    const itemCount = node.data?.nodeData?.length || 0;
    // Each item: heading (~20px) + description (~40-60px) + padding (~15px) = ~80px
    // Header: 40px, "Add" button: 50px, padding: 30px
    const estimatedHeight = Math.max(200, 120 + itemCount * 100);
    return { width: nodeWidth, height: estimatedHeight };
  };

  const getLayoutedElements = (nodes, edges, options) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({
      rankdir: options.direction,
      nodesep: 80,   // horizontal spacing between nodes
      ranksep: 120,  // vertical spacing between ranks (parent-child)
      marginx: 40,
      marginy: 40,
    });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => {
      const { width, height } = estimateNodeSize(node);
      g.setNode(node.id, { ...node, width, height });
    });

    Dagre.layout(g);

    return {
      nodes: nodes.map((node) => {
        const position = g.node(node.id);
        const { width, height } = estimateNodeSize(node);

        const x = position.x - width / 2;
        const y = position.y - height / 2;

        return { ...node, position: { x, y } };
      }),
      edges,
    };
  };
  const onLayout = (direction) => {
    if (!nodes.length) return;
    // Measure actual rendered node sizes from the DOM
    const measuredNodes = nodes.map((node) => {
      const el = document.querySelector(`[data-id="${node.id}"]`);
      const width = el?.offsetWidth || node.measured?.width || 280;
      const height = el?.offsetHeight || node.measured?.height || 200;
      return { ...node, measured: { width, height } };
    });
    const result = getLayoutedElements(measuredNodes, edges, { direction });
    setNodes([...result.nodes]);
    setEdges([...result.edges]);
    window.requestAnimationFrame(() => fitView());
    setTimeout(() => window.requestAnimationFrame(() => fitView()), 200);
  };
  const updateNodeLabelById = async (
    sitemapId,
    stageId,
    type,
    id,
    newLabel
  ) => {
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

    await updateNodeOrNodeData(sitemapId, stageId, type, id, {
      heading: newLabel,
    });
  };
  const updateNodeById = async (sitemapId, stageId, type, id, data) => {
    await updateNodeOrNodeData(sitemapId, stageId, type, id, data);
  };

  const addChildNode = (
    parentId,
    parentPosition,
    label = '',
    nodeData = [],
    nodeKey = uuidv4(),
    siteMapId = '',
    stageId = '',
    showGenerateAIButton = true
  ) => {
    const newNodeId = nodeKey;
    const position = { x: parentPosition.x + 0, y: parentPosition.y + 200 };
    const newNode = {
      id: newNodeId,
      type: 'custom',
      position,
      dragHandle: '.custom-drag-handle',
      data: {
        id: newNodeId,
        label,
        nodeData,
        onAddChild: () => {
          addChildNode(
            newNodeId,
            {
              x: position.x + 0,
              y: position.y + 200,
            },
            '',
            [],
            uuidv4(),
            '',
            '',
            false
          );
          setLayouted(false);
        },
        isRoot: parentId === 'root' ? true : false,
        updateNodeLabelById: updateNodeLabelById,
        updateNodeById: updateNodeById,
        fetchNodeData: onPatch,
        siteMapId,
        stageId,
        showGenerateAIButton,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      {
        id: `${parentId}-${nodeKey}`,
        source: parentId,
        target: nodeKey,
        type: 'custom-edge',
      },
    ]);
  };
  function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }
  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async function patchData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async function getData(url = '') {
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  }
  async function updateNodeOrNodeData(sitemapId, stageId, type, typeId, data) {
    const response = await fetch(
      `${config.apiURL}/dpb/${sitemapId}/stage/${stageId}/${type}/${typeId}`,
      {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      }
    );
    return response.json();
  }
  const getSitemap = async () => {
    if (!id || id === 'undefined') return;
    const res = await getData(`${config.apiURL}/dpb/sitemap/${id}`);

    if (res) {
      let siteMapId = res.id;

      res.stages.map((stage) => {
        if (stage.stage === 'Playbook Introduction') {
          addChildNode(
            'root',
            { x: 0, y: 0 },
            stage.stage,
            stage.nodeData.map(({ heading, description, color }) => {
              return {
                id: uuidv4(),
                heading,
                description,
                isEditing: false,
                color,
              };
            }),
            stage._id,
            siteMapId,
            stage._id,
            false
          );

          let parentId = stage._id;
          res.stages.forEach((stage) => {
            if (stage.stage === 'Playbook Introduction') return;
            addChildNode(
              parentId,
              { x: 0, y: 0 },
              stage.stage,
              [],
              stage._id,
              siteMapId,
              parentId,
              true
            );
          });

          stage.nodes.forEach((node) => {
            let ifStage = res?.stages?.find(
              (stage) => stage.stage === node.heading
            );
            if (ifStage) return;
            addChildNode(
              parentId,
              { x: 0, y: 0 },
              node.heading,
              [],
              node._id,
              siteMapId,
              parentId,
              true
            );
          });
        }

        if (stage.stage !== 'Playbook Introduction') {
          let nodeDataTemp = stage.nodeData.map(
            ({ heading, description, color }) => {
              return {
                id: uuidv4(),
                heading,
                description,
                isEditing: false,
                color,
              };
            }
          );

          setNodes((nds) => [
            ...nds.map((node) => {
              if (node.data.label === stage.stage) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    nodeData: nodeDataTemp,
                  },
                };
              }
              return node;
            }),
          ]);

          stage.nodes.map((node) => {
            addChildNode(
              stage._id,
              { x: 0, y: 0 },
              node.heading,
              node.nodeData.map(({ heading, description, color }) => {
                return {
                  id: uuidv4(),
                  heading,
                  description,
                  isEditing: false,
                  color,
                };
              }),
              node._id,
              siteMapId,
              stage._id
            );
          });
        }
      });

      setLayouted(false);
    }
  };

  const linkWorkSpaceAndSiteMap = async (sitemapId) => {
    const folderId = selectedWorkspace?.folders?.find(
      (folder) => folder?.isActive
    );
    if (!folderId?.id || !selectedWorkspace?.id || !sitemapId) return;
    await fetch(
      `${config.apiURL}/workspace/${selectedWorkspace.id}/folder/${folderId.id}/sitemap`,
      {
        method: 'POST',
        body: JSON.stringify({
          sitemapId: sitemapId,
        }),
        headers: getAuthHeaders(),
      }
    );
  };
  const onInit = async (
    stage = 'Playbook Introduction',
    nodeId = '',
    nodeData = [],
    sitemapId = ''
  ) => {
    const parsedUserData = userData ? JSON.parse(userData) : null;

    setIsLoading(true);
    setPromptVisible(false);
    const fullPrompt = keywords.length > 0
      ? `Keywords: ${keywords.join(', ')}.\n\n${prompt}`
      : prompt;
    const payload = {
      user_id: parsedUserData?.id,
      message: fullPrompt,
      sitemapName: stage,
    };

    let res =
      stage === 'Playbook Introduction'
        ? await postData(`${config.apiURL}/dpb/sitemap`, payload)
        : await patchData(`${config.apiURL}/dpb/sitemap/${sitemapId}`, payload);

    if (stage === 'Playbook Introduction' && res) {
      await linkWorkSpaceAndSiteMap(res?.id);
    }
    setIsLoading(false);
    setPromptVisible(false);

    if (!res || !res.id || !res.stages) {
      import.meta.env.DEV && console.error('Sitemap creation failed — invalid response:', res);
      return;
    }

    let siteMapId = res.id;

    setShouldGetSitemap(true);
    navigate({ pathname: `/sitemap/${siteMapId}` }, { replace: true });

    res.stages.map((stage) => {
      addChildNode(
        'root',
        { x: 1100, y: 0 },
        stage.stage,
        stage.nodeData.map(({ heading, description, color }) => {
          return {
            id: uuidv4(),
            heading,
            description,
            isEditing: false,
            color,
          };
        }),
        res.stages[0]._id,
        siteMapId,
        stage._id
      );

      let parentId = stage._id;
      stage.nodes.map((node, index) => {
        addChildNode(
          parentId,
          { x: (index + 1) * 400, y: 700 },
          node.heading,
          [],
          uuidv4(),
          siteMapId,
          parentId,
          true
        );
      });
    });
    setLayouted(true);
  };
  const onPatch = async (
    stageLabel = 'Playbook Introduction',
    nodeId = '',
    nodeData = [],
    sitemapId = ''
  ) => {
    setIsLoading(true);
    const parsedUserData = userData ? JSON.parse(userData) : null;

    const payload = {
      user_id: parsedUserData?.id,
      message: prompt,
      sitemapName: stageLabel,
      request: stageLabel === 'Playbook Introduction' ? 'POST' : 'PATCH',
    };

    let res =
      stageLabel === 'Playbook Introduction'
        ? await postData(`${config.apiURL}/dpb/sitemap`, payload)
        : await patchData(`${config.apiURL}/dpb/sitemap/${sitemapId}`, payload);

    setIsLoading(false);
    setPromptVisible(false);
    setLayouted(false);
    let siteMapId = res.id;

    res.stages.map((stage) => {
      if (stage.stage !== stageLabel) {
        return;
      }

      let nodeDataTemp = stage.nodeData.map(
        ({ heading, description, color }) => {
          return {
            id: uuidv4(),
            heading,
            description,
            isEditing: false,
            color,
          };
        }
      );

      setNodes((nds) => [
        ...nds.map((node) => {
          if (node.data.label === stage.stage) {
            return {
              ...node,
              data: {
                ...nodeData,
                ...node.data,
                nodeData: nodeDataTemp,
              },
            };
          }
          return node;
        }),
      ]);

      stage.nodes.map((node) => {
        addChildNode(
          nodeId,
          { x: 0, y: 0 },
          node.heading,
          node.nodeData.map(({ heading, description, color }) => {
            return {
              id: uuidv4(),
              heading,
              description,
              isEditing: false,
              color,
            };
          }),
          uuidv4(),
          siteMapId,
          stage._id,
          false
        );
      });
    });
  };

  useEffect(() => {
    if (nodes.length > 0 && !layouted) {
      const timeoutId = setTimeout(() => {
        onLayout('TB');
        setLayouted(true);
        setTimeout(() => onLayout('TB'), 500);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length, layouted]);

  useEffect(() => {
    if (shouldGetSitemap) {
      setShouldGetSitemap(false);
      return;
    }

    getSitemap();
  }, [id]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      proOptions={{ hideAttribution: true }}
      minZoom={0.1} // Set a low minZoom for deeper zoom-out
      maxZoom={10} // Set a high maxZoom for more zoom-in levels
      // defaultzoom={0.2} // Default initial zoom level
    >
      <Panel position="top-left">
        <div style={{ display: 'flex', gap: '8px' }}>
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
          {id && (
            <button
              disabled={convertingPlaybook}
              onClick={async () => {
                try {
                  setConvertingPlaybook(true);
                  const authToken = localStorage.getItem('token');
                  const res = await fetch(`${config.apiURL}/dpb/convert/${id}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${authToken}`,
                    },
                  });
                  if (res.ok) {
                    const data = await res.json();
                    const newId = data._id || data.id;
                    if (newId) navigate(`/playbook/${newId}`);
                  } else {
                    alert('Failed to convert sitemap to playbook');
                  }
                } catch (err) {
                  import.meta.env.DEV && console.error('Convert error:', err);
                  alert('Failed to convert: ' + err.message);
                } finally {
                  setConvertingPlaybook(false);
                }
              }}
              style={{
                background: convertingPlaybook ? '#a8c016' : '#C3E11D',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: 'none',
                cursor: convertingPlaybook ? 'wait' : 'pointer',
                opacity: convertingPlaybook ? 0.7 : 1,
              }}
            >
              {convertingPlaybook ? 'Converting...' : 'Convert to Playbook'}
            </button>
          )}
        </div>
      </Panel>
      {!id ? (
        <Panel position="top-right">
          <div style={{ display: 'flex', gap: 10 }}>
            {isPromptVisible ? (
              <div
                style={{
                  width: '525px',
                  height: '370px',
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
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    padding: '6px',
                    border: '1px solid rgba(10, 10, 10, 0.1)',
                    borderRadius: '6px',
                    marginBottom: '6px',
                    minHeight: '34px',
                    alignItems: 'center',
                  }}>
                    {keywords.map((kw, i) => (
                      <span key={i} style={{
                        background: '#C3E11D',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        {kw}
                        <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setKeywords(keywords.filter((_, idx) => idx !== i))}>x</span>
                      </span>
                    ))}
                    <input
                      style={{ border: 'none', outline: 'none', flex: 1, minWidth: '80px', fontSize: '13px' }}
                      placeholder={keywords.length === 0 ? 'Add keywords (press Enter)' : ''}
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && keywordInput.trim()) {
                          e.preventDefault();
                          e.stopPropagation();
                          setKeywords([...keywords, keywordInput.trim()]);
                          setKeywordInput('');
                        }
                        if (e.key === 'Backspace' && !keywordInput && keywords.length > 0) {
                          setKeywords(keywords.slice(0, -1));
                        }
                      }}
                    />
                  </div>
                  <textarea
                    style={{
                      width: '100%',
                      outline: 'none',
                      resize: 'none',
                      borderRadius: '6px',
                      height: 'calc(85% - 42px)',
                      padding: '10px',
                      border: '1px solid rgba(10, 10, 10, 0.1)',
                    }}
                    placeholder="Describe the change management process — key phases, objectives, stakeholders, and outcomes."
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && onInit('Playbook Introduction')
                    }
                  ></textarea>
                  <button
                    style={{
                      width: '100%',
                      background: '#C3E11B',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontWeight: '500',
                      marginTop: '5px',
                    }}
                    disabled={isLoading}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && onInit('Playbook Introduction')
                    }
                    onClick={() => onInit('Playbook Introduction')}
                  >
                    Generate Sitemap
                  </button>
                </div>
              </div>
            ) : null}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '10px',
                background: 'white',
                border: '1px solid lightgray',
                borderRadius: '6px',
                padding: '0 5px',
                height: '150px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  marginTop: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (nodes.length > 0) {
                    return;
                  }
                  setPromptVisible(!isPromptVisible);
                }}
              >
                <img
                  src={assets.common.icon}
                  alt="logo"
                  style={{ width: '100%', height: '100p%' }}
                />
              </div>
              <div>
                <span
                  // className={`iconButton ${
                  //   // isVersionHistoryModalOpen ? 'active' : ''
                  // }`}
                  onClick={() => setIsVersionHistoryModalOpen(true)}
                >
                  <FaHistory className="icon" size={25} />
                  {/* <span className="tooltip">Version History</span> */}
                </span>
              </div>
              <div>
                <span
                  // className={`iconButton ${
                  //   isCommentsModalOpen ? 'active' : ''
                  // }`}
                  onClick={() => setIsCommentsModalOpen(true)}
                >
                  <IoIosChatboxes className="icon" size={28} />
                  {/* <span className="tooltip">Comments</span> */}
                </span>
              </div>
            </div>
          </div>

          {/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */}

          {isVersionHistoryModalOpen && (
            <SideBarModal
              title="Version History"
              bodyContent={<VersionHistory versions={[]} />}
              onClose={closeModal}
            />
          )}
          {isCommentsModalOpen && (
            <SideBarModal
              title="Comments"
              bodyContent={<Comments comments={[]} />}
              onClose={closeModal}
            />
          )}
        </Panel>
      ) : null}
      {isLoading ? (
        <Panel position="center">
          <div
            style={{
              height: '90vh',
              // width: '1600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <Loading />
          </div>
        </Panel>
      ) : null}
      <Controls />
    </ReactFlow>
  );
};

SitemapLayoutFlow.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SitemapLayoutFlow;
