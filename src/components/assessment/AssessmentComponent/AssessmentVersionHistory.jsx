import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiClock, FiRotateCcw, FiSave } from 'react-icons/fi';
import NoDataAvailable from '../../common/NoDataAvailable';
import apiClient from '../../../api/axios';
import toast from 'react-hot-toast';

const AssessmentVersionHistory = ({ assessmentId, onClose, onRestore }) => {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState(false);
  const [hasReport, setHasReport] = useState(true);

  useEffect(() => {
    if (assessmentId) fetchData();
  }, [assessmentId]);

  const fetchData = async () => {
    try {
      const [versionsRes, assessmentRes] = await Promise.all([
        apiClient.get(`/assessment/${assessmentId}/versions`),
        apiClient.get(`/workspace-assessment/${assessmentId}`).catch(() => null),
      ]);
      setVersions(versionsRes.data || []);
      const assessment = assessmentRes?.data?.data || assessmentRes?.data;
      setHasReport(!!(assessment?.report && assessment.report.isGenerated));
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVersion = async () => {
    try {
      await apiClient.post(`/assessment/${assessmentId}/version`);
      toast.success('Current version saved');
      await fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'No report found to save as version');
    }
  };

  const handleRestore = async () => {
    if (selectedVersion === null) {
      toast.error('Please select a version to restore');
      return;
    }
    const version = versions[selectedVersion];
    setRestoring(true);
    try {
      await apiClient.post(`/assessment/${assessmentId}/version/${version.id}/restore`);
      toast.success(`Restored to version ${version.version_number}`);
      if (onRestore) onRestore();
      if (onClose) onClose();
    } catch (err) {
      toast.error('Failed to restore version');
    } finally {
      setRestoring(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const getRelativeTime = (dateStr) => {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return '';
  };

  if (loading) {
    return (
      <div className="vh-loading">
        <div className="vh-spinner" />
        <span>Loading versions...</span>
        <style>{vhStyles}</style>
      </div>
    );
  }

  if (!hasReport) {
    return (
      <div className="vh-empty">
        <div className="vh-empty-icon"><FiClock size={36} /></div>
        <p className="vh-empty-title">No report yet</p>
        <p className="vh-empty-desc">Complete an assessment and generate a report before saving versions.</p>
        <style>{vhStyles}</style>
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <div className="vh-container">
        <div className="vh-empty">
          <div className="vh-empty-icon"><FiClock size={36} /></div>
          <p className="vh-empty-title">No versions saved</p>
          <p className="vh-empty-desc">Save your current report to start tracking version history.</p>
        </div>
        <button className="vh-save-btn" onClick={handleSaveVersion}>
          <FiSave size={16} />
          Save Current Version
        </button>
        <style>{vhStyles}</style>
      </div>
    );
  }

  return (
    <>
      <div className="vh-container">
        {/* Save button */}
        <button className="vh-save-btn" onClick={handleSaveVersion}>
          <FiSave size={16} />
          Save Current Version
        </button>

        {/* Version list */}
        <div className="vh-list">
          {versions.map((version, index) => {
            const isSelected = selectedVersion === index;
            const relTime = getRelativeTime(version.created_at);
            return (
              <div
                key={version.id}
                className={`vh-card ${isSelected ? 'vh-card--selected' : ''}`}
                onClick={() => setSelectedVersion(index)}
              >
                <div className="vh-card-left">
                  <div className={`vh-radio ${isSelected ? 'vh-radio--active' : ''}`}>
                    {isSelected && <div className="vh-radio-dot" />}
                  </div>
                  <div className="vh-timeline-line" />
                </div>
                <div className="vh-card-content">
                  <div className="vh-card-top">
                    <span className="vh-badge">v{version.version_number}</span>
                    {relTime && <span className="vh-relative">{relTime}</span>}
                  </div>
                  <p className="vh-date">{formatDate(version.created_at)}</p>
                  {version.report_content && (
                    <p className="vh-preview">{version.report_content.substring(0, 100)}...</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="vh-footer">
          <button className="vh-btn vh-btn--cancel" onClick={onClose}>Cancel</button>
          <button
            className="vh-btn vh-btn--restore"
            onClick={handleRestore}
            disabled={restoring || selectedVersion === null}
          >
            <FiRotateCcw size={14} />
            {restoring ? 'Restoring...' : 'Restore'}
          </button>
        </div>
      </div>
      <style>{vhStyles}</style>
    </>
  );
};

const vhStyles = `
  .vh-container {
    padding: 0.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* Loading */
  .vh-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem 1rem;
    color: #999;
    font-size: 1.3rem;
  }
  .vh-spinner {
    width: 28px;
    height: 28px;
    border: 3px solid #f0f0f0;
    border-top-color: #C3E11D;
    border-radius: 50%;
    animation: vh-spin 0.7s linear infinite;
  }
  @keyframes vh-spin { to { transform: rotate(360deg); } }

  /* Empty States */
  .vh-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2.5rem 1.5rem;
  }
  .vh-empty-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bbb;
    margin-bottom: 1rem;
  }
  .vh-empty-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 0.4rem 0;
  }
  .vh-empty-desc {
    font-size: 1.2rem;
    color: #999;
    margin: 0;
    line-height: 1.5;
    max-width: 240px;
  }

  /* Save Button */
  .vh-save-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.8rem 1rem;
    background: #C3E11D;
    color: #0B1444;
    border: none;
    border-radius: 10px;
    font-size: 1.3rem;
    font-weight: 600;
    cursor: pointer;
    transition: box-shadow 0.2s;
    margin-bottom: 1rem;
    flex-shrink: 0;
  }
  .vh-save-btn:hover {
    box-shadow: 0 2px 10px rgba(195,225,29,0.35);
  }

  /* Version List */
  .vh-list {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.25rem;
  }
  .vh-list::-webkit-scrollbar { width: 4px; }
  .vh-list::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }

  /* Version Card */
  .vh-card {
    display: flex;
    gap: 0.8rem;
    padding: 0.8rem;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    border: 1px solid transparent;
    margin-bottom: 0.25rem;
  }
  .vh-card:hover {
    background: #fafafa;
  }
  .vh-card--selected {
    background: #fafff0;
    border-color: #C3E11D;
  }

  /* Timeline */
  .vh-card-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.2rem;
  }
  .vh-radio {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.15s;
  }
  .vh-radio--active {
    border-color: #C3E11D;
  }
  .vh-radio-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #C3E11D;
  }
  .vh-timeline-line {
    flex: 1;
    width: 2px;
    background: #f0f0f0;
    margin-top: 4px;
    min-height: 12px;
  }
  .vh-card:last-child .vh-timeline-line { display: none; }

  /* Card Content */
  .vh-card-content {
    flex: 1;
    min-width: 0;
  }
  .vh-card-top {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.2rem;
  }
  .vh-badge {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0B1444;
    background: #eef7c2;
    padding: 0.15rem 0.6rem;
    border-radius: 5px;
  }
  .vh-relative {
    font-size: 1.1rem;
    color: #999;
  }
  .vh-date {
    font-size: 1.25rem;
    color: #333;
    font-weight: 500;
    margin: 0.15rem 0 0.3rem 0;
  }
  .vh-preview {
    font-size: 1.2rem;
    color: #888;
    line-height: 1.45;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* Footer */
  .vh-footer {
    display: flex;
    gap: 0.6rem;
    padding-top: 1rem;
    border-top: 1px solid #f0f0f0;
    margin-top: 0.5rem;
    flex-shrink: 0;
  }
  .vh-btn {
    flex: 1;
    padding: 0.8rem;
    border-radius: 10px;
    font-size: 1.3rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    transition: all 0.15s;
  }
  .vh-btn--cancel {
    background: #fff;
    border: 1px solid #e0e0e0;
    color: #555;
  }
  .vh-btn--cancel:hover { background: #fafafa; }
  .vh-btn--restore {
    background: #C3E11D;
    border: none;
    color: #0B1444;
  }
  .vh-btn--restore:hover { box-shadow: 0 2px 8px rgba(195,225,29,0.35); }
  .vh-btn--restore:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

AssessmentVersionHistory.propTypes = {
  assessmentId: PropTypes.string,
  onClose: PropTypes.func,
  onRestore: PropTypes.func,
};

export default AssessmentVersionHistory;
