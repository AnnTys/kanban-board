import reducer from '../store/reducers';
import * as types from '../store/actions';

describe('Root Reducer', () => {
  const initialState = {
    columns: {
      columns: {
        todo: [],
        inProgress: [],
        done: []
      },
      isLoading: false,
      error: null
    },
    url: {
      owner: '',
      repo: '',
      stars: ''
    }
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle FETCH_ISSUES_REQUEST', () => {
    const action = { type: types.FETCH_ISSUES_REQUEST };
    
    const expectedState = {
      ...initialState,
      columns: {
        ...initialState.columns,
        isLoading: true,
        error: null
      }
    };
    
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ISSUES_SUCCESS', () => {
    const columns = {
      todo: [{ id: '1', number: '101', title: 'Test', description: 'Test', date: 'Today', person: 'user', comments: 0 }],
      inProgress: [],
      done: []
    };
    
    const action = {
      type: types.FETCH_ISSUES_SUCCESS,
      payload: columns
    };
    
    const expectedState = {
      ...initialState,
      columns: {
        ...initialState.columns,
        columns,
        isLoading: false,
        error: null
      }
    };
    
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ISSUES_FAILURE', () => {
    const error = 'Error fetching issues';
    
    const action = {
      type: types.FETCH_ISSUES_FAILURE,
      payload: error
    };
    
    const expectedState = {
      ...initialState,
      columns: {
        ...initialState.columns,
        isLoading: false,
        error
      }
    };
    
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_COLUMNS', () => {
    const columns = {
      todo: [{ id: '1', number: '101', title: 'Test', description: 'Test', date: 'Today', person: 'user', comments: 0 }],
      inProgress: [],
      done: []
    };
    
    const action = {
      type: types.UPDATE_COLUMNS,
      payload: columns
    };
    
    const expectedState = {
      ...initialState,
      columns: {
        ...initialState.columns,
        columns
      }
    };
    
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_REPO_INFO', () => {
    const owner = 'testowner';
    const repo = 'testrepo';
    const stars = '123';
    
    const action = {
      type: types.SET_REPO_INFO,
      payload: { owner, repo, stars }
    };
    
    const expectedState = {
      ...initialState,
      url: {
        owner,
        repo,
        stars
      }
    };
    
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});