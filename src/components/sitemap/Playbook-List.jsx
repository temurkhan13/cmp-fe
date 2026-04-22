import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { BsFilePlayFill } from 'react-icons/bs';
import Loading from './Loading';
import apiClient from '../../api/axios';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import { timeAgo } from './helper.js';
import ConfirmModal from '../common/ConfirmModal';
import InputModal from '../common/InputModal';
import { useMoveToTrashMutation } from '../../redux/api/workspaceApi';
import './sitemap.scss';
import '../dashboard/dashboardHomeComponents/styles/dashboard-home.scss';
import '../dashboard/dashboardHomeComponents/styles/folder.scss';
import '../../modules/dashboard/ai-assistant.scss';

const PLAYBOOK_TEMPLATES = [
  { name: 'ERP Migration Playbook', description: 'Complete change management playbook for ERP system migration covering Discovery, Design, Deploy, Adopt, and Run phases.', icon: '🔄' },
  { name: 'Digital Transformation Playbook', description: 'Strategic playbook for organization-wide digital transformation with stakeholder analysis, communication planning, and adoption tracking.', icon: '🚀' },
  { name: 'Merger & Acquisition Integration', description: 'Post-merger integration playbook covering culture alignment, systems consolidation, communication strategy, and change readiness.', icon: '🤝' },
  { name: 'Agile Transformation Playbook', description: 'Guide for transitioning from waterfall to agile methodology including team coaching, process redesign, and tooling adoption.', icon: '⚡' },
  { name: 'Cloud Migration Playbook', description: 'Change management framework for cloud infrastructure migration covering training, risk mitigation, and phased rollout.', icon: '☁️' },
  { name: 'Organizational Restructure', description: 'Playbook for managing organizational restructuring with focus on employee communication, role transitions, and morale.', icon: '🏗️' },
];

const ITEMS_PER_PAGE = 15;

