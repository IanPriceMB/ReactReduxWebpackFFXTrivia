import { SET_CURRENT_CHARACTERS, SET_AVAILABLE_CHARACTERS } from '../actions/types';

const initialState = {
  availableCharacters: ['Tidus'],
  currentCharacters: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CHARACTERS:
      return {
        ...state, 
        currentCharacters:[...state.currentCharacters, ...action.payload]
      };
    case SET_AVAILABLE_CHARACTERS:
      return {
        ...state,
        availableCharacters:[...state.availableCharacters, ...action.payload]
      }
    default: return state;
  }
}