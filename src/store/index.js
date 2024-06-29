import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import businessInfoReducer from './businessInfoSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, businessInfoReducer);

const store = configureStore({
  reducer: {
    businessInfo: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
