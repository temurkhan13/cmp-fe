import { useState } from 'react';
import PropTypes from 'prop-types';

import { RxCross2 } from 'react-icons/rx';
import { IoMdDocument } from 'react-icons/io';
import { MdInsertLink } from 'react-icons/md';

const Media = ({ images, documents, links }) => {
  const [activeTab, setActiveTab] = useState('Images');
  const [popupImage, setPopupImage] = useState(null);

  const closePopup = () => {
    setPopupImage(null);
  };

  return (
    <div className="container">
      <div className="tabs">
        <button onClick={() => setActiveTab('Images')}>Images</button>
        <button onClick={() => setActiveTab('Documents')}>Documents</button>
        <button onClick={() => setActiveTab('Links')}>Links</button>
      </div>
      <div className="content">
        {activeTab === 'Images' && (
          <div className="image-gallery">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`img-${index}`}
                className="gallery-image"
                onClick={() => setPopupImage(src)}
              />
            ))}
          </div>
        )}
        {activeTab === 'Documents' && (
          <div className="documents-list">
            {documents.map((doc, index) => (
              <div key={index} className="document-item">
                <div className="document-icon">
                  <IoMdDocument />
                </div>
                <div className="document-info">
                  <div className="document-name">
                    <div>{doc.name}</div>
                    <div className="document-size">{doc.size}</div>
                  </div>
                  <div className="document-details">{doc.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Links' && (
          <div className="links-list">
            {links.map((link, index) => (
              <div key={index} className="link-item">
                <button className="link-button">
                  <MdInsertLink />
                </button>
                <div className="link-info">
                  <div className="link-name">{link.name}</div>
                  <div className="link-url">{link.url}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {popupImage && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>
              <RxCross2 />
            </button>
            <img src={popupImage} alt="Popup" className="popup-image" />
          </div>
        </div>
      )}

      <style>{`
        .container {
          margin: 0 auto;
          text-align: center;
        }

        .tabs {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          border-bottom: 1px solid lightgray;
          margin-bottom: 1.25rem; 
        }

        .tabs button {
          background-color: transparent;
          border: none;
          padding: 0.625rem 1.25rem; 
          cursor: pointer;
          margin: 0 0.3125rem; 
          font-size: 1.3rem; 
        }

        .tabs button:focus {
          outline: none;
          border-bottom: 1px solid black;
        }

        .content {
          display: flex;
          justify-content: center;
        }

        .image-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.625rem;
        }

        .gallery-image {
          width: 100%;
          height: 9.375rem;
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.2s ease-in-out;
        }

        .gallery-image:hover {
          transform: scale(1.05);
        }

        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.3s ease-in-out;
          width:100rem;
        }

        .popup-content {
          position: relative;
          max-width: 80%;
          max-height: 80%;
          animation: zoomIn 0.1s ease-in-out;
        }

        .popup-image {
          width: 100%;
          height: auto;
        }

        .close-btn {
       position: absolute;
       top: 3rem;
       right: 3rem;
         background: black;
         color:white;
          border: none;
          cursor: pointer;
          font-size: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 0.5rem;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.5);
          }
          to {
            transform: scale(1);
          }
        }
          .documents-list{
         
        }
          .documents-list {
          width: 100%;
        }

        .document-item {
          display: flex;
          align-items: center;
          padding: 0.625rem; 
          border-radius:1rem;
          padding-bottom:1rem;
          &:hover{
          background-color: #f1f1f1;
          cursor: pointer;
          }
        }

        .document-icon {
        color:gray;
        display:flex;
        font-size: 4rem; 
        margin-right: 0.625rem; 
        }

        .document-info {
          text-align: left;
          width:100%;
        }

       .document-name {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.3rem;
          font-weight: 500;
        }
        .document-details {
          font-size: 1.1rem; 
          text-align: left;
          color: #gray;
        }
          .document-size{
          font-size: 1.1rem;
          color: gray;
          }
           .links-list {
          width: 100%;
        }

        .link-item {
          display: flex;
          align-items: center;
          padding: 1rem; 
        }

        .link-button {
        display:flex;
          font-size: 2.5rem; 
          margin-right: 1rem; 
          outline:none;
          background-color:#f1f1f1;
          padding:0.5rem;
          border-radius: 0.5rem;
          border: none;
          // border:none;

        }

        .link-info {
          text-align: left;
          width: 100%;
        }

        .link-name {
          font-size: 1.3rem; 
          font-weight: 500;
          color: #000;
        }

        .link-url {
          font-size: 1.1rem; 
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: gray;
        }

      `}</style>
    </div>
  );
};

Media.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
    })
  ).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default Media;
