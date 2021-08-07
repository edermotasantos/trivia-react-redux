const CHANGE_PLAYER_INFORMATION = 'CHANGE_PLAYER_INFORMATION';
export const SET_UPDATE_SCORE = 'SET_UPDATE_SCORE';

const changePlayerInfo = (playerInfo) => ({
  type: CHANGE_PLAYER_INFORMATION,
  playerInfo,
});

export const setUpdateScore = (scoreInfo) => ({
  type: SET_UPDATE_SCORE,
  scoreInfo,
});

export { changePlayerInfo, CHANGE_PLAYER_INFORMATION };
