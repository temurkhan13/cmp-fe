import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../scss/main.scss';
import 'aos/dist/aos.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { ScaleLoader } from 'react-spinners';

const loadingFallback = (
  <div className="app-loading-spinner">
    <ScaleLoader color={'#000000'} loading={true} size={150} />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={loadingFallback}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Suspense>
);
