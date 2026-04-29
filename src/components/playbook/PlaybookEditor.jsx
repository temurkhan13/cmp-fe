import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import apiClient from '../../api/axios';
import PlaybookSection from './PlaybookSection';
import PlaybookCover from './PlaybookCover';
import Loading from '../sitemap/Loading';
import { BsFilePlayFill } from 'react-icons/bs';
import { BiArrowBack, BiPlus } from 'react-icons/bi';
import { FiDownload } from 'react-icons/fi';
import './playbook.scss';
import ConfirmModal from '../common/ConfirmModal';
import Button from '../common/Button';
import AnchoredMenu from '../dropdowns/AnchoredMenu';
import { exportDocument } from '@utils/exportDocument';

function PlaybookEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedWorkspace = useSelector(selectWorkspace);

  const [playbook, setPlaybook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingStage, setAddingStage] = useState(false);
  const [newStageName, setNewStageName] = useState('');
  const [brandingOpen, setBrandingOpen] = useState(false);
  const [accentColor, setAccentColor] = useState('#00316f');
  const [logoUrl, setLogoUrl] = useState('');
  const [deleteStageConfirm, setDeleteStageConfirm] = useState({ open: false, stageId: null });

  const fetchPlaybook = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await apiClient.get(`/dpb/sitemap/${id}`);
      const data = res.data;
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
      await apiClient.patch(
        `/dpb/${id}/stage/${stageId}/nodes/${nodeId}/nodeData/${nodeDataId}`,
        { description: newDescription },
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
      const res = await apiClient.post('/dpb/inspire', {
        heading,
        playbookName: playbook?.name || '',
        playbookId: id,
        stageId,
        nodeId,
        nodeDataId,
      });
      const data = res.data;
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
      await apiClient.patch(`/dpb/sitemap/${id}`, {
        message: newStageName,
        sitemapName: newStageName,
      });
      setNewStageName('');
      await fetchPlaybook();
    } catch (err) {
      import.meta.env.DEV && console.error('Add stage error:', err);
    } finally {
      setAddingStage(false);
    }
  };

  // Delete stage
  const deleteStage = async (stageId) => {
    try {
      await apiClient.delete(`/dpb/${id}/stage/${stageId}`);
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
      await apiClient.patch(`/dpb/sitemap/simple-update/${id}`, { stageOrder });
    } catch (err) {
      import.meta.env.DEV && console.error('Reorder error:', err);
      await fetchPlaybook();
    }
  };

  // Save branding
  const saveBranding = async () => {
    try {
      await apiClient.patch(`/dpb/sitemap/simple-update/${id}`, { accent_color: accentColor, logo_url: logoUrl });
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
          <Button
            variant="primary"
            className="assiss-btn"
            iconLeft={<BiArrowBack />}
            onClick={() => navigate('/digital-playbook/list')}
          >
            Back to Playbooks
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="playbook-editor">
      {/* Header */}
      <div className="playbook-header">
        <div className="playbook-header-left">
          <Button
            variant="icon"
            ariaLabel="Back to playbooks"
            className="playbook-back-btn"
            title="Back to playbooks"
            onClick={() => navigate('/digital-playbook/list')}
          >
            <BiArrowBack size={18} />
          </Button>
          <BsFilePlayFill size={20} />
          <h1 className="playbook-title">{playbook.name}</h1>
          {saving && <span className="playbook-saving">Saving...</span>}
        </div>
        <div className="playbook-header-right">
          <Button
            variant="secondary"
            className="playbook-brand-btn"
            onClick={() => setBrandingOpen(!brandingOpen)}
          >
            🎨 Branding
          </Button>
          <AnchoredMenu
            align="right"
            trigger={({ onClick }) => (
              <Button
                variant="primary"
                className="assiss-btn"
                iconLeft={<FiDownload size={16} />}
                onClick={onClick}
              >
                Export
              </Button>
            )}
            items={[
              { key: 'pdf', label: 'PDF', onClick: () => handleExport('pdf') },
              { key: 'docx', label: 'Word (.docx)', onClick: () => handleExport('docx') },
              { key: 'pptx', label: 'PowerPoint (.pptx)', onClick: () => handleExport('pptx') },
              { key: 'xlsx', label: 'Excel (.xlsx)', onClick: () => handleExport('xlsx') },
            ]}
          />
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
            <Button variant="primary" className="assiss-btn" onClick={saveBranding}>
              Save Branding
            </Button>
            <Button variant="secondary" onClick={() => setBrandingOpen(false)}>
              Cancel
            </Button>
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
          <Button
            variant="primary"
            className="assiss-btn"
            iconLeft={<BiPlus />}
            disabled={!newStageName.trim()}
            loading={addingStage}
            onClick={addStage}
          >
            Add Stage
          </Button>
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
