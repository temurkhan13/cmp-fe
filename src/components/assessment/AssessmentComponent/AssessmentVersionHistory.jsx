import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    if (assessmentId) {
      fetchData();
    }
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

  return (
    <div className="version-history">
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Loading versions...</div>
      ) : !hasReport ? (
        <div style={{ padding: '1rem' }}>
          <NoDataAvailable message="No report has been generated yet. Complete an assessment to generate a report before saving versions." />
        </div>
      ) : versions.length === 0 ? (
        <div style={{ padding: '1rem' }}>
          <NoDataAvailable message="No version history available" />
          <button className="save-version-btn" onClick={handleSaveVersion}>
            Save Current as Version
          </button>
        </div>
      ) : (
        <>
          <button className="save-version-btn" onClick={handleSaveVersion}>
            Save Current Version
          </button>
          <div className="versions-container">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className={`version ${selectedVersion === index ? 'selected' : ''}`}
                onClick={() => setSelectedVersion(index)}
              >
                <div className="version-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className="date">{formatDate(version.created_at)}</p>
                    <span style={{
                      fontSize: '1.1rem',
                      color: '#6b7280',
                      background: '#f3f4f6',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}>v{version.version_number}</span>
                  </div>
                  <p style={{ fontSize: '1.2rem', color: '#6b7280', marginTop: '0.3rem' }}>
                    {version.report_content?.substring(0, 80)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
          <hr className="straight-Line" />
          <div className="footer-buttons">
            <button className="cancel" onClick={onClose}>Cancel</button>
            <button className="restore-version" onClick={handleRestore} disabled={restoring}>
              {restoring ? 'Restoring...' : 'Restore Version'}
            </button>
          </div>
        </>
      )}
      <style>{`
        .version-history {
          padding: 1rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .save-version-btn {
          background: #C3E11D;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1.3rem;
          cursor: pointer;
          margin-bottom: 1rem;
          width: 100%;
          transition: all 0.2s ease;
        }
        .save-version-btn:hover {
          box-shadow: 0 2px 8px rgba(195,225,29,0.4);
        }
        .versions-container {
          flex-grow: 1;
          overflow-y: auto;
          margin: 0.5rem 0;
        }
        .version {
          position: relative;
          padding: 1rem;
          cursor: pointer;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          border: 1px solid transparent;
          transition: all 0.15s ease;
        }
        .version:hover {
          background-color: #f9fafb;
        }
        .version.selected {
          background-color: #fafff0;
          border: 1px solid #C3E11D;
        }
        .date {
          font-size: 1.3rem;
          color: #111;
          font-weight: 500;
        }
        .footer-buttons {
          display: flex;
          gap: 0.5rem;
          padding-top: 1rem;
        }
        .cancel {
          background-color: #fff;
          border: 1px solid #d1d5db;
          padding: 0.8rem;
          border-radius: 10px;
          font-size: 1.3rem;
          font-weight: 500;
          cursor: pointer;
          flex: 1;
        }
        .restore-version {
          background-color: #C3E11D;
          border: none;
          padding: 0.8rem;
          font-size: 1.3rem;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          flex: 1;
        }
        .restore-version:disabled {
          opacity: 0.6;
          cursor: wait;
        }
        .straight-Line {
          border-top: 1px solid #e5e7eb;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

AssessmentVersionHistory.propTypes = {
  assessmentId: PropTypes.string,
  onClose: PropTypes.func,
  onRestore: PropTypes.func,
};

export default AssessmentVersionHistory;
