import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
import {
  loadingBarMiddleware,
  showLoading,
  hideLoading,
  loadingBarReducer,
} from 'react-redux-loading-bar';
import storage from 'redux-persist/lib/storage'; // This defaults to localStorage for web
import businessInfoReducer from '../slices/businessInfoSlice';
import userReducer from '../slices/userSlice';
import authReducer from '../slices/authSlice';
import workspacesReducer from '../slices/workspacesSlice';
import chatReducer from '../slices/chatSlice';
import trashReducer from '../slices/trashSlice';
import folderReducer from '../slices/folderSlice';
import editorReducer from '../reducers/editorReducer';
import siteMapReducer from '../slices/sitemapSlice';


import { workspaceApi } from '../api/workspaceApi';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

// Custom middleware to trigger loading bar actions for RTK Query requests
const rtkQueryLoadingMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith('/pending')) {
    console.log('Loading started'); // Add this line
    store.dispatch(showLoading());
  } else if (
    action.type.endsWith('/fulfilled') ||
    action.type.endsWith('/rejected')
  ) {
    console.log('Loading finished'); // Add this line
    store.dispatch(hideLoading());
  }
  return next(action);
};

// // Persist configuration for each reducer
// const businessInfoPersistConfig = {
//   key: 'businessInfo',
//   storage,
// };
//
// const workspacesPersistConfig = {
//   key: 'workspaces',
//   storage,
// };
//
// const userPersistConfig = {
//   key: 'user',
//   storage,
// };
//
// const authPersistConfig = {
//   key: 'auth',
//   storage,
// };
//
// const chatPersistConfig = {
//   key: 'chat',
//   storage,
// };

// // Persisted Configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['workspaces'],
};

// Persisted reducers
// const persistedBusinessInfoReducer = persistReducer(
//   businessInfoPersistConfig,
//   businessInfoReducer
// );
// const persistedWorkspacesReducer = persistReducer(
//   workspacesPersistConfig,
//   workspacesReducer
// );
// const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
// const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer);

export const appReducer = combineReducers({
  businessInfo: businessInfoReducer,
  workspaces: workspacesReducer,
  user: userReducer,
  auth: authReducer,
  loadingBar: loadingBarReducer,
  chat: chatReducer,
  trash: trashReducer,
  folder: folderReducer,
  editor: editorReducer,
  siteMap:siteMapReducer,
  // Add additional reducers here if needed
  [workspaceApi.reducerPath]: workspaceApi.reducer, // API reducer for workspaces
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    storage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    })
      .concat(rtkQueryLoadingMiddleware)
      .concat(loadingBarMiddleware()) // Add loading bar middleware
      .concat(workspaceApi.middleware), // Add middleware for RTK Query
});

const persistor = persistStore(store);

export { store, persistor };
