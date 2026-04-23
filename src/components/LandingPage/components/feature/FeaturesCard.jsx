import PropTypes from 'prop-types';

const FeaturesCard = ({ img, title, desc }) => {
  return (
    <div className="featurecard">
      <img className="image" src={img} alt={title} />
      <div className="featurecontent">
        <h2 className="featurecard-title">{title}</h2>
        <p className="description">{desc}</p>
      </div>
    </div>
  );
};

FeaturesCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};
export default FeaturesCard;
