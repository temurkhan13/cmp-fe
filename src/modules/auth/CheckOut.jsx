import Components from '../../components';
const CheckOut = () => {
  return (
    <div className="checkout">
      <Components.CheckOut.PlanDetail />
      <Components.CheckOut.PayWithCard />
    </div>
  );
};

export default CheckOut;
