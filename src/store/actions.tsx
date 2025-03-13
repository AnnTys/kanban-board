import { ColumnsState } from '../types';
import { Dispatch } from 'redux';

export const FETCH_ISSUES_REQUEST = 'FETCH_ISSUES_REQUEST';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAILURE = 'FETCH_ISSUES_FAILURE';
export const UPDATE_COLUMNS = 'UPDATE_COLUMNS';
export const SET_REPO_INFO = 'SET_REPO_INFO';

export const updateColumns = (columns: ColumnsState) => ({
    type: UPDATE_COLUMNS,
    payload: columns
  });

  export const fetchIssuesRequest = () => ({
    type: FETCH_ISSUES_REQUEST
  });
  
  export const fetchIssuesSuccess = (columns: ColumnsState) => ({
    type: FETCH_ISSUES_SUCCESS,
    payload: columns
  });
  
  export const fetchIssuesFailure = (error: string) => ({
    type: FETCH_ISSUES_FAILURE,
    payload: error
  });

  export const setRepoInfo = (owner: string, repo: string, stars: string) => ({
    type: SET_REPO_INFO,
    payload: { owner, repo, stars }
  });
  
  
  const daysAgo = (date: string) =>{
      const now = new Date();
      const diffTime = now.getTime() - new Date( date ).getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      return `${diffDays} days ago`;
  }

  export const fetchGitHubIssuesThunk = (owner: string, repo: string) => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch(fetchIssuesRequest());

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch issues: ${response.statusText}`);
        }
    
        const issues = await response.json();
        
        
        const columns: ColumnsState = {
            todo: [],
            inProgress: [],
            done: []
          };
          
          
          for (let i = 0; i < issues.length; i++) {
            const issue = issues[i];
            
            let item = { id: i.toString( ), number: issue.number, title: issue.title, description: issue.description, date: daysAgo( issue.updated_at ), person: issue.user.login, comments: issue.comments };

            if (issue.state === 'closed') {
              columns.done.push(item);
            } else if (issue.state === 'open') {
              if (issue.assignee) {
                columns.inProgress.push(item);
              } else {
                columns.todo.push(item);
              }
            }
        }
        
        dispatch(fetchIssuesSuccess(columns));
      } catch (error) {
        dispatch(fetchIssuesFailure(error instanceof Error ? error.message : 'An error occurred'));
      }
    };
  };