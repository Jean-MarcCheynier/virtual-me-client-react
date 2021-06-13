import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import chatReducer from '../features/chat/chatSlice';
import authReducer from '../features/auth/authSlice';
import { VirtualMeAPI } from '../app/axios'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    counter: counterReducer,
  },
});
VirtualMeAPI.initInterceptor(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
