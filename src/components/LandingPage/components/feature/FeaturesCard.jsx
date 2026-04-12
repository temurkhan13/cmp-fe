import PropTypes from 'prop-types';

const FeaturesCard = ({ img, title, desc }) => {
  return (
    <div className="featurecard">
      <img className="image" src={img} alt="" />
      <div className="featurecontent">
        <h2 className="title">{title}</h2>
        <p className="description">{desc}</p>
      </div>
      <style>
        {`
    .featurecard {
  display: flex;
  font-size:1.5rem !important;
  align-items: flex-start;
  gap: 0.25rem;
  border-width: 2px;
  border-radius: 16px;
  background-color: #ffffff;
  transition: all 0.25s ease;
  padding: 4rem;
  border: 1px solid rgba(0,0,0,0.06);
  gap:1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06);
}

.featurecard:hover {
  background-color: #fafff0;
  border-color: rgba(195,225,29,0.3);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}

.featurecard img {
// margin:1rem 0rem 0rem 0rem;
  object-fit: contain;
}

.featurecard .featurecontent {
  display: flex;
  padding:0rem 1rem;
  flex-direction: column;
  justify-content: center;
}

.featurecard h2 {
  color: #00316e;
  font-weight: bold;
  font-size: 2rem !important; 
}

.featurecard h5 {
  font-size: 1.3rem;
  margin-top: 0.5rem;
}

.featurecard button {
  display: flex;
  align-items: center;
  gap: 0.25rem; 
  font-weight: 600;
  font-size: 1.3rem; 
  color: #00316e;
  margin-top: 0.75rem; 
  background: none;
  border: none;
  cursor: pointer;
}

.featurecard button i {
  color: #00316f;
  font-size: 0.75rem;
}
  .learn-more{
  font-size:1.4rem !important;
  }

    `}
      </style>
    </div>
  );
};

FeaturesCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};
export default FeaturesCard;
