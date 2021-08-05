const CHANGE_PLAYER_INFORMATION = 'CHANGE_PLAYER_INFORMATION';
export const VALIDATE_LOGIN = 'VALIDATE_LOGIN'; // 2

const changePlayerInfo = (playerInfo) => ({
  type: CHANGE_PLAYER_INFORMATION,
  playerInfo,
});

export const validateLogin = () => ({ // 2
  type: VALIDATE_LOGIN,
});

export { changePlayerInfo, CHANGE_PLAYER_INFORMATION };
