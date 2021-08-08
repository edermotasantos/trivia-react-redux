import {
  CHANGE_PLAYER_INFORMATION,
  SET_UPDATE_SCORE,
  RESET_SCORE,
  WILL_PLAY_AGAIN,
} from './ActionTypes';

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
