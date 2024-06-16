import { put, call, takeLatest, select, getContext } from 'redux-saga/effects';
import {
  URL_STATISTIC,
  URL_QUESTION,
  START_GAME_REQUEST,
  CHANGE_TIME_REQUEST,
  TO_NEXT_LEVEL_REQUEST,
  LOAD_QUESTIONS_REQUEST,
  LOAD_ALL_RESULTS_REQUEST,
} from '../../5.shared/constants';
import { ROUTER_PATHS } from '../../5.shared/constants/routes';
import { loadQuestionsSuccess, changeScreen, setLoading, loadAllResults, resetStore, setTime } from './game-slice';

import { createBrowserRouter } from 'react-router-dom';

function* goToPath(url) {
  const router: ReturnType<typeof createBrowserRouter> = yield getContext('router');
  router.navigate(`/${url}`)
}

export function* loadQuestions() {
  try {
    const response = yield call(fetch, URL_QUESTION);
    const questions = yield call([response, response.json]);
    yield put(loadQuestionsSuccess(questions));
  } catch (e) {}
}

export function* goToStartNewGame() {
  yield put(resetStore());
  yield goToPath(ROUTER_PATHS.GAME)
}

export function* goToStartGame() {
  yield put(resetStore());
  yield goToPath(ROUTER_PATHS.GAME);
}

export function* loadResults() {
  yield put(setLoading());
  const response = yield call(fetch, URL_STATISTIC);
  const statistic = yield call([response, response.json]);
  yield put(loadAllResults(statistic));
}

export function* sendResult(data) {
  const requestSettings = {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': `application/json`,
    },
    method: `POST`,
  };
  yield call(fetch, URL_STATISTIC, requestSettings);
}

export function* goToSuccessScreen() {
  yield put(setLoading());
  const {
    game: { time, correctAnswers, maxTime },
  } = yield select();
  const data = { id: Date.now(), time: maxTime - time, correctAnswers };
  yield sendResult(data);
  yield goToPath(ROUTER_PATHS.SUCCESS + '/' + data.id)
}

export function* goToNextScreen({ payload }: any) {
  yield put(changeScreen(payload));
  const store = yield select();
  const { lives, questions, currentLevel } = store.game;
  if (lives === 0) {
    yield goToPath(ROUTER_PATHS.FAIL)
  }
  if (currentLevel === questions.length) {
    yield goToSuccessScreen();
  }
}
export function* goToNextTick({ payload }: any) {
  const {
    game: { maxTime },
  } = yield select();
  const nextTime = maxTime - payload;

  yield put(setTime(nextTime));
  if (nextTime <= 0) {
    yield goToPath(ROUTER_PATHS.FAIL);
  }
}
export default function* rootSaga() {
  yield takeLatest(LOAD_QUESTIONS_REQUEST, loadQuestions);
  yield takeLatest(START_GAME_REQUEST, goToStartGame);
  yield takeLatest(TO_NEXT_LEVEL_REQUEST, goToNextScreen);
  yield takeLatest(LOAD_ALL_RESULTS_REQUEST, loadResults);
  yield takeLatest(CHANGE_TIME_REQUEST, goToNextTick);
}
