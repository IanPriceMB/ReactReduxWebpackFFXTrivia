import { combineReducers } from 'redux';
import postReducer from './postReducer';
import levelReducer from './levelReducer';

export default combineReducers({
  posts: postReducer,
  level: levelReducer,
  // movie: cutsceneReducer,
  // characters: charactersReducer
});