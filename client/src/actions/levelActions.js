import { SET_LEVEL } from '../actions/types';

export const setLevel = (levelName) => {
  return ({
    type: SET_LEVEL, 
    payload: levelName
  })
}
