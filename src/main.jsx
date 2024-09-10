import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../scss/main.scss';
import 'aos/dist/aos.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { ScaleLoader } from 'react-spinners';

const Loading = () => (
  <div className="spinner" style={{ display: 'flex' }}>
    <ScaleLoader color={'#000000'} loading={true} size={150} />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        
          <App />
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
