import Components from '..';

const SubscriptionPlansGrid = (props) => {
  return (
    <>
      <div className="subscriptionPlansGrid">
        {props.data.map((el) => (
          <Components.Feature.PlanCard
            name={el.name}
            description={el.description}
            price={el.price}
            features={el.features}
            planType={props.active}
            key={el.name}
          />
        ))}
      </div>
    </>
  );
};

export default SubscriptionPlansGrid;
