import { ajax } from 'rxjs/ajax';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import {
  debounceTime,
  map,
  switchMap, tap,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import {
  fetchHintsReset,
  fetchHintsSuccess,
  ExtendedAction,
  HintsActionTypes,
  HistoryActionType,
  dummyAction,
  CarsActionTypes,
  fetchCarSuccess,
  fetchCar, setCarPageSuccess,
} from './actions';
import { Car, CarResponseData } from '../models/Car';
import { Hint } from '../models/Hint';
import { Store } from './store';

interface State {
  reducer: Store
}

export const fetchHintsEpic = (
  action$: ActionsObservable<Action>,
): Observable<ExtendedAction<Hint[]>> => {
  return action$.pipe(
    ofType(HintsActionTypes.FETCH_HINTS),
    debounceTime(300),
    switchMap((action: ExtendedAction<string>) => ajax({
      url: 'https://api.sberauto.com/searcher/suggestHints',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        text: action.payload,
      },
    }).pipe(
      map((response) => {
        if (action.payload === '') {
          return fetchHintsReset();
        }
        return fetchHintsSuccess(response.response.data);
      }),
    )),
  );
};

export const saveHistoryEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<State>,
): Observable<ExtendedAction<never>> => {
  return action$.pipe(
    ofType(HistoryActionType.PUSH_ITEM, HistoryActionType.DELETE_ITEM),
    debounceTime(200),
    tap(() => {
      window.localStorage.setItem('history', JSON.stringify(state$.value.reducer.history));
    }),
    map(dummyAction),
  );
};

export const startFetchCarsEpic = (
  action$: ActionsObservable<Action>,
): Observable<ExtendedAction<boolean>> => {
  return action$.pipe(
    ofType(CarsActionTypes.SET_CARS_FILTER, CarsActionTypes.SET_CARS_PAGE),
    debounceTime(300),
    map((action: ExtendedAction<boolean>) => {
      const withPagination = action.type === CarsActionTypes.SET_CARS_PAGE;
      return fetchCar(withPagination);
    }),
  );
};

export const fetchCarsEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<State>,
): Observable<ExtendedAction<CarResponseData | Car[]>> => {
  return action$.pipe(
    ofType(CarsActionTypes.FETCH_CARS),
    debounceTime(300),
    switchMap((action: ExtendedAction<boolean>) => ajax({
      url: 'https://api.sberauto.com/searcher/getCars',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: state$.value.reducer.cars.filter,
    }).pipe(
      map((response) => {
        if (action.payload) {
          const newPage = response.response.data.results ?? [];
          return setCarPageSuccess(
            state$.value.reducer.cars.list.concat(newPage),
          );
        }
        return fetchCarSuccess(response.response.data);
      }),
    )),
  );
};
