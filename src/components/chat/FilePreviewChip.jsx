import PropTypes from 'prop-types';
import Button from '../common/Button';

const PdfIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
);

const ImageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
);

const DocIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
);

const FilePreviewChip = ({ file, onRemove }) => {
  if (!(file instanceof File)) return null;

  const displayName = file.name.length > 30 ? file.name.slice(0, 27) + '...' : file.name;
  const isPdf = file.type?.includes('pdf');
  const isImage = file.type?.includes('image');

  return (
    <div className="file-preview-chip">
      <div className="file-preview-chip__icon">
        {isPdf ? <PdfIcon /> : isImage ? <ImageIcon /> : <DocIcon />}
      </div>
      <div className="file-preview-chip__info">
        <span className="file-preview-chip__name">{displayName}</span>
        <span className="file-preview-chip__size">{(file.size / 1024).toFixed(0)} KB</span>
      </div>
      <Button
        variant="icon"
        ariaLabel="Remove file"
        className="file-preview-chip__remove"
        title="Remove file"
        onClick={onRemove}
      >
        &times;
      </Button>
    </div>
  );
};

FilePreviewChip.propTypes = {
  file: PropTypes.object,
  onRemove: PropTypes.func.isRequired,
};

export default FilePreviewChip;
