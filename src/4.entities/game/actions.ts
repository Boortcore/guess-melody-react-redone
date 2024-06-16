import {
  LOAD_QUESTIONS_REQUEST,
  LOAD_ALL_RESULTS_REQUEST,
  START_GAME_REQUEST,
  TO_NEXT_LEVEL_REQUEST,
  LOAD_ALL_RESULTS,
  CHANGE_TIME_REQUEST
} from '../../5.shared/constants';


export function loadQuestionsRequest() {
  return {
    type: LOAD_QUESTIONS_REQUEST,
  }
}

export function startGameRequest() {
  return {
    type: START_GAME_REQUEST
  }
}

export function goToNextLevelRequest(answer) {
  return {
    type: TO_NEXT_LEVEL_REQUEST,
    payload: answer
  }
}

export function loadAllResultsRequest() {
  return {
    type: LOAD_ALL_RESULTS_REQUEST,
  }
}
 
export function loadAllResults(data) {
  return {
    type: LOAD_ALL_RESULTS,
    payload: data
  }
}

export function changeTimeRequest(value) {
  return {
    type: CHANGE_TIME_REQUEST,
    payload: value
  }
}
