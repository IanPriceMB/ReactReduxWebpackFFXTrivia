import { SET_LEVEL } from '../actions/types';

const initialState = {
  currentLevel: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state, 
        currentLevel: action.payload
      };
    default: return state;
  }
}