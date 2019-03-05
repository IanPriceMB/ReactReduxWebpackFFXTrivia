import { combineReducers } from 'redux';
import postReducer from './postReducer';
import levelReducer from './levelReducer';
import cutsceneReducer from './cutsceneReducer';

export default combineReducers({
  posts: postReducer,
  level: levelReducer,
  movie: cutsceneReducer,
  // characters: charactersReducer
});