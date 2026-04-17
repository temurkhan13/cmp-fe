import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import config from '../../config/config.js';
import PlaybookSection from './PlaybookSection';
import PlaybookCover from './PlaybookCover';
import Loading from '../sitemap/Loading';
import { BsFilePlayFill } from 'react-icons/bs';
import { BiArrowBack, BiPlus } from 'react-icons/bi';
import { FiDownload } from 'react-icons/fi';
import './playbook.scss';
import ConfirmModal from '../common/ConfirmModal';
import { exportDocument } from '@utils/exportDocument';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

function PlaybookEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedWorkspace = useSelector(selectWorkspace);

  const [playbook, setPlaybook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [addingStage, setAddingStage] = useState(false);
  const [newStageName, setNewStageName] = useState('');
  const [brandingOpen, setBrandingOpen] = useState(false);
  const [accentColor, setAccentColor] = useState('#00316f');
  const [logoUrl, setLogoUrl] = useState('');
  const exportRef = useRef(null);
  const [deleteStageConfirm, setDeleteStageConfirm] = useState({ open: false, stageId: null });

  useEffect(() => {
    function handleClickOutside(e) {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setExportOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchPlaybook = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`${config.apiURL}/dpb/sitemap/${id}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Failed to fetch playbook');
      const data = await res.json();
      setPlaybook(data);
      if (data.accent_color) setAccentColor(data.accent_color);
      if (data.logo_url) setLogoUrl(data.logo_url);
    } catch (err) {
      import.meta.env.DEV && console.error('Fetch playbook error:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlaybook();
  }, [fetchPlaybook]);

  // Update a nodeData description
  const updateNodeData = async (stageId, nodeId, nodeDataId, newDescription) => {
    setSaving(true);
    try {
      await fetch(
        `${config.apiURL}/dpb/${id}/stage/${stageId}/nodes/${nodeId}/nodeData/${nodeDataId}`,
        {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify({ description: newDescription }),
        }
      );
    } catch (err) {
      import.meta.env.DEV && console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  // Inspire Me
  const inspireSection = async (heading, stageId, nodeId, nodeDataId) => {
    try {
      const res = await fetch(`${config.apiURL}/dpb/inspire`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          heading,
          playbookName: playbook?.name || '',
          playbookId: id,
          stageId,
          nodeId,
          nodeDataId,
        }),
      });
      if (!res.ok) throw new Error('Inspire failed');
      const data = await res.json();
      return data.content || data.message || '';
    } catch (err) {
      import.meta.env.DEV && console.error('Inspire error:', err);
      return '';
    }
  };

  // Add new stage
  const addStage = async () => {
    if (!newStageName.trim()) return;
    setAddingStage(true);
    try {
      const res = await fetch(`${config.apiURL}/dpb/sitemap/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          message: newStageName,
          sitemapName: newStageName,
        }),
      });
      if (res.ok) {
        setNewStageName('');
        await fetchPlaybook();
      }
    } catch (err) {
      import.meta.env.DEV && console.error('Add stage error:', err);
    } finally {
      setAddingStage(false);
    }
  };

  // Delete stage
  const deleteStage = async (stageId) => {
    try {
      await fetch(`${config.apiURL}/dpb/${id}/stage/${stageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      await fetchPlaybook();
    } catch (err) {
      import.meta.env.DEV && console.error('Delete stage error:', err);
    }
  };

  // Move stage up/down for reordering
  const moveStage = async (stageIndex, direction) => {
    const stages = playbook?.stages || [];
    const newIndex = stageIndex + direction;
    if (newIndex < 0 || newIndex >= stages.length) return;

    const reordered = [...stages];
    const [moved] = reordered.splice(stageIndex, 1);
    reordered.splice(newIndex, 0, moved);

    // Optimistic UI update
    setPlaybook({ ...playbook, stages: reordered });

    // Save order to backend
    try {
      const stageOrder = reordered.map((s) => s.id || s._id);
      await fetch(`${config.apiURL}/dpb/sitemap/simple-update/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ stageOrder }),
      });
    } catch (err) {
      import.meta.env.DEV && console.error('Reorder error:', err);
      await fetchPlaybook();
    }
  };

  // Save branding
  const saveBranding = async () => {
    try {
      await fetch(`${config.apiURL}/dpb/sitemap/simple-update/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ accent_color: accentColor, logo_url: logoUrl }),
      });
      setBrandingOpen(false);
    } catch (err) {
      import.meta.env.DEV && console.error('Branding save error:', err);
    }
  };

  // Handle logo file upload as base64
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleExport = async (type) => {
    setExportOpen(false);
    try {
      await exportDocument({
        type,
        source: 'playbook',
        sourceId: id,
        options: {
          branding: { accentColor, logoUrl },
        },
      });
    } catch (err) {
      import.meta.env.DEV && console.error(`${type} export error:`, err);
      alert(`${type.toUpperCase()} export failed: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="playbook-editor">
        <div className="playbook-loading"><Loading /></div>
      </div>
    );
  }

  if (!playbook) {
    return (
      <div className="playbook-editor">
        <div className="playbook-empty">
          <p>Playbook not found</p>
          <button className="assiss-btn" onClick={() => navigate('/digital-playbook/list')}>
            <BiArrowBack /> Back to Playbooks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="playbook-editor">
      {/* Header */}
      <div className="playbook-header">
        <div className="playbook-header-left">
          <button
            className="playbook-back-btn"
            onClick={() => navigate('/digital-playbook/list')}
            title="Back to playbooks"
          >
            <BiArrowBack size={18} />
          </button>
          <BsFilePlayFill size={20} />
          <h1 className="playbook-title">{playbook.name}</h1>
          {saving && <span className="playbook-saving">Saving...</span>}
        </div>
        <div className="playbook-header-right">
          <button
            className="playbook-brand-btn"
            onClick={() => setBrandingOpen(!brandingOpen)}
          >
            🎨 Branding
          </button>
          <div className="playbook-export-wrap" ref={exportRef}>
            <button className="assiss-btn" onClick={() => setExportOpen(!exportOpen)}>
              <FiDownload size={16} /> Export
            </button>
            {exportOpen && (
              <div className="playbook-export-dropdown">
                <button onClick={() => handleExport('pdf')}>PDF</button>
                <button onClick={() => handleExport('docx')}>Word (.docx)</button>
                <button onClick={() => handleExport('pptx')}>PowerPoint (.pptx)</button>
                <button onClick={() => handleExport('xlsx')}>Excel (.xlsx)</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Branding Panel */}
      {brandingOpen && (
        <div className="playbook-branding-panel">
          <h3>Playbook Branding</h3>
          <div className="branding-row">
            <label>Logo</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
            {logoUrl && <img src={logoUrl} alt="Logo" className="branding-logo-preview" />}
          </div>
          <div className="branding-row">
            <label>Accent Color</label>
            <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
            <span className="branding-color-hex">{accentColor}</span>
          </div>
          <div className="branding-actions">
            <button className="assiss-btn" onClick={saveBranding}>Save Branding</button>
            <button onClick={() => setBrandingOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="playbook-content" id="playbook-content">
        <PlaybookCover
          name={playbook.name}
          workspace={selectedWorkspace?.workspaceName}
          accentColor={accentColor}
          logoUrl={logoUrl}
        />

        {(playbook.stages || []).map((stage, index) => (
          <PlaybookSection
            key={stage.id || stage._id}
            stage={stage}
            playbookId={id}
            stageIndex={index}
            totalStages={(playbook.stages || []).length}
            onUpdateNodeData={updateNodeData}
            onInspire={inspireSection}
            onRefresh={fetchPlaybook}
            onDeleteStage={(stageId) => setDeleteStageConfirm({ open: true, stageId })}
            onMoveStage={moveStage}
          />
        ))}

        {/* Add Stage */}
        <div className="playbook-add-stage">
          <input
            type="text"
            placeholder="Add new stage (e.g. Discovery, Design, Deploy...)"
            value={newStageName}
            onChange={(e) => setNewStageName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addStage(); }}
          />
          <button
            className="assiss-btn"
            onClick={addStage}
            disabled={addingStage || !newStageName.trim()}
          >
            {addingStage ? 'Adding...' : <><BiPlus /> Add Stage</>}
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={deleteStageConfirm.open}
        title="Delete Stage"
        description="Delete this stage and all its content?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={async () => {
          const stageId = deleteStageConfirm.stageId;
          await deleteStage(stageId);
          setDeleteStageConfirm({ open: false, stageId: null });
        }}
        onCancel={() => setDeleteStageConfirm({ open: false, stageId: null })}
      />
    </div>
  );
}

export default PlaybookEditor;
