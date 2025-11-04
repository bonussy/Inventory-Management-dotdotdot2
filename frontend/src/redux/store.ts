import { configureStore, combineReducers } from '@reduxjs/toolkit';
import  bookSlice  from './features/bookSlice';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { WebStorage } from 'redux-persist';

function createPersistentStorage(): WebStorage {
  const isServer = typeof window === 'undefined';
  //Return noop storage.
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      }
    }
  }
  return createWebStorage('local');
}

const storage = createPersistentStorage();

const persistConfig ={
  key: "rootPersist",
  storage
}

const rootReducer = combineReducers({bookSlice})
const reduxPersistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: reduxPersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
