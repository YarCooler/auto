import { isEqual } from 'lodash';
import { Hint } from '../models/Hint';
import {
  CarsActionTypes,
  ExtendedAction,
  HintsActionTypes,
  HistoryActionType,
} from './actions';
import { Car, CarFilter, toCars } from '../models/Car';

const localHistory = window.localStorage.getItem('history');

const pushHintToHistory = (hint: Hint, array: Hint[]) => {
  if (array.some((item) => isEqual(item, hint))) {
    return array;
  }

  // TODO: do 5 as constant
  return array.length >= 5
    ? [hint].concat(array.slice(0, -1))
    : array.concat(hint);
};

const deleteHintFromArray = (hint: Hint, array: Hint[]) => {
  return array.filter((item) => !isEqual(item, hint));
};

export interface Store {
  hints: {
    list: Hint[],
    total: number
    isLoaded: boolean,
    isLoading: boolean,
    error: null | string
  },
  history: Hint[],
  cars: {
    list: Car[],
    total: number,
    filter: CarFilter,
    isLoading: boolean,
    isLoaded: boolean,
    error: null | string
  }

}

const initialFilter: CarFilter = {
  page: 1,
  per_page: 10,
  sort_by: 'price',
  sort_asc: false,
  with_context_filters: true,
  filter: {
    id: [],
    catalog: [
      {
        brand_id: [],
        model_id: [],
        folder_id: [],
        modification_id: [],
      },
    ],
    region_id: [],
    city_id: [],
    price_from: undefined,
    price_to: undefined,
    year_from: undefined,
    year_to: undefined,
    engine_type_code: [],
    engine_power_from: undefined,
    engine_power_to: undefined,
    pts_type_code: '',
    transmission_code: [],
    transmission_drive_code: [],
    wheel_code: '',
    body_type_code: [],
    mileage_from: undefined,
    mileage_to: undefined,
    color_code: [],
    option_ids: [],
    is_new: null,
    label_code: [],
  },
};

const initialState: Store = {
  hints: {
    list: [],
    total: 0,
    isLoaded: false,
    isLoading: false,
    error: null,
  },

  history: localHistory ? JSON.parse(localHistory) : [],

  cars: {
    list: [],
    total: 0,
    filter: initialFilter,
    isLoading: false,
    isLoaded: false,
    error: null,
  },
};

export const reducer = (state:Store = initialState, action: ExtendedAction<any>) => {
  switch (action.type) {
    case HintsActionTypes.FETCH_HINTS:
      return {
        ...state,
        hints: {
          ...state.hints,
          isLoading: true,
          isLoaded: false,
          error: null,
        },
      };
    case HintsActionTypes.FETCH_HINTS__SUCCESS:
      return {
        ...state,
        hints: {
          ...state.hints,
          list: action.payload.hints,
          total: action.payload.total,
          isLoaded: true,
          isLoading: false,
          error: null,
        },
      };
    case HintsActionTypes.FETCH_HINTS__RESET:
      return {
        ...state,
        hints: initialState.hints,
      };

    case HistoryActionType.PUSH_ITEM:
      return {
        ...state,
        history: pushHintToHistory(action.payload, state.history),
      };
    case HistoryActionType.DELETE_ITEM:
      return {
        ...state,
        history: deleteHintFromArray(action.payload, state.history),
      };

    case CarsActionTypes.FETCH_CARS:
      return {
        ...state,
        cars: {
          ...state.cars,
          isLoading: true,
          isLoaded: false,
          error: null,
        },
      };
    case CarsActionTypes.FETCH_CARS__SUCCESS:
      return {
        ...state,
        cars: {
          ...state.cars,
          list: toCars(action.payload.results),
          total: action.payload.total,
          isLoaded: true,
          isLoading: false,
          error: null,
        },
      };
    case CarsActionTypes.SET_CARS_FILTER:
      return {
        ...state,
        cars: {
          ...state.cars,
          filter: action.payload,
        },
      };
    case CarsActionTypes.SET_CARS_PAGE:
      return {
        ...state,
        cars: {
          ...state.cars,
          filter: { ...state.cars.filter, page: action.payload },
        },
      };

    case CarsActionTypes.SET_CARS_PAGE__SUCCESS:
      return {
        ...state,
        cars: {
          ...state.cars,
          list: toCars(action.payload),
          isLoaded: true,
          isLoading: false,
          error: null,
        },
      };

    default:
      return state;
  }
};
