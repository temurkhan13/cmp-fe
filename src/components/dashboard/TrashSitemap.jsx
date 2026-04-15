import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdDelete, MdOutlineSettingsBackupRestore } from 'react-icons/md';
import {
  restoreFromTrash,
  deleteFromTrash,
  fetchTrashItemsAsync,
} from '../../redux/slices/trashSlice';
import { FaTrash } from 'react-icons/fa';

const TrashItemCard = ({ name, type, dateDeleted, onRestore, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className="trash-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShowDropdown(false); }}
    >
      <h3>{name}</h3>
      <p>Type: {type}</p>
      <p>Date Deleted: {dateDeleted}</p>

      {isHovered && (
        <div className="three-dots" onClick={() => setShowDropdown((prev) => !prev)}>
          <FiMoreHorizontal />
        </div>
      )}

      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={onRestore}>
            <MdOutlineSettingsBackupRestore size={18} />
            Restore
          </div>
          <div className="dropdown-item" onClick={onDelete}>
            <MdDelete size={18} />
            Delete Permanently
          </div>
        </div>
      )}

      <style>{`
        .trash-card {
          background-color: #f8f8f8;
          padding: 20px 0;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          min-width: 200px;
        }
        .trash-card:hover {
          transform: translateY(-5px);
        }
        .trash-card h3 {
          margin: 0 0 10px;
          font-size: 1.5rem;
          color: #333;
        }
        .trash-card p {
          margin: 5px 0;
          font-size: 1.3rem;
          color: #777;
        }
        .three-dots {
          cursor: pointer;
          font-size: 2rem;
          color: black;
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        .dropdown-menu {
          position: absolute;
          top: 3rem;
          right: 1rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
          z-index: 10;
          font-size: 1.4rem;
          border: none;
        }
        .dropdown-item {
          padding: 0.8rem 1.6rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }
        .dropdown-item:hover {
          background: #f0f0f0;
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
};

const TrashEmpty = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 auto', alignItems: 'center', textAlign: 'center', color: '#666' }}>
    <FaTrash size={50} />
    <p style={{ fontSize: '1.4rem', fontWeight: 600, margin: '0.3rem 0' }}>No recent trash here</p>
    <p style={{ fontSize: '1.2rem', margin: '0.3rem 0' }}>
      Any file you trash will end up here. You&apos;ll have 30 days <br />
      to restore them before they are automatically deleted <br />
      from your Trash.
    </p>
  </div>
);

const TrashSitemap = () => {
  const dispatch = useDispatch();
  const trashItems = useSelector((state) => state.trash.trashItems);
  const sitemaps = trashItems?.sitemaps || [];

  const handleRestore = async (id) => {
    try {
      await dispatch(restoreFromTrash({ type: 'sitemap', id }));
      dispatch(fetchTrashItemsAsync());
    } catch {}
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteFromTrash({ type: 'sitemap', id }));
      dispatch(fetchTrashItemsAsync());
    } catch {}
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px 0', marginTop: '1rem', alignItems: 'start' }}>
      {sitemaps.length > 0 ? (
        sitemaps.map((sitemap) => (
          <TrashItemCard
            key={sitemap._id || sitemap.id}
            name={sitemap.name || sitemap.sitemapName || sitemap.sitemapTitle || 'Unnamed'}
            type="Sitemap"
            dateDeleted={sitemap.dateDeleted || sitemap.deleted_at || 'Unknown'}
            onRestore={() => handleRestore(sitemap._id || sitemap.id)}
            onDelete={() => handleDelete(sitemap._id || sitemap.id)}
          />
        ))
      ) : (
        <TrashEmpty />
      )}
    </div>
  );
};

export default TrashSitemap;
