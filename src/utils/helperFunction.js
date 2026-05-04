const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const secondsAgo = Math.floor((now - past) / 1000);

  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  if (secondsAgo < 60) return `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;
  if (minutesAgo < 60) return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
  if (hoursAgo < 24) return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
  return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
}

export { truncateText, timeAgo };
