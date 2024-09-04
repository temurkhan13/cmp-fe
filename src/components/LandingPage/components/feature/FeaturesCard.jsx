const FeaturesCard = (props) => {
  return (
    <div className="featurecard">
      <img className="image" src={props.img} alt="" />
      <div className="featurecontent">
        <h2 className="title">{props.title}</h2>
        <h5 className="description">{props.desc}</h5>
        <button className="learn-more">
          Learn more <i className="fa fa-arrow-right"></i>
        </button>
      </div>
      <style>
        {`
    .featurecard {
  display: flex;
  font-size:1.5rem !important;
  align-items: flex-start;
  gap: 0.25rem;
  border-width: 2px;
  border-radius: 20px;
  padding: 1rem 1rem; 
  background-color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0px 0px 1px black;
}

.featurecard:hover {
  background-color: #c3e11d;
  box-shadow: 0px 0px 5px gray;
  scale: 1.01;
}

.featurecard img {
  object-fit: contain;
}

.featurecard .featurecontent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featurecard h2 {
  color: #00316e;
  font-weight: bold;
  font-size: 1.5rem !important; 
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

    `}
      </style>
    </div>
  );
};

export default FeaturesCard;
