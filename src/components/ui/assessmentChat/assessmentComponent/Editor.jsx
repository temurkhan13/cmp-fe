import PropTypes from 'prop-types';
import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Editor = ({ placeholder, height }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...',
      height: height || '100%', // Set the height here
    }),
    [placeholder, height]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={() => {}}
    />
  );
};

Editor.propTypes = {
  placeholder: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Editor.defaultProps = {
  height: '100%',
};

export default Editor;
