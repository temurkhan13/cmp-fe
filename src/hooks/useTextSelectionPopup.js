import { useEffect, useState } from 'react';

const useTextSelectionPopup = ({ selector, idAttribute, ignoreSelector } = {}) => {
  const [selectedText, setSelectedText] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      if (ignoreSelector) {
        const ignored = document.querySelector(ignoreSelector);
        if (ignored && ignored.contains(event.target)) return;
      }

      const selection = window.getSelection();
      const text = selection.toString().trim();

      let valid = false;
      let id = null;
      document.querySelectorAll(selector).forEach((el) => {
        if (el.contains(selection.anchorNode) && el.contains(selection.focusNode)) {
          valid = true;
          id = el.getAttribute(idAttribute);
        }
      });

      if (valid && text) {
        setSelectedText(text);
        setSelectedId(id);
        setPopupVisible(true);
      } else {
        setPopupVisible(false);
      }
    };

    document.addEventListener('mouseup', handler);
    return () => document.removeEventListener('mouseup', handler);
  }, [selector, idAttribute, ignoreSelector]);

  return { selectedText, selectedId, popupVisible, setPopupVisible };
};

export default useTextSelectionPopup;
