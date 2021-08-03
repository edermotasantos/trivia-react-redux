const CHANGE_PLAYER_INFORMATION = 'CHANGE_PLAYER_INFORMATION';

const changePlayerInfo = (playerInfo) => ({
  type: CHANGE_PLAYER_INFORMATION,
  playerInfo,
});

export { changePlayerInfo, CHANGE_PLAYER_INFORMATION };
