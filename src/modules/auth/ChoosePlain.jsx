
import { useState } from "react";
import Components from "../../components";
import data from "../../data";

const ChoosePlain = () => {
  const [isActive, setIsActive] = useState(false);

  function toggleHandler() {
    setIsActive(!isActive);
  }

  const toggleData = isActive
    ? data.subscriptionPlains.monthlyPlainData
    : data.subscriptionPlains.weeklyPlainData;

  return (
    <div className="choosePlain">
      <center>
        <Components.Feature.Heading className="primary mb_Primary">
          Compare our plans and find yours
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light">
          Choose the payment plan that best suits your requirements.
        </Components.Feature.Text>
        <div>
          <Components.Feature.Button
            className={`toggle${isActive ? "" : "--active"}`}
            onClick={toggleHandler}
          >
            Monthly
          </Components.Feature.Button>
          <Components.Feature.Button
            className={`toggle${isActive ? "--active" : ""}`}
            onClick={toggleHandler}
          >
            Yearly
          </Components.Feature.Button>
        </div>
      </center>
      <Components.Common.SubscriptionPlainsGrid
        data={toggleData}
        active={isActive}
      />
    </div>
  );
};

export default ChoosePlain;