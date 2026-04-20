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
import './sitemap.scss';

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

    return response.json();
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
    <div className="sitemap-list-page">
      <div className="selected-workspace-name">
        <p>
          Workspace <span className="workspace-badge">{selectedWorkspace?.workspaceName}</span>
        </p>
      </div>
      <>
        <div className="sitemap-list-container">
          <div className="sitemap-list-search-wrapper">
            <input
              type="text"
              placeholder="Search sitemaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sitemap-list-search"
            />
          </div>
          <section className="generate generate--spaced">
            <div className="sitemap-list-header">
              <p className="assistant-heading">
                <FaFolderTree />
                Sitemaps
              </p>
              <div className="center-buttons">
                <button
                  className="assiss-btn assiss-btn--flex"
                  onClick={() => navigate('/sitemap/new')}
                >
                  Create Sitemap
                  <BiPlus />
                </button>
              </div>
            </div>
          </section>
          {loading ? (
            <div className="sitemap-list-loading">
              <Loading />
            </div>
          ) : (
            <div className="sitemap-list-grid">
              {recentModifiedSiteMap
                ?.filter(({ name }) => {
                  if (!searchQuery.trim()) return true;
                  return (name || '').toLowerCase().includes(searchQuery.toLowerCase());
                })
                ?.map(({ _id, name, updatedAt }) => (
                  <div
                    key={`${_id}-recent`}
                    className="sitemap-card"
                    onClick={() => {
                      if (editingId !== _id) navigate(`/sitemap/${_id}`);
                    }}
                  >
                    <div className="sitemap-card__header">
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
                          className="sitemap-card__rename-input"
                        />
                      ) : (
                        <>
                          <span className="sitemap-card__name">{name}</span>
                          <BiEdit
                            size={16}
                            className="sitemap-card__icon-faded"
                            title="Rename"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(_id);
                              setEditName(name);
                            }}
                          />
                          <FiTrash2
                            size={16}
                            className="sitemap-card__icon-delete"
                            title="Delete"
                            onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ open: true, id: _id }); }}
                          />
                        </>
                      )}
                    </div>
                    {updatedAt ? (
                      <span className="sitemap-card__date">
                        Modified {timeAgo(updatedAt)}
                      </span>
                    ) : null}
                  </div>
                ))}
            </div>
          )}

          <div className="sitemap-list-empty"></div>
        </div>
      </>

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
