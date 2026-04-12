import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FiUploadCloud, FiFile, FiTrash2, FiCheck } from 'react-icons/fi';
import config from '../../config/config';

const RAGUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const workspaceId = useSelector((state) => state.workspaces.currentWorkspaceId);

  const handleFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter((f) => {
      const ext = f.name.split('.').pop().toLowerCase();
      return ['pdf', 'docx', 'doc', 'txt', 'csv', 'xlsx', 'pptx'].includes(ext);
    });
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setResults([]);

    const uploadResults = [];
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('pdfPath', file);
        if (workspaceId) formData.append('workspaceId', workspaceId);

        const token = localStorage.getItem('token');
        const res = await fetch(`${config.apiURL}/workspace/extract-text`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (res.ok) {
          uploadResults.push({ name: file.name, status: 'success' });
        } else {
          uploadResults.push({ name: file.name, status: 'error', message: 'Upload failed' });
        }
      } catch (err) {
        uploadResults.push({ name: file.name, status: 'error', message: err.message });
      }
    }

    setResults(uploadResults);
    setFiles([]);
    setUploading(false);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="rag-upload-container">
      <h2>Document Knowledge Base</h2>
      <p className="subtitle">
        Upload documents to train the AI Assistant. Supported formats: PDF, DOCX, TXT, CSV, XLSX, PPTX.
      </p>

      <div
        className={`drop-zone ${dragActive ? 'active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <FiUploadCloud size={40} color={dragActive ? '#C3E11D' : '#999'} />
        <p>Drag & drop files here, or click to browse</p>
        <span className="hint">Max 10MB per file</span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,.csv,.xlsx,.pptx"
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, i) => (
            <div key={i} className="file-item">
              <FiFile size={18} />
              <span className="file-name">{file.name}</span>
              <span className="file-size">{formatSize(file.size)}</span>
              <FiTrash2
                size={16}
                style={{ cursor: 'pointer', color: '#c00' }}
                onClick={() => removeFile(i)}
              />
            </div>
          ))}
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Processing...' : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}

      {files.length === 0 && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9ca3af' }}>
          <p style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No documents uploaded yet</p>
          <p style={{ fontSize: '1.2rem' }}>Upload files to train your AI Assistant with custom knowledge.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="results">
          {results.map((r, i) => (
            <div key={i} className={`result-item ${r.status}`}>
              {r.status === 'success' ? <FiCheck color="green" /> : <span style={{ color: '#c00' }}>!</span>}
              <span>{r.name}</span>
              <span className="result-status">
                {r.status === 'success' ? 'Processed & indexed' : r.message}
              </span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .rag-upload-container {
          max-width: 700px;
          margin: 2rem auto;
          padding: 2rem;
        }
        .rag-upload-container h2 {
          font-size: 2.4rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 2rem;
        }
        .drop-zone {
          border: 2px dashed #ddd;
          border-radius: 1rem;
          padding: 3rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .drop-zone:hover, .drop-zone.active {
          border-color: #C3E11D;
          background: rgba(195,225,29,0.05);
        }
        .drop-zone:hover svg, .drop-zone.active svg {
          animation: gentle-bounce 1s ease infinite;
        }
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .drop-zone p {
          font-size: 1.4rem;
          margin-top: 1rem;
          color: #333;
        }
        .hint {
          font-size: 1.1rem;
          color: #999;
        }
        .file-list {
          margin-top: 1.5rem;
        }
        .file-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1rem;
          border: 1px solid #eee;
          border-radius: 0.6rem;
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
        }
        .file-name {
          flex: 1;
          font-weight: 500;
        }
        .file-size {
          color: #999;
          font-size: 1.1rem;
        }
        .upload-btn {
          margin-top: 1rem;
          padding: 1rem 2rem;
          background: #C3E11D;
          border: none;
          border-radius: 1rem;
          font-size: 1.4rem;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
        }
        .upload-btn:disabled {
          opacity: 0.6;
          cursor: wait;
        }
        .results {
          margin-top: 1.5rem;
        }
        .result-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1rem;
          border-radius: 0.6rem;
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
        }
        .result-item.success {
          background: #f0fff0;
          border: 1px solid #c3e11d;
        }
        .result-item.error {
          background: #fff5f5;
          border: 1px solid #fcc;
        }
        .result-status {
          margin-left: auto;
          font-size: 1.1rem;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default RAGUpload;
