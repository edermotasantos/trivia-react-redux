import { CHANGE_PLAYER_INFORMATION } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_PLAYER_INFORMATION:
    return {
      ...state,
      ...action.playerInfo,
    };

  default:
    return state;
  }
};

export default player;
