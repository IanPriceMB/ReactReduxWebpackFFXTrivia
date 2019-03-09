// This file contains the Redux dispatch actions for tracking available
// and current character state

import { SET_CURRENT_CHARACTERS, SET_AVAILABLE_CHARACTERS } from '../actions/types';

export const setCurrentCharacters = (current) => {
  return ({
    type: SET_CURRENT_CHARACTERS, 
    payload: current
  });
};

export const setAvailableCharacters = (available) => {
  return ({
    type: SET_AVAILABLE_CHARACTERS, 
    payload: available
  });
};