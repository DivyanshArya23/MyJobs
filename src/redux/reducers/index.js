import { combineReducers } from 'redux';
import loaderReducer from './loader.reducer';
import userReducer from './user.reducer';

export default combineReducers({
  loader: loaderReducer,
  user: userReducer,
});
