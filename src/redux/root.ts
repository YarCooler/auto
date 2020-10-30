import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import {
  fetchCarsEpic,
  fetchHintsEpic,
  saveHistoryEpic,
  startFetchCarsEpic,
} from './epics';
import { reducer } from './store';

export const rootEpic = combineEpics(
  fetchHintsEpic,
  saveHistoryEpic,
  startFetchCarsEpic,
  fetchCarsEpic,
);

export const rootReducer = combineReducers({
  reducer,
});
