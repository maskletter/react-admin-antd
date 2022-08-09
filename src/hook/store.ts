import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import store from '../store'

type RootState = ReturnType<typeof store.getState>;
type RootDispath = typeof store.dispatch;


export const useAppDispath: () => RootDispath = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;