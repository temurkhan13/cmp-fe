const MainCard = (props) => {
  return (
    <div
      className="change-ai-cards"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <div className="border-content">
        <h1>{props.title}</h1>
        <p className="paragraph">{props.desc}</p>
      </div>
      <style>
        {`
.change-ai-cards {
  background-color: #ffffff;
  padding: 15px 20px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  gap: 8px;
  transition: all ease 0.2s;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom:3rem;
  }
  .paragraph{
    margin-top:0.5rem;
    font-size:1.3rem;
    }
  .change-ai-cards:hover {
  transform: scale(1.05);
 border-radius: 20px;
  background: linear-gradient(white, white) padding-box,
  linear-gradient( 258.56deg, #C3E11D 1.97%, #E0E0E0 16.82%) border-box;
  border: 1px solid transparent;
border-image-source: linear-gradient(258.56deg, #C3E11D 1.97%, #E0E0E0 16.82%);
}

.border-content {
  padding: 16px;
}

h1 {
  font-size: 24px;
  font-weight: 600;
}

h5 {
  font-size: 12px;
}

.card:hover {
  /* Add any hover effects you might want here */
}

        `}
      </style>
    </div>
  );
};

export default MainCard;
