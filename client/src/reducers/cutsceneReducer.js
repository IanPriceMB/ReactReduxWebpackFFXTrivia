// This controls the Redux state with reguards to which scene we are in

import { SET_CUTSCENE } from '../actions/types';

const initialState = {
  sceneName: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CUTSCENE:
      return {
        ...state, 
        sceneName: action.payload
      };
    default: return state;
  }
}