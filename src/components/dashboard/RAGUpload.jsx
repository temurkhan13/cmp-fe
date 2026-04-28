import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FiUploadCloud, FiFile, FiTrash2, FiCheck } from 'react-icons/fi';
import apiClient from '../../api/axios';
import Button from '../common/Button';

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

        await apiClient.post('/workspace/extract-text', formData);
        uploadResults.push({ name: file.name, status: 'success' });
      } catch (err) {
        const message = err.response?.data?.error || 'Upload failed. Please try again.';
        uploadResults.push({ name: file.name, status: 'error', message });
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
      <p className="rag-subtitle">
        Upload documents to train the AI Assistant. Supported formats: PDF, DOCX, TXT, CSV, XLSX, PPTX.
      </p>

      <div
        className={`rag-drop-zone ${dragActive ? 'active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <FiUploadCloud size={40} color={dragActive ? '#C3E11D' : '#999'} />
        <p>Drag & drop files here, or click to browse</p>
        <span className="rag-hint">Max 10MB per file</span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,.csv,.xlsx,.pptx"
          className="rag-hidden-input"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="rag-file-list">
          {files.map((file, i) => (
            <div key={i} className="rag-file-item">
              <FiFile size={18} />
              <span className="rag-file-name">{file.name}</span>
              <span className="rag-file-size">{formatSize(file.size)}</span>
              <FiTrash2
                size={16}
                className="rag-delete-icon"
                onClick={() => removeFile(i)}
              />
            </div>
          ))}
          <Button
            variant="primary"
            className="rag-upload-btn"
            loading={uploading}
            onClick={handleUpload}
          >
            {`Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
          </Button>
        </div>
      )}

      {files.length === 0 && results.length === 0 && (
        <div className="rag-empty-state">
          <p className="rag-empty-state__title">No documents uploaded yet</p>
          <p className="rag-empty-state__desc">Upload files to train your AI Assistant with custom knowledge.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="rag-results">
          {results.map((r, i) => (
            <div key={i} className={`rag-result-item ${r.status}`}>
              {r.status === 'success' ? <FiCheck color="green" /> : <span className="rag-error-icon">!</span>}
              <span>{r.name}</span>
              <span className="rag-result-status">
                {r.status === 'success' ? 'Processed & indexed' : r.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RAGUpload;
