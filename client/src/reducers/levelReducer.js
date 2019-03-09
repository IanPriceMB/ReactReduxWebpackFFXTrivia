import { SET_LEVEL, GAME_LOSS } from '../actions/types';

const initialState = {
  currentLevel: '', 
  gameLoss: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state, 
        currentLevel: action.payload
      };
    case GAME_LOSS:
      return {
        ...state,
        gameLoss: action.payload
      }
    default: return state;
  }
}