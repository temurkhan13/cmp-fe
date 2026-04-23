const MainCard = (props) => {
  return (
    <div
      className="change-ai-cards"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <div className="maincard-content">
        <h3>{props.title}</h3>
        <p className="maincard-paragraph">{props.desc}</p>
      </div>
    </div>
  );
};

export default MainCard;
