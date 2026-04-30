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

import { workspaceApi } from '../api/workspaceApi';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { createTransform } from 'redux-persist';

// Custom middleware to trigger loading bar actions for RTK Query requests
const rtkQueryLoadingMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith('/pending')) {
    store.dispatch(showLoading());
  } else if (
    action.type.endsWith('/fulfilled') ||
    action.type.endsWith('/rejected')
  ) {
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
  whitelist: ['workspaces', 'auth', 'folder'],
  // Note: workspaces slice is persisted but volatile IDs (currentChatId etc.)
  // are refreshed on mount via fetchDashboardStats
};

// Strip volatile auth state (isLoading, error) on rehydration
// Prevents "Creating account..." button stuck forever after page refresh
const authTransform = createTransform(
  (inboundState) => inboundState,
  (outboundState, key) => {
    if (key === 'auth') {
      return { ...outboundState, isLoading: false, error: null };
    }
    return outboundState;
  },
  { whitelist: ['auth'] }
);

// Persist only selectedFolder; reset data/volatile fields on rehydrate
// so reload never shows stale folderData/assessments or a stuck spinner
const folderTransform = createTransform(
  (inboundState) => ({ selectedFolder: inboundState.selectedFolder }),
  (outboundState) => ({
    selectedFolder: outboundState?.selectedFolder ?? null,
    folderData: null,
    assessments: null,
    loading: false,
    error: null,
  }),
  { whitelist: ['folder'] }
);

persistConfig.transforms = [authTransform, folderTransform];

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
