import { useState } from 'react';

const COLORS = [
  '#C3E11D', '#47beba', '#f59e0b', '#8b5cf6',
  '#ef4444', '#3b82f6', '#ec4899', '#14b8a6',
];

const getInitials = (name) => {
  if (!name || !name.trim()) return '?';
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return words[0].substring(0, 2).toUpperCase();
};

const getColor = (name) => {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

const UserAvatar = ({
  src,
  name = '',
  size = 40,
  className = '',
  imgClassName = '',
  initialsClassName = '',
  style = {},
  initialsStyle = {},
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = src && !imgFailed;
  const initials = getInitials(name);
  const bg = getColor(name);

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: showImage ? 'transparent' : bg,
    ...style,
  };

  if (showImage) {
    return (
      <div className={className || undefined} style={containerStyle}>
        <img
          src={src}
          alt={name || 'avatar'}
          className={imgClassName || undefined}
          onError={() => setImgFailed(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            margin: '0',
          }}
        />
      </div>
    );
  }

  return (
    <div className={className || undefined} style={containerStyle}>
      <span
        className={initialsClassName || undefined}
        style={{
          color: '#fff',
          fontSize: size * 0.38,
          fontWeight: 600,
          fontFamily: 'Poppins, sans-serif',
          lineHeight: 1,
          userSelect: 'none',
          ...initialsStyle,
        }}
      >
        {initials}
      </span>
    </div>
  );
};

export default UserAvatar;
