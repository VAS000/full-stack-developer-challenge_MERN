import { combineReducers } from 'redux';
import authorSlice from './slices/authorSlice';

export default combineReducers({
  authors: authorSlice,
});
