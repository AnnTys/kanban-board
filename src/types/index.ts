import { Item } from '../components/Item';

export interface ColumnsState {
  [key: string]: Item[];
}

export interface AppState {
  columns: ColumnsState;
  isLoading: boolean;
  error: string | null;
}

export interface UrlState{
  owner: String;
  repo: String
  stars: String
}