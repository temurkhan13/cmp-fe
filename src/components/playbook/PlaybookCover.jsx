function PlaybookCover({ name, workspace, accentColor = '#00316f', logoUrl = '' }) {
  return (
    <div
      className="playbook-cover"
      style={{
        background: `linear-gradient(135deg, ${accentColor} 0%, ${lightenColor(accentColor, 30)} 100%)`,
      }}
    >
      <div className="playbook-cover-content">
        {logoUrl && (
          <img src={logoUrl} alt="Logo" className="playbook-cover-logo" />
        )}
        <span className="playbook-cover-label">Digital Playbook</span>
        <h1 className="playbook-cover-title">{name}</h1>
        {workspace && (
          <p className="playbook-cover-workspace">{workspace}</p>
        )}
        <div className="playbook-cover-line" />
        <p className="playbook-cover-powered">Powered by ChangeAI</p>
      </div>
    </div>
  );
}

function lightenColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + Math.round(255 * percent / 100));
  const g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100));
  const b = Math.min(255, (num & 0x0000FF) + Math.round(255 * percent / 100));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

export default PlaybookCover;
