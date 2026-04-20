import './common.scss';

const COLORS = [
  '#C3E11D', '#47beba', '#f59e0b', '#8b5cf6',
  '#ef4444', '#3b82f6', '#ec4899', '#14b8a6',
];

const getInitials = (user) => {
  const first = user?.firstName?.[0] || user?.first_name?.[0] || user?.name?.[0] || '';
  const last = user?.lastName?.[0] || user?.last_name?.[0] || '';
  return (first + last).toUpperCase() || '?';
};

const getColor = (index) => COLORS[index % COLORS.length];

const Avatar = ({ user, index, size = 32, style = {} }) => {
  const photo = user?.photoPath || user?.photo_path;
  const initials = getInitials(user);
  const bg = getColor(index);

  return (
    <div
      title={`${user?.firstName || user?.first_name || ''} ${user?.lastName || user?.last_name || ''}`.trim() || user?.email || 'User'}
      className="avatar-item"
      style={{
        '--avatar-size': `${size}px`,
        '--avatar-font': `${size * 0.38}px`,
        background: photo ? `url(${photo}) center/cover` : bg,
        color: photo ? 'transparent' : '#fff',
        ...style,
      }}
    >
      {!photo && initials}
    </div>
  );
};

const AvatarGroup = ({ users = [], max = 3, size = 32 }) => {
  if (!users || users.length === 0) return null;

  const visible = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="avatar-group">
      {visible.map((user, i) => (
        <Avatar
          key={user?.id || user?._id || i}
          user={user}
          index={i}
          size={size}
          style={{ marginLeft: i > 0 ? -(size * 0.3) : 0, zIndex: max - i }}
        />
      ))}
      {remaining > 0 && (
        <div
          className="avatar-remaining"
          style={{
            '--avatar-size': `${size}px`,
            '--avatar-remaining-font': `${size * 0.34}px`,
            marginLeft: -(size * 0.3),
            zIndex: 0,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarGroup };
export default AvatarGroup;
