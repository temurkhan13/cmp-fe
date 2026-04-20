import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
import { FiImage, FiFile, FiLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import NoDataAvailable from '../../common/NoDataAvailable';

const TABS = [
  { key: 'images', label: 'Images', icon: FiImage },
  { key: 'documents', label: 'Documents', icon: FiFile },
  { key: 'links', label: 'Links', icon: FiLink },
];

const AssessmentMedia = ({ images = [], documents = [], links = [] }) => {
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

      <style>{mediaStyles}</style>
    </>
  );
};

const mediaStyles = `
  .md-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* Tabs */
  .md-tabs {
    display: flex;
    gap: 0.25rem;
    padding: 0 0.25rem;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 1rem;
  }
  .md-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.7rem 0.5rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    font-size: 1.25rem;
    font-weight: 500;
    color: #888;
    cursor: pointer;
    transition: all 0.15s;
  }
  .md-tab:hover { color: #555; }
  .md-tab--active {
    color: #0B1444;
    border-bottom-color: #C3E11D;
  }
  .md-tab-count {
    font-size: 1.05rem;
    background: #f0f0f0;
    color: #666;
    padding: 0.1rem 0.5rem;
    border-radius: 10px;
    font-weight: 600;
  }
  .md-tab--active .md-tab-count {
    background: #eef7c2;
    color: #0B1444;
  }

  /* Content */
  .md-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 0.25rem;
  }

  /* Image Gallery */
  .md-gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  .md-gallery-item {
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    aspect-ratio: 1;
    position: relative;
  }
  .md-gallery-item::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0);
    transition: background 0.15s;
    border-radius: 8px;
  }
  .md-gallery-item:hover::after {
    background: rgba(0,0,0,0.06);
  }
  .md-gallery-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Document & Link List */
  .md-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .md-list-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.7rem 0.8rem;
    border-radius: 8px;
    transition: background 0.12s;
  }
  .md-list-item:hover { background: #fafafa; }
  .md-list-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .md-list-icon--doc { background: #f0f0f0; color: #666; }
  .md-list-icon--link { background: #eef7c2; color: #0B1444; }
  .md-list-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .md-list-name {
    font-size: 1.3rem;
    font-weight: 500;
    color: #1a1a1a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .md-list-meta {
    font-size: 1.1rem;
    color: #999;
  }
  .md-list-url {
    font-size: 1.1rem;
    color: #2563eb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Lightbox */
  .md-lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: md-fadeIn 0.2s;
  }
  .md-lightbox-inner {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .md-lb-img {
    max-width: 85vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 6px;
  }
  .md-lb-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: rgba(255,255,255,0.15);
    border: none;
    color: #fff;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s;
  }
  .md-lb-close:hover { background: rgba(255,255,255,0.3); }
  .md-lb-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.15);
    border: none;
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s;
  }
  .md-lb-nav:hover { background: rgba(255,255,255,0.3); }
  .md-lb-nav--prev { left: -56px; }
  .md-lb-nav--next { right: -56px; }
  .md-lb-counter {
    position: absolute;
    bottom: -32px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.6);
    font-size: 1.2rem;
  }
  @keyframes md-fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

AssessmentMedia.propTypes = {
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

export default AssessmentMedia;
