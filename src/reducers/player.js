import { CHANGE_PLAYER_INFORMATION, VALIDATE_LOGIN } from '../actions'; // 2

const INITIAL_STATE = {
  player: { // 2
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  loggedIn: false, // 2
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_PLAYER_INFORMATION:
    return {
      ...state,
      ...action.playerInfo,
    };

  case VALIDATE_LOGIN: // 2
    return { ...state, loggedIn: true };

  default:
    return state;
  }
};

export default player;
