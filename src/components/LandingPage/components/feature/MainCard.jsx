import React from 'react';

const MainCard = (props) => {
  return (
    <div
      className="cards"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <div className="border-content">
        <h1>{props.title}</h1>
        <h5>{props.desc}</h5>
      </div>
      <style>
        {`
.cards {
  background-color: #ffffff;
  padding: 15px 20px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  gap: 8px;
  transition: all ease 0.2s;
}
.cards:hover{
scale: 1.05;
box-shadow: 0px 0px 4px 1px #C3E11D;
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
