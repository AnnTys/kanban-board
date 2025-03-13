import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import Cookies from "js-cookie";
import { updateColumns, setRepoInfo } from "../store/actions";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {

    const savedColumns = Cookies.get("columns");
    const savedRepo = Cookies.get("repo");
    if (savedColumns && savedRepo) {
      try {
        const parsedColumns = JSON.parse(savedColumns);
        const parsedRepo = JSON.parse(savedRepo);
    
        setTimeout(() => {
          store.dispatch(updateColumns(parsedColumns));
          store.dispatch(setRepoInfo(parsedRepo.owner, parsedRepo.repo, parsedRepo.stars));
        }, 0);
       
      } catch (error) {
        console.error("Error parsing columns from cookies:", error);
      }
    }
    

    return getDefaultMiddleware();
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;