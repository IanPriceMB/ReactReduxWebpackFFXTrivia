import { SET_CUTSCENE } from '../actions/types';

const initialState = {
  movie: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CUTSCENE:
      return {
        ...state, 
        movie: action.payload
      };
    default: return state;
  }
}