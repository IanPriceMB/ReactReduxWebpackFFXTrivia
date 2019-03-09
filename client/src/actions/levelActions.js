// This file contains the Redux dispatch actions for tracking 
// which level the player  is on and if they have lost

import { SET_LEVEL, GAME_LOSS } from '../actions/types';

export const setLevel = (levelName) => {
  return ({
    type: SET_LEVEL, 
    payload: levelName
  });
};

export const gameLoss = (value) => {
  return ({
    type: GAME_LOSS,
    payload: value
  });
};