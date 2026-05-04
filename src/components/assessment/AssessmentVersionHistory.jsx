import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiClock, FiRotateCcw, FiSave } from 'react-icons/fi';
import apiClient from '../../api/axios';
import toast from 'react-hot-toast';
import Button from '../common/Button';

const AssessmentVersionHistory = ({ assessmentId, onClose, onRestore }) => {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState(false);
  const [hasReport, setHasReport] = useState(true);

  useEffect(() => {
    if (assessmentId) {
      fetchData();
    } else {
      setLoading(false);
      setHasReport(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      console.error(err);
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

  function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function getRelativeTime(dateStr) {
    if (!dateStr) return '';
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    const days = Math.floor(mins / 1440);
    return days < 7 ? `${days}d ago` : '';
  }

  if (loading) {
    return (
      <div className="vh-loading">
        <div className="vh-spinner" />
        <span>Loading versions...</span>
      </div>
    );
  }

  if (!hasReport) {
    return (
      <div className="vh-empty">
        <div className="vh-empty-icon"><FiClock size={36} /></div>
        <p className="vh-empty-title">No report yet</p>
        <p className="vh-empty-desc">Complete an assessment and generate a report before saving versions.</p>
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
        <Button
          variant="primary"
          className="vh-save-btn"
          iconLeft={<FiSave size={16} />}
          onClick={handleSaveVersion}
        >
          Save Current Version
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="vh-container">
        {/* Save button */}
        <Button
          variant="primary"
          className="vh-save-btn"
          iconLeft={<FiSave size={16} />}
          onClick={handleSaveVersion}
        >
          Save Current Version
        </Button>

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
                  <p className="vh-card-date">{formatDate(version.created_at)}</p>
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
          <Button
            variant="secondary"
            className="vh-btn vh-btn--cancel"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="vh-btn vh-btn--restore"
            iconLeft={<FiRotateCcw size={14} />}
            disabled={selectedVersion === null}
            loading={restoring}
            onClick={handleRestore}
          >
            Restore
          </Button>
        </div>
      </div>
    </>
  );
};

AssessmentVersionHistory.propTypes = {
  assessmentId: PropTypes.string,
  onClose: PropTypes.func,
  onRestore: PropTypes.func,
};

export default AssessmentVersionHistory;
