import { createStore, combineReducers } from "redux";
import user from "./user";
import sheets from "./sheets";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = createStore(
  combineReducers({
    user,
    sheets
  })
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
