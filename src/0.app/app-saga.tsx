
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../4.entities/game/sagas';
import { router } from './app-router';
import { addMiddleware, removeMiddleware, resetMiddlewares } from 'redux-dynamic-middlewares'

export function startSaga() {
  const sagaMiddleware = createSagaMiddleware();
  addMiddleware(sagaMiddleware)
  sagaMiddleware.setContext({ router });
  sagaMiddleware.run(rootSaga);
}