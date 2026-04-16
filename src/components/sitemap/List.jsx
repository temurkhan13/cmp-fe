import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPlus, BiEdit } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import Loading from './Loading';
import NoData from './NoData';
import config from '../../config/config.js';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import { timeAgo } from './helper.js';
import { FaFolderTree } from 'react-icons/fa6';
import ConfirmModal from '../common/ConfirmModal';
import { useMoveToTrashMutation } from '../../redux/api/workspaceApi';

function List() {
  let navigate = useNavigate();
  const [sitemaps, setSitemaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const selectedWorkspace = useSelector(selectWorkspace);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [moveToTrash] = useMoveToTrashMutation();

  async function getData(
    workSpaceId,
    url = `${config.apiURL}/workspace/user/sitemaps`
  ) {
    const authToken = localStorage.getItem('token');
    const response = await fetch(`${url}?workspaceId=${workSpaceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }

  const renameSitemap = async (id, newName) => {
    const authToken = localStorage.getItem('token');
    await fetch(`${config.apiURL}/dpb/sitemap/simple-update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ name: newName }),
    });
    setSitemaps((prev) =>
      prev.map((s) => (s._id === id ? { ...s, name: newName } : s))
    );
    setEditingId(null);
  };

  const deleteSitemap = async (id) => {
    await moveToTrash({ entityType: 'sitemap', id }).unwrap();
    setSitemaps((prev) => prev.filter((s) => s._id !== id));
  };

  const recentModifiedSiteMap = useMemo(() => {
    return sitemaps?.length > 0
      ? sitemaps?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      : [];
  }, [sitemaps]);
  const onInit = async () => {
    setLoading(true);
    let res = await getData(selectedWorkspace?.id);

    if (res?.length > 0) {
      setSitemaps(res);
    }

    setLoading(false);
  };

  useEffect(() => {
    onInit();
  }, []);
  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        padding: '2rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="selected-workspace-name">
        <p>
          Workspace <span className="workspace-badge">{selectedWorkspace?.workspaceName}</span>
        </p>
      </div>
      <>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            <input
              type="text"
              placeholder="Search sitemaps..."
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
            <div
              // className="left-buttons"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <p className="assistant-heading">
                <FaFolderTree />
                Sitemaps
              </p>
              <div className="center-buttons">
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  className="assiss-btn"
                  onClick={() => {
                    navigate('/sitemap/new');
                  }}
                >
                  Create Sitemap
                  <BiPlus />
                </button>
              </div>
            </div>
          </section>
          {loading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                width: '100%',
                margin: '16px 0',
              }}
            >
              <Loading />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                width: '100%',
                margin: '1.25rem 0',
              }}
            >
              {recentModifiedSiteMap
                ?.filter(({ name }) => {
                  if (!searchQuery.trim()) return true;
                  return (name || '').toLowerCase().includes(searchQuery.toLowerCase());
                })
                ?.map(({ _id, name, updatedAt }) => {
                  return (
                    <div
                      key={`${_id}-recent`}
                      style={{
                        width: '100%',
                        maxWidth: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ddd',
                        padding: '2rem',
                        borderRadius: '1rem',
                        margin: '0 1rem 1rem 0',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        if (editingId !== _id) navigate(`/sitemap/${_id}`);
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <FaFolderTree size={18} />
                        {editingId === _id ? (
                          <input
                            autoFocus
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onBlur={() => renameSitemap(_id, editName)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') renameSitemap(_id, editName);
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
                              {name}
                            </span>
                            <BiEdit
                              size={16}
                              style={{ opacity: 0.4 }}
                              title="Rename"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingId(_id);
                                setEditName(name);
                              }}
                            />
                            <FiTrash2
                              size={16}
                              style={{ opacity: 0.4, color: '#c00' }}
                              title="Delete"
                              onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ open: true, id: _id }); }}
                            />
                          </>
                        )}
                      </div>

                      {updatedAt ? (
                        <span
                          style={{
                            fontSize: '1.2rem',
                            color: 'rgba(10, 10, 10, 0.46)',
                          }}
                        >
                          Modified {timeAgo(updatedAt)}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              width: '100%',
              margin: '16px 0',
            }}
          ></div>
        </div>
      </>

      <style>
        {`
        .selected-workspace-name {
          position: absolute;
          top: 2rem;
          left: 3rem;
        }
        .selected-workspace-name p {
          font-size: 1.5rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .selected-workspace-name .workspace-badge {
          background-color: #C3E11D;
          color: #0B1444;
          padding: 0.25rem 0.75rem;
          border-radius: 7px;
          font-size: 1.3rem;
          font-weight: 700;
        }`}
      </style>
      <ConfirmModal
        isOpen={deleteConfirm.open}
        title="Move to Trash"
        description="This sitemap will be moved to trash. You can restore it from the Trash page."
        confirmText="Move to Trash"
        cancelText="Cancel"
        onConfirm={async () => {
          const id = deleteConfirm.id;
          await deleteSitemap(id);
          setDeleteConfirm({ open: false, id: null });
        }}
        onCancel={() => setDeleteConfirm({ open: false, id: null })}
      />
    </div>
  );
}

export default List;
