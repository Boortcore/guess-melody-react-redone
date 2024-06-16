import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './game-slice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { router } from '../../0.app/app-router';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  devTools: true,
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware);
  }
});
sagaMiddleware.setContext({ router });
sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch