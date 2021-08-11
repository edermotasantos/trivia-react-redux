import { combineReducers } from 'redux';
import player from './player';
import game from './game';

const reducer = combineReducers({ player, game });
export default reducer;
