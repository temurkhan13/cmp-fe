import userImages from '../../assets/chat/user.png';

const images = [
  userImages,
  userImages,
  userImages,
  userImages,
  userImages,
  userImages,
  userImages,
  userImages,
  userImages,
  userImages,
];

const handleImageClick = (src) => {
  alert(`Image clicked: ${src}`);
};

const Images = () => {
  return (
    <div className="images-grid">
      {images.map((src, index) => (
        <div
          key={index}
          className="image-container"
          onClick={() => handleImageClick(src)}
        >
          <img src={src} alt={`img-${index}`} className="image" />
        </div>
      ))}
    </div>
  );
};

export default Images;
