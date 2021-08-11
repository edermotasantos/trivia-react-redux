import {
  REQUEST_CATEGORIES,
  GET_CATEGORIES,
  REQUEST_QUESTIONS,
  GET_QUESTIONS,
  REQUEST_TOKEN,
  GET_TOKEN,
  FAILED_REQUEST,
} from '../actions/ActionTypes';

const INITIAL_STATE = {
  questions: [],
  categories: [],
  token: '',
  configuration: 'default',
  isFetching: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return { ...state, isFetching: true };
  case GET_CATEGORIES:
    return {
      ...state,
      categories: action.categories,
      configuration: 'default',
      isFetching: false,
    };
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      configuration: 'custom',
      isFetching: false,
    };
  case REQUEST_TOKEN:
    return { ...state, isFetching: true };
  case GET_TOKEN:
    return { ...state, token: action.token, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, error: action.error, isFetching: false };
  default:
    return state;
  }
};

export default game;
