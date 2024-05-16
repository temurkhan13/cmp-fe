import React from "react";
import Components from "../../components";
const CheckOut = () => {
  return (
    <div className="checkout">
      <Components.UI.PlainDetail />
      <Components.UI.PayWithCard />
    </div>
  );
};

export default CheckOut;
