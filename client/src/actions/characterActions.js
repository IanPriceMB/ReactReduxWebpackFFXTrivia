import { SET_CURRENT_CHARACTERS, SET_AVAILABLE_CHARACTERS } from '../actions/types';

export const setCurrentCharacters = (current) => {
  return ({
    type: SET_CURRENT_CHARACTERS, 
    payload: current
  })
}

export const setAvailableCharacters = (possible) => {
  return ({
    type: SET_AVAILABLE_CHARACTERS, 
    payload: possible
  })
}