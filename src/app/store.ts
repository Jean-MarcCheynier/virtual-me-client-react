import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import chatReducer from '../features/chat/chatSlice';
import authReducer from '../features/auth/authSlice';
import cvReducer from '../features/cv/cvSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';
import { VirtualMeAPI } from '../app/axios'

const combinedReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  counter: counterReducer,
  preferences: preferencesReducer,
  cv: cvReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'root/reset') { // check for action type 
    alert("reset")
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
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
