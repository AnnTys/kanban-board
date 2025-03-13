import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useColumnsSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUrlSelector: TypedUseSelectorHook<RootState> = useSelector;