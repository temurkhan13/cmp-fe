import Components from '..';

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
            key={el.name}
          />
        ))}
      </div>
    </>
  );
};

export default SubscriptionPlainsGrid;
