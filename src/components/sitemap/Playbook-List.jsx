import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPlus, BiEdit } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { BsFilePlayFill } from 'react-icons/bs';
import Loading from './Loading';
import config from '../../config/config.js';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import { timeAgo } from './helper.js';

const PLAYBOOK_TEMPLATES = [
  {
    name: 'ERP Migration Playbook',
    description: 'Complete change management playbook for ERP system migration covering Discovery, Design, Deploy, Adopt, and Run phases.',
    icon: '🔄',
  },
  {
    name: 'Digital Transformation Playbook',
    description: 'Strategic playbook for organization-wide digital transformation with stakeholder analysis, communication planning, and adoption tracking.',
    icon: '🚀',
  },
  {
    name: 'Merger & Acquisition Integration',
    description: 'Post-merger integration playbook covering culture alignment, systems consolidation, communication strategy, and change readiness.',
    icon: '🤝',
  },
  {
    name: 'Agile Transformation Playbook',
    description: 'Guide for transitioning from waterfall to agile methodology including team coaching, process redesign, and tooling adoption.',
    icon: '⚡',
  },
  {
    name: 'Cloud Migration Playbook',
    description: 'Change management framework for cloud infrastructure migration covering training, risk mitigation, and phased rollout.',
    icon: '☁️',
  },
  {
    name: 'Organizational Restructure',
    description: 'Playbook for managing organizational restructuring with focus on employee communication, role transitions, and morale.',
    icon: '🏗️',
  },
];

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

const ITEMS_PER_PAGE = 9;

