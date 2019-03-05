import { SET_CUTSCENE } from '../actions/types';

export const setCutscene = (sceneName) => {
  return ({
    type: SET_CUTSCENE, 
    payload: sceneName
  })
}