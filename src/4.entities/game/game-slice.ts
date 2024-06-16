import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '.';
import { MAX_TIME } from '../../5.shared/constants';

type StateType = {
  questions: any[];
  lives: number;
  time: number;
  maxTime: number;
  currentLevel: number;
  correctAnswers: number;
  loading: boolean;
  results: any;
  startTime: number;
}

function getInitialState(): StateType {
  return {
    questions: [],
    lives: 3,
    time: MAX_TIME,
    maxTime: MAX_TIME,
    currentLevel: 0,
    correctAnswers: 0,
    loading: true,
    results: null,
    startTime: +new Date(),
  };
}
export const gameSlice = createSlice({
  name: 'game',
  initialState: getInitialState(),
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload
    },
    loadQuestionsSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.questions = action.payload
    },
    loadAllResults: (state, action: PayloadAction<any>) => {
      state.results = action.payload;
      state.loading = false;
    },
    changeScreen: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      const lives = payload ? state.lives : state.lives - 1;
      const currentLevel = state.currentLevel + 1;
      const correctAnswers = payload
        ? state.correctAnswers + 1
        : state.correctAnswers;
      state.currentLevel = currentLevel;
      state.lives = lives;
      state.correctAnswers = correctAnswers;
    },
    resetStore: () => {
      return getInitialState();
    },
  },
})

export const { setLoading, setTime, loadQuestionsSuccess, loadAllResults, changeScreen, resetStore } = gameSlice.actions

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export function getQuestion(state) {
  return state.game.questions[state.game.currentLevel];
}

export function getResults(state) {
  return state.game.results;
}

export function getLoading(state) {
  return state.game.loading;
}

export function getAnswers(state) {
  return state.game.correctAnswers;
}

export function getCurrentLevel(state) {
  return state.game.currentLevel;
}

export function getTime(state) {
  return state.game.time;
}

export function getStartTime(state) {
  return state.game.startTime;
}

export function getMaxTime(state) {
  return state.game.maxTime;
}

export default gameSlice.reducer;