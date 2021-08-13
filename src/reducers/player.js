import {
  CHANGE_PLAYER_INFORMATION,
  SET_UPDATE_SCORE,
  RESET_SCORE,
  WILL_PLAY_AGAIN,
  RESET_PLAYER,
} from '../actions/ActionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  playAgain: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_PLAYER_INFORMATION:
    return { ...state, ...action.playerInfo };
  case SET_UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.scoreInfo.score,
      assertions: state.assertions + 1,
    };
  case RESET_PLAYER:
    return { ...state, name: '', assertions: 0, score: 0, gravatarEmail: '' };
  case RESET_SCORE:
    return { ...state, assertions: 0, score: 0 };
  case WILL_PLAY_AGAIN:
    return { ...state, playAgain: true };
  default:
    return state;
  }
};

export default player;