function PlaybookList() {
  const navigate = useNavigate();
  const [playbooks, setPlaybooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createMessage, setCreateMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const selectedWorkspace = useSelector(selectWorkspace);
  const selectedFolder = useSelector(selectSelectedFolder);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [renameModal, setRenameModal] = useState({ open: false, id: null, name: '' });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [moveToTrash] = useMoveToTrashMutation();
  const menuRef = useRef(null);

  const fetchPlaybooks = async (requestedPage = 1) => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/dpb/sitemap?page=${requestedPage}&limit=${ITEMS_PER_PAGE}`);
      const data = res.data;
      if (data.results && Array.isArray(data.results)) {
        setPlaybooks(data.results);
        setPage(data.page || requestedPage);
        setTotalPages(data.totalPages || 1);
        setTotalResults(data.totalResults || data.results.length);
      } else if (Array.isArray(data)) {
        setPlaybooks(data);
        setPage(1);
        setTotalPages(1);
        setTotalResults(data.length);
      }
    } catch (err) {
      import.meta.env.DEV && console.error('Fetch playbooks error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlaybooks(1); }, []);

  const sortedPlaybooks = useMemo(() => {
    return playbooks.length > 0
      ? [...playbooks].sort((a, b) =>
        new Date(b.updated_at || b.updatedAt || b.created_at || b.createdAt) -
        new Date(a.updated_at || a.updatedAt || a.created_at || a.createdAt)
      )
      : [];
  }, [playbooks]);

  const createPlaybook = async () => {
    if (!createName.trim()) return;
    setCreating(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await apiClient.post('/dpb/sitemap', {
        message: createMessage || createName,
        sitemapName: createName,
        userId: user.id || user._id,
        folderId: selectedFolder?.id || selectedFolder?._id,
      });
      const newPlaybook = res.data;
      if (newPlaybook) {
        const playbookId = newPlaybook._id || newPlaybook.id;
        if (playbookId) {
          navigate(`/playbook/${playbookId}`);
        } else {
          setShowCreate(false);
          setCreateName('');
          setCreateMessage('');
          await fetchPlaybooks(1);
        }
      }
    } catch (err) {
      import.meta.env.DEV && console.error('Create playbook error:', err);
    } finally {
      setCreating(false);
    }
  };

  const renamePlaybook = async (id, newName) => {
    try {
      await apiClient.patch(`/dpb/sitemap/simple-update/${id}`, { name: newName });
      setPlaybooks((prev) => prev.map((p) => {
        const pid = p._id || p.id;
        return pid === id ? { ...p, name: newName } : p;
      }));
    } catch (err) {
      import.meta.env.DEV && console.error('Rename error:', err);
    } finally {
      setRenameModal({ open: false, id: null, name: '' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openMenuId]);

  const deletePlaybook = async (id) => {
    try {
      await moveToTrash({ entityType: 'sitemap', id }).unwrap();
      const remaining = playbooks.length - 1;
      const targetPage = remaining === 0 && page > 1 ? page - 1 : page;
      await fetchPlaybooks(targetPage);
    } catch (err) {
      import.meta.env.DEV && console.error('Move to trash error:', err);
    }
  };

  return (
    <div className="playbook-list-page">
      <div className="selected-workspace-name">
        <p>
          Workspace <span className="workspace-badge">{selectedWorkspace?.workspaceName}</span>
        </p>
      </div>
      <div className="sitemap-list-container">
        <div className="sitemap-list-search-wrapper">
          <input
            type="text"
            placeholder="Search playbooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sitemap-list-search"
          />
        </div>
        <section className="generate generate--spaced">
          <div className="sitemap-list-header">
            <p className="assistant-heading">
              <BsFilePlayFill />
              Digital Playbooks
            </p>
            <div className="center-buttons">
              <button className="assiss-btn assiss-btn--flex" onClick={() => setShowCreate(true)}>
                Create Playbook
                <BiPlus />
              </button>
            </div>
          </div>
        </section>

        {showCreate && (
          <div className="playbook-create-form">
            <p className="playbook-create-form__label">Start from a template or create custom:</p>
            <div className="playbook-templates">
              {PLAYBOOK_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.name}
                  onClick={() => { setCreateName(tpl.name); setCreateMessage(tpl.description); }}
                  className={`playbook-template-btn ${createName === tpl.name ? 'playbook-template-btn--selected' : ''}`}
                >
                  <span>{tpl.icon}</span>
                  <span>{tpl.name}</span>
                </button>
              ))}
            </div>
            <input
              autoFocus
              placeholder="Playbook name (e.g. Digital Transformation Playbook)"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              className="playbook-create-input"
            />
            <textarea
              placeholder="Describe what this playbook covers (optional — AI will generate content based on this)"
              value={createMessage}
              onChange={(e) => setCreateMessage(e.target.value)}
              rows={3}
              className="playbook-create-textarea"
            />
            <div className="playbook-create-actions">
              <button
                className="assiss-btn"
                onClick={createPlaybook}
                disabled={creating || !createName.trim()}
                style={{ opacity: creating ? 0.6 : 1 }}
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
              <button
                className="playbook-cancel-btn"
                onClick={() => { setShowCreate(false); setCreateName(''); setCreateMessage(''); }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="sitemap-list-loading">
            <Loading />
          </div>
        ) : sortedPlaybooks.length === 0 ? (
          <div className="playbook-empty">
            <BsFilePlayFill size={48} className="playbook-empty__icon" />
            <p className="playbook-empty__title">No playbooks yet</p>
            <p className="playbook-empty__desc">Create your first digital playbook to get started</p>
          </div>
        ) : (
          <div className="playbook-grid">
            {sortedPlaybooks
              .filter((pb) => {
                if (!searchQuery.trim()) return true;
                return (pb.name || pb.sitemapName || '').toLowerCase().includes(searchQuery.toLowerCase());
              })
              .map((pb) => {
                const pbId = pb._id || pb.id;
                const pbUpdated = pb.updated_at || pb.updatedAt || pb.created_at || pb.createdAt;
                return (
                  <div
                    key={pbId}
                    className="playbook-card"
                    onClick={() => navigate(`/playbook/${pbId}`)}
                  >
                    <div className="sitemap-card__header">
                      <BsFilePlayFill size={18} />
                      <span className="sitemap-card__name">{pb.name}</span>
                    </div>
                    {pbUpdated && (
                      <span className="sitemap-card__date">Modified {timeAgo(pbUpdated)}</span>
                    )}
                    <div
                      className="sitemap-card__actions"
                      ref={openMenuId === pbId ? menuRef : null}
                    >
                      <button
                        className="sitemap-card__menu-btn"
                        title="More options"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === pbId ? null : pbId);
                        }}
                      >
                        <FiMoreVertical size={16} />
                      </button>
                      {openMenuId === pbId && (
                        <div className="sitemap-card__dropdown" onClick={(e) => e.stopPropagation()}>
                          <button
                            className="sitemap-card__dropdown-item"
                            onClick={() => {
                              setOpenMenuId(null);
                              setRenameModal({ open: true, id: pbId, name: pb.name });
                            }}
                          >
                            <FiEdit2 size={14} />
                            Rename
                          </button>
                          <button
                            className="sitemap-card__dropdown-item sitemap-card__dropdown-item--danger"
                            onClick={() => {
                              setOpenMenuId(null);
                              setDeleteConfirm({ open: true, id: pbId });
                            }}
                          >
                            <FiTrash2 size={14} />
                            Move to Trash
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="playbook-pagination">
            <button
              disabled={page <= 1}
              onClick={() => fetchPlaybooks(page - 1)}
              className={`playbook-page-btn ${page <= 1 ? 'playbook-page-btn--disabled' : ''}`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((item, idx) =>
                item === '...' ? (
                  <span key={`ellipsis-${idx}`} className="playbook-pagination__ellipsis">...</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => fetchPlaybooks(item)}
                    className={`playbook-page-btn ${item === page ? 'playbook-page-btn--active' : ''}`}
                  >
                    {item}
                  </button>
                )
              )}
            <button
              disabled={page >= totalPages}
              onClick={() => fetchPlaybooks(page + 1)}
              className={`playbook-page-btn ${page >= totalPages ? 'playbook-page-btn--disabled' : ''}`}
            >
              Next
            </button>
            <span className="playbook-pagination__count">
              {totalResults} playbook{totalResults !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      <InputModal
        isOpen={renameModal.open}
        title="Rename Playbook"
        description="Enter a new name for this playbook."
        confirmText="Rename"
        cancelText="Cancel"
        defaultValue={renameModal.name}
        placeholder="Playbook name"
        onConfirm={async (newName) => {
          await renamePlaybook(renameModal.id, newName);
        }}
        onCancel={() => setRenameModal({ open: false, id: null, name: '' })}
      />

      <ConfirmModal
        isOpen={deleteConfirm.open}
        title="Move to Trash"
        description="This playbook will be moved to trash. You can restore it from the Trash page."
        confirmText="Move to Trash"
        cancelText="Cancel"
        onConfirm={async () => {
          const id = deleteConfirm.id;
          await deletePlaybook(id);
          setDeleteConfirm({ open: false, id: null });
        }}
        onCancel={() => setDeleteConfirm({ open: false, id: null })}
      />
    </div>
  );
}

export default PlaybookList;
