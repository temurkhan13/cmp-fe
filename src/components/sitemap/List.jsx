import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Loading from './Loading';
import apiClient from '../../api/axios';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import { timeAgo } from './helper.js';
import { FaFolderTree } from 'react-icons/fa6';
import ConfirmModal from '../common/ConfirmModal';
import InputModal from '../common/InputModal';
import { useMoveToTrashMutation } from '../../redux/api/workspaceApi';
import './sitemap.scss';
import '../dashboard/dashboardHomeComponents/styles/dashboard-home.scss';
import '../dashboard/dashboardHomeComponents/styles/folder.scss';
import '../../modules/dashboard/ai-assistant.scss';

function List() {
  let navigate = useNavigate();
  const [sitemaps, setSitemaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectedWorkspace = useSelector(selectWorkspace);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [renameModal, setRenameModal] = useState({ open: false, id: null, name: '' });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [moveToTrash] = useMoveToTrashMutation();
  const menuRef = useRef(null);

  async function getData(workSpaceId) {
    const response = await apiClient.get(`/workspace/user/sitemaps?workspaceId=${workSpaceId}`);
    return response.data;
  }

  const renameSitemap = async (id, newName) => {
    await apiClient.patch(`/dpb/sitemap/simple-update/${id}`, { name: newName });
    setSitemaps((prev) =>
      prev.map((s) => (s._id === id ? { ...s, name: newName } : s))
    );
    setRenameModal({ open: false, id: null, name: '' });
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
                    onClick={() => navigate(`/sitemap/${_id}`)}
                  >
                    <div className="sitemap-card__header">
                      <FaFolderTree size={18} />
                      <span className="sitemap-card__name">{name}</span>
                    </div>
                    {updatedAt ? (
                      <span className="sitemap-card__date">
                        Modified {timeAgo(updatedAt)}
                      </span>
                    ) : null}
                    <div
                      className="sitemap-card__actions"
                      ref={openMenuId === _id ? menuRef : null}
                    >
                      <button
                        className="sitemap-card__menu-btn"
                        title="More options"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === _id ? null : _id);
                        }}
                      >
                        <FiMoreVertical size={16} />
                      </button>
                      {openMenuId === _id && (
                        <div className="sitemap-card__dropdown" onClick={(e) => e.stopPropagation()}>
                          <button
                            className="sitemap-card__dropdown-item"
                            onClick={() => {
                              setOpenMenuId(null);
                              setRenameModal({ open: true, id: _id, name });
                            }}
                          >
                            <FiEdit2 size={14} />
                            Rename
                          </button>
                          <button
                            className="sitemap-card__dropdown-item sitemap-card__dropdown-item--danger"
                            onClick={() => {
                              setOpenMenuId(null);
                              setDeleteConfirm({ open: true, id: _id });
                            }}
                          >
                            <FiTrash2 size={14} />
                            Move to Trash
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="sitemap-list-empty"></div>
        </div>
      </>

      <InputModal
        isOpen={renameModal.open}
        title="Rename Sitemap"
        description="Enter a new name for this sitemap."
        confirmText="Rename"
        cancelText="Cancel"
        defaultValue={renameModal.name}
        placeholder="Sitemap name"
        onConfirm={async (newName) => {
          await renameSitemap(renameModal.id, newName);
        }}
        onCancel={() => setRenameModal({ open: false, id: null, name: '' })}
      />

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
