import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
import { FiImage, FiFile, FiLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import NoDataAvailable from '../common/NoDataAvailable';
import './chat.scss';

const TABS = [
  { key: 'images', label: 'Images', icon: FiImage },
  { key: 'documents', label: 'Documents', icon: FiFile },
  { key: 'links', label: 'Links', icon: FiLink },
];

const Media = ({ images = [], documents = [], links = [] }) => {
  const [activeTab, setActiveTab] = useState('images');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const closeLightbox = () => setLightboxIndex(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, images.length]);

  const counts = { images: images.length, documents: documents.length, links: links.length };

  return (
    <>
      <div className="md-container">
        {/* Tabs */}
        <div className="md-tabs">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`md-tab ${activeTab === key ? 'md-tab--active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={15} />
              {label}
              {counts[key] > 0 && <span className="md-tab-count">{counts[key]}</span>}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md-content">
          {/* Images */}
          {activeTab === 'images' && (
            images.length === 0 ? (
              <NoDataAvailable message="No images yet" />
            ) : (
              <div className="md-gallery">
                {images.map((src, i) => (
                  <div key={i} className="md-gallery-item" onClick={() => setLightboxIndex(i)}>
                    <img src={src} alt={`Image ${i + 1}`} className="md-gallery-img" />
                  </div>
                ))}
              </div>
            )
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            documents.length === 0 ? (
              <NoDataAvailable message="No documents yet" />
            ) : (
              <div className="md-list">
                {documents.map((doc, i) => (
                  <div
                    key={i}
                    className={`md-list-item ${doc.url ? 'md-list-item--clickable' : 'md-list-item--default'}`}
                    onClick={() => doc.url && window.open(doc.url, '_blank')}
                  >
                    <div className="md-list-icon md-list-icon--doc"><FiFile size={18} /></div>
                    <div className="md-list-info">
                      <span className="md-list-name">{doc.name}</span>
                      <span className="md-list-meta">
                        {[doc.date, doc.size].filter(Boolean).join(' · ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* Links */}
          {activeTab === 'links' && (
            links.length === 0 ? (
              <NoDataAvailable message="No links yet" />
            ) : (
              <div className="md-list">
                {links.map((link, i) => (
                  <div
                    key={i}
                    className="md-list-item md-list-item--clickable"
                    onClick={() => link.url && window.open(link.url, '_blank')}
                  >
                    <div className="md-list-icon md-list-icon--link"><FiLink size={18} /></div>
                    <div className="md-list-info">
                      <span className="md-list-name">{link.name}</span>
                      <span className="md-list-url">{link.url}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="md-lightbox" onClick={closeLightbox}>
          <div className="md-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="md-lb-close" onClick={closeLightbox}><RxCross2 size={20} /></button>
            {images.length > 1 && (
              <>
                <button className="md-lb-nav md-lb-nav--prev" onClick={() => setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1))}><FiChevronLeft size={24} /></button>
                <button className="md-lb-nav md-lb-nav--next" onClick={() => setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1))}><FiChevronRight size={24} /></button>
              </>
            )}
            <img src={images[lightboxIndex]} alt="Preview" className="md-lb-img" />
            <div className="md-lb-counter">{lightboxIndex + 1} / {images.length}</div>
          </div>
        </div>
      )}
    </>
  );
};

Media.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      date: PropTypes.string,
      size: PropTypes.string,
    })
  ),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};

export default Media;
