import { SET_LEVEL } from '../actions/types';

export const setLevel = (level) => {
  return ({
    type: SET_LEVEL, 
    payload: level
  })
}