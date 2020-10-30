import { AnyAction } from 'redux';
import { Hint } from '../models/Hint';
import { Car, CarFilter, CarResponseData } from '../models/Car';

export interface ExtendedAction<T> extends AnyAction{
  type: string;
  payload?: T;
}

/* Hint */

// eslint-disable-next-line no-shadow
export enum HintsActionTypes {
    FETCH_HINTS = 'FETCH_HINTS',
    FETCH_HINTS__SUCCESS = 'FETCH_HINTS__SUCCESS',
    FETCH_HINTS__ERROR = 'FETCH_HINTS__ERROR',
    FETCH_HINTS__RESET = 'FETCH_HINTS__RESET',
}

export const fetchHints = (query: string):ExtendedAction<string> => ({
  type: HintsActionTypes.FETCH_HINTS,
  payload: query,
});

export const fetchHintsSuccess = (data: Hint[]): ExtendedAction<Hint[]> => {
  return ({
    type: HintsActionTypes.FETCH_HINTS__SUCCESS,
    payload: data,
  });
};

export const fetchHintsReset = (): ExtendedAction<Hint[]> => {
  return ({
    type: HintsActionTypes.FETCH_HINTS__RESET,
  });
};

/* History */

// eslint-disable-next-line no-shadow
export enum HistoryActionType {
  PUSH_ITEM= 'PUSH_ITEM',
  DELETE_ITEM = 'DELETE_ITEM'
}

export const pushHistoryItem = (item: Hint): ExtendedAction<Hint> => ({
  type: HistoryActionType.PUSH_ITEM,
  payload: item,
});

export const deleteHistoryItem = (hint: Hint): ExtendedAction<Hint> => ({
  type: HistoryActionType.DELETE_ITEM,
  payload: hint,
});

/* Cars */

// eslint-disable-next-line no-shadow
export enum CarsActionTypes {
  FETCH_CARS = 'FETCH_CARS',
  SET_CARS_FILTER = 'SET_CARS_FILTER',
  SET_CARS_PAGE = 'SET_CARS_PAGE',
  SET_CARS_PAGE__SUCCESS = 'SET_CARS_PAGE__SUCCESS',
  FETCH_CARS__SUCCESS = 'FETCH_CARS__SUCCESS',
  FETCH_CARS__ERROR = 'FETCH_CARS__ERROR',
}

export const setCarsFilter = (filter: CarFilter):ExtendedAction<CarFilter> => ({
  type: CarsActionTypes.SET_CARS_FILTER,
  payload: filter,
});

export const setCarsPage = (page: number): ExtendedAction<number> => ({
  type: CarsActionTypes.SET_CARS_PAGE,
  payload: page,
});

export const setCarPageSuccess = (
  data: Car[],
): ExtendedAction<Car[]> => {
  return ({
    type: CarsActionTypes.SET_CARS_PAGE__SUCCESS,
    payload: data,
  });
};

export const fetchCar = (withPagination: boolean = false): ExtendedAction<boolean> => ({
  type: CarsActionTypes.FETCH_CARS,
  payload: withPagination,
});

export const fetchCarSuccess = (
  data: CarResponseData,
): ExtendedAction<CarResponseData> => {
  return ({
    type: CarsActionTypes.FETCH_CARS__SUCCESS,
    payload: data,
  });
};

/* Dummy */
export const dummyAction = ():ExtendedAction<never> => ({ type: 'DUMMY' });
