// This controls the Redux state with reguards to our
// available and current characters

import { SET_CURRENT_CHARACTERS, SET_AVAILABLE_CHARACTERS } from '../actions/types';

const initialState = {
  availableCharacters: [],
  currentCharacters: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CHARACTERS:
      return {
        ...state, 
        currentCharacters:action.payload
      };
    case SET_AVAILABLE_CHARACTERS:
      return {
        ...state,
        availableCharacters:action.payload
      }
    default: return state;
  }
}