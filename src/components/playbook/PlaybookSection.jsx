import { useState, useRef, useMemo, useCallback } from 'react';
import JoditEditor from 'jodit-react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import { HiSparkles } from 'react-icons/hi2';

function PlaybookSection({ stage, playbookId, onUpdateNodeData, onInspire, onRefresh }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="playbook-stage">
      <div
        className="playbook-stage-header"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <BiChevronRight size={22} /> : <BiChevronDown size={22} />}
        <h2>{stage.stage}</h2>
        <span className="playbook-stage-count">
          {(stage.nodes?.length || 0) + (stage.nodeData?.length || 0)} sections
        </span>
      </div>

      {!collapsed && (
        <div className="playbook-stage-body">
          {/* Stage-level nodeData */}
          {(stage.nodeData || []).map((nd) => (
            <NodeDataBlock
              key={nd.id || nd._id}
              nodeData={nd}
              stageId={stage.id || stage._id}
              nodeId={null}
              playbookId={playbookId}
              onUpdate={onUpdateNodeData}
              onInspire={onInspire}
            />
          ))}

          {/* Nodes with their nodeData */}
          {(stage.nodes || []).map((node) => (
            <div key={node.id || node._id} className="playbook-node">
              <h3 className="playbook-node-heading">{node.heading}</h3>
              {(node.nodeData || []).map((nd) => (
                <NodeDataBlock
                  key={nd.id || nd._id}
                  nodeData={nd}
                  stageId={stage.id || stage._id}
                  nodeId={node.id || node._id}
                  playbookId={playbookId}
                  onUpdate={onUpdateNodeData}
                  onInspire={onInspire}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NodeDataBlock({ nodeData, stageId, nodeId, playbookId, onUpdate, onInspire }) {
  const editorRef = useRef(null);
  const [inspiring, setInspiring] = useState(false);
  const [content, setContent] = useState(nodeData.description || '');
  const saveTimerRef = useRef(null);

  const nodeDataId = nodeData.id || nodeData._id;
  const effectiveNodeId = nodeId || nodeDataId; // for stage-level nodeData, use its own id

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start writing or click Inspire Me...',
      height: 200,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      toolbarButtonSize: 'small',
      toolbarAdaptive: true,
      buttons: [
        'bold', 'italic', 'underline', '|',
        'ul', 'ol', '|',
        'font', 'fontsize', '|',
        'image', 'table', '|',
        'source',
      ],
    }),
    []
  );

  const handleBlur = useCallback(
    (newContent) => {
      setContent(newContent);
      // Debounced save
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        if (nodeId) {
          onUpdate(stageId, nodeId, nodeDataId, newContent);
        }
      }, 1000);
    },
    [stageId, nodeId, nodeDataId, onUpdate]
  );

  const handleInspire = async () => {
    setInspiring(true);
    try {
      const generated = await onInspire(
        nodeData.heading,
        stageId,
        effectiveNodeId,
        nodeDataId
      );
      if (generated) {
        setContent(generated);
        // Also save to backend
        if (nodeId) {
          onUpdate(stageId, nodeId, nodeDataId, generated);
        }
      }
    } finally {
      setInspiring(false);
    }
  };

  return (
    <div className="playbook-nodedata">
      <div className="playbook-nodedata-header">
        <h4>{nodeData.heading}</h4>
        <button
          className="playbook-inspire-btn"
          onClick={handleInspire}
          disabled={inspiring}
          title="Generate AI content for this section"
        >
          <HiSparkles size={14} />
          {inspiring ? 'Generating...' : 'Inspire Me'}
        </button>
      </div>
      <JoditEditor
        ref={editorRef}
        value={content}
        config={joditConfig}
        tabIndex={1}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default PlaybookSection;
