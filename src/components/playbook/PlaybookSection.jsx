import { useState, useRef, useMemo, useCallback } from 'react';
import JoditEditor from 'jodit-react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import { FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import Button from '../common/Button';

function PlaybookSection({
  stage,
  playbookId,
  stageIndex,
  totalStages,
  onUpdateNodeData,
  onInspire,
  onDeleteStage,
  onMoveStage,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const stageId = stage.id || stage._id;

  return (
    <div className="playbook-stage">
      <div className="playbook-stage-header">
        <div
          className="playbook-stage-header-left"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <BiChevronRight size={22} /> : <BiChevronDown size={22} />}
          <h2>{stage.stage}</h2>
          <span className="playbook-stage-count">
            {(stage.nodes?.length || 0) + (stage.nodeData?.length || 0)} sections
          </span>
        </div>
        <div className="playbook-stage-actions">
          <Button
            variant="icon"
            ariaLabel="Move up"
            className="playbook-stage-action-btn"
            title="Move up"
            disabled={stageIndex === 0}
            onClick={() => onMoveStage(stageIndex, -1)}
          >
            <FiArrowUp size={14} />
          </Button>
          <Button
            variant="icon"
            ariaLabel="Move down"
            className="playbook-stage-action-btn"
            title="Move down"
            disabled={stageIndex === totalStages - 1}
            onClick={() => onMoveStage(stageIndex, 1)}
          >
            <FiArrowDown size={14} />
          </Button>
          <Button
            variant="icon"
            ariaLabel="Delete stage"
            className="playbook-stage-action-btn delete"
            title="Delete stage"
            onClick={() => onDeleteStage(stageId)}
          >
            <FiTrash2 size={14} />
          </Button>
        </div>
      </div>

      {!collapsed && (
        <div className="playbook-stage-body">
          {(stage.nodeData || []).map((nd) => (
            <NodeDataBlock
              key={nd.id || nd._id}
              nodeData={nd}
              stageId={stageId}
              nodeId={null}
              playbookId={playbookId}
              onUpdate={onUpdateNodeData}
              onInspire={onInspire}
            />
          ))}

          {(stage.nodes || []).map((node) => (
            <div key={node.id || node._id} className="playbook-node">
              <h3 className="playbook-node-heading">{node.heading}</h3>
              {(node.nodeData || []).map((nd) => (
                <NodeDataBlock
                  key={nd.id || nd._id}
                  nodeData={nd}
                  stageId={stageId}
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

function NodeDataBlock({ nodeData, stageId, nodeId, onUpdate, onInspire }) {
  const editorRef = useRef(null);
  const [inspiring, setInspiring] = useState(false);
  const [content, setContent] = useState(nodeData.description || '');
  const saveTimerRef = useRef(null);

  const nodeDataId = nodeData.id || nodeData._id;
  const effectiveNodeId = nodeId || nodeDataId;

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
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'ul', 'ol', 'indent', 'outdent', '|',
        'font', 'fontsize', 'brush', 'paragraph', '|',
        'image', 'table', 'hr', '|',
        'link', 'align', 'symbols', '|',
        'undo', 'redo', '|',
        'fullsize', 'source',
      ],
      imageDefaultWidth: 300,
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  const handleBlur = useCallback(
    (newContent) => {
      setContent(newContent);
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
        <Button
          variant="secondary"
          size="sm"
          className="playbook-inspire-btn"
          iconLeft={<HiSparkles size={14} />}
          title="Generate AI content for this section"
          loading={inspiring}
          onClick={handleInspire}
        >
          Inspire Me
        </Button>
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
