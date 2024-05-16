import React from "react";
import { Outlet } from "react-router-dom";
import Components from "../components";
import assets from "../assets";

const PlainsLayout = () => {
  return (
    <Components.Feature.Container className="main">
      <div className="plainLayout">
        <img src={assets.common.logo} alt="logo" />
        <section>
          <Outlet />
        </section>
      </div>
    </Components.Feature.Container>
  );
};

export default PlainsLayout;
