// // src/redux/store.js
// import { createStore, combineReducers } from 'redux';
// import chatReducer from './reducers/chatReducer';

// const rootReducer = combineReducers({
//   chat: chatReducer,
// });

// const store = createStore(rootReducer);

// export default store;


// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import businessInfoReducer from '../../store/businessInfoSlice';

import chatReducer from '../slices/chatSlice';
import userReducer from '../slices/userSlice';
import authReducer from '../slices/authSlice';

import workspaceReducer from '../slices/workspaceSlice';

import folderReducer from '../slices/folderSlice';
import setDefaultWorkspaceAndFolder from '../middleware/setDefaultWorkspaceAndFolder';
//import chatReducer from './chatSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, businessInfoReducer);

const store = configureStore({
  reducer: {
    businessInfo: persistedReducer,
    workspace: workspaceReducer,
   // folder: folderReducer,
   // chat: chatReducer,
    user: userReducer,
    auth: authReducer
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(setDefaultWorkspaceAndFolder),

});

const persistor = persistStore(store);

export { store, persistor };
