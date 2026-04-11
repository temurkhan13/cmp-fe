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

  // Strip HTML tags to plain text
  const stripHtml = (html) => {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // Export as PDF using jsPDF (more reliable than pdfmake with dynamic imports)
  const exportPdf = async () => {
    setExportOpen(false);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      let y = 40;

      const checkPage = (needed) => {
        if (y + needed > 270) { doc.addPage(); y = 20; }
      };

      // Cover page
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('DIGITAL PLAYBOOK', pageWidth / 2, 80, { align: 'center' });
      doc.setFontSize(22);
      doc.setTextColor(0, 49, 111);
      doc.text(playbook?.name || 'Digital Playbook', pageWidth / 2, 95, { align: 'center', maxWidth: maxWidth });
      doc.setFontSize(12);
      doc.setTextColor(130);
      doc.text(selectedWorkspace?.workspaceName || '', pageWidth / 2, 110, { align: 'center' });
      doc.setDrawColor(195, 225, 29);
      doc.setLineWidth(1);
      doc.line(pageWidth / 2 - 20, 120, pageWidth / 2 + 20, 120);
      doc.setFontSize(8);
      doc.setTextColor(170);
      doc.text('Powered by ChangeAI', pageWidth / 2, 130, { align: 'center' });

      doc.addPage();
      y = 20;

      // Stages
      for (const stage of playbook?.stages || []) {
        checkPage(20);
        doc.setFontSize(16);
        doc.setTextColor(0, 49, 111);
        doc.text(stage.stage || '', margin, y);
        y += 10;

        for (const nd of stage.nodeData || []) {
          if (nd.heading) {
            checkPage(12);
            doc.setFontSize(11);
            doc.setTextColor(60);
            doc.setFont(undefined, 'bold');
            doc.text(nd.heading, margin, y);
            y += 6;
          }
          if (nd.description) {
            const text = stripHtml(nd.description);
            if (text) {
              doc.setFontSize(10);
              doc.setTextColor(50);
              doc.setFont(undefined, 'normal');
              const lines = doc.splitTextToSize(text, maxWidth);
              checkPage(lines.length * 5);
              doc.text(lines, margin, y);
              y += lines.length * 5 + 4;
            }
          }
        }

        for (const node of stage.nodes || []) {
          checkPage(14);
          doc.setFontSize(13);
          doc.setTextColor(50);
          doc.setFont(undefined, 'bold');
          doc.text(node.heading || '', margin + 4, y);
          y += 8;

          for (const nd of node.nodeData || []) {
            if (nd.heading) {
              checkPage(10);
              doc.setFontSize(10);
              doc.setTextColor(70);
              doc.setFont(undefined, 'bold');
              doc.text(nd.heading, margin + 4, y);
              y += 5;
            }
            if (nd.description) {
              const text = stripHtml(nd.description);
              if (text) {
                doc.setFontSize(9);
                doc.setTextColor(60);
                doc.setFont(undefined, 'normal');
                const lines = doc.splitTextToSize(text, maxWidth - 4);
                checkPage(lines.length * 4.5);
                doc.text(lines, margin + 4, y);
                y += lines.length * 4.5 + 3;
              }
            }
          }
        }
        y += 6;
      }

      doc.save(`${playbook?.name || 'playbook'}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('PDF export failed: ' + err.message);
    }
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
