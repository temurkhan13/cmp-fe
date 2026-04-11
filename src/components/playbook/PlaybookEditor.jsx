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
  const exportRef = useRef(null);

  // Close export dropdown on outside click
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
    } catch (err) {
      console.error('Fetch playbook error:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlaybook();
  }, [fetchPlaybook]);

  // Update a nodeData description (auto-save with debounce in section)
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
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  // Inspire Me — generate AI content for a section
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
      console.error('Inspire error:', err);
      return '';
    }
  };

  // Add a new stage
  const addStage = async () => {
    if (!newStageName.trim()) return;
    setAddingStage(true);
    try {
      // Create stage via backend
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
      console.error('Add stage error:', err);
    } finally {
      setAddingStage(false);
    }
  };

  // Export as PDF
  const exportPdf = async () => {
    setExportOpen(false);
    const htmlToPdfmake = (await import('html-to-pdfmake')).default;
    const pdfMake = (await import('pdfmake/build/pdfmake')).default;
    const pdfFonts = (await import('pdfmake/build/vfs_fonts')).default;
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const content = [];

    // Cover
    content.push(
      { text: 'DIGITAL PLAYBOOK', style: 'coverLabel', margin: [0, 80, 0, 10] },
      { text: playbook?.name || 'Digital Playbook', style: 'coverTitle', margin: [0, 0, 0, 10] },
      { text: selectedWorkspace?.workspaceName || '', style: 'coverWorkspace', margin: [0, 0, 0, 20] },
      { canvas: [{ type: 'line', x1: 200, y1: 0, x2: 320, y2: 0, lineWidth: 3, lineColor: '#C3E11D' }], margin: [0, 0, 0, 10] },
      { text: 'Powered by ChangeAI', style: 'coverPowered', margin: [0, 0, 0, 40] },
      { text: '', pageBreak: 'after' }
    );

    // Stages
    for (const stage of playbook?.stages || []) {
      content.push({ text: stage.stage, style: 'stageHeading', margin: [0, 10, 0, 8] });

      for (const nd of stage.nodeData || []) {
        if (nd.heading) content.push({ text: nd.heading, style: 'sectionHeading', margin: [0, 6, 0, 4] });
        if (nd.description) {
          try {
            const parsed = htmlToPdfmake(nd.description);
            content.push(...(Array.isArray(parsed) ? parsed : [parsed]));
          } catch {
            content.push({ text: nd.description, margin: [0, 0, 0, 6] });
          }
        }
      }

      for (const node of stage.nodes || []) {
        content.push({ text: node.heading, style: 'nodeHeading', margin: [0, 8, 0, 4] });
        for (const nd of node.nodeData || []) {
          if (nd.heading) content.push({ text: nd.heading, style: 'sectionHeading', margin: [0, 4, 0, 2] });
          if (nd.description) {
            try {
              const parsed = htmlToPdfmake(nd.description);
              content.push(...(Array.isArray(parsed) ? parsed : [parsed]));
            } catch {
              content.push({ text: nd.description, margin: [0, 0, 0, 4] });
            }
          }
        }
      }
    }

    const docDef = {
      content,
      defaultStyle: { fontSize: 11 },
      pageMargins: [40, 60, 40, 60],
      styles: {
        coverLabel: { fontSize: 10, alignment: 'center', color: '#666', letterSpacing: 3 },
        coverTitle: { fontSize: 24, bold: true, alignment: 'center', color: '#00316f' },
        coverWorkspace: { fontSize: 13, alignment: 'center', color: '#888' },
        coverPowered: { fontSize: 9, alignment: 'center', color: '#aaa' },
        stageHeading: { fontSize: 18, bold: true, color: '#00316f' },
        nodeHeading: { fontSize: 14, bold: true, color: '#333' },
        sectionHeading: { fontSize: 12, bold: true, color: '#444' },
      },
    };
    pdfMake.createPdf(docDef).download(`${playbook?.name || 'playbook'}.pdf`);
  };

  // Export as Word
  const exportWord = async () => {
    setExportOpen(false);
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');

    const children = [];
    // Title
    children.push(
      new Paragraph({
        text: playbook?.name || 'Digital Playbook',
        heading: HeadingLevel.TITLE,
      })
    );

    // Build sections from playbook data
    for (const stage of playbook?.stages || []) {
      children.push(
        new Paragraph({
          text: stage.stage,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );

      // Stage-level nodeData
      for (const nd of stage.nodeData || []) {
        if (nd.heading) {
          children.push(
            new Paragraph({
              text: nd.heading,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200 },
            })
          );
        }
        if (nd.description) {
          children.push(
            new Paragraph({
              children: [new TextRun(nd.description)],
              spacing: { after: 120 },
            })
          );
        }
      }

      // Nodes with their nodeData
      for (const node of stage.nodes || []) {
        children.push(
          new Paragraph({
            text: node.heading,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300 },
          })
        );
        for (const nd of node.nodeData || []) {
          if (nd.heading) {
            children.push(
              new Paragraph({
                text: nd.heading,
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 100 },
              })
            );
          }
          if (nd.description) {
            children.push(
              new Paragraph({
                children: [new TextRun(nd.description)],
                spacing: { after: 100 },
              })
            );
          }
        }
      }
    }

    const doc = new Document({
      sections: [{ children }],
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${playbook?.name || 'playbook'}.docx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="playbook-editor">
        <div className="playbook-loading">
          <Loading />
        </div>
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
          <div className="playbook-export-wrap" ref={exportRef}>
            <button
              className="assiss-btn"
              onClick={() => setExportOpen(!exportOpen)}
            >
              <FiDownload size={16} />
              Export
            </button>
            {exportOpen && (
              <div className="playbook-export-dropdown">
                <button onClick={exportPdf}>PDF</button>
                <button onClick={exportWord}>Word (.docx)</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="playbook-content" id="playbook-content">
        <PlaybookCover name={playbook.name} workspace={selectedWorkspace?.workspaceName} />

        {(playbook.stages || []).map((stage) => (
          <PlaybookSection
            key={stage.id || stage._id}
            stage={stage}
            playbookId={id}
            onUpdateNodeData={updateNodeData}
            onInspire={inspireSection}
            onRefresh={fetchPlaybook}
          />
        ))}

        {/* Add Stage */}
        <div className="playbook-add-stage">
          <input
            type="text"
            placeholder="Add new stage (e.g. Discovery, Design, Deploy...)"
            value={newStageName}
            onChange={(e) => setNewStageName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addStage();
            }}
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
    </div>
  );
}

export default PlaybookEditor;
