import { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-color-palette/css';
import { ColorPicker, useColor } from 'react-color-palette';
import '../assessment.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { RxCross2 } from 'react-icons/rx';

const EditModal = ({ isOpen, onClose }) => {
  const [logo, setLogo] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState('Word');
  const [colors, setColors] = useState([{ id: 1, color: '#C3E11D' }]);
  const [currentColor, setCurrentColor] = useState(null);
  const [color, setColor] = useColor('hex', '#561ecb');

  const handleColorChange = (newColor) => {
    const updatedColors = colors.map((c) =>
      c.id === currentColor ? { ...c, color: newColor.hex } : c
    );
    setColors(updatedColors);
  };

  const addColorPicker = () => {
    const newId = colors.length > 0 ? colors[colors.length - 1].id + 1 : 1;
    setColors([...colors, { id: newId, color: '#FFFFFF' }]);
  };

  const handleLogoUpload = (event) => {
    setLogo(URL.createObjectURL(event.target.files[0]));
  };

  if (!isOpen) return null;

  return (
    <div className="edit-overlay">
      <div className="modalContainer">
        <button className="closeButton" onClick={onClose}>
          <RxCross2 className="edit-modal-close-icon" />
        </button>
        <p className="title edit-modal-title">
          Choose your branding
        </p>
        <hr className="saperator" />
        <div className="section">
          <label className="label">Upload Logo</label>
          {logo && (
            <img src={logo} alt="Logo Preview" className="logoPreview" />
          )}
          <input
            type="file"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleLogoUpload}
            className="file-upload"
          />
          <p className="note">
            Max size:<span> 2 MB</span>
          </p>
          <p className="note">
            Allow file extensions: <span>PNG, JPEG, SVG</span>
          </p>
        </div>
        <hr className="saperator" />
        <div className="section">
          <label className="label">Select theme colors</label>
          <p className="note">
            Choosing the theme color will determine the color of your templates
          </p>
          <div className="colorPicker">
            {colors.map((colorObj) => (
              <div
                key={colorObj.id}
                className="color-container"
                onMouseEnter={() => setCurrentColor(colorObj.id)}
                onMouseLeave={() => setCurrentColor(null)}
              >
                <div
                  className="color-swatch"
                  style={{ backgroundColor: colorObj.color }}
                ></div>
                <span>{colorObj.color.replace('#', '')}</span>
                {currentColor === colorObj.id && (
                  <div className="color-picker">
                    <ColorPicker
                      width={228}
                      height={128}
                      color={color}
                      onChange={(newColor) => {
                        setColor(newColor);
                        handleColorChange(newColor);
                      }}
                      hideHSV
                      dark
                    />
                  </div>
                )}
              </div>
            ))}
            <button onClick={addColorPicker}>Add more colors</button>
          </div>
        </div>
        <hr className="saperator" />
        <div className="section">
          <label className="label">Select document type</label>
          <p className="note">Choosing the style for your document</p>
          <div className="documentTypes">
            <div
              className={`docType ${selectedDoc === 'Word' ? 'selected' : ''}`}
              onClick={() => setSelectedDoc('Word')}
            >
              <Skeleton height={100} width={100} borderRadius={10}>
                <div className="mockup"></div>
              </Skeleton>
              Word
            </div>
            <div
              className={`docType ${selectedDoc === 'PPT' ? 'selected' : ''}`}
              onClick={() => setSelectedDoc('PPT')}
            >
              <Skeleton height={100} width={100} borderRadius={10}>
                <div className="mockup"></div>
              </Skeleton>
              PPT
            </div>
            <div
              className={`docType ${selectedDoc === 'Excel' ? 'selected' : ''}`}
              onClick={() => setSelectedDoc('Excel')}
            >
              <Skeleton height={100} width={100} borderRadius={10}>
                <div className="mockup"></div>
              </Skeleton>
              Excel
            </div>
          </div>
        </div>
        <div className="update-btn">
          <button className="updateButton" onClick={onClose}>
            Update
          </button>
        </div>

      </div>
    </div>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditModal;
