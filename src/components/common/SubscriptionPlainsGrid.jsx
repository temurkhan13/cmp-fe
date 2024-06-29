import Components from "..";
import { v4 as uuidv4 } from "uuid";

const SubscriptionPlainsGrid = (props) => {
  return (
    <>
      <div className="subscriptionPlainGrid">
        {props.data.map((el) => (
          <Components.Feature.PlainCard
            name={el.name}
            description={el.description}
            price={el.price}
            features={el.features}
            plainType={props.active}
            key={uuidv4()}
          />
        ))}
      </div>
    </>
  );
};

export default SubscriptionPlainsGrid;