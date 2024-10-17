import { useEffect } from 'react';
import Routess from './Routes';
import Aos from 'aos';
import { useDispatch } from 'react-redux';
import { rehydrateToken } from './redux/slices/authSlice';

import LoadingBar from 'react-redux-loading-bar';
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
      easing: 'ease',
      once: false,
      mirror: false,
    });
  });

  return (
    <>
      <LoadingBar style={{ backgroundColor: 'green', height: '5px' }} />
      <Routess />
    </>
  );
}

export default App;
