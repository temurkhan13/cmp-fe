import React from "react";
import Components from "../../components";
import { GoCheckCircle } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const PlainCard = (props) => {
  return (
    <>
      <div
        className={`plainCard`}
        id={props.name === "Starter" ? "plainCard-active" : ""}
      >
        <header>
          <Components.Feature.Text className="main--bold  mb_Primary">
            {props.name}
          </Components.Feature.Text>
          <Components.Feature.Text className="secondry--light mb_Secondry">
            {props.description}
          </Components.Feature.Text>
          <Components.Feature.Text className="secondry--light mb_1">
            <span>${props.price}</span>/{" "}
            {props.plainType ? "yearly" : "monthly"}
          </Components.Feature.Text>
          <Link to="/check-out">
            <Components.Feature.Button className="primary mb_Tertiary">
              Get Started
            </Components.Feature.Button>
          </Link>
        </header>
        <span className="mb_Tertiary"></span>
        <section>
          <Components.Feature.Text className="main--bold">
            Includes
          </Components.Feature.Text>

          <div>
            {props.features.map((el) => (
              <Item key={uuidv4()}>{el}</Item>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default PlainCard;

const Item = (props) => {
  return (
    <>
      <div className="plainCard-item">
        <div>
          <GoCheckCircle />
        </div>
        <div>
          <Components.Feature.Text className="primary--light">
            {props.children}
          </Components.Feature.Text>
        </div>
      </div>
    </>
  );
};
