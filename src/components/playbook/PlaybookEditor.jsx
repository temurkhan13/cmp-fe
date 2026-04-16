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

  // Strip HTML tags to plain text
  const stripHtml = (html) => {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // ── EXPORT: PDF ──
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
      import.meta.env.DEV && console.error('PDF export error:', err);
      alert('PDF export failed: ' + err.message);
    }
  };

  // ── EXPORT: Word ──
  const exportWord = async () => {
    setExportOpen(false);
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');

    const children = [];
    children.push(
      new Paragraph({ text: playbook?.name || 'Digital Playbook', heading: HeadingLevel.TITLE })
    );

    for (const stage of playbook?.stages || []) {
      children.push(
        new Paragraph({
          text: stage.stage,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );

      for (const nd of stage.nodeData || []) {
        if (nd.heading) {
          children.push(
            new Paragraph({ text: nd.heading, heading: HeadingLevel.HEADING_2, spacing: { before: 200 } })
          );
        }
        if (nd.description) {
          children.push(
            new Paragraph({ children: [new TextRun(stripHtml(nd.description))], spacing: { after: 120 } })
          );
        }
      }

      for (const node of stage.nodes || []) {
        children.push(
          new Paragraph({ text: node.heading, heading: HeadingLevel.HEADING_2, spacing: { before: 300 } })
        );
        for (const nd of node.nodeData || []) {
          if (nd.heading) {
            children.push(
              new Paragraph({ text: nd.heading, heading: HeadingLevel.HEADING_3, spacing: { before: 100 } })
            );
          }
          if (nd.description) {
            children.push(
              new Paragraph({ children: [new TextRun(stripHtml(nd.description))], spacing: { after: 100 } })
            );
          }
        }
      }
    }

    const doc = new Document({ sections: [{ children }] });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${playbook?.name || 'playbook'}.docx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ── EXPORT: PowerPoint ──
  const exportPptx = async () => {
    setExportOpen(false);
    try {
      const PptxGenJS = (await import('pptxgenjs')).default;
      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_WIDE';

      // Cover slide
      const coverSlide = pptx.addSlide();
      coverSlide.addText('DIGITAL PLAYBOOK', {
        x: 0, y: 1.5, w: '100%', fontSize: 12, color: '888888', align: 'center',
      });
      coverSlide.addText(playbook?.name || 'Digital Playbook', {
        x: 0.5, y: 2.2, w: '90%', fontSize: 32, color: '00316f', align: 'center', bold: true,
      });
      coverSlide.addText(selectedWorkspace?.workspaceName || '', {
        x: 0, y: 3.2, w: '100%', fontSize: 14, color: '888888', align: 'center',
      });
      coverSlide.addShape(pptx.ShapeType.line, {
        x: 5.5, y: 3.8, w: 2.5, h: 0, line: { color: 'C3E11D', width: 3 },
      });
      coverSlide.addText('Powered by ChangeAI', {
        x: 0, y: 4.2, w: '100%', fontSize: 9, color: 'AAAAAA', align: 'center',
      });

      // Stage slides
      for (const stage of playbook?.stages || []) {
        const slide = pptx.addSlide();
        slide.addText(stage.stage || '', {
          x: 0.5, y: 0.3, w: '90%', fontSize: 24, color: '00316f', bold: true,
        });

        let yPos = 1.0;
        const allContent = [
          ...(stage.nodeData || []),
          ...(stage.nodes || []).flatMap((n) => [
            { heading: n.heading, description: '', isNode: true },
            ...(n.nodeData || []),
          ]),
        ];

        for (const nd of allContent) {
          if (nd.isNode) {
            slide.addText(nd.heading || '', {
              x: 0.5, y: yPos, w: '90%', fontSize: 16, color: '333333', bold: true,
            });
            yPos += 0.4;
          } else {
            if (nd.heading) {
              slide.addText(nd.heading, {
                x: 0.7, y: yPos, w: '85%', fontSize: 13, color: '444444', bold: true,
              });
              yPos += 0.35;
            }
            if (nd.description) {
              const text = stripHtml(nd.description);
              if (text) {
                slide.addText(text.substring(0, 500), {
                  x: 0.7, y: yPos, w: '85%', fontSize: 10, color: '555555', breakLine: true,
                });
                yPos += 0.6;
              }
            }
          }
          if (yPos > 6.5) break;
        }
      }

      pptx.writeFile({ fileName: `${playbook?.name || 'playbook'}.pptx` });
    } catch (err) {
      import.meta.env.DEV && console.error('PPTX export error:', err);
      alert('PowerPoint export failed: ' + err.message);
    }
  };

  // ── EXPORT: Excel ──
  const exportExcel = async () => {
    setExportOpen(false);
    try {
      const ExcelJS = (await import('exceljs')).default;
      const workbook = new ExcelJS.Workbook();

      for (const stage of playbook?.stages || []) {
        const sheetName = (stage.stage || 'Sheet').substring(0, 31);
        const sheet = workbook.addWorksheet(sheetName);
        sheet.columns = [
          { header: 'Section', key: 'section', width: 30 },
          { header: 'Heading', key: 'heading', width: 30 },
          { header: 'Content', key: 'content', width: 80 },
        ];

        // Style header
        sheet.getRow(1).font = { bold: true, size: 12 };
        sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF00316F' } };
        sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };

        for (const nd of stage.nodeData || []) {
          sheet.addRow({
            section: stage.stage,
            heading: nd.heading || '',
            content: stripHtml(nd.description),
          });
        }

        for (const node of stage.nodes || []) {
          for (const nd of node.nodeData || []) {
            sheet.addRow({
              section: node.heading || '',
              heading: nd.heading || '',
              content: stripHtml(nd.description),
            });
          }
        }
      }

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${playbook?.name || 'playbook'}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      import.meta.env.DEV && console.error('Excel export error:', err);
      alert('Excel export failed: ' + err.message);
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
                <button onClick={exportPdf}>PDF</button>
                <button onClick={exportWord}>Word (.docx)</button>
                <button onClick={exportPptx}>PowerPoint (.pptx)</button>
                <button onClick={exportExcel}>Excel (.xlsx)</button>
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
