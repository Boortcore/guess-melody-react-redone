import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './game-slice';
import dynamicMiddlewares from 'redux-dynamic-middlewares';

export const store = configureStore({
  devTools: true,
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).concat(dynamicMiddlewares);
  }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch