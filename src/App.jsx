import { useEffect } from 'react';
import Routess from './Routes';
import Aos from 'aos';
import { useDispatch } from 'react-redux';
import { rehydrateToken } from './redux/slices/authSlice';

import LoadingBar from 'react-redux-loading-bar';
import Toast from './components/common/Toast';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateToken());
  }, [dispatch]);

  useEffect(() => {
    Aos.init({
      disable: false,
      offset: 80,
      delay: 0,
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <>
      <LoadingBar className="app-loading-bar" />
      <Toast />
      <Routess />
    </>
  );
}

export default App;
