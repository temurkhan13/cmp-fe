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
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: photo ? `url(${photo}) center/cover` : bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: photo ? 'transparent' : '#fff',
        fontSize: size * 0.38,
        fontWeight: 600,
        border: '2px solid #fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        flexShrink: 0,
        fontFamily: 'Poppins, sans-serif',
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
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
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size * 0.34,
            fontWeight: 600,
            color: '#6b7280',
            border: '2px solid #fff',
            marginLeft: -(size * 0.3),
            zIndex: 0,
            fontFamily: 'Poppins, sans-serif',
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
