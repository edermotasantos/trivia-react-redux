import {
  CHANGE_PLAYER_INFORMATION,
  SET_UPDATE_SCORE,
  RESET_SCORE,
  WILL_PLAY_AGAIN,
  REQUEST_CATEGORIES,
  GET_CATEGORIES,
  REQUEST_QUESTIONS,
  GET_QUESTIONS,
  REQUEST_TOKEN,
  GET_TOKEN,
  FAILED_REQUEST,
} from './ActionTypes';

const URL = 'https://opentdb.com/api';

export const changePlayerInfo = (playerInfo) => ({
  type: CHANGE_PLAYER_INFORMATION,
  playerInfo,
});

export const setUpdateScore = (scoreInfo) => ({
  type: SET_UPDATE_SCORE,
  scoreInfo,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

export const willPlayAgain = () => ({
  type: WILL_PLAY_AGAIN,
});

const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

const succeededCategoriesRequest = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const succeededQuestionsRequest = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const succeededTokenRequest = (token) => ({
  type: GET_TOKEN,
  token,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

export const fetchCategories = () => async (dispatch) => {
  dispatch(requestCategories());
  try {
    const response = await fetch(`${URL}_category.php`);
    const categories = await response.json();
    dispatch(succeededCategoriesRequest(categories.trivia_categories));
    return categories.trivia_categories;
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const fetchQuestions = (config, token) => async (dispatch) => {
  const MAX_QUESTIONS = 5;
  dispatch(requestQuestions());
  try {
    console.log(`${URL}.php?amount=5${config}&token=${token}`);
    const response = await fetch(`${URL}.php?amount=5${config}&token=${token}`);
    const questions = await response.json();
    dispatch(succeededQuestionsRequest(questions.results));
    if (questions.results.length < MAX_QUESTIONS) sessionStorage.customError = true;
    else sessionStorage.customError = false;
    console.log(sessionStorage.customError, sessionStorage.lastConfig);
    sessionStorage.lastConfig = config;
    return questions.results;
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  try {
    const response = await fetch(`${URL}_token.php?command=request`);
    const token = await response.json();
    dispatch(succeededTokenRequest(token.token));
    localStorage.token = token.token;
    return token.token;
  } catch (error) {
    dispatch(failedRequest(error));
  }
};
