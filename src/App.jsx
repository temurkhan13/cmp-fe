import { useEffect } from "react";
import Routess from "./Routes";
import Aos from "aos";
import { useDispatch } from 'react-redux';
import { rehydrateToken } from "./redux/slices/authSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateToken());
  }, [dispatch]);

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
