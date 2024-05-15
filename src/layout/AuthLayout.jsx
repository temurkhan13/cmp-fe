import React from "react";
import Components from "../components";
import { Outlet } from "react-router-dom";
import assets from "../assets";

const AuthLayout = () => {
  return (
    <Components.Feature.Container className="main">
      <div className="authLayout">
        <section>
          <img src={assets.common.logo} alt="logo" />
          <section>
            <Outlet />
          </section>
        </section>
        <img src={assets.auth.banner} alt="banner" />
      </div>
    </Components.Feature.Container>
  );
};

export default AuthLayout;