function PlaybookList() {
  const navigate = useNavigate();
  const [playbooks, setPlaybooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createMessage, setCreateMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const selectedWorkspace = useSelector(selectWorkspace);
  const selectedFolder = useSelector(selectSelectedFolder);

  // Fetch playbooks from digital playbook endpoint
  const fetchPlaybooks = async (requestedPage = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${config.apiURL}/dpb/sitemap?page=${requestedPage}&limit=${ITEMS_PER_PAGE}`,
        { headers: getAuthHeaders() }
      );
      if (res.ok) {
        const data = await res.json();
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
      }
    } catch (err) {
      import.meta.env.DEV && console.error('Fetch playbooks error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaybooks(1);
  }, []);

  const sortedPlaybooks = useMemo(() => {
    return playbooks.length > 0
      ? [...playbooks].sort(
          (a, b) =>
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
      const res = await fetch(`${config.apiURL}/dpb/sitemap`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          message: createMessage || createName,
          sitemapName: createName,
          userId: user.id || user._id,
          folderId: selectedFolder?.id || selectedFolder?._id,
        }),
      });
      if (res.ok) {
        const newPlaybook = await res.json();
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
      await fetch(`${config.apiURL}/dpb/sitemap/simple-update/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: newName }),
      });
      setPlaybooks((prev) =>
        prev.map((p) => {
          const pid = p._id || p.id;
          return pid === id ? { ...p, name: newName } : p;
        })
      );
    } catch (err) {
      import.meta.env.DEV && console.error('Rename error:', err);
    } finally {
      setEditingId(null);
    }
  };

  const deletePlaybook = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this playbook? This cannot be undone.')) return;
    try {
      await fetch(`${config.apiURL}/dpb/sitemap/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const remaining = playbooks.length - 1;
      const targetPage = remaining === 0 && page > 1 ? page - 1 : page;
      await fetchPlaybooks(targetPage);
    } catch (err) {
      import.meta.env.DEV && console.error('Delete error:', err);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <div className="selected-workspace-name">
        <p>
          Workspace <span>{selectedWorkspace?.workspaceName}</span>
        </p>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ padding: '0 1rem', marginBottom: '0.5rem', marginTop: '2rem' }}>
          <input
            type="text"
            placeholder="Search playbooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '1.2rem',
              outline: 'none',
            }}
          />
        </div>
        <section className="generate" style={{ marginTop: '1rem' }}>
          <div className="container">
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <p className="assistant-heading">
                <BsFilePlayFill />
                Digital Playbooks
              </p>
              <div className="center-buttons">
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  className="assiss-btn"
                  onClick={() => setShowCreate(true)}
                >
                  Create Playbook
                  <BiPlus />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Create Playbook Form */}
        {showCreate && (
          <div
            style={{
              margin: '1rem 3rem',
              padding: '1.5rem',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Template Selection */}
            <p style={{ margin: 0, fontWeight: '600', fontSize: '1rem' }}>
              Start from a template or create custom:
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.8rem',
                marginBottom: '0.5rem',
              }}
            >
              {PLAYBOOK_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.name}
                  onClick={() => {
                    setCreateName(tpl.name);
                    setCreateMessage(tpl.description);
                  }}
                  style={{
                    padding: '10px 14px',
                    border: createName === tpl.name ? '2px solid #C3E11D' : '1px solid #ddd',
                    borderRadius: '10px',
                    background: createName === tpl.name ? '#fafff0' : '#f9f9f9',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
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
              style={{
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
            <textarea
              placeholder="Describe what this playbook covers (optional — AI will generate content based on this)"
              value={createMessage}
              onChange={(e) => setCreateMessage(e.target.value)}
              rows={3}
              style={{
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'vertical',
              }}
            />
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button
                className="assiss-btn"
                onClick={createPlaybook}
                disabled={creating || !createName.trim()}
                style={{ opacity: creating ? 0.6 : 1 }}
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  background: '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setShowCreate(false);
                  setCreateName('');
                  setCreateMessage('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              margin: '16px 0',
            }}
          >
            <Loading />
          </div>
        ) : sortedPlaybooks.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4rem 2rem',
              color: '#888',
            }}
          >
            <BsFilePlayFill size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <p style={{ fontSize: '1.2rem', margin: 0 }}>No playbooks yet</p>
            <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>
              Create your first digital playbook to get started
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              width: '100%',
              padding: '16px 1rem',
            }}
          >
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
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    backgroundColor: '#fff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)'; }}
                  onClick={() => {
                    if (editingId !== pbId) navigate(`/playbook/${pbId}`);
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <BsFilePlayFill size={18} />
                    {editingId === pbId ? (
                      <input
                        autoFocus
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onBlur={() => renamePlaybook(pbId, editName)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') renamePlaybook(pbId, editName);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: '500',
                          border: '1px solid #C3E11D',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          outline: 'none',
                          width: '100%',
                        }}
                      />
                    ) : (
                      <>
                        <span
                          style={{
                            fontSize: '1.5rem',
                            fontWeight: '500',
                            flex: 1,
                          }}
                        >
                          {pb.name}
                        </span>
                        <BiEdit
                          size={16}
                          style={{ opacity: 0.4 }}
                          title="Rename"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(pbId);
                            setEditName(pb.name);
                          }}
                        />
                        <FiTrash2
                          size={16}
                          style={{ opacity: 0.4, color: '#c00' }}
                          title="Delete"
                          onClick={(e) => deletePlaybook(pbId, e)}
                        />
                      </>
                    )}
                  </div>

                  {pbUpdated && (
                    <span
                      style={{
                        fontSize: '1.2rem',
                        color: 'rgba(10, 10, 10, 0.46)',
                      }}
                    >
                      Modified {timeAgo(pbUpdated)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              margin: '1.5rem 3rem 0',
              flexWrap: 'wrap',
            }}
          >
            <button
              disabled={page <= 1}
              onClick={() => fetchPlaybooks(page - 1)}
              style={{
                padding: '8px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: page <= 1 ? '#f5f5f5' : '#fff',
                cursor: page <= 1 ? 'not-allowed' : 'pointer',
                opacity: page <= 1 ? 0.5 : 1,
                fontSize: '0.95rem',
              }}
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
                  <span key={`ellipsis-${idx}`} style={{ padding: '0 4px', color: '#999' }}>
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => fetchPlaybooks(item)}
                    style={{
                      padding: '8px 14px',
                      border: item === page ? '2px solid #C3E11D' : '1px solid #ddd',
                      borderRadius: '8px',
                      background: item === page ? '#fafff0' : '#fff',
                      fontWeight: item === page ? '600' : '400',
                      cursor: item === page ? 'default' : 'pointer',
                      fontSize: '0.95rem',
                    }}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              disabled={page >= totalPages}
              onClick={() => fetchPlaybooks(page + 1)}
              style={{
                padding: '8px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: page >= totalPages ? '#f5f5f5' : '#fff',
                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                opacity: page >= totalPages ? 0.5 : 1,
                fontSize: '0.95rem',
              }}
            >
              Next
            </button>

            <span style={{ marginLeft: '1rem', fontSize: '0.9rem', color: '#888' }}>
              {totalResults} playbook{totalResults !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      <style>
        {`
        .selected-workspace-name{
      position:absolute;
      top:2rem;
      left:4rem;
    p{
    font-size:1.5rem;
    font-weight:600;
    span{
    padding:1rem;
    background-color:#f5f5f5;
    border-radius:1rem;
    border:1px solid gray;
    }
    }
      }`}
      </style>
    </div>
  );
}

export default PlaybookList;
