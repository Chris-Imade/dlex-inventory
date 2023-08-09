import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { appSlice } from './Splice/appSlice';

const rootReducer: Reducer<{ data: ReturnType<typeof appSlice.reducer> }, any> =
  combineReducers({
    data: appSlice.reducer,
  });

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
