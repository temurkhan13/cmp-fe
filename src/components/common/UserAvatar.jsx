import { useState } from 'react';
import './common.scss';

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

  if (showImage) {
    return (
      <div
        className={`user-avatar ${className}`}
        style={{
          '--ua-size': `${size}px`,
          backgroundColor: 'transparent',
          ...style,
        }}
      >
        <img
          src={src}
          alt={name || 'avatar'}
          className={`user-avatar__img ${imgClassName}`}
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`user-avatar ${className}`}
      style={{
        '--ua-size': `${size}px`,
        backgroundColor: bg,
        ...style,
      }}
    >
      <span
        className={`user-avatar__initials ${initialsClassName}`}
        style={{
          '--ua-font': `${size * 0.38}px`,
          fontSize: `${size * 0.38}px`,
          ...initialsStyle,
        }}
      >
        {initials}
      </span>
    </div>
  );
};

export default UserAvatar;
