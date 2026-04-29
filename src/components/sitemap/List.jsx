import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Loading from './Loading';
import apiClient from '../../api/axios';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import { timeAgo } from './helper.js';
import { FaFolderTree } from 'react-icons/fa6';
import ConfirmModal from '../common/ConfirmModal';
import InputModal from '../common/InputModal';
import { useMoveToTrashMutation } from '../../redux/api/workspaceApi';
import Button from '../common/Button';
import Card from '../common/Card';
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
  const [moveToTrash] = useMoveToTrashMutation();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Button
                  variant="primary"
                  className="assiss-btn assiss-btn--flex"
                  iconRight={<BiPlus />}
                  onClick={() => navigate('/sitemap/new')}
                >
                  Create Sitemap
                </Button>
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
                  <Card
                    key={`${_id}-recent`}
                    variant="horizontal"
                    icon={<FaFolderTree size={18} />}
                    title={name}
                    meta={updatedAt ? `Modified ${timeAgo(updatedAt)}` : undefined}
                    onClick={() => navigate(`/sitemap/${_id}`)}
                    menuItems={[
                      {
                        key: 'rename',
                        label: 'Rename',
                        icon: <FiEdit2 size={14} />,
                        onClick: () => setRenameModal({ open: true, id: _id, name }),
                      },
                      {
                        key: 'delete',
                        label: 'Move to Trash',
                        icon: <FiTrash2 size={14} />,
                        variant: 'danger',
                        onClick: () => setDeleteConfirm({ open: true, id: _id }),
                      },
                    ]}
                  />
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
