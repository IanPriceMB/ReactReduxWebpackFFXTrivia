import { combineReducers } from 'redux';
import levelReducer from './levelReducer';
import cutsceneReducer from './cutsceneReducer';
import charactersReducer from './characterReducer';

export default combineReducers({
  level: levelReducer,
  scene: cutsceneReducer,
  characters: charactersReducer
});