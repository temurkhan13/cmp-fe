import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const TrashItemCard = ({ name, type, dateDeleted }) => (
  <div className="trash-card">
    <h3>{name}</h3>
    <p>Type: {type}</p>
    <p>Date Deleted: {dateDeleted}</p>
    <style>{`
      .trash-card {
        background-color: #f8f8f8;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .trash-card:hover {
        transform: translateY(-5px);
      }
      .trash-card h3 {
        margin: 0;
        font-size: 1.5rem;
        color: #333;
      }
      .trash-card p {
        margin: 5px 0;
        font-size: 1.3rem;
        color: #666;
      }
    `}</style>
  </div>
);

TrashItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dateDeleted: PropTypes.string.isRequired,
};

const TrashAssistant = () => {
  // Access trash items from Redux store
  const trashItems = useSelector((state) => state.trash.trashItems);

  // Render each category (folders, workspaces, chats, assessments) if they contain items
  const renderTrashItems = (items, type) =>
    items.length > 0 ? (
      items.map((item) => (
        <TrashItemCard
          key={item._id}
          name={item.name || 'Unnamed'}
          type={type}
          dateDeleted={item.dateDeleted || 'Unknown Date'}
        />
      ))
    ) : (
      <p>No {type} in Trash</p>
    );

  return (
    <div className="trash-assistant-container">
      {trashItems.folders && renderTrashItems(trashItems.folders, 'Folder')}
      {trashItems.workspaces &&
        renderTrashItems(trashItems.workspaces, 'Workspace')}
      {trashItems.chats && renderTrashItems(trashItems.chats, 'Chat')}
      {trashItems.assessments &&
        renderTrashItems(trashItems.assessments, 'Assessment')}

      <style>{`
        .trash-assistant-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 20px;
          align-items: start;
          justify-content: flex-start;
        }
      `}</style>
    </div>
  );
};

export default TrashAssistant;
