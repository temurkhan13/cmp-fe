function PlaybookCover({ name, workspace }) {
  return (
    <div className="playbook-cover">
      <div className="playbook-cover-content">
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

export default PlaybookCover;
