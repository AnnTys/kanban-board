import { AppState, UrlState, ColumnsState } from '../types';
import * as types from './actions';
import { combineReducers } from 'redux';

const initialColumnsState: ColumnsState = {
  todo: [],
  inProgress: [],
  done: []
};

const initialState: AppState = {
  columns: initialColumnsState,
  isLoading: false,
  error: null
};

const initialUrlState: UrlState = {
  owner: "",
  repo: "",
  stars: ""
};

const columnsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.FETCH_ISSUES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        columns: action.payload,
        isLoading: false,
        error: null
      };
    case types.FETCH_ISSUES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case types.UPDATE_COLUMNS:
      return {
        ...state,
        columns: action.payload
      };
    default:
      return state;
  }
};

const urlReducer = (state = initialUrlState, action: any) => {
  switch (action.type) {
    case types.SET_REPO_INFO:
      return { 
        ...state, 
        owner: action.payload.owner,
        repo: action.payload.repo,
        stars: action.payload.stars
      };
    default:
      return state
  }
};

const rootReducer = combineReducers({
  columns: columnsReducer,
  url: urlReducer
});

export default rootReducer;