// This file contains the Redux dispatch actions for tracking which scene it is

import { SET_CUTSCENE } from '../actions/types';

export const setCutscene = (sceneName) => {
  return ({
    type: SET_CUTSCENE, 
    payload: sceneName
  });
};