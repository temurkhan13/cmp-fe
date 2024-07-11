// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import businessInfoReducer from './businessInfoSlice';
import chatReducer from './chatSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, businessInfoReducer);

const store = configureStore({
  reducer: {
    businessInfo: persistedReducer,
    chat: chatReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
