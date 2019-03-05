import { SET_CUTSCENE } from '../actions/types';

export const setCutscene = (filename) => {
  return ({
    type: SET_CUTSCENE, 
    payload: filename
  })
}