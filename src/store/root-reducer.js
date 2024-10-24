import { NameSpace } from '../config';
import { combineReducers } from '@reduxjs/toolkit';
import dataSlice from './data/data-slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataSlice,
});
