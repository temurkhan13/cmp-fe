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
import { AnchoredMenu } from '../common';

const TrashItemCard = ({ name, type, dateDeleted, onRestore, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="trash-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{name}</h3>
      <p>Type: {type}</p>
      <p>Date Deleted: {dateDeleted}</p>

      {isHovered && (
        <AnchoredMenu
          align="right"
          className="cmp-dropdown-anchor-corner"
          trigger={({ onClick }) => (
            <div className="three-dots" onClick={onClick}>
              <FiMoreHorizontal />
            </div>
          )}
          items={[
            {
              key: 'restore',
              label: 'Restore',
              icon: <MdOutlineSettingsBackupRestore size={18} />,
              onClick: onRestore,
            },
            {
              key: 'delete',
              label: 'Delete Permanently',
              icon: <MdDelete size={18} />,
              variant: 'danger',
              onClick: onDelete,
            },
          ]}
        />
      )}

    </div>
  );
};

const TrashEmpty = () => (
  <div className="trash-sitemap-empty">
    <FaTrash size={50} />
    <p className="trash-sitemap-empty__title">No recent trash here</p>
    <p className="trash-sitemap-empty__desc">
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
    } catch { /* ignored */ }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteFromTrash({ type: 'sitemap', id }));
      dispatch(fetchTrashItemsAsync());
    } catch { /* ignored */ }
  };

  return (
    <div className="trash-sitemap-list">
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
