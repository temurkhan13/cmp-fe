import React, { useEffect } from "react";
import Routess from "./Routes";
import Aos from "aos";

function App() {
  useEffect(() => {
    Aos.init({
      disable: false,
      offset: 100,
      delay: 0,
      duration: 4000,
      easing: "ease",
      once: false,
      mirror: false,
    });
  });

  return (
    <>
      <Routess />
    </>
  );
}

export default App;
